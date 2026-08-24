# Satmeter.io — waar we staan

Laatst bijgewerkt: 15 augustus 2026

---

## Vaste gegevens

| Wat | Waarde |
| --- | --- |
| Site | https://satmeter.io |
| GitHub-repo | https://github.com/johandem69-glitch/Satmeter-site (**public**) |
| Lokale map | `C:\Users\Demmers\Documents\GitHub\Satmeter-site` |
| Hostinger | hPanel → satmeter.io → Beheren → Geavanceerd → GIT |
| AdSense publisher | `ca-pub-8258777689852315` |
| BitBox referral | `rldjkhmt` → `https://shop.bitbox.swiss/?ref=rldjkhmt` |
| Trezor aff_id | `846530` |
| Ledger referral | `c58f6c59f4b1` → `https://shop.ledger.com/?r=c58f6c59f4b1` |

### Trezor offer_id's

| offer_id | Product | Waar gebruikt |
| --- | --- | --- |
| 137 | Trezor Shop, algemene store | "hele assortiment"-links |
| 238 | Trezor Safe 5, Bitcoin-only | hoofdproduct in de affiliate-kaart |
| 237 | Trezor Keep Metal 20 | seed-backup-alinea |
| 389 | EXTRA10 promo | nog niet gebruikt, kan verlopen zijn |
| 133, 352 | ouder, ongebruikt | — |

---

## Een wijziging doorvoeren

1. Bestand aanpassen in `Documents\GitHub\Satmeter-site`
2. GitHub Desktop: Summary invullen → **Commit to main** → **Push origin**
3. hPanel → GIT → **Deployen**

Wijzig je iets in `assets/`, doe dan ook een zoek-en-vervang van `?v=2` naar
`?v=3` in alle `.html`-bestanden. Anders zien terugkerende bezoekers je
wijziging tot een maand lang niet.

---

## Wat werkt en is gemeten

Gemeten op 375px breed, alle acht geteste pagina's op **0px horizontale
overflow**. De mobiele shift is weg, dat was 105px.

- Mobiel hamburgermenu op alle 31 pagina's, met alle gidsen gegroepeerd
- Affiliate-blokken op 26 contentpagina's plus een kaart in de desktop-zijbalk
- Alle affiliate-links met `rel="nofollow sponsored noopener"` en zichtbare
  disclosure, conform AdSense en FTC
- Spaanse wallet-gids live, volledig vertaald, met hreflang naar de Engelse
- `.htaccess` actief: `/docs/` en alle `.md` geven 403, caching en compressie aan
- Automatische deploy via GitHub → Hostinger werkt

---

## 14 augustus: AdSense-review opgeschoond

De aanvraag stond nog in behandeling, dus eerst gecontroleerd of er iets op de
site staat dat een afwijzing uitlokt. Er was één duidelijk probleem.

Op 26 pagina's stonden zichtbare lege advertentievakken, samen 1300 pixels hoog,
met daarin de tekst "Responsive in-content slot — add your AdSense code here" en
"160x600 AdSense slot". Voor een beoordelaar leest dat als een onafgebouwde
site, en dat is een bekende afwijsreden. Alle nepvakken zijn weggehaald. De
containers blijven bestaan als plaatsingsanker, maar `:empty` zorgt dat ze niets
tonen.

Ook gerepareerd: het AdSense-script stond twee keer in `index.html` en
`es/index.html`. Dat is nu één keer per pagina.

Wel goed bevonden en niet aangepast:

- Inhoud: 780 tot 1500 woorden per artikel over 22 artikelen. Ruim voldoende.
- Privacybeleid: derden, cookies, personalisatie, GDPR en opt-out-links staan er
- Verplichte pagina's: about, contact, privacy, terms aanwezig en gelinkt
- Geen kapotte interne links
- De echte advertentieblokken staan uitgecommentarieerd klaar voor na goedkeuring

Nog een losse constatering: `bitcoin-boodschappen.html` is een Nederlandse
pagina die nergens vandaan gelinkt is en niet in de sitemap staat. Doet geen
kwaad, maar levert ook niets op. Ooit fatsoenlijk inhangen of weghalen.

## 14 augustus: Cloudflare Web Analytics ingesteld

Het echte token staat nu in alle 31 pagina's, de placeholder is overal
vervangen. Cloudflare telt vanaf nu bezoekers per pagina, zonder cookies, dus
zonder toestemmingsbanner. Na een paar dagen verkeer is in het Cloudflare-
dashboard te zien welke artikelen het meest bekeken worden, en daar kan de
affiliate-plaatsing dan op afgestemd worden.

## 14 augustus: Google Search Console gecontroleerd

Sitemap stond al ingediend (12 augustus) en succesvol verwerkt, 30 pagina's
ontdekt. Losse controle van de belangrijkste URL's uitgevoerd via de
URL-inspectietool: homepage, Spaanse homepage, Engelse en Spaanse
wallet-gids, Big Mac Index. Op één geval na (`/es/index.html`, wat gewoon
de niet-canonieke variant van `/es/` bleek te zijn, geen probleem) stond
alles al gewoon goed. Niets te repareren, alleen bevestigd.

## 14 augustus: Productfoto's toegevoegd aan de affiliate-kaarten

Trezor Safe 5 (eigen creative, 768x768) en BitBox02 (uitgesneden uit een
device+telefoon-beeld, alleen het apparaat overgehouden) zijn verkleind naar
600px, platgeslagen op een witte achtergrond en opgeslagen als
`assets/trezor-safe5.jpg` (36kB) en `assets/bitbox02.jpg` (12kB). De originele
creatives (3000x4000px, meerdere megabytes) zijn dus nergens gebruikt.

`IMG_BITBOX` en `IMG_TREZOR` in `assets/affiliate.js` zijn ingevuld. Getest
met jsdom op de homepage, een Engels artikel en de Spaanse wallet-gids: de
`<img>`-tags verschijnen overal met het juiste relatieve pad. Cache-buster
`?v=1` toegevoegd aan beide bestandsnamen zodat je meteen het nieuwe plaatje
ziet zonder handmatig de asset-versie op te hogen.

## 14 augustus: Interne links op de homepage uitgebreid

De homepage linkte in de tekst zelf maar naar 3 van de 22 gidsen. Uitgebreid
naar 6: de bestaande drie (Big Mac Index, koffie, wat is een satoshi) plus
"Where to Store Your Sats" (de wallet-gids, dus meer verkeer naar de
affiliate-kaarten), "How Many Sats Is a Beer?" en de Netflix-gids. Alle 6
doelbestanden bestaan, gecontroleerd.

Op de Spaanse homepage zijn 2 kaarten toegevoegd die naar de 2 bestaande
Spaanse vertalingen linken (wallet-gids en Argentinië), met Spaanse titel en
tekst. De overige 3 kaarten op die pagina wijzen nog naar de Engelse versie,
want die gidsen zijn nog niet vertaald.

Het hamburgermenu ontsloot deze pagina's al voor Google, maar nu staan ze
ook als directe klikbare link in de hoofdtekst — dat weegt zwaarder mee voor
zowel SEO als voor hoeveel bezoekers echt doorklikken.

## 14 augustus: Gidsenmenu ook op desktop zichtbaar gemaakt

Johan wees erop dat het hamburgermenu er alleen voor mobiel stond; op
desktop was er nooit een vervanging gekomen voor de destijds gevraagde
sidebar of pull-down met alle gidsen. Dat was juist: `.sm-hamburger` had
`display:none` behalve onder 900px breed.

Fix: hetzelfde, al geteste menu (zelfde schuifpaneel, zelfde inhoud) staat nu
ook op desktop, als een label-knop ("All guides" / "Guías") naast de
donker/licht-knop in plaats van als kaal rond icoontje. Mobiel is pixel voor
pixel ongewijzigd. Getest met jsdom op homepage, een Engels artikel en de
Spaanse homepage: knop en label verschijnen overal correct vertaald.

## 14 augustus: Twee echte bugs gevonden en opgelost na melding van Johan

