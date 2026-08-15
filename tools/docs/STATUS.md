# tools.satmeter.io — waar we staan

Laatst bijgewerkt: 15 augustus 2026

---

## Wat dit sub-project is

Op verzoek van Johan: nieuwe, simpele rekentools onder het satmeter.io-merk,
die zelf verkeer trekken (SEO op specifieke zoekwoorden als "sats naar euro"
of "bitcoin vs hypotheek") en dat verkeer vervolgens doorsturen naar
satmeter.io. Gekozen structuur: een apart subdomein, `tools.satmeter.io`.

4 tools + een hub-pagina, zie `README.md` voor de bestandenlijst. Elke
pagina linkt minstens twee keer terug naar `satmeter.io` (topbalk-knop +
een call-to-action-blok in de tekst).

## Vaste gegevens

| Wat | Waarde |
| --- | --- |
| AdSense publisher | `ca-pub-8258777689852315` (zelfde account als satmeter.io) |
| Hoofdsite | https://satmeter.io |
| GitHub-repo | https://github.com/johandem69-glitch/Satmeter-site (**dezelfde repo als satmeter.io**) |
| Lokale map | `Documents\GitHub\Satmeter-site\tools\` |
| Subdomein-documentroot | `/home/u326097585/domains/satmeter.io/public_html/tools` (bevestigd in hPanel → Domeinen → Subdomeinen) |

**Correctie 15 augustus, later op de dag:** eerder in dit document stond dat
`tools.satmeter.io` een eigen GitHub-repo en een eigen Hostinger
Git-koppeling nodig had. Dat bleek niet te kloppen — meegekeken op Johans
scherm in hPanel en gezien dat `tools.satmeter.io` gewoon wijst naar
`public_html/tools`, een submap van dezelfde hosting als satmeter.io. Er is
op dit hostingplan maar één Git-koppeling per account mogelijk (die van
`Satmeter-site` → `public_html`), en die bestaat al. Zie hieronder voor de
echte, veel kortere stappen.

---

## Live zetten — geen nieuwe infrastructuur nodig

1. In `Documents\GitHub\Satmeter-site` een nieuwe submap `tools` aanmaken
   (gewoon een lege map, rechtsklik → Nieuwe map → naam `tools`)
2. De meegeleverde zip uitpakken en de **inhoud** (niet de map zelf) naar
   die nieuwe `tools`-map slepen. Dus je krijgt
   `Documents\GitHub\Satmeter-site\tools\index.html`,
   `Documents\GitHub\Satmeter-site\tools\assets\`, enzovoort.
3. GitHub Desktop: Summary invullen (bijv. "tools.satmeter.io toegevoegd") →
   **Commit to main** → **Push origin**
4. Automatische implementatie staat al aan (te zien op het dashboard van
   satmeter.io in hPanel: groen vinkje "Automatische implementatie"), dus
   normaal deployt dit vanzelf na de push. Zie je na een paar minuten nog
   niets op `tools.satmeter.io`? hPanel → satmeter.io → Geavanceerd → GIT →
   **Herimplementeren**.

Geen nieuwe GitHub-repo, geen nieuw Hostinger-subdomein (bestaat al), geen
aparte SSL-stap (het bestaande certificaat van satmeter.io dekt subdomeinen
niet automatisch — controleer na de eerste deploy of `https://tools.satmeter.io`
zonder waarschuwing laadt; zie "Wat nog open staat" als dat niet zo is).

### Cloudflare Web Analytics (optioneel)
Een subdomein telt bij Cloudflare als apart "property". Wil je bezoekers-
aantallen zien: nieuwe site toevoegen in Cloudflare Web Analytics voor
`tools.satmeter.io`, en het token invullen op de plek waar in elke `.html`
`PLACEHOLDER_CF_TOKEN` staat (nu uitgecommentarieerd).

### Google Search Console + AdSense
- Search Console: nieuwe property `https://tools.satmeter.io`, apart van
  satmeter.io — subdomeinen tellen als aparte property.
- AdSense: hetzelfde publisher-ID (`ca-pub-8258777689852315`) werkt over
  meerdere sites van dezelfde eigenaar, maar Google wil het subdomein wel
  los zien in **Sites beheren** vóór het daar advertenties serveert.
  `ads.txt` staat al klaar op `tools.satmeter.io/ads.txt` zodra gedeployed,
  dus die stap is al gedaan.

---

## 15 augustus: eerste versie gebouwd

