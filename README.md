# satmeter.io

Live Bitcoin-to-everyday-prices converter. Static site, no build step.
Every file in this repository is served as-is from `public_html`.

## Deployen naar Hostinger

Eenmalig instellen:

1. hPanel → Websites → satmeter.io → Beheren
2. Zoek in het menu links op **Geavanceerd → GIT**
3. Vul in:
   - Repository: `https://github.com/johandem69-glitch/Satmeter-site.git`
   - Branch: `main`
   - Map: **leeg laten**
4. Klik **Maken**

Let op dat mapveld. Het is relatief ten opzichte van `public_html`, dus als je
daar `public_html` invult krijg je `public_html/public_html` en zie je niets.

Vanaf dan: elke keer dat je hier iets wijzigt, ga je terug naar dat GIT-scherm
en klik je op **Deployen**. Hostinger haalt dan de nieuwste versie op.

## Een wijziging doorvoeren

1. Pas het bestand aan in `Documents\GitHub\Satmeter-site`
2. GitHub Desktop: Summary invullen, **Commit to main**, dan **Push origin**
3. hPanel → GIT → **Deployen**

Verander je iets in `assets/`, verhoog dan ook het versienummer in de
`?v=`-parameters (zie hieronder), anders blijven bezoekers de oude versie zien.

## Structuur

```
index.html              De converter (Engels)
es/index.html           De converter (Spaans)
articles/               22 Engelse gidsen
es/articles/            Spaanse vertalingen
assets/site.css         Alle styling voor de artikelpagina's
assets/sats.js          Live prijs-engine voor artikelpagina's
assets/nav.js           Mobiel hamburgermenu (alle pagina's)
assets/affiliate.js     Hardware-wallet affiliate-blokken (alle contentpagina's)
assets/consent.js       Cookiebanner, Google Consent Mode v2
sitemap.xml             Aanmelden in Google Search Console
robots.txt
.htaccess               Caching, compressie, beveiligingsheaders, blokkeert /docs/
docs/                   Werkplannen. Alleen voor jou, niet voor bezoekers.
```

### docs/

Hier staan de plannen die we onderweg hebben gemaakt:

| Bestand | Waarover |
| --- | --- |
| `docs/STATUS.md` | **Waar we staan, wat er nog open is, en de valkuilen** |
| `docs/DEPLOY.md` | De site live zetten op Hostinger |
| `docs/ADSENSE-EN-AFFILIATE.md` | Werkplan voor AdSense-goedkeuring en affiliates |
| `docs/MONETIZATION-PLAN.md` | Verdienmodel, realistische cijfers, valkuilen |

Deze bestanden staan in de repository zodat je ze altijd terugvindt, maar
`.htaccess` blokkeert alle `.md`-bestanden voor bezoekers. Zo kan niemand
`satmeter.io/docs/MONETIZATION-PLAN.md` opvragen.

## Waar je dingen aanpast

| Wat | Waar |
| --- | --- |
| Affiliate-links (BitBox, Trezor) | `assets/affiliate.js`, bovenaan in het CONFIG-blok |
| Teksten van de affiliate-blokken | `assets/affiliate.js`, het `L`-object |
| Menu-items van het mobiele menu | `assets/nav.js`, het `L`-object |
| Cloudflare Analytics token | Elke `.html`, zoek op `PASTE_YOUR_CLOUDFLARE_TOKEN_HERE` |
| Cache verversen na een asset-wijziging | Zoek-en-vervang `?v=2` door `?v=3` in alle `.html` |

### Waarom die `?v=2`

`.htaccess` laat browsers CSS en JS een maand bewaren. Dat maakt de site snel,
maar het betekent ook dat een terugkerende bezoeker jouw wijziging niet ziet.
Door het nummer achter `?v=` te verhogen ziet de browser het als een nieuw
bestand en haalt hij het opnieuw op. Doe dat bij elke wijziging in `assets/`.

## Nog te doen

- Cloudflare Web Analytics token invullen (staat nu als placeholder in alle pagina's)
- Productfoto's toevoegen: download de affiliate-creatives, verklein ze naar
  ongeveer 600px, zet ze in `assets/`, en vul de bestandsnamen in bij
  `IMG_BITBOX` en `IMG_TREZOR` in `assets/affiliate.js`. Hotlink de originelen
  niet: die zijn 3000x4000px en meerdere megabytes.
- Resterende Engelse gidsen naar Spaans vertalen