Johan meldde dat het menuknopje er rommelig uitzag en dat de foto's,
affiliate-links en advertentievakken ontbraken. Live site nagekeken met de
browser in plaats van alleen lokaal te testen — dat maakte meteen twee losse,
echte problemen zichtbaar die eerdere lokale tests niet konden vangen:

**1. Rommelig menuknopje (CSS-bug).** De drie lijntjes van het hamburgerpictogram
worden getekend met `position:absolute`, waardoor hun eigen doosje maar 2px
hoog is. Op mobiel viel dat niet op omdat er niets naast stond, maar naast
het nieuwe tekst-label op desktop tekenden de lijntjes gewoon over de tekst
heen. Fix: het icoontje zit nu in een eigen vast doosje van 16x16px
(`.sm-hamburger-icon`), zodat het niet meer buiten zijn eigen ruimte tekent.

**2. Foto's en affiliate-links ontbraken echt (geen cache-probleem).**
`assets/affiliate.js` bleek helemaal niet op GitHub te staan, gecontroleerd
via de GitHub-bestandenlijst zelf. Het bestand stond wel steeds in de zips
die hier zijn gebouwd, dus het is onderweg verdwenen, hoogstwaarschijnlijk
doordat Windows Defender of de browser bestanden met "affiliate" in de naam
als verdacht behandelt en ze stil weglaat bij het uitpakken. Opgelost door
het bestand te hernoemen naar `assets/wallet-picks.js` (functioneel
identiek), alle 26 pagina's daarnaar te laten verwijzen, en de oude
bestandsnaam nergens meer te gebruiken. Geverifieerd op de live site zelf:
`assets/affiliate.js` gaf een 404, alle andere bestanden (site.css, sats.js,
nav.js, de twee foto's) stonden er wel gewoon.

Deze twee bugs bewijzen de waarde van het teruglezen van de live site na een
deploy in plaats van alleen op "het commit-venster zag er goed uit" te
vertrouwen — dat wordt vanaf nu vaker gedaan bij visuele wijzigingen.

## 15 augustus: Uniek verhaal (sats vs. kosten van levensonderhoud) sterker naar voren gehaald voor Google/AI

Johan zag dat Google's AI Overview voor "satmeter.io" alleen de wallet-storage
gids noemde — niet het eigenlijke onderscheidende verhaal: dat Satmeter
Bitcoin vergelijkt met je dagelijkse kosten (boodschappen, koffie, huur) in
plaats van alleen een dollarprijs te tonen. Op zijn expliciete verzoek dit
overal sterker benadrukt, zonder de bestaande structuur te veranderen:

- `<meta name="description">`, `og:description` en `twitter:description` in
  `index.html` herschreven om expliciet te zeggen dat Satmeter vergelijkt met
  kosten van levensonderhoud, niet alleen een prijs toont.
- De `WebSite`- en `WebApplication` JSON-LD-blokken (regels ~63 en ~72)
  kregen dezelfde herformulering, zodat structured-data-lezers (incl. AI-crawlers)
  het onderscheid ook zien.
- De zichtbare tagline en intro-tekst op de homepage (rond regel 1205-1206) én
  de identieke Engelse tekst in het i18n-woordenboek (rond regel 1451-1452)
  allebei aangepast — deze moeten altijd gelijk blijven, anders loopt de
  statische tekst uit de pas met wat de pagina na het laden toont.
- Nieuw bestand `llms.txt` toegevoegd in de site-root: een korte, expliciete
  samenvatting voor AI-assistenten/crawlers van wat Satmeter uniek maakt.
- Geen `?v=`-ophoging nodig: alleen tekst/meta in `index.html` en een nieuw
  bestand aangeraakt, geen wijziging aan `assets/site.css`, `nav.js` of
  `wallet-picks.js`.
- De andere 15 taal-varianten in het i18n-woordenboek (zh, hi, es, ar, fr, bn,
  pt, ru, ja, ...) hebben nog hun oude tagline/intro. Niet in deze ronde
  meegenomen — zie "Wat nog open staat".

Dit is een tekstuele wijziging; het duurt normaal een paar dagen tot weken
voordat Google's AI Overview een nieuwe samenvatting laat zien, dus niet
meteen verwachten dat het zoekresultaat al verandert.

## 15 augustus: ads.txt toegevoegd (AdSense gaf "Niet gevonden")

Johan zag in AdSense onder "Uw sites beheren" dat de Ads.txt-status
"Niet gevonden" was. Gecontroleerd door `satmeter.io/ads.txt` direct in de
browser te openen: gaf echt een 404, het bestand bestond nergens (niet
lokaal, niet live). Nieuw bestand `ads.txt` toegevoegd in de site-root met
de regel `google.com, pub-8258777689852315, DIRECT, f08c47fec0942fa0`
(publisher-ID overgenomen uit het bestaande AdSense-script in `index.html`).
Zonder dit bestand keurt Google de site niet goed voor advertenties. Geen
`?v=`-ophoging nodig, dit is geen CSS/JS-asset.

## 15 augustus: Nieuwe land-gids toegevoegd — Brazilië

Op verzoek van Johan een zesde land-gids gemaakt, zelfde format als de
bestaande vijf: `articles/groceries-in-bitcoin-brazil.html`. Gecontroleerd
dat BRL een echte, live ondersteunde valuta is in `assets/sats.js` (geen
proxy-valuta nodig zoals bij de Argentinië-gids, die vanwege meerdere
wisselkoersen een noodgreep gebruikt) — Brazilië kon dus net als de VS-gids
met een directe, betrouwbare koers geschreven worden. Inhoud: eigen
weekboodschappenmandje in BRL, de geschiedenis van Braziliaanse
hyperinflatie (jaren '80-'90, Plano Real in 1994), en de gebruikelijke
uren-werk-vergelijking en disclaimer.

Toegevoegd op de gebruikelijke plekken:
- `articles/index.html` (gidsenoverzicht, land-gidsen sectie)
- `sitemap.xml`
- Wederzijdse links: Brazilië-gids linkt naar VS en Argentinië, en die twee
  linken nu ook terug naar Brazilië ("Keep reading"-sectie) — dezelfde
  interne-link-aanpak als eerder toegepast op de homepage.

Geen `?v=`-ophoging nodig: geen wijziging aan `assets/site.css`, `nav.js`
of `wallet-picks.js`, alleen nieuwe/bestaande HTML-pagina's.

**Correctie, zelfde dag:** Johan zag Brazilië niet in het navigatiemenu.
Er bleek een tweede, losstaande gidsenlijst te bestaan die ik had gemist:
een hardgecodeerde `items`-array in `assets/nav.js` (rond regel 90-98) voor
het "Country guides"-blok in het dropdown-menu, volledig los van
`articles/index.html`. Brazilië daaraan toegevoegd en, omdat dit nu wel
`nav.js` raakt, `?v=5` naar `?v=6` verhoogd over alle 66 HTML-bestanden
(34 root, 32 satmeter-github). **Les:** bij een nieuwe gids voortaan altijd
op minstens twee plekken checken, niet alleen `articles/index.html`: grep
naar `groceries-in-bitcoin` (of het vergelijkbare patroon) door de hele
`assets/`-map heen, zodat een tweede, verborgen lijst niet nogmaals gemist
wordt.

## 15 augustus: Paginasnelheid — twee echte fixes na Google's snelheidstest (score 64, mobiel)

Johan deelde een screenshot van Google's PageSpeed-achtige tool: score 64 op
mobiel, First Contentful Paint 3.5s, Largest Contentful Paint 4.1s, en
Cumulative Layout Shift 0.281 (0.1 of lager is "goed"). Site doorgezocht op
concrete, bekende oorzaken in plaats van algemene tips:

**1. Google Fonts blokkeerde de eerste render.** De `<link rel="stylesheet">`
naar Google Fonts (5 gewichten van Inter) moet volledig geladen zijn voordat
de browser mag beginnen met tekenen. Omgezet naar het standaard
preload-en-swap-patroon: `<link rel="preload" as="style" ... onload="...rel='stylesheet'">`
plus een `<noscript>`-fallback voor bezoekers zonder JavaScript. De pagina
kan nu meteen renderen met een systeemlettertype en wisselt naar Inter zodra
die geladen is, in plaats van te wachten.

**2. De eerste hero-foto had `loading="lazy"` terwijl die waarschijnlijk het
LCP-element is.** "Lazy" betekent: laad pas als de browser denkt dat het
nodig is, wat een afbeelding die meteen zichtbaar is juist vertraagt in
plaats van versnelt. Veranderd naar `loading="eager" fetchpriority="high"`
zodat de browser deze foto als eerste en met voorrang ophaalt.

**Niet in code op te lossen — actie voor Johan in het AdSense-dashboard:**
de hoge CLS (0.281) komt vermoedelijk grotendeels van Google's "Auto ads".
Die plaatst zelf advertenties ergens op de pagina zonder dat daar altijd
ruimte voor gereserveerd is, wat de pagina omlaag laat springen zodra een
advertentie laadt. De vaste advertentievakken in de code (`.ad-banner`,
`.ad-box`) hebben zelf al een gereserveerde minimumhoogte, dus die zijn niet
het probleem. In AdSense zelf: Sites → satmeter.io → Auto ads → advertentiedichtheid
omlaag zetten (bijv. naar "Laag" of "Gemiddeld" in plaats van "Hoog"). Dat is
een dashboard-instelling, geen bestand dat ik kan aanpassen.

Geen `?v=`-ophoging nodig voor `nav.js`/`wallet-picks.js` (niet aangeraakt),
maar dit raakt wel `index.html` zelf, dus geen cache-probleem te verwachten
bij Johan na deployen.

## 15 augustus: Affiliate-widget wordt meertalig, link naar tools.satmeter.io toegevoegd

Johan meldde met screenshots dat de "Where do your sats live?" affiliate-blokken
(BitBox02/Trezor) in het Engels bleven staan op een pagina die verder in het
Turks stond, en dat er nergens vanaf satmeter.io een link naar tools.satmeter.io
te vinden was.

**Affiliate-widget (`assets/wallet-picks.js`, gedeeld door satmeter.io èn
tools.satmeter.io/tools/):** volledig herschreven. Werkte voorheen alleen in
en/es en las de taal maar één keer bij het laden van de pagina. Nu:
- 16 taalversies (en, es, nl, pt, fr, de, tr, zh, hi, ar, bn, ru, ja, ko, id, vi).
- Reageert live op een taalwissel via een `MutationObserver` op het `lang`-attribuut
  van `<html>`, plus een `satmeter:locale-change`-event als extra vangnet. Beide
  sites zetten dat attribuut al bij een taalwissel, dus de widget hoefde niet in
  de taal-switcher-logica van elke site zelf te haken.
- Precies hetzelfde bestand staat nu op twee plekken: `assets/wallet-picks.js`
  (satmeter.io) en `tools/assets/wallet-picks.js` (tools.satmeter.io) — geverifieerd
  met `diff`, identiek.

**Link satmeter.io → tools.satmeter.io toegevoegd op twee plekken:**
- Footer van de homepage (NL en ES): nieuwe link "Free calculators" /
  vertaald via een nieuwe i18n-sleutel `footerToolsLink` in alle 14 taalwoordenboeken
  in `index.html`.
- Hamburgermenu (`assets/nav.js`): nieuwe groep bovenaan ("Free tools" / "Herramientas
  gratis") met een link naar tools.satmeter.io. `articleUrl()`/`rootUrl()` in
  `nav.js` konden voorheen alleen relatieve paden aan; die functies accepteren nu
  ook een absolute `https://` URL rechtstreeks.

**Cache-busting bijgewerkt** (verplicht bij elke wijziging aan `nav.js` of
`wallet-picks.js`), gecontroleerd met grep, geen oude versienummers meer over:
- `nav.js`: v6 → v7, op alle 32 pagina's van satmeter.io.
- `wallet-picks.js` (satmeter.io): v5 → v6, op alle 28 pagina's die hem gebruiken.
- `wallet-picks.js` (tools.satmeter.io): v1 → v2, op alle 5 tools-pagina's.

**Gecontroleerd:** syntax-check (`node -e "new Function(...)"`) op `nav.js` en
beide kopieën van `wallet-picks.js` — geen foutmeldingen. Grep bevestigt dat
zowel de oude versienummers als de oude Engels-only tekst nergens meer voorkomen.
Rechtstreeks gewijzigd op de laptop van Johan via de device-koppeling (geen
zip deze keer — de wijzigingen staan al in de lokale map, klaar om te committen
in GitHub Desktop).

## 15 augustus: Valutanamen in "Bitcoin naar Fiat" vertaald naar de sitetaal

Johan vroeg: laat in de bitcoin-naar-fiat tool de uitkomst zien in de valuta,
in de taal die op de site gekozen is — niet alleen de kale ISO-code (EUR, USD).

**`tools/assets/locale.js`:** nieuwe `CUR_NAMES_I18N`-tabel met de volledige
valutanaam (21 valuta) voor elk van de 7 volledig vertaalde talen op
tools.satmeter.io (en, nl, es, pt, fr, de, tr). Talen zonder volledige
vertaling vallen terug op Engels, zelfde patroon als de rest van `TOOLS_I18N`.
Nieuwe functie `currencyName(code)`, ook toegevoegd aan de publieke
`window.SatmeterLocale`-API zodat andere tools dit later ook kunnen gebruiken.

**`tools/bitcoin-naar-fiat.html`:** het resultaatlabel toont nu bijvoorbeeld
"Euro (EUR)" in plaats van alleen "EUR", in de taal die de bezoeker gekozen
heeft. Werkt automatisch mee met een taalwissel, want de tool luisterde al
naar het `satmeter:locale-change`-event.

Cache-busting: `locale.js` v2 → v3, op alle 5 pagina's van tools.satmeter.io
die hem gebruiken (`index.html`, `bitcoin-naar-fiat.html`, `sats-naar-euro.html`,
`bitcoin-vs-hypotheek.html`, `rente-op-rente-dca.html`). Gecontroleerd met
grep — geen `v=2`-referenties meer over. Syntax-check op `locale.js` geslaagd.

Alleen bitcoin-naar-fiat.html is aangepast zoals gevraagd; de andere drie tools
tonen nu ook via dezelfde `SatmeterLocale.currencyName()`-functie een pad om
dit later uit te breiden, mocht Johan dat ook daar willen.

## 15 augustus: Duits en Turks toegevoegd als volwaardige taal op satmeter.io

Johan meldde dat Duits en Turks nog ontbraken als taalkeuze op satmeter.io zelf
(tools.satmeter.io had ze al) en dat de reclameblokken ook in die talen mee
moesten veranderen.

**`index.html` en `es/index.html`:** twee complete nieuwe taalblokken toegevoegd
aan de `I18N`-vertaaltabel — `de` (Duits) en `tr` (Turks) — elk met alle 78
sleutels die Engels ook heeft (gecontroleerd met een script: geen ontbrekende
of overtollige sleutels). Verder, op beide plekken hetzelfde gedaan:
- Twee nieuwe `<option>`s in de verborgen taal-`<select>`.
- Nieuwe regels in `LOCALE_META` (vlag, naam, regio) voor de taalkiezer-pil
  en het zoekbare taalmenu.
- Nieuwe regels in `LANG_CURRENCY` (de → EUR, tr → TRY) zodat de valuta
  automatisch meeschakelt bij het kiezen van die taal. TRY bestond al als
  valuta-optie op de site, dus daar was niets voor nodig.
- Nieuwe regels in `REGION_ALIASES` zodat "germany"/"turkey" ook als
  zoekterm werken in de taalkiezer.

**Reclameblokken:** geen wijziging nodig. `assets/wallet-picks.js` had bij de
vorige update van vandaag al 16 talen inclusief Duits en Turks, en luistert
al live naar een taalwissel. Zodra een bezoeker Duits of Turks kiest,
schakelen de BitBox/Trezor-kaarten vanzelf mee.

Geen cache-bust nodig: dit raakt alleen de inline `<style>`/`<script>` van
`index.html` en `es/index.html` zelf, niet `assets/nav.js`, `assets/site.css`
of `assets/wallet-picks.js`.

Gecontroleerd: syntax-check op beide bestanden geslaagd, en met een klein
Node-scriptje bevestigd dat de nieuwe `de`- en `tr`-blokken exact dezelfde 78
sleutels hebben als het Engelse blok (dus geen vergeten tekst die op een lege
Engelse fallback zou blijven hangen).

## 15 augustus: Ledger toegevoegd als derde affiliate-partner

Johan wilde zijn Ledger-affiliate (referral `c58f6c59f4b1`, link
`https://shop.ledger.com/?r=c58f6c59f4b1`) naast BitBox en Trezor op zowel
satmeter.io als tools.satmeter.io.

**`assets/wallet-picks.js` (beide kopieën, satmeter.io èn tools.satmeter.io/tools/):**
- Nieuwe `LEDGER`-config in het CONFIG-blok bovenaan, zelfde patroon als
  `BITBOX`/`TZ`.
- Derde productkaart toegevoegd: "Ledger Nano S Plus" (Multi-coin · USB-C,
  vanaf ~€79 — prijs gecontroleerd via een live blik op shop.ledger.com en
  een paar erkende resellers, exacte prijs varieert per moment). Geen
  productfoto beschikbaar (Johan stuurde alleen twee reclamebanners, geen
  losse productfoto zoals bij BitBox/Trezor), dus `IMG_LEDGER = ""` — kaart
  is voorlopig tekst-only, precies zoals het CONFIG-commentaar al
  documenteerde als optie. Zodra Johan een creative aanlevert: resize naar
  ~600px, opslaan in `assets/` (én de tools-kopie), `IMG_LEDGER` invullen.
- Grid aangepast van 2 naar 3 kolommen op desktop (`repeat(3,1fr)`), met een
  tussenstap op 900px (2 kolommen) voordat het op 600px naar 1 kolom
  mobiel-stapelt. BitBox/Trezor-kaarten ongewijzigd qua opmaak.
- Ledger-link ook toegevoegd aan de compacte zijbalk-kaart
  (`sm-aff-rail-links`), naast BitBox en Trezor.
- Alle 16 taalversies in `WP_I18N` kregen `ledgerTag`/`ledgerDesc`/
  `ledgerPrice`, en `railText` ("de twee/drie wallets…") is overal bijgewerkt
  naar drie. Gecontroleerd met een Node-scriptje dat alle 16 taalblokken nu
  precies dezelfde sleutelset hebben als Engels (geen ontbrekende vertaling
  die op een lege fallback zou blijven hangen).
- Merk "Ledger" blijft onvertaald, zoals ook bij "BitBox02"/"Trezor Safe 5" —
  productnamen worden nooit vertaald in dit bestand.

**Cache-busting** (verplicht, `wallet-picks.js` is aangeraakt):
- satmeter.io: `?v=6` → `?v=7` op alle 28 pagina's die het bestand laden.
- tools.satmeter.io: `?v=2` → `?v=3` op alle 5 tools-pagina's.
- Gecontroleerd met grep: geen `v=6`/`v=2`-referenties naar dit bestand meer
  over op de respectievelijke sites.

**Gecontroleerd (drie passes):**
1. Syntax-check (`new Function(...)`) op het volledige bestand: geen fouten.
2. Sleutelconsistentie: alle 16 taalblokken hebben identiek dezelfde set
   sleutels (script-vergelijking tegen het Engelse blok).
3. Echte render-test met jsdom op vier representatieve pagina's (homepage,
   een Engels artikel, de Spaanse homepage, de tools-hub): op elke pagina
   verschijnen alle drie kaarten (BitBox02, Trezor Safe 5, Ledger Nano S
   Plus) met de juiste `rel="nofollow sponsored noopener"` en de juiste
   affiliate-URL. Taalwissel naar Spaans getest op een artikelpagina: de
   Ledger-kaart wisselt live mee ("Multi-moneda · USB-C"), zonder page
   reload — de bestaande `MutationObserver`-aanpak werkte meteen voor de
   nieuwe derde kaart.

Rechtstreeks gewijzigd op de laptop van Johan via de device-koppeling (geen
zip deze keer — de wijzigingen staan al in de lokale map, klaar om te
committen in GitHub Desktop).

## 15 augustus: Drie Ledger-productfoto's toegevoegd, willekeurig gemixt

Johan stuurde alsnog drie echte productfoto's (goud, oranje, en de doos met
Secret Recovery Sheet) en vroeg om alle drie te gebruiken, gemixt over de
site — niet één vaste foto zoals bij BitBox/Trezor.

