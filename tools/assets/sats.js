/* Shared live-price engine for all article pages. © Satmeter.
   One file, five redundant price sources, no build step.

   Why this exists: Google demotes pages that only change a timestamp.
   Every figure this script writes is computed from a live price at page
   load, so the freshness is real rather than cosmetic. */
(function (global) {
  "use strict";

  /* Same 21-currency set as satmeter.io itself (see index.html CURRENCIES),
     so the currency picker here offers exactly the same choices. */
  var CUR = {
    USD:{sym:"$",dec:2},   EUR:{sym:"€",dec:2},   GBP:{sym:"£",dec:2},
    CNY:{sym:"¥",dec:2},   JPY:{sym:"¥",dec:0},   KRW:{sym:"₩",dec:0},
    INR:{sym:"₹",dec:2},   BDT:{sym:"৳",dec:2},   IDR:{sym:"Rp",dec:0},
    VND:{sym:"₫",dec:0},   BRL:{sym:"R$",dec:2},  MXN:{sym:"$",dec:2},
    RUB:{sym:"₽",dec:2},   SAR:{sym:"﷼",dec:2},   AED:{sym:"د.إ",dec:2},
    TRY:{sym:"₺",dec:2},   NGN:{sym:"₦",dec:2},   ZAR:{sym:"R",dec:2},
    CAD:{sym:"$",dec:2},   AUD:{sym:"$",dec:2},   CHF:{sym:"CHF",dec:2}
  };
  var CODES = Object.keys(CUR);
  var rates = {};
  var lastFetch = null;
  var sourceName = null;
  var listeners = [];

  function fmtNum(n, dec) {
    return n.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });
  }
  function fmtFiat(n, code) {
    var m = CUR[code] || CUR.USD;
    return m.sym + fmtNum(n, m.dec);
  }
  function fmtSats(n) {
    return Math.round(n).toLocaleString("en-US");
  }
  function fmtBTC(n) {
    return n.toFixed(8).replace(/0+$/, "").replace(/\.$/, ".0");
  }

  function jget(url) {
    var ctl = (typeof AbortController !== "undefined") ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctl) ctl.abort(); }, 7000);
    return fetch(url, ctl ? { signal: ctl.signal } : undefined)
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(function (j) { clearTimeout(timer); return j; },
            function (e) { clearTimeout(timer); throw e; });
  }

  var SOURCES = [
    { name: "CoinGecko", get: function () {
      return jget("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=" +
        CODES.join(",").toLowerCase() + "&include_24hr_change=true").then(function (d) {
        var o = {};
        CODES.forEach(function (c) { var v = Number(d.bitcoin[c.toLowerCase()]); if (v > 0) o[c] = v; });
        if (!o.USD) throw new Error("no usd");
        return { rates: o, changePct: typeof d.bitcoin.usd_24h_change === "number" ? d.bitcoin.usd_24h_change : null };
      });
    }},
    { name: "Coinbase", get: function () {
      return jget("https://api.coinbase.com/v2/exchange-rates?currency=BTC").then(function (d) {
        var r = d.data.rates, o = {};
        CODES.forEach(function (c) { var v = Number(r[c]); if (v > 0) o[c] = v; });
        if (!o.USD) throw new Error("no usd");
        return { rates: o, changePct: null };
      });
    }},
    { name: "Blockchain.info", get: function () {
      return jget("https://blockchain.info/ticker").then(function (d) {
        var o = {};
        CODES.forEach(function (c) { if (d[c] && Number(d[c].last) > 0) o[c] = Number(d[c].last); });
        if (!o.USD) throw new Error("no usd");
        return { rates: o, changePct: null };
      });
    }},
    { name: "Kraken", get: function () {
      return jget("https://api.kraken.com/0/public/Ticker?pair=XBTUSD,XBTEUR").then(function (d) {
        var r = d.result, o = {};
        var uk = Object.keys(r).filter(function (k) { return k.indexOf("USD") > -1; })[0];
        var ek = Object.keys(r).filter(function (k) { return k.indexOf("EUR") > -1; })[0];
        if (uk) o.USD = Number(r[uk].c[0]);
        if (ek) o.EUR = Number(r[ek].c[0]);
        if (!o.USD) throw new Error("no usd");
        return { rates: o, changePct: null };
      });
    }},
    { name: "Bitstamp", get: function () {
      return jget("https://www.bitstamp.net/api/v2/ticker/btcusd/").then(function (d) {
        var o = { USD: Number(d.last) };
        if (!o.USD) throw new Error("no usd");
        var ch = (d.open && Number(d.open) > 0) ? ((Number(d.last) - Number(d.open)) / Number(d.open)) * 100 : null;
        return { rates: o, changePct: ch };
      });
    }}
  ];

  var changePct = null;

  function race() {
    return new Promise(function (resolve, reject) {
      var done = false, fails = 0;
      SOURCES.forEach(function (s) {
        s.get().then(function (q) {
          if (done) return;
          done = true;
          resolve({ q: q, name: s.name });
        }).catch(function () {
          fails++;
          if (!done && fails === SOURCES.length) reject(new Error("all sources failed"));
        });
      });
    });
  }

  function load() {
    return race().then(function (r) {
      rates = Object.assign({}, rates, r.q.rates);
      if (typeof r.q.changePct === "number") changePct = r.q.changePct;
      sourceName = r.name;
      lastFetch = new Date();
      listeners.forEach(function (fn) { try { fn(); } catch (e) {} });
      return rates;
    });
  }

  var API = {
    currencies: CUR,
    codes: CODES,
    rate: function (code) { return rates[code] > 0 ? rates[code] : null; },
    usd: function () { return rates.USD > 0 ? rates.USD : null; },
    change: function () { return changePct; },
    source: function () { return sourceName; },
    updatedAt: function () { return lastFetch; },
    ready: function () { return rates.USD > 0; },
    /* Convert an amount in `code` to satoshis. */
    toSats: function (amount, code) {
      var r = rates[code] > 0 ? rates[code] : null;
      if (!r || !isFinite(amount)) return null;
      return (amount / r) * 1e8;
    },
    /* Convert a USD amount to satoshis (base currency of all item prices). */
    usdToSats: function (usdAmount) { return API.toSats(usdAmount, "USD"); },
    fmtSats: fmtSats,
    fmtBTC: fmtBTC,
    fmtFiat: fmtFiat,
    fmtNum: fmtNum,
    onUpdate: function (fn) { listeners.push(fn); if (API.ready()) fn(); },
    load: load
  };

  global.Sats = API;

  /* ---------- theme ---------- */
  function initTheme() {
    var KEY = "btc_grocery_theme";
    var tb = document.getElementById("themeToggle");
    var ic = document.getElementById("themeIcon");
    var tx = document.getElementById("themeText");
    function apply(th) {
      document.documentElement.setAttribute("data-theme", th);
      var dark = th === "dark";
      if (ic) ic.textContent = dark ? "☀️" : "🌙";
      if (tx) tx.textContent = dark ? "Light mode" : "Dark mode";
      var m = document.querySelector('meta[name="theme-color"]');
      if (m) m.setAttribute("content", dark ? "#18191a" : "#1877f2");
    }
    var s = null;
    try { s = localStorage.getItem(KEY); } catch (e) {}
    if (!s) s = (global.matchMedia && global.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light";
    apply(s);
    if (tb) tb.addEventListener("click", function () {
      var n = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      apply(n);
      try { localStorage.setItem(KEY, n); } catch (e) {}
    });
  }

  /* ---------- single-item widget ---------- */
  function initWidget() {
    var amt = document.getElementById("wAmount");
    if (!amt) return;
    var cur = document.getElementById("wCur"),
        satsEl = document.getElementById("wSats"),
        btcEl = document.getElementById("wBtc"),
        metaEl = document.getElementById("wMeta"),
        symEl = document.getElementById("wSym");

    function draw() {
      var code = cur ? cur.value : "USD";
      var m = CUR[code] || CUR.USD;
      if (symEl) symEl.textContent = m.sym;
      var r = API.rate(code);
      var a = parseFloat(amt.value) || 0;
      if (!r) { satsEl.textContent = "… sats"; if (btcEl) btcEl.textContent = ""; return; }
      var sats = API.toSats(a, code);
      satsEl.textContent = fmtSats(sats) + " sats";
      if (btcEl) btcEl.textContent = "= " + fmtBTC(sats / 1e8) + " BTC";
      if (metaEl) metaEl.textContent = "1 BTC = " + fmtFiat(r, code) + " · live via " + (sourceName || "…");
    }
    amt.addEventListener("input", draw);
    if (cur) cur.addEventListener("change", function () {
      if (!API.rate(cur.value)) { load().then(draw).catch(function(){}); } else draw();
    });
    API.onUpdate(draw);
    if (metaEl && !API.ready()) metaEl.textContent = "Loading live Bitcoin price…";
  }

  /* ---------- elements that just display a computed sats figure ----------
     <span data-sats-usd="2.50"></span>  ->  "2,500 sats"
     <span data-sats-cur="INR" data-sats-amt="450"></span>
     <span data-btc-price="USD"></span>  ->  "$100,000.00"
     <span data-updated></span>          ->  real fetch time, not a hardcoded date
  */
  function initAutoFields() {
    function paint() {
      document.querySelectorAll("[data-sats-usd]").forEach(function (el) {
        var v = parseFloat(el.getAttribute("data-sats-usd"));
        var s = API.usdToSats(v);
        el.textContent = s == null ? "…" : fmtSats(s) + " sats";
      });
      document.querySelectorAll("[data-sats-amt]").forEach(function (el) {
        var code = el.getAttribute("data-sats-cur") || "USD";
        var v = parseFloat(el.getAttribute("data-sats-amt"));
        var s = API.toSats(v, code);
        el.textContent = s == null ? "…" : fmtSats(s) + " sats";
      });
      document.querySelectorAll("[data-btc-price]").forEach(function (el) {
        var code = el.getAttribute("data-btc-price") || "USD";
        var r = API.rate(code);
        el.textContent = r == null ? "…" : fmtFiat(r, code);
      });
      document.querySelectorAll("[data-updated]").forEach(function (el) {
        var d = API.updatedAt();
        el.textContent = d ? d.toLocaleString(undefined, {
          year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit"
        }) : "…";
      });
      document.querySelectorAll("[data-source]").forEach(function (el) {
        el.textContent = sourceName || "…";
      });
      document.querySelectorAll("[data-change]").forEach(function (el) {
        var c = API.change();
        if (typeof c !== "number") { el.textContent = ""; return; }
        el.textContent = (c >= 0 ? "+" : "") + c.toFixed(2) + "%";
        el.style.color = c >= 0 ? "var(--green)" : "var(--red)";
      });
    }
    API.onUpdate(paint);
    paint();
  }

  /* ---------- live basket total (the Sats Grocery Index) ---------- */
  function initBasket() {
    var box = document.getElementById("basketTotal");
    if (!box) return;
    var rows = [].slice.call(document.querySelectorAll("[data-basket-usd]"));
    function paint() {
      var totalUSD = 0;
      rows.forEach(function (el) {
        var v = parseFloat(el.getAttribute("data-basket-usd"));
        if (isFinite(v)) totalUSD += v;
        var s = API.usdToSats(v);
        var cell = el.querySelector("[data-basket-sats]");
        if (cell) cell.textContent = s == null ? "…" : fmtSats(s) + " sats";
      });
      var ts = API.usdToSats(totalUSD);
      box.textContent = ts == null ? "… sats" : fmtSats(ts) + " sats";
      var sub = document.getElementById("basketSub");
      if (sub) {
        var u = API.usd();
        sub.textContent = u
          ? "for a $" + fmtNum(totalUSD, 2) + " basket · 1 BTC = " + fmtFiat(u, "USD")
          : "waiting for a live price…";
      }
    }
    API.onUpdate(paint);
    paint();
  }

  /* ---------- halving countdown ----------
     Target: block 1,050,000, expected mid-April 2028. Genuinely dynamic:
     it ticks every second and needs no maintenance. */
  function initHalving() {
    var box = document.getElementById("halvingCountdown");
    if (!box) return;
    var TARGET = new Date(Date.UTC(2028, 3, 17, 0, 0, 0)); // 17 April 2028
    function tick() {
      var now = new Date();
      var ms = TARGET - now;
      if (ms < 0) ms = 0;
      var d = Math.floor(ms / 86400000);
      var h = Math.floor((ms % 86400000) / 3600000);
      var m = Math.floor((ms % 3600000) / 60000);
      var s = Math.floor((ms % 60000) / 1000);
      var ids = ["hvD", "hvH", "hvM", "hvS"], vals = [d, h, m, s];
      ids.forEach(function (id, i) {
        var el = document.getElementById(id);
        if (el) el.textContent = vals[i];
      });
    }
    tick();
    setInterval(tick, 1000);
  }

  function boot() {
    initTheme();
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
    initWidget();
    initAutoFields();
    initBasket();
    initHalving();
    load().catch(function () {
      document.querySelectorAll("[data-updated]").forEach(function (el) {
        el.textContent = "live price unavailable";
      });
    });
    setInterval(function () { load().catch(function () {}); }, 60000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})(typeof window !== "undefined" ? window : this);