Vier tools gebouwd en getest, in dezelfde stijl als satmeter.io (letterlijk
hergebruikte `site.css` en `sats.js`, dus dezelfde live-prijsmotor met vijf
redundante bronnen en dezelfde licht/donker-modus):

- **Sats naar euro converter** (`sats-naar-euro.html`) — tweerichtingsveld,
  sats ↔ euro, met live koers
- **Bitcoin naar fiat converter** (`bitcoin-naar-fiat.html`) — BTC naar
  EUR/USD/GBP/CAD/AUD tegelijk
- **Bitcoin vs. hypotheek calculator** (`bitcoin-vs-hypotheek.html`) —
  vergelijkt extra aflossen (gegarandeerd rendement = hypotheekrente) met
  een door de gebruiker gekozen Bitcoin-rendementsaanname, beide via
  dezelfde rente-op-rente-formule zodat de vergelijking eerlijk is
- **Rente-op-rente / DCA calculator** (`rente-op-rente-dca.html`) — vaste
  maandinleg → eindwaarde, plus omrekening van die eindwaarde naar sats
  tegen de koers van vandaag (nadrukkelijk *niet* een koersvoorspelling)

**Gecontroleerd, drie passes:**
1. Elke pagina teruggelezen na het schrijven.
2. Alle `assets/`-verwijzingen en interne paginalinks gecontroleerd met een
   script — geen ontbrekende bestanden, geen dode links.
3. De rente-op-rente-formule apart doorgerekend tegen een bekende uitkomst
   (100/maand, 12%/jaar, 1 jaar → 1268,25 — klopt) en elke pagina in jsdom
   geladen om te checken dat er geen JavaScript-fouten optreden en dat elke
   pagina minstens één zichtbare link naar `satmeter.io` bevat. Alle 7
   pagina's: 0 fouten, link aanwezig.

**Standaard-bestanden checklist (1b) uitgevoerd, want dit raakt AdSense:**
- `ads.txt` — aangemaakt met hetzelfde publisher-ID als satmeter.io.
  Kan pas live gecontroleerd worden zodra het subdomein bestaat.
- `robots.txt` — aanwezig, staat `Mediapartners-Google` toe, verwijst naar
  `sitemap.xml`.
- `sitemap.xml` — aanwezig, 7 URL's.
- `privacy.html` en `terms.html` — aanwezig, verwijzen ook naar de
  satmeter.io-versies voor het volledige beleid.
- `google-site-verification` — nog niet ingevuld, want Search Console kan
  pas geverifieerd worden zodra het subdomein live staat. **Open actie.**
- Cloudflare-token — placeholder, uitgecommentarieerd, zie sectie 6 hierboven.

Niet gecontroleerd (kan pas na live gaan): of de live koers echt laadt, of
AdSense het subdomein accepteert, of de fonts/preload-truc werkt op de
echte server. Zie "Wat nog open staat".

## 15 augustus, later op de dag: taalkeuze + valuta + advertenties/affiliate

Naar aanleiding van Johans feedback ("tools werken, maar ik wil verbeteringen
voor alle tools") drie dingen toegevoegd, over alle 5 pagina's (hub + 4 tools):

**1. Zelfde taal- en valutakeuze als satmeter.io.** Nieuw bestand
`assets/locale.js`: dezelfde pill-knop (vlag + taalcode + valuta) en
doorzoekbare modal met 16 talen / 21 valuta, 1-op-1 overgenomen van
satmeter.io's eigen mechanisme. Volledige vertaling voor Engels, Nederlands,
Spaans, Portugees en Frans; de overige 11 talen tonen Engelse tekst maar
vlag/valuta werken wel — exact zoals satmeter.io het nu zelf ook doet. Elke
rekenpagina luistert naar het `satmeter:locale-change`-event en herrekent
direct in de gekozen valuta (via `window.Sats.rate()`/`fmtFiat()`, die al
alle 21 valuta ondersteunden). `assets/sats.js` uitgebreid van 12 naar 21
valuta zodat dit exact matcht met satmeter.io.

**2. AdSense.** De live auto-ads-script (`adsbygoogle.js` met het
publisher-ID) stond al in elke pagina sinds v1 — dat is het mechanisme dat
daadwerkelijk advertenties toont. Wat ontbrak: de handmatige, uitgecommen-
tarieerde `<ins>`-placeholders in de ad-rail-vakken, voor als Johan ooit
vaste ad-posities wil in plaats van auto-ads. Die zijn nu toegevoegd, exact
in dezelfde vorm (en nog steeds uitgecommentarieerd) als op satmeter.io.

**3. BitBox/Trezor affiliate-kaarten.** `assets/wallet-picks.js` +
productfoto's (`trezor-safe5.jpg`, `bitbox02.jpg`) gekopieerd van
satmeter.io. Dit script is zelf-installerend: het detecteert automatisch
waar het draait en plaatst zelf een kaart in de hoofdtekst en een compacte
versie in de ad-rail, inclusief eigen CSS — er hoefde niets anders aangepast
te worden dan een `<script>`-tag toevoegen.

**Gecontroleerd:** alle 5 pagina's opnieuw door jsdom gehaald (0
JavaScript-fouten, `SatmeterLocale` laadt, pill aanwezig), en visueel
gecontroleerd met Playwright-screenshots (pill, modal met alle 16 talen,
BitBox/Trezor-kaarten met foto's en prijzen — zie de homepage- en
sats-naar-euro-pagina). `?v=`-nummers verhoogd voor alle gewijzigde/nieuwe
bestanden: `sats.js` (v1→v2), `tools-extra.css` (v2→v3, ook op privacy.html/
terms.html), en `locale.js`/`wallet-picks.js` nieuw op `?v=1`.

