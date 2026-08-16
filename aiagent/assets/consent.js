/*
  Satmeter — lightweight GDPR/consent banner for AdSense.
  ---------------------------------------------------------------
  What this does:
  - Shows a banner on first visit (EU law requires consent BEFORE
    non-essential cookies/ads are allowed to run).
  - Talks to Google's Consent Mode v2 signals (ad_storage,
    ad_user_data, ad_personalization, analytics_storage) so AdSense
    knows whether it may personalise / use cookies.
  - Remembers the choice in localStorage so the banner only shows once
    (re-asks after 180 days, or if you bump CONSENT_VERSION below).
  - Cloudflare Web Analytics is cookieless and runs regardless — it
    does not need consent, see privacy.html section 5.

  Honest limitation: this is a lightweight custom banner, not an
  IAB TCF-certified CMP. For most small/solo sites and Google's
  baseline AdSense requirement this is sufficient. If you later scale
  up and want the fully certified route, swap this for Cookiebot's or
  Google Funding Choices' free tier — same consent-mode hooks apply.
  ---------------------------------------------------------------
*/
(function () {
  "use strict";

  var CONSENT_KEY = "sm_consent_v1";
  var CONSENT_VERSION = 1;
  var RENEW_AFTER_DAYS = 180;

  function readConsent() {
    try {
      var raw = localStorage.getItem(CONSENT_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (data.v !== CONSENT_VERSION) return null;
      var ageDays = (Date.now() - data.t) / 86400000;
      if (ageDays > RENEW_AFTER_DAYS) return null;
      return data;
    } catch (e) {
      return null;
    }
  }

  function writeConsent(choice) {
    try {
      localStorage.setItem(
        CONSENT_KEY,
        JSON.stringify({ v: CONSENT_VERSION, t: Date.now(), choice: choice })
      );
    } catch (e) {}
  }

  function applyConsent(choice) {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    if (choice === "accept") {
      gtag("consent", "update", {
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
        analytics_storage: "granted",
      });
    } else {
      gtag("consent", "update", {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "denied",
      });
    }
  }

  function injectStyles() {
    if (document.getElementById("sm-consent-style")) return;
    var css = [
      "#sm-consent{position:fixed;left:0;right:0;bottom:0;z-index:9999;",
      "display:flex;justify-content:center;padding:14px;",
      "font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;}",
      "#sm-consent .sm-box{max-width:820px;width:100%;background:var(--surface,#fff);",
      "border:1px solid var(--border,#dfe3e8);border-radius:var(--radius,14px);",
      "box-shadow:var(--shadow-lg,0 8px 24px rgba(0,0,0,.18));padding:16px 18px;",
      "display:flex;gap:14px;align-items:center;flex-wrap:wrap;color:var(--text,#050505);}",
      "#sm-consent p{margin:0;font-size:13.5px;line-height:1.5;color:var(--text-2,#3a3b3c);flex:1 1 320px;}",
      "#sm-consent a{color:var(--blue,#1877f2);text-decoration:none;font-weight:600;}",
      "#sm-consent a:hover{text-decoration:underline;}",
      "#sm-consent .sm-actions{display:flex;gap:8px;flex:0 0 auto;}",
      "#sm-consent button{font-family:inherit;font-size:13px;font-weight:700;border-radius:999px;",
      "padding:9px 18px;cursor:pointer;border:1.5px solid transparent;transition:transform .12s ease;}",
      "#sm-consent button:hover{transform:translateY(-1px);}",
      "#sm-consent .sm-accept{background:var(--blue,#1877f2);color:#fff;}",
      "#sm-consent .sm-reject{background:transparent;border-color:var(--border,#dfe3e8);color:var(--text,#050505);}",
      "@media (max-width:520px){#sm-consent .sm-box{flex-direction:column;align-items:stretch;}",
      "#sm-consent .sm-actions{justify-content:flex-end;}}",
    ].join("");
    var style = document.createElement("style");
    style.id = "sm-consent-style";
    style.textContent = css;
    document.head.appendChild(style);
  }

  function showBanner() {
    injectStyles();
    var wrap = document.createElement("div");
    wrap.id = "sm-consent";
    wrap.setAttribute("role", "dialog");
    wrap.setAttribute("aria-label", "Cookie consent");
    wrap.innerHTML =
      '<div class="sm-box">' +
      "<p>Satmeter uses cookieless analytics by default. If you accept, we also allow Google AdSense to " +
      "use cookies for ads and, where applicable, ad personalisation. See our " +
      '<a href="https://satmeter.io/privacy.html" target="_blank" rel="noopener">' +
      "privacy policy</a> for details.</p>" +
      '<div class="sm-actions">' +
      '<button type="button" class="sm-reject" id="sm-consent-reject">Reject non-essential</button>' +
      '<button type="button" class="sm-accept" id="sm-consent-accept">Accept</button>' +
      "</div></div>";
    document.body.appendChild(wrap);

    document.getElementById("sm-consent-accept").addEventListener("click", function () {
      writeConsent("accept");
      applyConsent("accept");
      wrap.remove();
    });
    document.getElementById("sm-consent-reject").addEventListener("click", function () {
      writeConsent("reject");
      applyConsent("reject");
      wrap.remove();
    });
  }

  function boot() {
    var existing = readConsent();
    if (existing) {
      applyConsent(existing.choice);
      return;
    }
    if (document.body) {
      showBanner();
    } else {
      document.addEventListener("DOMContentLoaded", showBanner);
    }
  }

  boot();
})();