**Foto's verwerkt:** alle drie verkleind naar max. 600px op de lange zijde,
opgeslagen als JPG (`ledger-nano-s-plus-gold.jpg` 26kB, `-orange.jpg` 6kB,
`-box.jpg` 47kB) in `assets/` én de identieke kopie in `tools/assets/`. De
oranje foto was origineel al klein (208×243px) — de bron die Johan stuurde
was zelf laagresolutie, dus die is niet kunstmatig scherper gemaakt.

**`assets/wallet-picks.js` (beide kopieën):** `IMG_LEDGER` is nu een array
van de drie bestandsnamen in plaats van één string. Nieuwe `ledgerImg`-
variabele kiest er willekeurig één (`Math.random()`) bij het laden van de
pagina — dezelfde foto wordt gebruikt voor zowel de in-content kaart als de
zijbalk-kaart op die ene pagina (voor consistentie binnen één weergave),
maar een andere pagina of een volgende bezoeker krijgt met gelijke kans een
van de andere twee te zien. `assetUrl()`/de bestaande padlogica is
ongewijzigd, dus dit werkt automatisch correct op elke mappendiepte
(root, `articles/`, `es/`, `es/articles/`, `tools/`).

**Cache-busting:** `wallet-picks.js` is opnieuw aangeraakt, dus opnieuw
verhoogd: `?v=7` → `?v=8` op alle 28 pagina's van satmeter.io, `?v=3` → `?v=4`
op alle 5 pagina's van tools.satmeter.io. Gecontroleerd met grep: geen oude
versienummers meer over voor dit bestand.

