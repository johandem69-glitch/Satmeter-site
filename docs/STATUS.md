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

## Wat nog open staat

Op volgorde van wat het snelst geld oplevert.

### 1. Google Search Console
Sitemap opnieuw indienen en indexering aanvragen voor de nieuwe Spaanse pagina
en de gewijzigde pagina's. Alleen jij kunt hierbij, geen toegang van buitenaf.

### 2. Cloudflare Web Analytics token
Staat als `PASTE_YOUR_CLOUDFLARE_TOKEN_HERE` in alle pagina's. Zonder dit weet
je niet welke pagina's bezoekers trekken, en dus ook niet waar de affiliate-
blokken het beste renderen. Token: Cloudflare dashboard → Analytics & Logs →
Web Analytics → Add a site → satmeter.io.

### 3. Productfoto's bij de affiliate-kaarten
De kaarten zijn nu tekst. Foto's converteren doorgaans beter. Download de
affiliate-creatives, verklein naar circa 600px op de lange zijde, zet ze in
`assets/`, en vul `IMG_BITBOX` en `IMG_TREZOR` in bovenaan
`assets/affiliate.js`. Hotlink de originelen niet: 3000x4000px en meerdere
megabytes, dat sloopt je laadtijd en daarmee je AdSense-opbrengst.

### 4. Spaanse vertalingen
2 van 22 gidsen gedaan (`where-to-store-your-sats`, `groceries-in-bitcoin-argentina`).
Afspraak was twee per week. De Spaanstalige markt is waar in sats denken het
meest relevant is, dus daar zit de groei.

---

## Valkuilen die we tegenkwamen

Bewaard zodat je er niet nog een keer een avond aan kwijt bent.

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
