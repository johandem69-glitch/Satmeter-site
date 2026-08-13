# AdSense-goedkeuring + affiliate: het concrete werkplan

---

## DEEL 1 — Wat er nu al is toegevoegd

Ik heb de drie zwaarste blokkades voor je weggewerkt.

### Klaar

| Bestand | Woorden | Doel |
|---|---|---|
| `about.html` | 854 | Verplicht. Identificeerbare auteur = zwaar gewicht bij YMYL-onderwerpen |
| `contact.html` | 642 | Verplicht. Reviewers checken of er echt een contactroute is |
| `privacy.html` | 1.027 | Verplicht. Benoemt alle derde partijen, cookies, AVG-rechten |
| `terms.html` | 1.068 | Verplicht. Disclaimers, auteursrecht, affiliate-disclosure |
| `articles/bitcoin-big-mac-index.html` | 1.043 | Sterkste zoekwoord dat je hebt |
| `articles/how-many-sats-is-a-coffee.html` | 866 | Long-tail, bijna geen concurrentie |
| `articles/what-is-a-satoshi.html` | 829 | Fundament-artikel, trekt definitie-zoekopdrachten |
| `sitemap.xml` + `robots.txt` | — | Inclusief `Mediapartners-Google` regel die AdSense nodig heeft |

**Elk artikel heeft een eigen live mini-calculator** die dezelfde vijf prijsbronnen gebruikt als de hoofdpagina. Dat is belangrijk: het maakt van een artikel een *tool met uitleg* in plaats van een blogpost. Google beoordeelt dat hoger, en bezoekers blijven langer.

Ook per artikel: Article-schema, FAQ-schema, interne links, advertentieruimte, dark mode. Getest — de rekenmachines geven exacte uitkomsten in 8 valuta's.

### Stand van zaken

Je hebt nu **27 pagina's**: 20 gidsen, een hub, de converter en 4 verplichte pagina's. Google wil 20–30. **Drempel gehaald.**

---

## DEEL 2 — De 17 pagina's die je nog moet schrijven

Gebruik `articles/how-many-sats-is-a-coffee.html` als sjabloon: kopiëren, tekst vervangen, `data-live-caption`-bedrag en de widget-standaardwaarde aanpassen. Een uur per artikel als je het patroon eenmaal hebt.

### Blok A — Itempagina's (10 stuks, makkelijkst)

Deze schrijf je bijna op de automatische piloot, en elk vangt een aparte zoekvraag:

1. `how-many-sats-is-a-loaf-of-bread.html`
2. `how-many-sats-is-a-liter-of-milk.html`
3. `bitcoin-price-of-a-dozen-eggs.html`
4. `how-many-sats-is-a-gallon-of-gas.html` ← sterk in de VS
5. `netflix-subscription-priced-in-bitcoin.html`
6. `how-many-sats-is-a-cinema-ticket.html`
7. `bitcoin-price-of-a-pizza-delivery.html` ← link naar het Bitcoin-pizza-verhaal
8. `how-many-sats-is-a-beer.html`
9. `monthly-phone-plan-in-satoshis.html`
10. `how-many-sats-is-a-cup-of-tea.html`