**Gecontroleerd:** syntax-check op het volledige bestand geslaagd. jsdom-test
van 30 paginaladingen op de homepage laat alle drie bestandsnamen exact
terugkomen (`Math.random()` werkt zoals bedoeld, geen scheve verdeling of
bug die altijd dezelfde foto pakt). Padresolutie apart getest op een Engels
artikel (`../assets/...`), een Spaans artikel (`../../assets/...`) en de
tools-hub (`assets/...`) — alle drie kloppen. Alle zes bestanden (drie foto's
× twee kopieën) gecontroleerd op daadwerkelijk aanwezig zijn op schijf.

Rechtstreeks gewijzigd op de laptop van Johan via de device-koppeling.

## 24 augustus: AdSense-afwijzing "Content van weinig waarde" opgelost

AdSense wees satmeter.io af op 23 augustus 18:31 met precies een schending:
"Content van weinig waarde". Site-eigendom was wel geverifieerd en ads.txt
stond op "Geautoriseerd". De hele site is live nagelopen om te vinden wat
die melding veroorzaakt in plaats van algemene tips toe te passen.

**Wat gecontroleerd is en goed bleek** (niet aangepast): 29 artikelen van
1.000 tot 1.400 woorden, uniek geschreven, met auteursnaam en datum;
about/contact/privacy/terms bestaan, zijn gelinkt en tellen 800 tot 1.100
woorden; privacy noemt AdSense, cookies, personalisatie en GDPR; robots.txt
staat `Allow: /` voor Mediapartners-Google; ads.txt bevat de juiste
publisher-regel; geen lege advertentievakken meer; sitemap live op 38 URL's
inclusief de zeven nieuwe landengidsen.

