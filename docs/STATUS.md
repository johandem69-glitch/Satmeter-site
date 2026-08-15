# Satmeter.io — waar we staan

Laatst bijgewerkt: 14 augustus 2026

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
