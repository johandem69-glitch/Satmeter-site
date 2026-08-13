/* Satmeter — site-wide hardware wallet affiliate module.
 *
 * Injects two placements on every page that includes this file:
 *   1. An in-content recommendation card (mobile + desktop)
 *   2. A compact card in the left ad-rail (desktop only)
 *
 * Every link carries rel="nofollow sponsored noopener" and every placement
 * carries a visible affiliate disclosure, per FTC and AdSense guidance.
 *
 * ---------------------------------------------------------------------------
 * EDIT ONLY THE CONFIG BLOCK BELOW.
 * ---------------------------------------------------------------------------
 */
(function () {
  "use strict";

  /* ========================= CONFIG ========================= */

  /* --- BitBox (Shift Crypto, Switzerland) — referral code rldjkhmt --- */
  var BITBOX = "https://shop.bitbox.swiss/?ref=rldjkhmt";

  /* --- Trezor (SatoshiLabs) — aff_id 846530. Confirmed offer mapping:
         137 = Trezor Shop, general store
         238 = Trezor Safe 5, Bitcoin-only edition
         237 = Trezor Keep Metal 20, single-share seed backup plate
         389 = EXTRA10 promo (may expire — check before using)
         133 / 352 = older links, unused                             --- */
  var TZ = "https://affil.trezor.io/aff_c?aff_id=846530&source=satmeter.io&offer_id=";
  var TREZOR = TZ + "238";        /* headline product */
  var TREZOR_STORE = TZ + "137";  /* generic store */
  var TREZOR_METAL = TZ + "237";  /* seed backup plate */

  /* --- Product photos (optional) ---------------------------------------
     Leave both as "" to render fast, text-only cards.

     To add photos: download the affiliate creatives, resize them to about
     600px on the long edge, save them into /assets/, and put the filenames
     here. Do NOT hotlink the originals from the affiliate CDN — they are
     3000x4000px and several megabytes, which would wreck page speed.

     Example:  var IMG_BITBOX = "bitbox02.jpg";                          */
  var IMG_BITBOX = "";
  var IMG_TREZOR = "";

  /* ======================= END CONFIG ======================= */

  if (document.getElementById("sm-aff-style")) return;

  var REL = 'rel="nofollow sponsored noopener" target="_blank"';

  var path = location.pathname;
  var inArticles = /\/articles\//.test(path);
  var isSpanish = /^\/es\//.test(path);
  var isWalletPage = /where-to-store-your-sats/.test(path);

  var toRoot = inArticles ? "../" : "";
  if (isSpanish) toRoot = inArticles ? "../../" : "../";

  function assetUrl(file) {
    return file ? toRoot + "assets/" + file : "";
  }

  function walletGuideUrl() {
    return toRoot + (isSpanish ? "es/articles/" : "articles/") +
           "where-to-store-your-sats.html";
  }

  var L = isSpanish ? {
    heading: "No dejes tus sats en un exchange",
    intro: "Ya sabes cuánto valen tus compras en sats. La siguiente pregunta es dónde guardarlos. Un monedero de hardware mantiene tus claves fuera de internet.",
    bbName: "BitBox02",
    bbTag: "Solo-Bitcoin · Suizo",
    bbDesc: "Código abierto y la configuración más simple de las dos. Buena primera opción.",
    bbPrice: "desde ~120 €",
    tzName: "Trezor Safe 5",
    tzTag: "Solo-Bitcoin · Pantalla táctil",
    tzDesc: "Del fabricante original, desde 2014. Historial más largo del sector.",
    tzPrice: "desde ~80 €",
    shop: "Ver precio",
    metal: "Respalda tu frase semilla en metal, no en papel",
    guide: "Leer la guía completa de custodia propia",
    disclosure: "Enlaces de afiliado. Si compras a través de ellos ganamos una comisión, sin coste extra para ti. Solo enlazamos monederos que recomendaríamos igualmente.",
    railHeading: "¿Dónde guardas tus sats?",
    railText: "Los dos monederos de hardware que de verdad recomendamos, comparados con honestidad.",
    railCta: "Ver la guía",
    railNote: "Enlaces de afiliado. Sin coste extra para ti."
  } : {
    heading: "Don't leave your sats on an exchange",
    intro: "You know what your spending is worth in sats. The next question is where to keep it. A hardware wallet keeps your keys off the internet and out of reach.",
    bbName: "BitBox02",
    bbTag: "Bitcoin-only · Swiss-made",
    bbDesc: "Open source, and the simpler setup of the two. A solid first wallet.",
    bbPrice: "from ~€120",
    tzName: "Trezor Safe 5",
    tzTag: "Bitcoin-only · Touchscreen",
    tzDesc: "From the original manufacturer, since 2014. Longest track record in the field.",
    tzPrice: "from ~€80",
    shop: "Check price",
    metal: "Back up your seed phrase on metal, not paper",
    guide: "Read the full self-custody guide",
    disclosure: "Affiliate links. If you buy through them we earn a commission, at no extra cost to you. We only link wallets we would recommend anyway.",
    railHeading: "Where do your sats live?",
    railText: "The two hardware wallets we'd actually recommend, compared honestly.",
    railCta: "Read the guide",
    railNote: "Affiliate links. No extra cost to you."
  };

  function injectStyles() {
    var css =
      '.sm-aff{border:1px solid var(--border);border-radius:16px;' +
      'background:var(--surface);padding:20px;margin:30px 0;}' +
      '.sm-aff-h{font-size:1.15rem;font-weight:700;margin:0 0 8px;' +
      'color:var(--text);line-height:1.3;}' +
      '.sm-aff-p{margin:0 0 16px;color:var(--muted);font-size:.95rem;' +
      'line-height:1.6;}' +
      '.sm-aff-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}' +
      '@media (max-width:600px){.sm-aff-grid{grid-template-columns:1fr;}}' +
      '.sm-aff-card{position:relative;border:1px solid var(--border);' +
      'border-radius:12px;background:var(--surface-2);padding:15px;' +
      'display:flex;flex-direction:column;min-width:0;}' +
      '.sm-aff-card img{width:100%;height:130px;object-fit:contain;' +
      'border-radius:8px;background:#fff;margin-bottom:12px;}' +
      '.sm-aff-name{font-weight:700;font-size:1.02rem;color:var(--text);' +
      'line-height:1.25;}' +
      '.sm-aff-tag{font-size:.72rem;font-weight:700;letter-spacing:.04em;' +
      'text-transform:uppercase;color:var(--orange-deep,#c9740c);' +
      'margin:5px 0 8px;}' +
      '.sm-aff-d{font-size:.86rem;color:var(--muted);line-height:1.55;' +
      'margin-bottom:14px;flex:1;}' +
      '.sm-aff-btn{display:flex;align-items:center;justify-content:center;' +
      'gap:8px;text-align:center;text-decoration:none;padding:11px 14px;' +
      'border-radius:10px;font-weight:700;font-size:.9rem;' +
      'background:var(--orange,#f7931a);color:#151515;border:none;' +
      'transition:filter .15s ease,transform .15s ease;}' +
      '.sm-aff-btn:hover{filter:brightness(1.07);transform:translateY(-1px);}' +
      '.sm-aff-btn:active{transform:translateY(0);}' +
      '.sm-aff-price{font-weight:600;font-size:.82rem;opacity:.72;}' +
      '.sm-aff-metal{margin:15px 0 0;font-size:.88rem;line-height:1.5;}' +
      '.sm-aff-metal a{color:var(--text);text-decoration:underline;' +
      'text-decoration-color:var(--border);text-underline-offset:3px;}' +
      '.sm-aff-metal a:hover{text-decoration-color:var(--orange,#f7931a);}' +
      '.sm-aff-guide{display:inline-block;margin-top:13px;font-size:.9rem;' +
      'font-weight:600;color:var(--blue,#1877f2);text-decoration:none;}' +
      '.sm-aff-guide:hover{text-decoration:underline;}' +
      '.sm-aff-foot{margin:16px 0 0;font-size:.74rem;color:var(--muted);' +
      'line-height:1.5;}' +
      /* --- rail placement (desktop) --- */
      '.sm-aff-rail{border:1px solid var(--border);border-radius:14px;' +
      'background:var(--surface);padding:15px;margin-bottom:18px;}' +
      '.sm-aff-rail img{width:100%;height:120px;object-fit:contain;' +
      'border-radius:8px;background:#fff;margin-bottom:11px;}' +
      '.sm-aff-rail-h{font-weight:700;font-size:.95rem;color:var(--text);' +
      'margin-bottom:6px;line-height:1.3;}' +
      '.sm-aff-rail-p{font-size:.8rem;color:var(--muted);line-height:1.5;' +
      'margin-bottom:11px;}' +
      '.sm-aff-rail .sm-aff-btn{font-size:.85rem;padding:9px 12px;' +
      'background:var(--blue,#1877f2);color:#fff;}' +
      '.sm-aff-rail-links{margin:10px 0 0;font-size:.78rem;line-height:1.7;}' +
      '.sm-aff-rail-links a{color:var(--text);text-decoration:none;' +
      'border-bottom:1px solid var(--border);}' +
      '.sm-aff-rail-links a:hover{border-bottom-color:var(--orange,#f7931a);}' +
      '.sm-aff-rail-note{margin:10px 0 0;font-size:.66rem;color:var(--muted);' +
      'line-height:1.45;}';

    var s = document.createElement("style");
    s.id = "sm-aff-style";
    s.textContent = css;
    document.head.appendChild(s);
  }

  function productCard(name, tag, desc, price, url, img) {
    var picture = "";
    if (img) {
      picture = '<a href="' + url + '" ' + REL + ' tabindex="-1" aria-hidden="true">' +
                '<img src="' + assetUrl(img) + '" alt="' + name + '" ' +
                'loading="lazy" decoding="async" width="600" height="400"></a>';
    }
    return '<div class="sm-aff-card">' +
             picture +
             '<div class="sm-aff-name">' + name + '</div>' +
             '<div class="sm-aff-tag">' + tag + '</div>' +
             '<div class="sm-aff-d">' + desc + '</div>' +
             '<a class="sm-aff-btn" href="' + url + '" ' + REL + '>' +
               '<span>' + L.shop + '</span>' +
               '<span class="sm-aff-price">' + price + '</span>' +
             '</a>' +
           '</div>';
  }

  function buildInContent() {
    var el = document.createElement("aside");
    el.className = "sm-aff";
    el.setAttribute("aria-label", "Hardware wallet recommendations");
    el.innerHTML =
      '<p class="sm-aff-h">&#128274; ' + L.heading + '</p>' +
      '<p class="sm-aff-p">' + L.intro + '</p>' +
      '<div class="sm-aff-grid">' +
        productCard(L.bbName, L.bbTag, L.bbDesc, L.bbPrice, BITBOX, IMG_BITBOX) +
        productCard(L.tzName, L.tzTag, L.tzDesc, L.tzPrice, TREZOR, IMG_TREZOR) +
      '</div>' +
      '<p class="sm-aff-metal">&#128737;&#65039; <a href="' + TREZOR_METAL + '" ' + REL + '>' +
        L.metal + '</a></p>' +
      (isWalletPage ? '' :
        '<a class="sm-aff-guide" href="' + walletGuideUrl() + '">' +
        L.guide + ' &rarr;</a>') +
      '<p class="sm-aff-foot">' + L.disclosure + '</p>';
    return el;
  }

  function buildRail() {
    var el = document.createElement("div");
    el.className = "sm-aff-rail";
    el.innerHTML =
      '<div class="sm-aff-rail-h">' + L.railHeading + '</div>' +
      '<div class="sm-aff-rail-p">' + L.railText + '</div>' +
      '<a class="sm-aff-btn" href="' + walletGuideUrl() + '">' +
        L.railCta + ' &rarr;</a>' +
      '<p class="sm-aff-rail-links">' +
        '<a href="' + BITBOX + '" ' + REL + '>' + L.bbName + '</a><br>' +
        '<a href="' + TREZOR_STORE + '" ' + REL + '>Trezor</a>' +
      '</p>' +
      '<p class="sm-aff-rail-note">' + L.railNote + '</p>';
    return el;
  }

  function placeInContent() {
    var anchor = document.querySelector(".related") ||
                 document.querySelector(".ad-banner") ||
                 document.querySelector("article > footer") ||
                 document.querySelector("footer");
    if (anchor && anchor.parentNode) {
      anchor.parentNode.insertBefore(buildInContent(), anchor);
    }
  }

  function placeRail() {
    var rail = document.querySelector(".ad-rail .ad-sticky");
    if (!rail) return;
    rail.insertBefore(buildRail(), rail.firstChild);
  }

  function boot() {
    injectStyles();
    placeInContent();
    placeRail();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
