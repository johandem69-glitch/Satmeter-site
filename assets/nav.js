/*
  Satmeter — shared mobile navigation drawer.
  ---------------------------------------------------------------
  Injects a hamburger button into the existing .topbar and a
  slide-in drawer listing every guide, so a mobile visitor can jump
  straight to what they want instead of scrolling through a long
  article to find it. Works on every page that includes this script
  (root pages and /articles/*), and figures out the correct relative
  path prefix on its own based on the current URL depth.
  ---------------------------------------------------------------
*/
(function () {
  "use strict";

  // ---- Work out where we are, so every link below resolves correctly ----
  var path = location.pathname;
  var inArticles = /\/articles\//.test(path);
  var inEs = /^\/es\//.test(path);
  // Prefix to reach the SITE ROOT (where about.html, assets/ etc live)
  var toRoot = inArticles ? "../" : "";
  if (inEs) toRoot = inArticles ? "../../" : "../";

  var isSpanish = inEs;

  var L = isSpanish
    ? {
        menu: "Menú",
        close: "Cerrar",
        home: "Conversor",
        guides: "Guías",
        wallet: "Dónde guardar tus sats",
        groups: [
          {
            title: "Custodia propia",
            items: [
              ["Dónde Guardar Tus Sats", "where-to-store-your-sats.html"],
            ],
          },
          {
            title: "Índices en vivo",
            items: [
              ["La Compra en Bitcoin (Argentina)", "groceries-in-bitcoin-argentina.html"],
            ],
          },
        ],
        footerLinks: [
          ["Acerca de", "about.html"],
          ["Contacto", "contact.html"],
          ["Privacidad", "privacy.html"],
          ["Términos", "terms.html"],
        ],
      }
    : {
        menu: "Menu",
        close: "Close",
        home: "Converter",
        guides: "All guides",
        wallet: "Where to store your sats",
        groups: [
          {
            title: "Live indexes",
            items: [
              ["The Sats Grocery Index", "sats-grocery-index.html"],
              ["How Many Sats Is One Dollar?", "sats-per-dollar-today.html"],
            ],
          },
          {
            title: "Everyday items",
            items: [
              ["The Bitcoin Big Mac Index", "bitcoin-big-mac-index.html"],
              ["How Many Sats Is a Coffee?", "how-many-sats-is-a-coffee.html"],
              ["How Many Sats Is a Loaf of Bread?", "how-many-sats-is-a-loaf-of-bread.html"],
              ["How Many Sats Is a Dozen Eggs?", "how-many-sats-is-a-dozen-eggs.html"],
              ["How Many Sats Is a Gallon of Gas?", "how-many-sats-is-a-gallon-of-gas.html"],
              ["How Many Sats Is a Beer?", "how-many-sats-is-a-beer.html"],
              ["How Many Sats Is a Cinema Ticket?", "how-many-sats-is-a-cinema-ticket.html"],
            ],
          },
          {
            title: "Self custody",
            items: [["Where to Store Your Sats", "where-to-store-your-sats.html"]],
          },
          {
            title: "Subscriptions & bills",
            items: [
              ["What Netflix Costs in Satoshis", "netflix-in-satoshis.html"],
              ["A Monthly Phone Plan in Satoshis", "monthly-phone-plan-in-satoshis.html"],
            ],
          },
          {
            title: "Country guides",
            items: [
              ["Groceries in Bitcoin: United States", "groceries-in-bitcoin-united-states.html"],
              ["Groceries in Bitcoin: Nigeria", "groceries-in-bitcoin-nigeria.html"],
              ["Groceries in Bitcoin: Argentina", "groceries-in-bitcoin-argentina.html"],
              ["Groceries in Bitcoin: Turkey", "groceries-in-bitcoin-turkey.html"],
              ["Groceries in Bitcoin: India", "groceries-in-bitcoin-india.html"],
            ],
          },
          {
            title: "Understanding sats",
            items: [
              ["What Is a Satoshi?", "what-is-a-satoshi.html"],
              ["How to Think in Sats", "how-to-think-in-sats.html"],
              ["Bitcoin vs Inflation", "bitcoin-vs-inflation-groceries.html"],
              ["Bitcoin Halving Countdown", "bitcoin-halving-countdown-grocery-prices.html"],
            ],
          },
        ],
        footerLinks: [
          ["About", "about.html"],
          ["Contact", "contact.html"],
          ["Privacy", "privacy.html"],
          ["Terms", "terms.html"],
        ],
      };

  function articleUrl(file) {
    return toRoot + (inEs ? "es/articles/" : "articles/") + file;
  }
  function rootUrl(file) {
    return toRoot + file;
  }
  function homeUrl() {
    // The home page for the current language always sits exactly one
    // directory above its own articles/ folder, so this never needs
    // the site-root prefix.
    return inArticles ? "../index.html" : "index.html";
  }

  function injectStyles() {
    if (document.getElementById("sm-nav-style")) return;
    var css = [
      ".sm-hamburger{display:none;align-items:center;justify-content:center;",
      "width:38px;height:38px;border-radius:999px;background:var(--surface,#fff);",
      "border:1px solid var(--border,#dfe3e8);cursor:pointer;margin-left:auto;order:99;}",
      "@media (max-width:900px){.sm-hamburger{display:inline-flex;}}",

      /* ---- Mobile layout hardening -------------------------------------
         These rules live here rather than in site.css for two reasons:
         this file is injected at runtime so it always lands last in the
         cascade (beating the inline styles on index.html), and it is a new
         file, so visitors holding a long-cached site.css still get the fix. */

      /* The hamburger adds 38px to the topbar. Combined with longer labels
         in Spanish that pushed the row past a phone viewport and the whole
         page shifted sideways. The drawer already carries a Converter link,
         so the topbar one is redundant once the hamburger is showing. */
      "@media (max-width:560px){.topbar .back-link{display:none;}}",
      "@media (max-width:900px){.topbar{flex-wrap:wrap;}.topbar>*{min-width:0;}}",

      /* Comparison tables must divide the available width instead of growing
         to fit their content. Never use display:block here: that silently
         disables table-layout:fixed and the overflow comes straight back. */
      "@media (max-width:700px){",
      "article table{table-layout:fixed;width:100%;font-size:12.5px;display:table;}",
      "article th,article td{padding:8px 8px;overflow-wrap:break-word;hyphens:auto;}",
      "article th:first-child,article td:first-child{width:32%;}",
      "}",

      /* Empty ad containers must render as nothing. They stay in the markup
         only as placement anchors. Visible empty dashed boxes make the site
         look unfinished, a known reason for AdSense to reject a review. */
      ".ad-banner:empty,.ad-box:empty{display:none;}",
      /* ------------------------------------------------------------------ */

      ".sm-hamburger span{display:block;width:16px;height:2px;background:var(--text,#050505);",
      "position:relative;}",
      ".sm-hamburger span::before,.sm-hamburger span::after{content:'';position:absolute;left:0;",
      "width:16px;height:2px;background:var(--text,#050505);}",
      ".sm-hamburger span::before{top:-5px;} .sm-hamburger span::after{top:5px;}",
      "#sm-nav-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:10000;",
      "opacity:0;pointer-events:none;transition:opacity .2s ease;}",
      "#sm-nav-backdrop.open{opacity:1;pointer-events:auto;}",
      "#sm-nav-drawer{position:fixed;top:0;right:0;bottom:0;width:min(320px,86vw);",
      "background:var(--surface,#fff);z-index:10001;transform:translateX(100%);",
      "transition:transform .25s ease;overflow-y:auto;padding:20px 18px 40px;",
      "box-shadow:-8px 0 24px rgba(0,0,0,.2);font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;}",
      "#sm-nav-drawer.open{transform:translateX(0);}",
      "#sm-nav-drawer .sm-nav-head{display:flex;align-items:center;justify-content:space-between;",
      "margin-bottom:16px;}",
      "#sm-nav-drawer .sm-nav-head h2{font-size:16px;margin:0;color:var(--text,#050505);}",
      "#sm-nav-drawer .sm-nav-close{background:var(--surface-2,#f0f2f5);border:none;",
      "width:30px;height:30px;border-radius:999px;font-size:16px;cursor:pointer;color:var(--text,#050505);}",
      "#sm-nav-drawer a.sm-nav-home{display:block;background:var(--blue,#1877f2);color:#fff;",
      "text-decoration:none;text-align:center;padding:11px;border-radius:10px;font-weight:700;",
      "font-size:14px;margin-bottom:16px;}",
      "#sm-nav-drawer a.sm-nav-wallet{display:block;background:var(--orange-soft,#fff3e0);",
      "color:var(--orange-deep,#e07d05);text-decoration:none;text-align:center;padding:10px;",
      "border-radius:10px;font-weight:700;font-size:13px;margin-bottom:18px;border:1px solid var(--orange,#f7931a);}",
      "#sm-nav-drawer h3{font-size:11px;text-transform:uppercase;letter-spacing:.05em;",
      "color:var(--muted,#65676b);margin:18px 0 8px;}",
      "#sm-nav-drawer ul{list-style:none;margin:0;padding:0;}",
      "#sm-nav-drawer li{margin-bottom:2px;}",
      "#sm-nav-drawer li a{display:block;padding:8px 6px;border-radius:8px;text-decoration:none;",
      "color:var(--text-2,#3a3b3c);font-size:13.5px;}",
      "#sm-nav-drawer li a:hover, #sm-nav-drawer li a:active{background:var(--surface-2,#f0f2f5);color:var(--text,#050505);}",
      "#sm-nav-drawer .sm-nav-footer{margin-top:20px;padding-top:14px;border-top:1px solid var(--border,#dfe3e8);",
      "display:flex;flex-wrap:wrap;gap:10px;font-size:12px;}",
      "#sm-nav-drawer .sm-nav-footer a{color:var(--muted,#65676b);text-decoration:none;}",
      "body.sm-nav-locked{overflow:hidden;}",
    ].join("");
    var style = document.createElement("style");
    style.id = "sm-nav-style";
    style.textContent = css;
    document.head.appendChild(style);
  }

  function buildDrawer() {
    var groupsHtml = L.groups
      .map(function (g) {
        var items = g.items
          .map(function (it) {
            return '<li><a href="' + articleUrl(it[1]) + '">' + it[0] + "</a></li>";
          })
          .join("");
        return "<h3>" + g.title + "</h3><ul>" + items + "</ul>";
      })
      .join("");

    var footerHtml = L.footerLinks
      .map(function (fl) {
        return '<a href="' + rootUrl(fl[1]) + '">' + fl[0] + "</a>";
      })
      .join("");

    var drawer = document.createElement("div");
    drawer.id = "sm-nav-drawer";
    drawer.setAttribute("role", "dialog");
    drawer.setAttribute("aria-label", L.menu);
    drawer.innerHTML =
      '<div class="sm-nav-head"><h2>' +
      L.menu +
      '</h2><button type="button" class="sm-nav-close" id="sm-nav-close" aria-label="' +
      L.close +
      '">&times;</button></div>' +
      '<a class="sm-nav-home" href="' +
      homeUrl() +
      '">&larr; ' +
      L.home +
      "</a>" +
      '<a class="sm-nav-wallet" href="' +
      articleUrl("where-to-store-your-sats.html") +
      '">\u{1F512} ' +
      L.wallet +
      "</a>" +
      groupsHtml +
      '<div class="sm-nav-footer">' +
      footerHtml +
      "</div>";

    var backdrop = document.createElement("div");
    backdrop.id = "sm-nav-backdrop";

    document.body.appendChild(backdrop);
    document.body.appendChild(drawer);

    function open() {
      backdrop.classList.add("open");
      drawer.classList.add("open");
      document.body.classList.add("sm-nav-locked");
    }
    function close() {
      backdrop.classList.remove("open");
      drawer.classList.remove("open");
      document.body.classList.remove("sm-nav-locked");
    }
    backdrop.addEventListener("click", close);
    document.getElementById("sm-nav-close").addEventListener("click", close);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });

    return { open: open, close: close };
  }

  function injectHamburger(controls) {
    var topbar = document.querySelector(".topbar");
    if (!topbar) return;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "sm-hamburger";
    btn.setAttribute("aria-label", L.menu);
    btn.innerHTML = "<span></span>";
    btn.addEventListener("click", controls.open);
    topbar.appendChild(btn);
  }

  function boot() {
    injectStyles();
    var controls = buildDrawer();
    injectHamburger(controls);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