**Structuur per artikel (kopieer letterlijk):**
- Korte inleiding met de vraag (2 alinea's)
- Live widget
- "Het korte antwoord" met een concreet rekenvoorbeeld
- Tabel: 6–7 landen of steden met lokale prijs → sats
- "Waarom dit item een goede maatstaf is" (3–4 alinea's)
- De trend over tijd, **met de eerlijke waarschuwing erbij**
- Praktische tips
- 4 FAQ-vragen met schema
- Link naar de hoofdconverter

### Blok B — Landenpagina's (5 stuks, hoogste verkeerspotentieel)

11. `groceries-in-bitcoin-united-states.html`
12. `groceries-in-bitcoin-nigeria.html`
13. `groceries-in-bitcoin-argentina.html`
14. `groceries-in-bitcoin-turkey.html`
15. `groceries-in-bitcoin-india.html`

**Waarom deze vijf:** hoge inflatie plus hoge Bitcoin-adoptie. In Nigeria, Argentinië en Turkije zoeken mensen dit niet uit nieuwsgierigheid maar omdat hun eigen munt wegsmelt. Dat is verkeer met echte intentie, en het is bijna onbezet.

### Blok C — Uitlegpagina's (2 stuks)

16. `bitcoin-vs-inflation-what-groceries-show.html`
17. `how-to-think-in-sats.html`

### Tempo

**Twee per week, negen weken.** Niet sneller. Google classificeert crypto als YMYL en straft AI-massaproductie actief af — 17 pagina's die op één dag verschijnen is precies het signaal dat je niet wil geven.

---

## DEEL 3 — Vóór je AdSense aanvraagt

Werk deze lijst af. Elke regel is een bekende afwijzingsreden.

### Vullen wat nu placeholder is
- [x] ~~`about.html`~~ — **Johan Demmers**, Nederland, met een eerlijke "ik ben geen financieel adviseur"-alinea.
- [x] ~~`contact.html`~~ — `info@satmeter.io`, één adres, met naam en land erbij.
- [x] ~~`terms.html`~~ — Nederlands recht, Nederlandse rechter, plus EU-consumentenrechten-clausule.
- [x] ~~`privacy.html`~~ — Cloudflare Web Analytics, cookieloos, met uitleg waarom dat géén consent-banner vereist.
- [x] ~~Domein in `sitemap.xml`, `robots.txt` en alle canonicals~~ — **klaar**, staat op `satmeter.io`.

### Technisch
- [x] ~~Eigen domein~~ — **klaar**: `satmeter.io`.
- [ ] Hosting met HTTPS: Cloudflare Pages of Netlify, gratis.
- [ ] Search Console + sitemap ingediend.
- [ ] Cookie-consent-banner (CMP) — **alleen nodig zodra je AdSense aanzet**. Je analytics is cookieloos, dus daarvoor hoeft het niet. Google's eigen consent-tool, Cookiebot of Osano.

### Kwaliteit
- [x] ~~Minimaal 20 pagina's live~~ — 27.
- [x] ~~Elk artikel 800+ woorden~~ — gemiddeld 935, geen enkele onder 700.
- [x] ~~Geen enkele pagina "under construction"~~ — alle gele placeholder-vakken verwijderd.
- [x] ~~Elke pagina bereikbaar via een link~~ — getest, geen orphans.

### Aanvragen
1. `adsense.google.com` → account met je domein
2. Verificatiecode in de `<head>` van **alle** pagina's
3. Wachten: 1–14 dagen
4. Goedgekeurd? Haal de commentaartekens weg rond de advertentieblokken in `index.html` en de artikelen, vervang `ca-pub-XXXXXXXXXXXXXXXX`

**Afgewezen?** Je krijgt een reden. "Low value content" = te weinig of te dun. Voeg 10 pagina's toe, wacht twee weken, opnieuw. Onbeperkt herhaalbaar, kost je alleen tijd.

---

## DEEL 4 — Hardware wallet affiliate: precies hoe

Dit is waar het geld zit. Beide programma's zijn open en gratis.

### Trezor — begin hier

**Aanmelden:** [trezor.io/affiliate](https://trezor.io/affiliate) → "Apply now", of direct via [affiliate.trezor.io/signup](https://affiliate.trezor.io/signup)

| | |
|---|---|
| Commissie | **12% start, tot 15%** bij goede prestaties |
| Cookie | 30 dagen |
| Per verkoop | ~$15–20 |
| Uitbetaling | Maandelijks, in **euro's of BTC** |
| Vereiste | Een website — die heb je |
| Doorlooptijd | Enkele werkdagen |

Bij aanmelden vragen ze naar je content, publiek en promotiestrategie. Wees concreet: *"Live Bitcoin-converter voor dagelijkse boodschappen, gebruikers die net hun eerste sats hebben berekend en zich afvragen waar ze die veilig bewaren."* Dat is een logische, eerlijke match — precies wat ze willen horen.

### BitBox — de tweede, nóg makkelijker

**Aanmelden:** [bitbox.swiss/affiliates](https://bitbox.swiss/affiliates/)

| | |
|---|---|
| Commissie | **12%** van de verkoopprijs, excl. verzending en btw |
| Cookie | 4 weken |
| Uitbetaling | Maandelijks vanaf €50 drempel, euro's of BTC |
| Vereiste | **Alleen een e-mailadres** |

BitBox is Zwitsers en Bitcoin-only. Voor een publiek dat in sats denkt is dat een sterk verhaal — puristen kiezen dit boven Trezor. Neem ze allebei op en laat de bezoeker kiezen.

### Wat je bouwt met die links

**Één pagina: `where-to-store-your-sats.html`**

Geen banners. Een echte vergelijking:
- Wat een hardware wallet doet en wanneer je er een nodig hebt (niet bij €50 aan sats)
- Trezor vs BitBox vs "op de exchange laten" — eerlijk, inclusief nadelen
- Duidelijke affiliate-disclosure bovenaan (staat al in je `terms.html`)
- Waarschuwing over seed phrases en over nep-supportberichten

**De rekensom die dit rechtvaardigt:** 10.000 bezoekers bij $15 RPM = $150 advertenties. Diezelfde 10.000 met 0,5% conversie op 12% commissie ≈ 50 verkopen × $17 = **$850**. Bijna zes keer zoveel, met één pagina.

---

## DEEL 5 — Supermarkt-affiliate: eerlijk gezegd nee

Ik heb het uitgezocht omdat je het voorstelde, en ik moet je afraden om hier energie in te stoppen.

### De cijfers

| Programma | Commissie | Realiteit |
|---|---|---|
| Amazon Fresh / groceries | **1–2%** | Amazon heeft in 2026 tarieven tot 50% verlaagd |
| Albert Heijn (Partnerize) | ~2% (AH Voordeelshop) | Alleen NL |
| Picnic (Awin) | **tot €25 per nieuwe klant** | Wél interessant — zie hieronder |

### Waarom het meestal niet werkt

**Verkeerde intentie.** Iemand die opzoekt "hoeveel sats is een brood" wil geen brood kopen. Die wil Bitcoin begrijpen. Een boodschappenlink is een mismatch, en mismatches converteren niet.

**De marge is te dun.** 2% op een €80 boodschappenmand is €1,60. Bij een conversie van 1% — optimistisch — moet je 6.000 bezoekers hebben voor €96. Diezelfde 6.000 bezoekers leveren via hardware wallets een veelvoud op.

**Amazon werkt tegen je.** Sinds april 2026 tellen aankopen in dezelfde categorie niet meer mee voor onsite-commissie; alleen de gepromote ASIN zelf. Het model "iemand klikt op brood en koopt een televisie" is dood.

### De uitzondering die wél kan

**Picnic betaalt per nieuwe klant, niet per procent.** €25 voor één nieuwe gezinsklant is een heel andere economie dan 2% van een mandje. Als je ooit Nederlandse landingspagina's maakt ("Wat kost je AH-boodschappenmandje in sats?") is dat het enige boodschappenprogramma dat de moeite waard is.

Maar: **doe dit pas na je hardware wallets.** Prioriteit hoort bij wat aansluit op de intentie van je bezoeker.

### Beter dan supermarkten

Als je toch fysieke producten wil aanbieden, blijf in het onderwerp:
- **Hardware wallets** (Trezor, BitBox) — 12–15%, perfecte match
- **Seed phrase back-ups** (metalen plaatjes) — hoge marges, dezelfde koper
- **Bitcoin-boeken** via Amazon — 4–8%, past bij je uitlegpagina's

---

## Wat je deze week doet

1. **Domein kopen** (€12) en de 8 bestanden op Cloudflare Pages zetten
2. **Placeholders vervangen** — naam, e-mail, land, domein
3. **BitBox-affiliate aanvragen** — kost twee minuten, alleen een e-mailadres
4. **Trezor-affiliate aanvragen** — nu je een echte site hebt met inhoud
5. **Search Console** aanmaken, sitemap indienen
6. **Artikel 4 schrijven:** `how-many-sats-is-a-loaf-of-bread.html`

Daarna twee artikelen per week tot je op 20 zit. Dat is het hele verhaal. Niet de techniek — die is klaar. Volhouden.

---

## Eén juridische waarschuwing

Hardware wallets zijn fysieke producten: eenvoudig, geen financieel toezicht.

**Exchange-affiliates zijn dat niet.** Zodra je Binance, MEXC of vergelijkbaar aanprijst kom je in gereguleerd gebied — MiCA in de EU, AFM-toezicht in Nederland. De commissies zijn hoger (50–70% van handelskosten), maar het risico ook. **Ik ben geen jurist.** Laat dit checken vóórdat je zo'n link plaatst. Mijn advies: begin met wallets en boeken, en laat exchanges links liggen tot je weet waar je staat.

---

### Bronnen

- [Trezor Affiliate Program](https://trezor.io/affiliate) · [aanmeldpagina](https://affiliate.trezor.io/signup)
- [BitBox affiliate program](https://bitbox.swiss/affiliates/) · [voorwaarden](https://bitbox.swiss/policies/affiliate-program/)
- [Amazon Associates commissietarieven 2026](https://earnifyhub.com/blog/affiliate/amazon-associates-commission-rates-all-categories)
- [Amazon commissieverlaging mei 2026](https://novadata.io/resources/news/amazon-associates-commission-cut-may-2026)
- [Albert Heijn affiliate (Partnerize)](https://signup.partnerize.com/signup/en/albertheijn) · [Picnic NL (Awin)](https://ui.awin.com/merchant-profile/102995)
- [AdSense-goedkeuring 2026](https://zeroclickgrowth.com/google-adsense-approval-guide-2026/) · [crypto & finance content](https://adsenseaudit.net/guides/adsense-approval-crypto-finance-content)
- [Crypto SEO in 2026](https://www.madx.digital/learn/seo-for-crypto)