**De echte oorzaak: negen dunne pagina's op het hoofddomein.**
`public_html/tools` en `public_html/aiagent` zijn bereikbaar als
`satmeter.io/tools/` en `satmeter.io/aiagent/`. Google telt die dus gewoon
mee bij satmeter.io. De vijf rekentools zijn 278 tot 561 woorden, in het
Nederlands op een verder Engelse site, en droegen alle negen de
AdSense-code. Dat is exact het profiel van "weinig waarde".

**Verzwarende omstandigheid: beide subdomeinen bestaan niet meer.**
`tools.satmeter.io` en `aiagent.satmeter.io` hebben geen DNS-record
(gecontroleerd met een resolver: geen A/AAAA). Toch stond op alle negen
pagina's een canonical naar die dode domeinen, en linkten de footer en het
hamburgermenu op elke pagina naar `https://tools.satmeter.io/`. Een
beoordelaar die daarop klikt komt op een foutmelding. Op de aiagent-pagina's
stonden bovendien zes links naar `https://tool.satmeter.io` (zonder s, een
typefout) en nog steeds de letterlijke placeholder
`PASTE_YOUR_VERIFICATION_CODE_HERE`.

**Nog een vondst:** de vier tool-pagina's hadden actieve
`<ins class="adsbygoogle">`-blokken met verzonnen slot-ID's
(`data-ad-slot="0000000001"`). Op de hoofdsite staan die blokken bewust
uitgecommentarieerd; hier stonden ze aan.

**Wat er is gedaan (keuze van Johan: nu afschermen, later uitbouwen):**

1. `tools/*.html` (7) en `aiagent/index.html` + `aiagent/es/index.html`:
   `<meta name="robots" content="noindex, follow">` toegevoegd, alle
   AdSense-code verwijderd (loader plus de nep-`<ins>`-blokken), canonical
   en og:url omgezet naar `https://satmeter.io/tools/...` en
   `https://satmeter.io/aiagent/...`, de placeholder-verificatiemeta
   verwijderd, en de zes `tool.satmeter.io`-links naar `https://satmeter.io`.
2. Alle links naar het dode subdomein omgezet naar het pad dat wel bestaat:
   `https://tools.satmeter.io/` wordt `/tools/` in `index.html`,
   `es/index.html` en `assets/nav.js`.
3. `bitcoin-boodschappen.html` (de ongelinkte Nederlandse kopie van de
   homepage, 202 kB) op `noindex, nofollow` gezet en de AdSense-code
   eruit gehaald.
4. `tools/sitemap.xml`, `tools/robots.txt`, `aiagent/sitemap.xml`,
   `aiagent/robots.txt` en de zichtbare tekst in `tools/privacy.html` en
   `tools/terms.html` verwijzen niet langer naar de dode subdomeinen.

**Bug die onderweg gevonden en gerepareerd is.** `articleUrl()` en
`rootUrl()` in `assets/nav.js` lieten alleen `https://`-URL's ongemoeid en
plakten voor al het andere `toRoot` ervoor. Na stap 2 zou `/tools/` op een
artikelpagina dus `../articles//tools/` worden. De test in beide functies is
verruimd naar `/^(https?:\/\/|\/)/`, zodat een pad dat met een slash begint
ook ongewijzigd doorgaat. Gesimuleerd voor `/`, een Engels artikel, `/es/`,
een Spaans artikel en `/about.html`: overal `/tools/`, en de bestaande
gids- en footerlinks onveranderd.

**Cache-busting:** `nav.js` is gewijzigd, dus `?v=9` naar `?v=10` op alle 39
HTML-bestanden. Grep bevestigt: nul verwijzingen naar v9 over.

**Gecontroleerd (drie passes):** alle 48 HTML-bestanden geparseerd, nul
fouten. Alle 847 interne links en asset-paden doorgerekend, nul kapot.
`node --check` op `nav.js` geslaagd, plus de simulatie hierboven. Grep op
restanten: nul `tools.satmeter.io`/`aiagent.satmeter.io`/`tool.satmeter.io`
in HTML/XML/TXT (op een commentaarregel in `aiagent/robots.txt` na), nul
`PASTE_YOUR`, nul `adsbygoogle` in tools/aiagent/boodschappen. De vier
`data-ad-slot="00000..."`-treffers die overblijven staan in `index.html` en
`es/index.html` binnen een HTML-commentaar, dat is de bedoeling.

**Waarom de link naar `/tools/` in menu en footer blijft staan.** Die
pagina's serveren nu geen advertenties meer en staan op noindex, dus ze
horen niet meer bij de advertentie-inventaris. Een werkende link naar een
gratis rekentool is een positief signaal; het probleem was de dode link en
de dunne pagina's mét advertenties. Blijft de volgende beoordeling alsnog
hangen, dan is de link tijdelijk weghalen de volgende stap.

**Actie voor Johan zelf, niet in code op te lossen:**
1. Committen, pushen, deployen. Daarna in AdSense: Sites, satmeter.io,
   vinkje "Ik bevestig dat ik de problemen heb opgelost", Beoordeling
   aanvragen. Reken op enkele dagen tot twee weken.
2. Beslissen of `tools.satmeter.io` en `aiagent.satmeter.io` terug moeten
   komen. Zolang ze geen DNS hebben, is `satmeter.io/tools/` en
   `satmeter.io/aiagent/` het enige werkende adres. Records staan in
   Cloudflare, niet in Hostinger.

**Wat hierna het meest oplevert:** de vier rekentools uitschrijven naar 800
tot 1.000 woorden echte uitleg in het Engels, dan noindex eraf, canonical
laten staan op satmeter.io/tools/, en ze in `sitemap.xml` opnemen. Dan
worden het vier extra sterke pagina's in plaats van een risico.


## 24 augustus: CLS-bug gevonden en opgelost (het was niet AdSense)

Op 15 augustus is hier genoteerd dat de hoge CLS (0,281) waarschijnlijk van
Google's Auto ads kwam en niet in code op te lossen was. Dat klopte niet.
Er draaien helemaal geen advertenties op de site, en Cloudflare Web Analytics
mat over de laatste twee weken nog steeds 7% "slecht" en 13% "matig" op CLS,
met in de Debug View het exacte element: `html>body>div.shell>article>div.card`
met een CLS van 1,0.

**De echte oorzaak.** `assets/wallet-picks.js` voegt het affiliate-blok
(`.sm-aff`, drie productkaarten met foto's) pas na het laden in, via
`placeInContent()`, vlak voor `.related` binnen `div.card`. Er was geen ruimte
voor gereserveerd, dus alles eronder sprong omlaag zodra het blok verscheen.
Live gemeten op `articles/how-many-sats-is-a-coffee.html`: **678px verschuiving**
op desktop. Dat is precies een CLS rond 1,0.

**De fix.** Ruimte vooraf reserveren als marge boven `.related`, die vanzelf
vervalt zodra het blok er staat:

    .related{margin-top:660px}
    .sm-aff + .related{margin-top:26px}
    @media (max-width:900px){.related{margin-top:940px}}
    @media (max-width:600px){.related{margin-top:1390px}}

De tweede regel heeft specificiteit 0-2-0 tegen 0-1-0, dus die wint ook binnen
de media queries zodra `.sm-aff` is ingevoegd. Geen JavaScript-wijziging nodig,
en `refresh()` bij een taalwissel vervangt alleen `innerHTML` en verwijdert het
element niet, dus de reservering komt daarbij niet terug.

Gemeten hoogtes inclusief marges: 678px bij 3 kolommen, ~970px bij 2 kolommen,
~1440px bij 1 kolom. Bewust iets krapper gereserveerd, zodat een restverschuiving
klein en naar beneden is in plaats van een zichtbaar gat.

**Gecontroleerd:** de regels live op de echte pagina geinjecteerd en gemeten.
Met `.sm-aff` aanwezig blijft `margin-top` 26px, zonder het blok wordt het
660px, en de verschuiving zakt van **678px naar 44px**. Verder: accolades
gebalanceerd in alle drie de kopieen van `site.css`, 48 HTML-bestanden geparseerd
zonder fouten, 847 interne links doorgerekend, nul kapot.

**Waarom drie kopieen.** `assets/site.css`, `tools/assets/site.css` en
`aiagent/assets/site.css` zijn losse kopieen. Alle drie kregen dezelfde regels,
want alle 37 pagina's met `.related` laden ook `wallet-picks.js` (gecontroleerd
met `comm`, geen enkele uitzondering in beide richtingen).

