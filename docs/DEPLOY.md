# Satmeter.io live zetten op Hostinger

---

## ⚠️ Eerst: de API-token intrekken

Je hebt een Hostinger API-token in een chat geplakt. Die moet weg.

1. **hPanel** → rechtsboven je account → **API** → **Tokens**
2. Verwijder de token die begint met `d7ZTX3...`
3. Maak alleen een nieuwe aan als je echt automatisering nodig hebt, met zo min mogelijk rechten

**Waarom dit belangrijk is:** met een Hostinger API-token kan iemand DNS wijzigen (je domein naar een phishing-site laten wijzen), domeinen overzetten, of kosten maken. Het is geen wachtwoord dat je "later wel eens" verandert.

**En zet hem nooit in deze map.** Elk bestand hier komt op `satmeter.io` te staan waar iedereen het kan opvragen. Een `.gitignore` helpt daar niet tegen — dat gaat over Git, niet over wat je uploadt.

Voor live gaan heb je de API helemaal niet nodig.

---

## Stap 1 — Placeholders vullen (15 minuten, doe dit eerst)

Nu staat er nog nepinformatie in. AdSense-reviewers checken hier op, en een bouncend e-mailadres is een klassieke afwijzing.

**In `about.html`** — zoek het gele blokje:
- Je echte naam of bedrijfsnaam
- Je land
- Eventueel KvK-nummer

**In `contact.html`** — vervang `hello@satmeter.io` etc. door een adres dat je echt leest. Eén is genoeg; je hoeft geen drie aparte adressen te maken.

> Tip: maak in hPanel een gratis e-mailadres op je eigen domein aan. `hello@satmeter.io` staat een stuk professioneler dan een Gmail-adres, en het is bij Hostinger inbegrepen.

**In `terms.html`** — bij "governing law": je land (bijvoorbeeld "the laws of the Netherlands").

**In `privacy.html`** — welke analytics je echt gaat gebruiken. Kies er één:
- **Cloudflare Web Analytics** of **Plausible** — geen cookies, geen consent-banner nodig voor analytics. Simpelste route.
- **Google Analytics** — zet cookies, moet dus onder je consent-banner vallen.

---

## Stap 2 — Uploaden

**hPanel** → **Websites** → `satmeter.io` → **Bestandsbeheer** → map `public_html`

Upload de **inhoud** van je outputs-map, niet de map zelf. Het moet er zo uitzien:

```
public_html/
├── index.html          ← hier, niet in een submap
├── about.html
├── contact.html
├── privacy.html
├── terms.html
├── robots.txt
├── sitemap.xml
├── articles/
│   ├── index.html
│   └── ... (20 gidsen)
└── assets/
    ├── site.css
    ├── sats.js
    └── logo.svg
```

**Niet uploaden:** `bitcoin-boodschappen.html` (dat is een identieke kopie van `index.html`), en de `.md`-bestanden — die zijn voor jou, niet voor bezoekers.

Sneller dan los slepen: zip de bestanden, upload de zip, en pak hem uit in Bestandsbeheer.

---

## Stap 3 — SSL en HTTPS

In hPanel bij je website:

1. **SSL** → gratis Let's Encrypt-certificaat installeren
2. **Forceer HTTPS** aanzetten

Zonder dit werkt je site niet goed: browsers blokkeren API-verzoeken van een HTTP-pagina naar HTTPS-API's, en dan laadt je Bitcoin-koers niet. **Dit is niet optioneel.**

---

## Stap 4 — Controleren of het echt werkt

Open `https://satmeter.io` en check:

- [ ] De koers laadt binnen een paar seconden (groen bolletje, geen foutmelding)
- [ ] De bronvermelding toont een naam: CoinGecko, Coinbase, Kraken, Bitstamp of Blockchain.info
- [ ] Het logo en de wordmark verschijnen
- [ ] Klik een gids aan — daar moet de mini-rekenmachine ook een cijfer geven
- [ ] Wissel van taal via de pil rechtsboven; de valuta moet meebewegen
- [ ] Verwijder een item met de × en zet het terug met "Reset"
- [ ] Open `https://satmeter.io/sitemap.xml` — moet 26 URL's tonen
- [ ] Open `https://satmeter.io/robots.txt`

Laadt de koers níét, dan is het bijna altijd een van deze twee: HTTPS staat niet aan, of je adblocker blokkeert crypto-API's. Test in een privévenster zonder extensies.

---

## Stap 5 — Google Search Console

1. [search.google.com/search-console](https://search.google.com/search-console) → **Property toevoegen** → **URL-prefix** → `https://satmeter.io`
2. Verifiëren via **HTML-tag** — Google geeft je een `<meta name="google-site-verification" content="...">`
3. Die tag hoort in de `<head>` van **`index.html`**. Dat is een publieke code, dus die mag gewoon in het bestand.
4. Bij **Sitemaps** → `sitemap.xml` indienen
5. Vraag indexering aan voor je drie sterkste pagina's:
   - `/articles/bitcoin-big-mac-index.html`
   - `/articles/sats-grocery-index.html`
   - `/articles/sats-per-dollar-today.html`

Verwacht niet meteen verkeer. Indexering duurt dagen tot weken, ranking maanden.

---

## Stap 6 — Cookie-consent-banner

**Verplicht vóór je AdSense aanzet**, als je EU-bezoekers hebt. Dit is Google's eigen beleidseis én de AVG.

Kies er één:
- **Google's Consent Mode + CMP** — meest naadloze integratie met AdSense
- **Cookiebot** of **Osano** — gratis tier voor kleine sites

Sla je dit over, dan riskeer je zowel een AdSense-schending als een AVG-overtreding. Niet slim gokken op iets waar boetes op staan.

---

## Stap 7 — AdSense aanvragen

Pas nu, met alle stappen hierboven afgerond.

1. [adsense.google.com](https://adsense.google.com) → account met `satmeter.io`
2. Verificatiecode in de `<head>` van **alle** pagina's
3. Wachten: 1–14 dagen
4. Goedgekeurd? Haal in `index.html` en de gidsen de commentaartekens weg rond de advertentieblokken en vervang `ca-pub-XXXXXXXXXXXXXXXX` door jouw ID

Afgewezen? Je krijgt een reden. Meestal "low value content" — voeg dan een paar gidsen toe en vraag na twee weken opnieuw aan. Onbeperkt herhaalbaar.

---

## Daarna, in deze volgorde

1. **BitBox-affiliate** aanvragen — [bitbox.swiss/affiliates](https://bitbox.swiss/affiliates/), kost twee minuten, alleen een e-mailadres
2. **Trezor-affiliate** aanvragen — [trezor.io/affiliate](https://trezor.io/affiliate), nu je een echte site met inhoud hebt
3. **`where-to-store-your-sats.html`** schrijven — één eerlijke vergelijkingspagina, geen banners
4. **Eerste Reddit-post** — niet "check mijn site", maar een inzicht met de tool als bron

---

## Als je later automatisch wil deployen

Handmatig uploaden is prima voor nu. Wil je het automatiseren:

- Hostinger heeft een **Git-integratie** in hPanel — koppel een repo, elke push deployt
- Of **GitHub Actions** met FTP-upload

In beide gevallen: inloggegevens horen in de **secrets-store** van dat platform (GitHub → Settings → Secrets), nooit in een bestand in de repo. Dat is precies de fout die de API-token hierboven veroorzaakte.