---

## Wat nog open staat

Op volgorde van wat het eerst moet gebeuren.

### 1. De map `tools/` in de repo zetten en deployen
Zie "Live zetten" hierboven. Dit moet Johan zelf doen (bestanden slepen,
GitHub Desktop) — kan niet vanuit een sessie hier.

### 2. SSL voor het subdomein controleren
Onbevestigd of het bestaande Let's Encrypt-certificaat van satmeter.io ook
`tools.satmeter.io` dekt, of dat daar een apart certificaat voor moet.
Zonder geldig SSL laadt de live BTC-koers niet (browsers blokkeren
HTTP→HTTPS API-verzoeken). Eerste check na deploy: open
`https://tools.satmeter.io` en let op een slotje zonder waarschuwing.

### 3. Live controleren na de eerste deploy
Zodra `tools.satmeter.io` bestaat: alle 4 tools openen, checken dat de
live koers laadt (groen bolletje, geen foutmelding), en dat de links naar
satmeter.io echt werken. Dit is exact de valkuil uit de hoofdrepo
(`affiliate.js` die stil verdween) — dus live checken, niet aannemen dat
de zip die het bevatte genoeg is.

### 4. google-site-verification en Cloudflare-token invullen
Beide vereisen dat het subdomein al live staat en geverifieerd kan worden.

### 5. Terug-linken vanaf satmeter.io zelf
Op dit moment linkt alleen tools.satmeter.io naar satmeter.io, niet andersom.
Voor het volledige verkeersplan zou satmeter.io zelf ook een link naar
tools.satmeter.io moeten hebben (bijvoorbeeld in de footer of het
hamburgermenu in `nav.js`). Bewust **niet** in deze ronde meegenomen: dat
raakt de live hoofdsite en verdient een eigen, aparte controle-ronde
(inclusief de cache-busting `?v=`-stap uit de hoofdrepo). Voorstel voor
volgende keer: één regel in de footer van `index.html` en `es/index.html`,
plus een item in het hamburgermenu.

### 6. Meer tools
Uit de oorspronkelijke lijst nog niet gebouwd: BTW-calculator, eenheden-
omrekenaar, inflatieverlies-calculator, salaris-naar-Bitcoin-omrekenaar.
Kunnen op dezelfde manier gebouwd worden zodra de eerste 4 verkeer blijken
te trekken.

---

## Valkuilen (overgenomen uit de hoofdrepo, gelden hier net zo goed)

Zie `Satmeter-site/docs/STATUS.md` voor de volledige lijst. Kort samengevat,
de belangrijkste die hier ook spelen:

- **Nooit op een `.js`-bestand dubbelklikken**, alleen slepen — Windows
  blokkeert het anders stil.
- **Hostinger-mapveld bij GIT leeg laten**, relatief t.o.v. `public_html`.
- **`?v=`-nummer verhogen** bij elke wijziging aan `assets/site.css`,
  `assets/sats.js`, `assets/consent.js`, `assets/locale.js`,
  `assets/wallet-picks.js` of `assets/tools-extra.css` — anders zien
  terugkerende bezoekers de wijziging een maand lang niet.
- **Live controleren na een deploy**, niet alleen lokaal testen — een
  bestand kan in elke zip zitten en toch nooit op GitHub belanden.