**Cache-busting:** hoofdsite `site.css?v=4` naar `?v=5` (32 bestanden),
tools en aiagent `site.css?v=1` naar `?v=2` (9 bestanden). Grep bevestigt:
geen oude versienummers meer.

**Nog open op CLS:** de Debug View noemt ook `div.price-bar` (0,113) en
`header` (0,102) op de homepage. Kleiner, maar niet nul. Nog niet onderzocht.

## 24 augustus: echte verkeerscijfers vastgelegd

Voor het eerst de cijfers naast elkaar gezet, omdat Johan wilde weten wat de
AdSense-goedkeuring hem eigenlijk oplevert.

**Cloudflare Web Analytics, laatste 14 dagen, bots uitgesloten:**
240 bezoeken, 360 pageviews. Verwijzers: hpanel.hostinger.com 110,
direct 80, google.com 30, tools.satmeter.io 20, satmeter.io 0. De eerste
190 zijn dus vrijwel zeker Johan zelf. **Echt extern verkeer: 30 bezoeken
uit Google in twee weken.**

Losse observatie: de lijn van `tools.satmeter.io` als verwijzer stopt rond
16 augustus en staat daarna op nul. Dat dateert het moment waarop het
subdomein is omgevallen.

**Google Search Console (property `https://satmeter.io/`, niet de
domain-property, die bestaat niet):** over de hele levensduur van de site
3 klikken, 21 vertoningen, CTR 14,3%, gemiddelde positie 5,8. Het tabblad
Zoekopdrachten geeft "Geen gegevens": te weinig vertoningen om queries te
tonen. Indexering: 23 pagina's geindexeerd, 10 niet (2 x alternatieve
pagina met canonieke tag, 8 x gevonden maar niet geindexeerd). Dat is de
stand van voor de zeven nieuwe landengidsen.

**Conclusie die hieruit volgt.** Er valt op dit moment niets te optimaliseren
op basis van zoekdata, want die data bestaat niet. Bij 150 echte externe
pageviews per maand en een RPM van rond de 10 dollar praat je over
ongeveer anderhalve dollar per maand. Het knelpunt is niet AdSense maar
distributie. Zie het distributieplan dat op 24 augustus is opgeleverd.


## Wat nog open staat

Op volgorde van wat het snelst geld oplevert.

### 1. Spaanse vertalingen
2 van 22 gidsen gedaan (`where-to-store-your-sats`, `groceries-in-bitcoin-argentina`).
Afspraak was twee per week. De Spaanstalige markt is waar in sats denken het
meest relevant is, dus daar zit de groei.

### 2. Overige taalversies van tagline/intro bijwerken
Alleen de Engelse tekst is aangepast om het "sats vs. kosten van
levensonderhoud"-verhaal te benadrukken. De 15 andere talen in het
i18n-woordenboek in `index.html` hebben nog de oude tekst. Niet urgent
(Engels is de hoofdmarkt), maar wel een inconsistentie om ooit recht te
trekken.

---

## Valkuilen die we tegenkwamen

Bewaard zodat je er niet nog een keer een avond aan kwijt bent.

**Windows blokkeert .js-bestanden als je ze opent, niet als je ze sleept.**
`affiliate.js` verdween stil bij het uitpakken; hernoemen naar
`wallet-picks.js` loste het niet op, dus het was geen naam-kwestie
(dat bleek achteraf een apart, los probleem: het bestand stond gewoon
niet op GitHub). Los daarvan kreeg Johan later voor `wallet-picks.js`
een rode Windows-beveiligingswaarschuwing. Onderzocht via de Eigenschappen
van zowel de zip als het losse bestand: geen van beide toonde een
"Deblokkeren"-vinkje, dus de eerdere "unblock de zip"-aanpak hieronder
was niet de juiste verklaring. Werkende conclusie: die waarschuwing komt
van **dubbelklikken/openen** van een `.js`-bestand — Windows behandelt dat
als een script dat uitgevoerd moet worden (via Windows Script Host) en
blokkeert dat standaard. Gewoon **selecteren en slepen** (kopiëren, niet
openen) naar de GitHub-map triggert dit niet. Instructie aan Johan:
nooit op een `.js`-bestand dubbelklikken, alleen slepen. Dit werkte
in de praktijk ("klopt"), maar is niet los geverifieerd met tooling —
als het probleem terugkomt, dit als eerste checken.

**Hostinger mapveld leeg laten.** Dat veld is relatief ten opzichte van
`public_html`. Vul je daar `public_html` in, dan krijg je
`public_html/public_html` en zie je niets.

**GitHub Desktop: Revert is niet Undo.** In het rechtsklikmenu op een commit
staan ze naast elkaar. "Revert changes in commit" maakt een nieuwe commit die
alles terugdraait. "Undo commit" haalt de commit lokaal terug. Raak je toch
Revert aan: revert de revert, dan staat alles terug.

**Privé e-mail blokkeert pushen.** GitHub weigert commits met een e-mailadres
dat als privé staat gemarkeerd. Oplossing is niet je gmail openbaar maken, want
dat komt permanent in de publieke commit-geschiedenis. Gebruik in
GitHub Desktop → File → Options → Git het noreply-adres van
github.com/settings/emails.

**Een zip kan niet naar GitHub gesleept worden.** GitHub pakt hem niet uit.
En sleep bij een web-upload nooit de map zelf, alleen de inhoud, anders belandt
`index.html` in een submap en vindt Hostinger hem niet.

**`display:block` op een tabel breekt `table-layout:fixed`.** Dat kostte de
meeste tijd. Een brede vergelijkingstabel duwt op mobiel de hele pagina scheef.
De werkende fix is `table-layout:fixed` plus `hyphens:auto`, met de tabel als
`display:table`. Zie het commentaar in `assets/site.css`.

**Grid- en flex-items krimpen niet zonder `min-width:0`.** Dat was de oorzaak
van de oorspronkelijke 105px shift op de homepage: een input en een knop in een
grid weigerden onder hun eigen inhoudsbreedte te krimpen.

**Je eigen wijziging niet zien is meestal de cache.** `.htaccess` bewaart CSS
en JS een maand. Daarom staan er `?v=`-parameters achter alle assets. Verhoog
het nummer, of je debugt een probleem dat op de server al opgelost is.

## 16 augustus: Nieuwe subdomein-site aiagent.satmeter.io gebouwd (v1)

Johan wilde een tweede site: `aiagent.satmeter.io`, over AI-agents versus
Bitcoin/TradFi/DeFi met een 10-jaar-visie, faceless (geen naam/gezicht),
onderdeel van hetzelfde project als de faceless-video-strategie.

**Hostinger:** subdomein aangemaakt door Johan zelf, met aangepaste map
`public_html/aiagent` (zelfde patroon als `tools.satmeter.io` →
`public_html/tools`). AdSense had het automatisch al onder het bestaande
`satmeter.io`-account, geen los "Site toevoegen" nodig.

**Wat is gebouwd:** één pagina (en) + de Spaanse vertaling (`es/index.html`),
in dezelfde talen als satmeter.io zelf. Hergebruikt bewust dezelfde
bouwstenen als de rest van de site in plaats van iets nieuws te verzinnen:
- `assets/site.css` (ongewijzigd overgenomen), `.card`/`.hubgrid`/`.hubcard`/
  `.callout`/`.warn`/`.cta`/`.related`/`.ad-rail`/`.ad-banner` klassen
  hergebruikt, structuur gebaseerd op `articles/how-to-think-in-sats.html`
  als template (het dichtstbijzijnde bestaande pagina-type: concept-artikel,
  geen land-gids, geen converter).
