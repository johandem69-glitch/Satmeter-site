# tools.satmeter.io

Gratis Bitcoin-rekentools. Static site, geen build-stap — elk bestand wordt
zo als het is geserveerd, precies zoals satmeter.io zelf werkt.

## Wat dit is

4 losse rekentools plus een hub-pagina, allemaal in dezelfde stijl als
satmeter.io (zelfde `site.css`-tokens, zelfde live-prijsmotor `sats.js`):

- `index.html` — overzichtspagina met links naar de 4 tools
- `sats-naar-euro.html` — satoshi's ↔ euro, live koers
- `bitcoin-naar-fiat.html` — BTC → EUR/USD/GBP/CAD/AUD, live koers
- `bitcoin-vs-hypotheek.html` — extra aflossen vs. Bitcoin, met eigen aannames
- `rente-op-rente-dca.html` — rente-op-rente calculator, eindwaarde ook in sats

Elke pagina heeft minstens twee zichtbare links terug naar `satmeter.io`
(topbalk + een call-to-action-blok), zodat verkeer hier ook satmeter.io
bereikt — dat was het hele doel van dit sub-project.

## Belangrijk: dit gaat NIET via een nieuwe repo of nieuwe Git-koppeling

Eerder dachten we dat `tools.satmeter.io` zijn eigen GitHub-repo en eigen
Hostinger Git-koppeling nodig had. Dat bleek niet zo te zijn: in hPanel
(Domeinen → Subdomeinen) staat dat `tools.satmeter.io` gewoon wijst naar
de map `public_html/tools` — een submap van dezelfde `satmeter.io`-hosting.
Er is maar één Git-koppeling per hostingaccount mogelijk, en die bestaat al
(`Satmeter-site` → `public_html`).

**Dus:** de inhoud van deze zip moet in een nieuwe submap `tools/` terecht-
komen, ín je bestaande `Documents\GitHub\Satmeter-site`-map — niet in een
nieuwe, aparte map. Zie `docs/STATUS.md` voor de exacte stappen.

## Een wijziging doorvoeren

1. Bestand aanpassen in `Documents\GitHub\Satmeter-site\tools\`
2. GitHub Desktop: Summary invullen → **Commit to main** → **Push origin**
3. Automatische implementatie staat al aan voor satmeter.io, dus dit deployt
   vanzelf. Zie je 'm nog niet live? hPanel → GIT → **Herimplementeren**.

Wijzig je iets in `assets/site.css`, `assets/sats.js` of
`assets/tools-extra.css`? Verhoog dan `?v=1` naar `?v=2` in alle
`.html`-bestanden die dat bestand laden (zoek-en-vervang), anders zien
terugkerende bezoekers de wijziging een maand lang niet.

## Structuur

Alles hieronder komt in `Documents\GitHub\Satmeter-site\tools\` te staan
(dus met een extra `tools/` ervoor ten opzichte van deze lijst):

```
index.html                 Hub-pagina met de 4 tools
sats-naar-euro.html        Converter
bitcoin-naar-fiat.html     Converter
bitcoin-vs-hypotheek.html  Calculator
rente-op-rente-dca.html    Calculator
privacy.html, terms.html   Verplicht voor AdSense-goedkeuring
assets/site.css            Herbruikt 1-op-1 van satmeter.io (zelfde look)
assets/sats.js             Herbruikt 1-op-1 van satmeter.io (live-prijsmotor)
assets/consent.js          Herbruikt 1-op-1 van satmeter.io (cookiebanner)
assets/tools-extra.css     Extra stijlen specifiek voor de rekentools
robots.txt, sitemap.xml, ads.txt, .htaccess   Zelfde patroon als satmeter.io
docs/STATUS.md             Waar dit sub-project staat en wat nog moet gebeuren
```