- `assets/wallet-picks.js` en `assets/consent.js` 1-op-1 gekopieerd (zelfde
  publisher-ID `ca-pub-8258777689852315`, zelfde BitBox/Trezor/Ledger-
  affiliate-links). `wallet-picks.js` detecteert zelf paddiepte via
  `/articles/` en `/es/` in de URL; op deze site (root + `es/`, geen
  `articles/`-niveau) resolvet dat vanzelf goed, gecontroleerd door de
  `toRoot`-logica te lezen, niet aangenomen.
- `ads.txt` met dezelfde publisher-regel gekopieerd naar de site-root van
  aiagent.satmeter.io (subdomeinen hebben hun eigen `ads.txt` nodig, erven
  'm niet automatisch van het hoofddomein).
- Consent-banner in `assets/consent.js` linkte naar een lokale `privacy.html`
  die op dit subdomein niet bestaat — aangepast naar een absolute link naar
  `https://satmeter.io/privacy.html` (dezelfde eigenaar/policy, geen tweede
  kopie om te onderhouden). Zelfde voor de footer-links op de Spaanse pagina:
  `es/privacy.html`/`es/terms.html` bestaan niet op satmeter.io zelf, dus
  die pagina linkt naar de Engelse privacy/terms met een "(EN)"-label.
- Eigen `?v=1` cache-buster gebruikt voor deze kopieën van site.css/
  consent.js/wallet-picks.js — onafhankelijk van de `?v=8`-teller op
  satmeter.io zelf, want dit zijn losse bestanden in een losse map.
- `google-site-verification`-meta staat nog op een placeholder
  (`PASTE_YOUR_VERIFICATION_CODE_HERE`) in beide taalversies — Johan moet
  zelf `aiagent.satmeter.io` toevoegen in Search Console (HTML-tag methode)
  en de echte code doorgeven, dan wordt hij verwerkt.
- Geen eigen `about.html`/`contact.html` gebouwd, alleen de landingspagina
  zelf plus `robots.txt`/`sitemap.xml`.
- Content bevat twee expliciet gemarkeerde gedachte-experimenten (de
  "100.000-sats-test" en de bakker-analogie uit het brand-brief) — bewust
  NIET als echt gebeurde feiten geschreven, om te voorkomen dat de site iets
  beweert dat niet klopt.

**Gecontroleerd (drie passes):** alle asset-referenties in beide
HTML-bestanden bestaan op schijf (grep + `test -f`), geen restjes uit het
`how-to-think-in-sats.html`-template achtergebleven (`../index.html`,
`../privacy.html` e.d.), publisher-ID consistent in `ads.txt` én beide
`<script>`-tags, `<html lang>` en canonical/hreflang kloppen per taal.
Nog NIET getest: een echte jsdom/browser-render van de nieuwe pagina's
(geen lokale testharness voor deze nieuwe map opgezet), en de site is nog
niet live bekeken na deploy.

**Nog open:**
1. `google-site-verification`-placeholder vervangen zodra Johan de code uit
   Search Console heeft.
2. Live checken na deploy: ads.txt bereikbaar op
   `aiagent.satmeter.io/ads.txt`, wallet-picks-kaarten verschijnen echt,
   consent-banner werkt, dark-mode-knop werkt (eigen kleine inline script,
   geen hergebruik van `nav.js`).
3. `assets/site.css`/`wallet-picks.js`/`consent.js` op dit subdomein zijn nu
   losse kopieën van de satmeter.io-versie. Als satmeter.io die bestanden
   later bijwerkt (nieuwe affiliate, prijswijziging, bugfix), moet dat
   handmatig ook hierheen gekopieerd worden — er is geen automatische sync.
4. Nog geen `about.html`/`contact.html`/eigen `privacy.html` op dit
   subdomein; leunt nu op de satmeter.io-versies.

## 17 augustus: Google Search Console indexeringsprobleem onderzocht en gefixt

Johan kreeg een mail van Search Console: 11 van de 31 sitemap-pagina's niet
geïndexeerd (20 wel), met als redenen "Alternatieve pagina met correcte
canonieke tag" (2), "Gevonden - momenteel niet geïndexeerd" (8) en "Gecrawld
- momenteel niet geïndexeerd" (1).

**Gecontroleerd:** canonical-tags op alle 31 sitemap-URL's, hreflang-opzet
(en/es), robots.txt, sitemap.xml, interne linking vanuit `articles/index.html`
en `assets/nav.js`. Alles klopte, behalve twee concrete dingen:

1. **www.satmeter.io serveerde dezelfde content als satmeter.io zonder
   redirect** (beide gaven 200, canonical wees wel correct naar de
   non-www-versie, maar Google crawlt en rapporteert de www-versie dan nog
   als losse URL met "alternatieve pagina" — precies de melding uit de mail).
   Gefixt met een 301-redirect in `.htaccess` (www → non-www, alleen voor
   satmeter.io, niet voor tools.satmeter.io).
2. **`about.html`, `contact.html`, `privacy.html`, `terms.html` misten een
   self-referencing canonical tag** (wel in sitemap, wel `meta robots
   index,follow`, maar geen `<link rel="canonical">`). Toegevoegd aan alle
   vier, wijzend naar hun eigen URL.

**Wat dit niet is:** een sitemap- of crawlbudget-bug. De site heeft de
sitemap pas op 12 augustus ingediend; 20/31 al geïndexeerd binnen 5 dagen is
normaal tempo voor een jonge site. "Gevonden/Gecrawld - momenteel niet
geïndexeerd" (9 van de 11) lost zichzelf meestal op binnen 1-2 weken zodra
Google meer vertrouwen/traffic-signalen ziet — daar is niets in de code
kapot.

**Niet in code op te lossen, actie voor Johan zelf in Search Console:**
Ga naar Pagina's → klik op elke rij met een "niet geïndexeerd"-reden → open
de losse URL's → gebruik de URL-inspectietool → klik "Indexering aanvragen"
per URL. Dat versnelt het proces, maar garandeert niks — Google beslist zelf.

**Nog niet gedaan:** `bitcoin-boodschappen.html` is een oude, ongelinkte
pagina (niet in sitemap, canonical wijst bewust naar de homepage — dat is
op zich correct, maar de pagina bestaat verder nergens in de site-navigatie).
Laten staan zoals die is, want de canonical voorkomt al duplicate-content-
problemen; alleen relevant als Johan 'm ooit echt wil gebruiken of
verwijderen.

## 23 augustus: "Alternatieve pagina met correcte canonieke tag" definitief opgelost

Op 17 augustus is in Search Console een validatie gestart voor dit probleem.
Die is op 22 augustus mislukt, met steeds dezelfde twee URL's:
`https://satmeter.io/index.html` en `https://satmeter.io/es/index.html`.

**Waarom de vorige ronde niet hielp.** Toen zijn de www-redirect en de
ontbrekende canonicals gefixt. Dat was terecht, maar het was niet de oorzaak
van déze twee URL's. De canonical-tags op `/index.html` en `/es/index.html`
waren namelijk altijd al correct (ze wijzen naar `/` en `/es/`). Het punt is
dat een validatie voor dit probleemtype nooit slaagt zolang die URL's gewoon
met status 200 blijven bestaan. Google zegt met deze melding niet "er is iets
kapot", maar "ik ken deze URL als losse variant van je homepage". Zolang de
site die variant blijft aanbieden en er zelf naartoe linkt, blijft de melding
terugkomen. Vandaar dat het probleem zich bleef herhalen.

**De echte oorzaak.** De hele site linkte intern naar de homepage via het
bestand in plaats van via de map:

- 52 keer `href="index.html"` (root-pagina's en de Spaanse homepage)
- 129 keer `href="../index.html"` (alle artikelen)
- 1 keer `href="../../index.html"` (Spaans artikel naar de Engelse site)
- `assets/nav.js` genereerde de "home"-link in het hamburgermenu als
  `"../index.html"` / `"index.html"` (regel 143)

Ook de homepage zelf linkte via het logo naar `index.html`. Elke crawl
bevestigde de dubbele URL dus opnieuw.

**Wat er is gedaan:**

1. `.htaccess`: 301-redirect van `/index.html` naar `/` en van
   `/es/index.html` naar `/es/`. Bewust met `THE_REQUEST` gecontroleerd, zodat
   Apache's eigen interne stap ("/" serveert index.html) geen redirect-lus
   veroorzaakt. `articles/index.html` en `tools/index.html` blijven expliciet
   ongemoeid: dat zijn echte, geïndexeerde pagina's die in de sitemap staan.
2. Alle interne links omgezet naar absolute map-URL's: `/` voor de Engelse
   homepage, `/es/` voor de Spaanse. Absoluut in plaats van relatief, zodat
   er nooit meer een fout kan sluipen in het aantal `../`-niveaus.
   Aangepast: 33 bestanden.
3. `assets/nav.js`: `homeUrl()` geeft nu `inEs ? "/es/" : "/"` terug.
   Daarom `nav.js?v=7` overal naar `?v=8` gezet (32 HTML-bestanden).
4. `tools/` en `aiagent/` niet aangeraakt: die laden `nav.js` niet en hebben
   eigen canonicals op hun eigen subdomein.

**Gecontroleerd (niet alleen gefixt):** alle 689 interne links en asset-paden
opnieuw doorgerekend, 0 kapot. Redirectregels en `homeUrl()` gesimuleerd voor
`/`, `/index.html`, `/es/`, `/es/index.html`, `/articles/index.html`,
`/tools/index.html` en `/about.html`: alleen de eerste twee doelen krijgen een
redirect, geen lus. Canonicals en hreflang op `index.html` en `es/index.html`
waren al correct en zijn ongewijzigd gelaten.

**Wat Johan in Search Console moet verwachten.** Na de deploy verhuizen die
twee URL's van "Alternatieve pagina met correcte canonieke tag" naar "Pagina
met omleiding". Dat is óók een "niet geïndexeerd"-categorie, en dat hoort zo:
een redirect-URL wordt nooit zelf geïndexeerd. Het aantal "niet geïndexeerde"
pagina's gaat dus niet naar nul, en dat hoeft ook niet. Belangrijk: pas
opnieuw op "Fix valideren" klikken nadat Google de nieuwe redirect heeft
gezien (controleer dat eerst met de URL-inspectietool op
`https://satmeter.io/index.html`), anders mislukt de validatie opnieuw.

**Nog steeds open:** `bitcoin-boodschappen.html` heeft nog altijd een
canonical naar `/`. Die pagina is nergens gelinkt en staat niet in de
sitemap, dus Google vindt 'm waarschijnlijk niet. Als die URL ooit tóch in
Search Console opduikt met dezelfde melding, is de keuze: een eigen canonical
geven en indexeren, of verwijderen.

## 23 augustus: zeven nieuwe landengidsen toegevoegd

Johan wilde acht landen toevoegen: El Salvador, Venezuela, Libanon, Zuid-Afrika,
Pakistan, Vietnam, Iran en Soedan. Er staan er nu zeven live. Soedan is bewust
niet gebouwd, zie onderaan.

**Nieuwe pagina's** (allemaal in `articles/`, gemodelleerd op
`groceries-in-bitcoin-united-states.html`, ongeveer 1.400 woorden elk):

- `groceries-in-bitcoin-el-salvador.html` (USD, echte valuta: land is
  gedollariseerd sinds 2001)
- `groceries-in-bitcoin-venezuela.html` (USD, want er is geen enkele
  bolivarkoers die voor iedereen klopt)
- `groceries-in-bitcoin-lebanon.html` (USD, want supermarkten prijzen daar
  sinds maart 2023 in dollars)
- `groceries-in-bitcoin-south-africa.html` (ZAR, echte live koers uit
  `sats.js`, net als Brazilie)
- `groceries-in-bitcoin-pakistan.html` (PKR-prijs + USD-equivalent)
- `groceries-in-bitcoin-vietnam.html` (VND-prijs + USD-equivalent)
- `groceries-in-bitcoin-iran.html` (USD, met zware waarschuwing)

**Valuta-afweging, belangrijk voor volgende keer.** `assets/sats.js` haalt live
koersen op voor twaalf valuta: USD, EUR, GBP, JPY, INR, BRL, NGN, TRY, IDR, CAD,
AUD, ZAR. Alleen Zuid-Afrika viel daar binnen. Voor de rest is bewust gekozen:

- El Salvador, Venezuela en Libanon rekenen in dollars omdat dat feitelijk de
  winkelprijs is, niet omdat het makkelijker was. Dat staat ook in de tekst.
- Pakistan en Vietnam krijgen een extra tabelkolom: lokale prijs, dollarkoers
  met datum erbij, dan pas sats. De koers wordt genoemd in plaats van verstopt.
- Iran heeft meerdere wisselkoersen tegelijk. Numbeo publiceert daar al
  omgerekende dollarprijzen zonder te zeggen welke koers is gebruikt. Dat is in
  de tekst als zwakte benoemd in plaats van weggepoetst. Herhaal die aanpak niet
  stilzwijgend voor een nieuw land, benoem het.

**Feitelijke correctie die de El Salvador-pagina stuurt.** Bitcoin is daar sinds
29 januari 2025 geen wettelijk betaalmiddel meer. De Bitcoin Law is aangepast als
voorwaarde voor een IMF-lening van 1,4 miljard: accepteren is vrijwillig,
belasting betalen in bitcoin kan niet meer, Chivo wordt afgebouwd. Uit de
UCA-enquete van december 2024 blijkt dat 8,1% van de Salvadoranen bitcoin nog
gebruikt, gedaald van 25,7% in 2021. Bronnen die nog "eerste land met bitcoin als
wettelijk betaalmiddel" schrijven zijn verouderd.

**Waar de gidsen overal zijn gelinkt** (de les van 15 augustus, elke lijst apart):

1. `articles/index.html`: zeven nieuwe hubcards onder "Country guides", teller
   aangepast van 21 naar 28 gidsen.
2. `assets/nav.js`: zeven items toegevoegd aan de `items:` array onder
   "Country guides" (de tweede, verborgen lijst die het hamburgermenu vult).
3. `sitemap.xml`: zeven URLs toegevoegd, staat nu op 38.
4. Wederzijdse links: de VS-gids linkt naar El Salvador, Argentinie naar
   Venezuela, Turkije naar Iran en Libanon, Nigeria naar Zuid-Afrika, Brazilie
   naar Venezuela, India naar Pakistan en Vietnam, en `where-to-store-your-sats`
   naar Libanon. Elke nieuwe gids linkt zelf terug naar twee of drie bestaande.

**Cache-busting:** `nav.js` is gewijzigd, dus `?v=8` is overal `?v=9` geworden.
39 HTML-bestanden staan nu op v9, nul op v8.

**Gecontroleerd (niet alleen gebouwd):** alle 845 interne links en asset-paden
doorgerekend, nul kapot. Alle zeven pagina's geparseerd op sluitende tags: geen
enkele fout. Alle JSON-LD-blokken door een JSON-parser gehaald. Elke
`data-sats-cur` gecontroleerd tegen de twaalf valuta die `sats.js` echt ophaalt.
`sitemap.xml` als XML geparseerd. `node --check` op `nav.js`.

**Soedan bewust niet gebouwd.** Het onderzoek liep vast op twee dingen die geen
pagina toelaten. Ten eerste zijn er geen bruikbare actuele voedselprijzen: de
WFP- en FEWS NET-marktrapporten voor 2026 waren niet op te halen, en Numbeo heeft
voor Khartoem vrijwel niets. Een prijstabel zou dus verzonnen zijn. Ten tweede is
er geen enkel hard cijfer over bitcoingebruik in Soedan, alleen anekdotes, terwijl
er voor Iran bijvoorbeeld wel harde Chainalysis-cijfers zijn. Daar komt bij dat
het land in oorlog is met bevestigde hongersnood in El Fasher en Kadugli. Een
pagina in de stijl "wat kost je boodschappenmandje in sats" past daar niet, los
van de datakwestie. Als Johan er alsnog iets over wil, moet dat een ander type
artikel worden: over wat er met geld gebeurt als een staat uit elkaar valt,
zonder prijstabel en zonder sats-omrekening.
