/* Satmeter Tools — shared language + currency picker.
   Same mechanism as satmeter.io itself: a pill in the topbar (flag + language
   code + currency) that opens a searchable list of 18 languages / 21
   currencies. Picking a language also switches the display currency to the
   one that language's speakers are most likely to use, unless the visitor
   picked a currency by hand already — same rule as the main site.

   Translated UI text (data-i18n) is provided in full for English, Dutch,
   Spanish, Portuguese, French, German and Turkish (German/Turkish were
   added on top of satmeter.io's own list, specifically for tools.satmeter.io).
   The other 11 languages in the list fall back to English text but the
   currency and flag still switch correctly. Extend TOOLS_I18N below to add
   more full translations later. © Satmeter. */
(function (global) {
  "use strict";

  var LOCALE_KEY = "sm_tools_lang";
  var CURRENCY_MANUAL_KEY = "sm_tools_currency_manual";
  var CURRENCY_KEY = "sm_tools_currency";

  var LOCALE_META = {
    "en":    {flag:"🇺🇸", name:"English",    region:"United States",  code:"EN", base:"en"},
    "zh":    {flag:"🇨🇳", name:"中文 (简体)", region:"China", code:"ZH", base:"en"},
    "hi":    {flag:"🇮🇳", name:"हिन्दी", region:"India", code:"HI", base:"en"},
    "es-ES": {flag:"🇪🇸", name:"Español", region:"España", code:"ES", base:"es"},
    "es-MX": {flag:"🇲🇽", name:"Español", region:"México", code:"ES", base:"es"},
    "ar":    {flag:"🇸🇦", name:"العربية", region:"السعودية", code:"AR", base:"en"},
    "fr":    {flag:"🇫🇷", name:"Français", region:"France", code:"FR", base:"fr"},
    "bn":    {flag:"🇧🇩", name:"বাংলা", region:"Bangladesh", code:"BN", base:"en"},
    "pt-PT": {flag:"🇵🇹", name:"Português", region:"Portugal", code:"PT", base:"pt"},
    "pt-BR": {flag:"🇧🇷", name:"Português", region:"Brasil", code:"PT", base:"pt"},
    "ru":    {flag:"🇷🇺", name:"Русский", region:"Россия", code:"RU", base:"en"},
    "ja":    {flag:"🇯🇵", name:"日本語", region:"日本", code:"JA", base:"en"},
    "ko":    {flag:"🇰🇷", name:"한국어", region:"대한민국", code:"KO", base:"en"},
    "id":    {flag:"🇮🇩", name:"Bahasa Indonesia", region:"Indonesia", code:"ID", base:"en"},
    "vi":    {flag:"🇻🇳", name:"Tiếng Việt", region:"Việt Nam", code:"VI", base:"en"},
    "nl":    {flag:"🇳🇱", name:"Nederlands", region:"Nederland", code:"NL", base:"nl"},
    "de":    {flag:"🇩🇪", name:"Deutsch", region:"Deutschland", code:"DE", base:"de"},
    "tr":    {flag:"🇹🇷", name:"Türkçe", region:"Türkiye", code:"TR", base:"tr"}
  };

  var LANG_CURRENCY = {
    en:"USD", zh:"CNY", hi:"INR", ar:"SAR", fr:"EUR", bn:"BDT",
    ru:"RUB", ja:"JPY", ko:"KRW", id:"IDR", vi:"VND", nl:"EUR",
    "es-ES":"EUR", "es-MX":"MXN", "pt-PT":"EUR", "pt-BR":"BRL",
    de:"EUR", tr:"TRY"
  };

  var CUR_NAMES = {
    USD:"us dollar", EUR:"euro", GBP:"british pound sterling", CNY:"chinese yuan renminbi",
    JPY:"japanese yen", KRW:"korean won", INR:"indian rupee", BDT:"bangladeshi taka",
    IDR:"indonesian rupiah", VND:"vietnamese dong", BRL:"brazilian real",
    MXN:"mexican peso", RUB:"russian ruble rouble", SAR:"saudi riyal", AED:"uae dirham",
    TRY:"turkish lira", NGN:"nigerian naira", ZAR:"south african rand",
    CAD:"canadian dollar", AUD:"australian dollar", CHF:"swiss franc"
  };
  /* Localized currency names, one set per fully-translated base language.
     Used to label converter results (e.g. "Euro (EUR)") in the visitor's own
     language instead of just the ISO code. Languages without a full UI
     translation (see TOOLS_I18N below) fall back to the English names. */
  var CUR_NAMES_I18N = {
    en: {
      USD:"US Dollar", EUR:"Euro", GBP:"British Pound", CNY:"Chinese Yuan", JPY:"Japanese Yen",
      KRW:"South Korean Won", INR:"Indian Rupee", BDT:"Bangladeshi Taka", IDR:"Indonesian Rupiah",
      VND:"Vietnamese Dong", BRL:"Brazilian Real", MXN:"Mexican Peso", RUB:"Russian Ruble",
      SAR:"Saudi Riyal", AED:"UAE Dirham", TRY:"Turkish Lira", NGN:"Nigerian Naira",
      ZAR:"South African Rand", CAD:"Canadian Dollar", AUD:"Australian Dollar", CHF:"Swiss Franc"
    },
    nl: {
      USD:"Amerikaanse dollar", EUR:"Euro", GBP:"Britse pond", CNY:"Chinese yuan", JPY:"Japanse yen",
      KRW:"Zuid-Koreaanse won", INR:"Indiase roepie", BDT:"Bengaalse taka", IDR:"Indonesische roepia",
      VND:"Vietnamese dong", BRL:"Braziliaanse real", MXN:"Mexicaanse peso", RUB:"Russische roebel",
      SAR:"Saoedische riyal", AED:"VAE-dirham", TRY:"Turkse lira", NGN:"Nigeriaanse naira",
      ZAR:"Zuid-Afrikaanse rand", CAD:"Canadese dollar", AUD:"Australische dollar", CHF:"Zwitserse frank"
    },
    es: {
      USD:"Dólar estadounidense", EUR:"Euro", GBP:"Libra esterlina", CNY:"Yuan chino", JPY:"Yen japonés",
      KRW:"Won surcoreano", INR:"Rupia india", BDT:"Taka bangladesí", IDR:"Rupia indonesia",
      VND:"Dong vietnamita", BRL:"Real brasileño", MXN:"Peso mexicano", RUB:"Rublo ruso",
      SAR:"Riyal saudí", AED:"Dirham de EAU", TRY:"Lira turca", NGN:"Naira nigeriano",
      ZAR:"Rand sudafricano", CAD:"Dólar canadiense", AUD:"Dólar australiano", CHF:"Franco suizo"
    },
    pt: {
      USD:"Dólar americano", EUR:"Euro", GBP:"Libra esterlina", CNY:"Yuan chinês", JPY:"Iene japonês",
      KRW:"Won sul-coreano", INR:"Rupia indiana", BDT:"Taka bangladeshi", IDR:"Rupia indonésia",
      VND:"Dong vietnamita", BRL:"Real brasileiro", MXN:"Peso mexicano", RUB:"Rublo russo",
      SAR:"Rial saudita", AED:"Dirham dos EAU", TRY:"Lira turca", NGN:"Naira nigeriana",
      ZAR:"Rand sul-africano", CAD:"Dólar canadense", AUD:"Dólar australiano", CHF:"Franco suíço"
    },
    fr: {
      USD:"Dollar américain", EUR:"Euro", GBP:"Livre sterling", CNY:"Yuan chinois", JPY:"Yen japonais",
      KRW:"Won sud-coréen", INR:"Roupie indienne", BDT:"Taka bangladais", IDR:"Roupie indonésienne",
      VND:"Dong vietnamien", BRL:"Real brésilien", MXN:"Peso mexicain", RUB:"Rouble russe",
      SAR:"Riyal saoudien", AED:"Dirham des ÉAU", TRY:"Livre turque", NGN:"Naira nigérian",
      ZAR:"Rand sud-africain", CAD:"Dollar canadien", AUD:"Dollar australien", CHF:"Franc suisse"
    },
    de: {
      USD:"US-Dollar", EUR:"Euro", GBP:"Britisches Pfund", CNY:"Chinesischer Yuan", JPY:"Japanischer Yen",
      KRW:"Südkoreanischer Won", INR:"Indische Rupie", BDT:"Bangladeschische Taka", IDR:"Indonesische Rupiah",
      VND:"Vietnamesischer Dong", BRL:"Brasilianischer Real", MXN:"Mexikanischer Peso", RUB:"Russischer Rubel",
      SAR:"Saudi-Riyal", AED:"VAE-Dirham", TRY:"Türkische Lira", NGN:"Nigerianischer Naira",
      ZAR:"Südafrikanischer Rand", CAD:"Kanadischer Dollar", AUD:"Australischer Dollar", CHF:"Schweizer Franken"
    },
    tr: {
      USD:"Amerikan doları", EUR:"Euro", GBP:"İngiliz sterlini", CNY:"Çin yuanı", JPY:"Japon yeni",
      KRW:"Güney Kore wonu", INR:"Hindistan rupisi", BDT:"Bangladeş takası", IDR:"Endonezya rupiahı",
      VND:"Vietnam dongu", BRL:"Brezilya reali", MXN:"Meksika pesosu", RUB:"Rus rublesi",
      SAR:"Suudi riyali", AED:"BAE dirhemi", TRY:"Türk lirası", NGN:"Nijerya nairası",
      ZAR:"Güney Afrika randı", CAD:"Kanada doları", AUD:"Avustralya doları", CHF:"İsviçre frangı"
    }
  };

  function currencyName(code) {
    var base = ((global.SatmeterLocale && global.SatmeterLocale.lang) || "en").toLowerCase().split("-")[0];
    var table = CUR_NAMES_I18N[base] || CUR_NAMES_I18N.en;
    return table[code] || CUR_NAMES_I18N.en[code] || code;
  }

  var REGION_ALIASES = {
    zh:"china prc", hi:"india bharat", ar:"saudi arabia arabic middle east",
    ru:"russia", ja:"japan nippon", ko:"korea south korea", bn:"bangladesh",
    vi:"vietnam", id:"indonesia", "es-ES":"spain", "es-MX":"mexico",
    "pt-PT":"portugal", "pt-BR":"brazil", nl:"netherlands holland dutch",
    fr:"france", en:"usa united states america",
    de:"germany deutschland", tr:"turkey turkiye"
  };

  /* ---------- translations ---------- */
  var TOOLS_I18N = {
    en: {
      backToSatmeter:"🛒 Visit satmeter.io", darkMode:"Dark mode", lightMode:"Light mode",
      footerMade:"Free Bitcoin calculators, made by", footerPrivacy:"Privacy", footerTerms:"Terms",
      footerAllTools:"All tools", footerDisclaimer:"Not financial advice.",
      relatedHeading:"Also useful", ctaSatmeter:"View satmeter.io →",
      idxKicker:"Free · live prices · no account", idxH1a:"Bitcoin calculators from",
      idxStandfirst:"Four simple tools that calculate with a live Bitcoin price — no signup, no download. Looking for the full comparison that puts Bitcoin next to your daily groceries? That's on",
      idxLiveVia:"Live BTC price via", idxUpdated:"updated",
      idxCard1t:"Sats to currency converter", idxCard1b:"Convert satoshis to your currency and back, based on the live BTC price.",
      idxCard2t:"Bitcoin to fiat converter", idxCard2b:"Convert BTC to EUR, USD, GBP and more, live.",
      idxCard3t:"Bitcoin vs. mortgage calculator", idxCard3b:"What does extra repayment get you, compared to putting the same amount into Bitcoin?",
      idxCard4t:"Compound interest / DCA calculator", idxCard4b:"See what a fixed monthly amount becomes with compound growth — and what that is in sats.",
      idxOpen:"Open tool →", idxDidYouKnow:"Did you know?",
      idxDidYouKnowBody:"Satmeter shows live what your groceries, coffee or rent cost in sats — not just a price.",
      idxWhyH2:"Why these tools?",
      idxWhyP1:"These are small, fast calculators that do one thing well — no account, no tracking forms, an instant answer. All prices come in live via the same five-source price engine that also runs on",
      idxWhyP2:"None of these tools are financial advice. Bitcoin is volatile; use the results as illustration, not decision.",
      euroKicker:"Converter", euroH1:"Sats to", euroStandfirst:"Enter an amount in sats or in your chosen currency — the other side updates automatically, using the live Bitcoin price.",
      euroSats:"Satoshis (sats)", euroAmount:"Amount", euroFillIn:"Enter an amount…", euroWaiting:"Waiting for live price…",
      euroKnowTitle:"Good to know:", euroKnowBody:"1 Bitcoin = 100,000,000 sats. A \"sat\" (satoshi) is the smallest unit of Bitcoin, named after Satoshi Nakamoto.",
      euroCurious:"Curious what this is in groceries?", euroCuriousBody:"Satmeter puts Bitcoin next to your daily spending, not just a price.",
      fiatKicker:"Converter", fiatH1:"Bitcoin to", fiatStandfirst:"Enter a BTC amount and see its value instantly in several currencies at once — with a live price from five redundant sources.",
      fiatBitcoin:"Bitcoin (BTC)", fiatCurious:"Want to know what that is in groceries?", fiatCuriousBody:"Satmeter puts Bitcoin next to your daily spending.",
      hypoKicker:"Calculator", hypoH1a:"Bitcoin vs.", hypoH1b:"Mortgage",
      hypoStandfirst:"Repaying extra on your mortgage is a guaranteed, risk-free return equal to your mortgage rate. Bitcoin might return more — or less. Enter your own assumptions and compare both scenarios.",
      hypoWarnTitle:"This is not financial advice.", hypoWarnBody:"It's a calculation model based on the assumptions you enter. Extra repayment is risk-free; the Bitcoin return below is an estimate you choose yourself, not a prediction. Past returns are no guarantee for the future.",
      hypoPmt:"Extra amount per month", hypoYears:"Term", hypoYearsUnit:"years", hypoMortRate:"Mortgage rate", hypoBtcRate:"Expected BTC return",
      hypoResMort:"Extra repayment gets you", hypoResBtc:"Putting it in Bitcoin gets you",
      hypoHowTitle:"How is this calculated?", hypoHowBody:"Both sides use the same compound-interest formula on your monthly amount: repaying extra guarantees you save your mortgage rate on the amount repaid; the Bitcoin side uses the return percentage you set yourself. Lower that percentage to see a more cautious scenario.",
      hypoCurious:"Curious what your Bitcoin is already worth in groceries?", hypoCuriousBody:"Satmeter puts Bitcoin next to your daily spending.",
      hypoWinsOver:"Bitcoin scenario is higher than repaying", hypoLosesOver:"Repaying is higher than the Bitcoin scenario",
      hypoAssumption:"per month over", hypoAssumption2:"years (BTC assumption:", hypoAssumption3:"%/yr, mortgage rate:",
      dcaKicker:"Calculator", dcaH1a:"Compound interest /", dcaH1b:"DCA",
      dcaStandfirst:"Enter a fixed monthly amount, an expected annual return and a term. See how compound growth multiplies your contributions — and what the final value would be in sats today.",
      dcaPmt:"Monthly contribution", dcaYears:"Term", dcaYearsUnit:"years", dcaRate:"Expected return",
      dcaResIn:"Total contributed", dcaResFv:"Final value", dcaResGrowth:"Growth from compound interest",
      dcaSatsSub:"That's the final value, converted to sats at today's price",
      dcaWhySats:"Why sats?", dcaWhySatsBody:"This conversion uses today's BTC price, not a predicted future price — it only shows how much Bitcoin purchasing power that final value would represent today, purely for illustration.",
      dcaCurious:"Want to see that amount in groceries?", dcaCuriousBody:"Satmeter puts Bitcoin next to your daily spending.",
      dcaThatIs:"That's", dcaBtcAtToday:"BTC at today's price (1 BTC =",
      lmTitle:"Choose your currency and language", lmSub:"Numbers switch to the currency of the region you pick. You can change the currency separately at any time.",
      lmSearchPh:"Search language, country or currency…",
      lmFoot:"Your choice is remembered on this device. Bitcoin has one global price — only the display currency changes."
    },
    nl: {
      backToSatmeter:"🛒 Naar satmeter.io", darkMode:"Dark mode", lightMode:"Light mode",
      footerMade:"Gratis Bitcoin-rekentools, gemaakt door", footerPrivacy:"Privacy", footerTerms:"Voorwaarden",
      footerAllTools:"Alle tools", footerDisclaimer:"Geen financieel advies.",
      relatedHeading:"Ook handig", ctaSatmeter:"Bekijk satmeter.io →",
      idxKicker:"Gratis · live prijzen · geen account", idxH1a:"Bitcoin-rekentools van",
      idxStandfirst:"Vier simpele tools die met een live Bitcoin-koers rekenen — geen registratie, geen download. Zoek je de volledige vergelijker die Bitcoin naast je dagelijkse boodschappen zet? Die staat op",
      idxLiveVia:"Live BTC-koers via", idxUpdated:"bijgewerkt",
      idxCard1t:"Sats naar valuta converter", idxCard1b:"Reken satoshi's om naar jouw valuta en terug, op basis van de live BTC-koers.",
      idxCard2t:"Bitcoin naar fiat converter", idxCard2b:"BTC omrekenen naar EUR, USD, GBP en meer, live bijgewerkt.",
      idxCard3t:"Bitcoin vs. hypotheek calculator", idxCard3b:"Wat levert extra aflossen op, vergeleken met datzelfde bedrag in Bitcoin zetten?",
      idxCard4t:"Rente-op-rente / DCA calculator", idxCard4b:"Zie hoeveel een vast maandbedrag wordt bij samengestelde groei — en wat dat in sats is.",
      idxOpen:"Open tool →", idxDidYouKnow:"Wist je dat?",
      idxDidYouKnowBody:"Satmeter laat live zien wat je boodschappen, koffie of huur in sats kosten — niet alleen een koersje.",
      idxWhyH2:"Waarom deze tools?",
      idxWhyP1:"Dit zijn kleine, snelle rekentools die één ding goed doen — geen account, geen tracking-formulieren, direct een antwoord. Alle koersen komen live binnen via dezelfde vijf-bronnen-prijsmotor die ook op",
      idxWhyP2:"Geen van deze tools is financieel advies. Bitcoin is volatiel; gebruik de uitkomsten als illustratie, niet als beslissing.",
      euroKicker:"Converter", euroH1:"Sats naar", euroStandfirst:"Vul een bedrag in sats of in je gekozen valuta in — de andere kant rekent automatisch mee, met de live Bitcoin-koers.",
      euroSats:"Satoshi's (sats)", euroAmount:"Bedrag", euroFillIn:"Vul een bedrag in…", euroWaiting:"Wachten op live koers…",
      euroKnowTitle:"Handig om te weten:", euroKnowBody:"1 Bitcoin = 100.000.000 sats. Een \"sat\" (satoshi) is de kleinste eenheid van Bitcoin, vernoemd naar Satoshi Nakamoto.",
      euroCurious:"Nieuwsgierig wat dit is in boodschappen?", euroCuriousBody:"Satmeter zet Bitcoin naast je dagelijkse uitgaven, niet alleen een koers.",
      fiatKicker:"Converter", fiatH1:"Bitcoin naar", fiatStandfirst:"Vul een BTC-bedrag in en zie direct de waarde in meerdere valuta's tegelijk — met een live koers uit vijf redundante bronnen.",
      fiatBitcoin:"Bitcoin (BTC)", fiatCurious:"Wil je weten wat dat in boodschappen is?", fiatCuriousBody:"Satmeter zet Bitcoin naast je dagelijkse uitgaven.",
      hypoKicker:"Calculator", hypoH1a:"Bitcoin vs.", hypoH1b:"Hypotheek",
      hypoStandfirst:"Extra aflossen op je hypotheek is een gegarandeerd, risicovrij rendement gelijk aan je hypotheekrente. Bitcoin kan meer opleveren — of minder. Vul je eigen aannames in en vergelijk de twee scenario's.",
      hypoWarnTitle:"Dit is geen financieel advies.", hypoWarnBody:"Het is een rekenmodel op basis van de aannames die jij invult. Extra aflossen is risicovrij; het Bitcoin-rendement hieronder is een schatting die jij zelf kiest, geen voorspelling. Historisch rendement is geen garantie voor de toekomst.",
      hypoPmt:"Extra bedrag per maand", hypoYears:"Looptijd", hypoYearsUnit:"jaar", hypoMortRate:"Hypotheekrente", hypoBtcRate:"Verwacht BTC-rendement",
      hypoResMort:"Extra aflossen levert op", hypoResBtc:"In Bitcoin zetten levert op",
      hypoHowTitle:"Hoe wordt dit berekend?", hypoHowBody:"Beide kanten gebruiken dezelfde rente-op-rente-formule op je maandbedrag: bij aflossen bespaar je gegarandeerd je hypotheekrente over het afgeloste bedrag; bij Bitcoin reken je met het rendementspercentage dat je zelf instelt. Zet dat percentage lager om een voorzichtiger scenario te zien.",
      hypoCurious:"Benieuwd wat je Bitcoin nu al waard is in boodschappen?", hypoCuriousBody:"Satmeter zet Bitcoin naast je dagelijkse uitgaven.",
      hypoWinsOver:"Bitcoin-scenario ligt hoger dan aflossen", hypoLosesOver:"Aflossen ligt hoger dan het Bitcoin-scenario",
      hypoAssumption:"per maand over", hypoAssumption2:"jaar (BTC-aanname:", hypoAssumption3:"%/jr, hypotheekrente:",
      dcaKicker:"Calculator", dcaH1a:"Rente-op-rente /", dcaH1b:"DCA",
      dcaStandfirst:"Vul een vast maandbedrag, een verwacht jaarlijks rendement en een looptijd in. Zie hoe samengestelde groei je inleg vermenigvuldigt — en wat de eindwaarde vandaag in sats zou zijn.",
      dcaPmt:"Inleg per maand", dcaYears:"Looptijd", dcaYearsUnit:"jaar", dcaRate:"Verwacht rendement",
      dcaResIn:"Totaal ingelegd", dcaResFv:"Eindwaarde", dcaResGrowth:"Groei door rente-op-rente",
      dcaSatsSub:"Dat is de eindwaarde, omgerekend naar sats tegen de koers van vandaag",
      dcaWhySats:"Waarom sats?", dcaWhySatsBody:"Deze omrekening gebruikt de huidige BTC-koers, niet een voorspelde toekomstige koers — het laat alleen zien hoeveel koopkracht in Bitcoin die eindwaarde vandaag zou vertegenwoordigen, puur ter illustratie.",
      dcaCurious:"Wil je dat bedrag in boodschappen zien?", dcaCuriousBody:"Satmeter zet Bitcoin naast je dagelijkse uitgaven.",
      dcaThatIs:"Dat is", dcaBtcAtToday:"BTC tegen de koers van vandaag (1 BTC =",
      lmTitle:"Kies je valuta en taal", lmSub:"Bedragen wisselen naar de valuta van de regio die je kiest. Je kan de valuta ook apart wijzigen, op elk moment.",
      lmSearchPh:"Zoek taal, land of valuta…",
      lmFoot:"Je keuze wordt onthouden op dit apparaat. Bitcoin heeft één wereldwijde prijs — alleen de weergavevaluta verandert."
    },
    es: {
      backToSatmeter:"🛒 Ir a satmeter.io", darkMode:"Modo oscuro", lightMode:"Modo claro",
      footerMade:"Calculadoras Bitcoin gratuitas, creadas por", footerPrivacy:"Privacidad", footerTerms:"Términos",
      footerAllTools:"Todas las herramientas", footerDisclaimer:"No es asesoramiento financiero.",
      relatedHeading:"También útil", ctaSatmeter:"Ver satmeter.io →",
      idxKicker:"Gratis · precios en vivo · sin cuenta", idxH1a:"Calculadoras de Bitcoin de",
      idxStandfirst:"Cuatro herramientas simples que calculan con el precio de Bitcoin en vivo — sin registro, sin descarga. ¿Buscas el comparador completo que pone Bitcoin junto a tus compras diarias? Está en",
      idxLiveVia:"Precio BTC en vivo vía", idxUpdated:"actualizado",
      idxCard1t:"Conversor de sats a tu moneda", idxCard1b:"Convierte satoshis a tu moneda y viceversa, con el precio de BTC en vivo.",
      idxCard2t:"Conversor de Bitcoin a moneda fiat", idxCard2b:"Convierte BTC a EUR, USD, GBP y más, en vivo.",
      idxCard3t:"Calculadora Bitcoin vs. hipoteca", idxCard3b:"¿Qué obtienes al amortizar extra, comparado con poner esa misma cantidad en Bitcoin?",
      idxCard4t:"Calculadora de interés compuesto / DCA", idxCard4b:"Ve en cuánto se convierte una cantidad mensual fija con crecimiento compuesto — y cuánto es eso en sats.",
      idxOpen:"Abrir herramienta →", idxDidYouKnow:"¿Sabías que?",
      idxDidYouKnowBody:"Satmeter muestra en vivo cuánto cuestan tus compras, café o alquiler en sats — no solo un precio.",
      idxWhyH2:"¿Por qué estas herramientas?",
      idxWhyP1:"Son calculadoras pequeñas y rápidas que hacen bien una cosa — sin cuenta, sin formularios de rastreo, respuesta instantánea. Todos los precios llegan en vivo mediante el mismo motor de cinco fuentes que también funciona en",
      idxWhyP2:"Ninguna de estas herramientas es asesoramiento financiero. Bitcoin es volátil; usa los resultados como ilustración, no como decisión.",
      euroKicker:"Conversor", euroH1:"Sats a", euroStandfirst:"Introduce una cantidad en sats o en tu moneda elegida — el otro lado se calcula automáticamente, con el precio de Bitcoin en vivo.",
      euroSats:"Satoshis (sats)", euroAmount:"Cantidad", euroFillIn:"Introduce una cantidad…", euroWaiting:"Esperando precio en vivo…",
      euroKnowTitle:"Bueno saberlo:", euroKnowBody:"1 Bitcoin = 100.000.000 sats. Un \"sat\" (satoshi) es la unidad más pequeña de Bitcoin, nombrada en honor a Satoshi Nakamoto.",
      euroCurious:"¿Curioso por saber esto en compras?", euroCuriousBody:"Satmeter pone Bitcoin junto a tu gasto diario, no solo un precio.",
      fiatKicker:"Conversor", fiatH1:"Bitcoin a", fiatStandfirst:"Introduce una cantidad en BTC y ve su valor al instante en varias monedas a la vez — con un precio en vivo de cinco fuentes redundantes.",
      fiatBitcoin:"Bitcoin (BTC)", fiatCurious:"¿Quieres saber cuánto es eso en compras?", fiatCuriousBody:"Satmeter pone Bitcoin junto a tu gasto diario.",
      hypoKicker:"Calculadora", hypoH1a:"Bitcoin vs.", hypoH1b:"Hipoteca",
      hypoStandfirst:"Amortizar extra en tu hipoteca es un rendimiento garantizado y sin riesgo igual a tu tasa hipotecaria. Bitcoin podría rendir más — o menos. Introduce tus propias suposiciones y compara ambos escenarios.",
      hypoWarnTitle:"Esto no es asesoramiento financiero.", hypoWarnBody:"Es un modelo de cálculo basado en las suposiciones que introduces. La amortización extra no tiene riesgo; el rendimiento de Bitcoin abajo es una estimación que tú eliges, no una predicción. Los rendimientos pasados no garantizan el futuro.",
      hypoPmt:"Cantidad extra por mes", hypoYears:"Plazo", hypoYearsUnit:"años", hypoMortRate:"Tasa hipotecaria", hypoBtcRate:"Rendimiento BTC esperado",
      hypoResMort:"Amortizar extra te da", hypoResBtc:"Ponerlo en Bitcoin te da",
      hypoHowTitle:"¿Cómo se calcula esto?", hypoHowBody:"Ambos lados usan la misma fórmula de interés compuesto sobre tu cantidad mensual: al amortizar ahorras garantizado tu tasa hipotecaria sobre lo amortizado; el lado Bitcoin usa el porcentaje de rendimiento que tú fijas. Baja ese porcentaje para ver un escenario más cauteloso.",
      hypoCurious:"¿Curioso por saber cuánto vale ya tu Bitcoin en compras?", hypoCuriousBody:"Satmeter pone Bitcoin junto a tu gasto diario.",
      hypoWinsOver:"El escenario Bitcoin es mayor que amortizar", hypoLosesOver:"Amortizar es mayor que el escenario Bitcoin",
      hypoAssumption:"por mes durante", hypoAssumption2:"años (suposición BTC:", hypoAssumption3:"%/año, tasa hipotecaria:",
      dcaKicker:"Calculadora", dcaH1a:"Interés compuesto /", dcaH1b:"DCA",
      dcaStandfirst:"Introduce una cantidad mensual fija, un rendimiento anual esperado y un plazo. Ve cómo el crecimiento compuesto multiplica tus aportaciones — y cuál sería el valor final en sats hoy.",
      dcaPmt:"Aportación mensual", dcaYears:"Plazo", dcaYearsUnit:"años", dcaRate:"Rendimiento esperado",
      dcaResIn:"Total aportado", dcaResFv:"Valor final", dcaResGrowth:"Crecimiento por interés compuesto",
      dcaSatsSub:"Ese es el valor final, convertido a sats al precio de hoy",
      dcaWhySats:"¿Por qué sats?", dcaWhySatsBody:"Esta conversión usa el precio actual de BTC, no un precio futuro predicho — solo muestra cuánto poder adquisitivo en Bitcoin representaría hoy ese valor final, puramente ilustrativo.",
      dcaCurious:"¿Quieres ver esa cantidad en compras?", dcaCuriousBody:"Satmeter pone Bitcoin junto a tu gasto diario.",
      dcaThatIs:"Eso es", dcaBtcAtToday:"BTC al precio de hoy (1 BTC =",
      lmTitle:"Elige tu moneda e idioma", lmSub:"Los importes cambian a la moneda de la región que elijas. Puedes cambiar la moneda por separado en cualquier momento.",
      lmSearchPh:"Buscar idioma, país o moneda…",
      lmFoot:"Tu elección se recuerda en este dispositivo. Bitcoin tiene un precio global único — solo cambia la moneda mostrada."
    },
    pt: {
      backToSatmeter:"🛒 Ir para satmeter.io", darkMode:"Modo escuro", lightMode:"Modo claro",
      footerMade:"Calculadoras Bitcoin gratuitas, feitas por", footerPrivacy:"Privacidade", footerTerms:"Termos",
      footerAllTools:"Todas as ferramentas", footerDisclaimer:"Não é aconselhamento financeiro.",
      relatedHeading:"Também útil", ctaSatmeter:"Ver satmeter.io →",
      idxKicker:"Grátis · preços ao vivo · sem conta", idxH1a:"Calculadoras de Bitcoin da",
      idxStandfirst:"Quatro ferramentas simples que calculam com o preço do Bitcoin ao vivo — sem cadastro, sem download. Procura o comparador completo que coloca o Bitcoin ao lado das suas compras diárias? Está em",
      idxLiveVia:"Preço BTC ao vivo via", idxUpdated:"atualizado",
      idxCard1t:"Conversor de sats para sua moeda", idxCard1b:"Converta satoshis para a sua moeda e volte, com o preço do BTC ao vivo.",
      idxCard2t:"Conversor de Bitcoin para moeda fiduciária", idxCard2b:"Converta BTC para EUR, USD, GBP e mais, ao vivo.",
      idxCard3t:"Calculadora Bitcoin vs. hipoteca", idxCard3b:"O que a amortização extra rende, comparado a colocar o mesmo valor em Bitcoin?",
      idxCard4t:"Calculadora de juros compostos / DCA", idxCard4b:"Veja em quanto se torna um valor mensal fixo com crescimento composto — e o que isso é em sats.",
      idxOpen:"Abrir ferramenta →", idxDidYouKnow:"Você sabia?",
      idxDidYouKnowBody:"Satmeter mostra ao vivo quanto suas compras, café ou aluguel custam em sats — não apenas um preço.",
      idxWhyH2:"Por que estas ferramentas?",
      idxWhyP1:"São calculadoras pequenas e rápidas que fazem bem uma coisa — sem conta, sem formulários de rastreamento, resposta instantânea. Todos os preços chegam ao vivo pelo mesmo motor de cinco fontes que também roda em",
      idxWhyP2:"Nenhuma dessas ferramentas é aconselhamento financeiro. Bitcoin é volátil; use os resultados como ilustração, não como decisão.",
      euroKicker:"Conversor", euroH1:"Sats para", euroStandfirst:"Insira um valor em sats ou na moeda escolhida — o outro lado calcula automaticamente, com o preço do Bitcoin ao vivo.",
      euroSats:"Satoshis (sats)", euroAmount:"Valor", euroFillIn:"Insira um valor…", euroWaiting:"Aguardando preço ao vivo…",
      euroKnowTitle:"Bom saber:", euroKnowBody:"1 Bitcoin = 100.000.000 sats. Um \"sat\" (satoshi) é a menor unidade do Bitcoin, nomeada em homenagem a Satoshi Nakamoto.",
      euroCurious:"Curioso sobre isso em compras?", euroCuriousBody:"Satmeter coloca o Bitcoin ao lado dos seus gastos diários, não apenas um preço.",
      fiatKicker:"Conversor", fiatH1:"Bitcoin para", fiatStandfirst:"Insira um valor em BTC e veja seu valor instantaneamente em várias moedas ao mesmo tempo — com preço ao vivo de cinco fontes redundantes.",
      fiatBitcoin:"Bitcoin (BTC)", fiatCurious:"Quer saber o que isso é em compras?", fiatCuriousBody:"Satmeter coloca o Bitcoin ao lado dos seus gastos diários.",
      hypoKicker:"Calculadora", hypoH1a:"Bitcoin vs.", hypoH1b:"Hipoteca",
      hypoStandfirst:"Amortizar extra na sua hipoteca é um retorno garantido e sem risco igual à sua taxa hipotecária. Bitcoin pode render mais — ou menos. Insira suas próprias suposições e compare os dois cenários.",
      hypoWarnTitle:"Isto não é aconselhamento financeiro.", hypoWarnBody:"É um modelo de cálculo baseado nas suposições que você insere. A amortização extra não tem risco; o retorno do Bitcoin abaixo é uma estimativa que você escolhe, não uma previsão. Retornos passados não garantem o futuro.",
      hypoPmt:"Valor extra por mês", hypoYears:"Prazo", hypoYearsUnit:"anos", hypoMortRate:"Taxa hipotecária", hypoBtcRate:"Retorno BTC esperado",
      hypoResMort:"Amortizar extra rende", hypoResBtc:"Colocar em Bitcoin rende",
      hypoHowTitle:"Como isso é calculado?", hypoHowBody:"Ambos os lados usam a mesma fórmula de juros compostos sobre seu valor mensal: ao amortizar você economiza garantidamente sua taxa hipotecária sobre o valor amortizado; o lado Bitcoin usa a porcentagem de retorno que você define. Diminua essa porcentagem para ver um cenário mais cauteloso.",
      hypoCurious:"Curioso sobre quanto seu Bitcoin já vale em compras?", hypoCuriousBody:"Satmeter coloca o Bitcoin ao lado dos seus gastos diários.",
      hypoWinsOver:"Cenário Bitcoin é maior que amortizar", hypoLosesOver:"Amortizar é maior que o cenário Bitcoin",
      hypoAssumption:"por mês durante", hypoAssumption2:"anos (suposição BTC:", hypoAssumption3:"%/ano, taxa hipotecária:",
      dcaKicker:"Calculadora", dcaH1a:"Juros compostos /", dcaH1b:"DCA",
      dcaStandfirst:"Insira um valor mensal fixo, um retorno anual esperado e um prazo. Veja como o crescimento composto multiplica suas contribuições — e qual seria o valor final em sats hoje.",
      dcaPmt:"Contribuição mensal", dcaYears:"Prazo", dcaYearsUnit:"anos", dcaRate:"Retorno esperado",
      dcaResIn:"Total contribuído", dcaResFv:"Valor final", dcaResGrowth:"Crescimento por juros compostos",
      dcaSatsSub:"Esse é o valor final, convertido para sats no preço de hoje",
      dcaWhySats:"Por que sats?", dcaWhySatsBody:"Esta conversão usa o preço atual do BTC, não um preço futuro previsto — mostra apenas quanto poder de compra em Bitcoin esse valor final representaria hoje, puramente ilustrativo.",
      dcaCurious:"Quer ver esse valor em compras?", dcaCuriousBody:"Satmeter coloca o Bitcoin ao lado dos seus gastos diários.",
      dcaThatIs:"Isso é", dcaBtcAtToday:"BTC no preço de hoje (1 BTC =",
      lmTitle:"Escolha sua moeda e idioma", lmSub:"Os valores mudam para a moeda da região escolhida. Você pode mudar a moeda separadamente a qualquer momento.",
      lmSearchPh:"Buscar idioma, país ou moeda…",
      lmFoot:"Sua escolha é lembrada neste dispositivo. Bitcoin tem um preço global único — apenas a moeda exibida muda."
    },
    fr: {
      backToSatmeter:"🛒 Aller sur satmeter.io", darkMode:"Mode sombre", lightMode:"Mode clair",
      footerMade:"Calculateurs Bitcoin gratuits, créés par", footerPrivacy:"Confidentialité", footerTerms:"Conditions",
      footerAllTools:"Tous les outils", footerDisclaimer:"Ce n'est pas un conseil financier.",
      relatedHeading:"Également utile", ctaSatmeter:"Voir satmeter.io →",
      idxKicker:"Gratuit · prix en direct · sans compte", idxH1a:"Calculateurs Bitcoin de",
      idxStandfirst:"Quatre outils simples qui calculent avec le prix du Bitcoin en direct — sans inscription, sans téléchargement. Vous cherchez le comparateur complet qui met le Bitcoin à côté de vos courses quotidiennes ? C'est sur",
      idxLiveVia:"Prix BTC en direct via", idxUpdated:"mis à jour",
      idxCard1t:"Convertisseur sats vers votre devise", idxCard1b:"Convertissez des satoshis vers votre devise et inversement, avec le prix BTC en direct.",
      idxCard2t:"Convertisseur Bitcoin vers devise", idxCard2b:"Convertissez BTC en EUR, USD, GBP et plus, en direct.",
      idxCard3t:"Calculateur Bitcoin vs. hypothèque", idxCard3b:"Que rapporte un remboursement anticipé, comparé à placer le même montant en Bitcoin ?",
      idxCard4t:"Calculateur d'intérêts composés / DCA", idxCard4b:"Découvrez ce que devient un montant mensuel fixe avec une croissance composée — et ce que cela représente en sats.",
      idxOpen:"Ouvrir l'outil →", idxDidYouKnow:"Le saviez-vous ?",
      idxDidYouKnowBody:"Satmeter montre en direct ce que vos courses, votre café ou votre loyer coûtent en sats — pas seulement un prix.",
      idxWhyH2:"Pourquoi ces outils ?",
      idxWhyP1:"Ce sont de petits outils rapides qui font bien une chose — pas de compte, pas de formulaire de suivi, une réponse instantanée. Tous les prix arrivent en direct via le même moteur à cinq sources qui tourne aussi sur",
      idxWhyP2:"Aucun de ces outils n'est un conseil financier. Le Bitcoin est volatil ; utilisez les résultats comme illustration, pas comme décision.",
      euroKicker:"Convertisseur", euroH1:"Sats vers", euroStandfirst:"Entrez un montant en sats ou dans la devise choisie — l'autre côté se met à jour automatiquement, avec le prix du Bitcoin en direct.",
      euroSats:"Satoshis (sats)", euroAmount:"Montant", euroFillIn:"Entrez un montant…", euroWaiting:"En attente du prix en direct…",
      euroKnowTitle:"Bon à savoir :", euroKnowBody:"1 Bitcoin = 100 000 000 sats. Un « sat » (satoshi) est la plus petite unité du Bitcoin, nommée en hommage à Satoshi Nakamoto.",
      euroCurious:"Curieux de savoir ce que c'est en courses ?", euroCuriousBody:"Satmeter met le Bitcoin à côté de vos dépenses quotidiennes, pas seulement un prix.",
      fiatKicker:"Convertisseur", fiatH1:"Bitcoin vers", fiatStandfirst:"Entrez un montant en BTC et voyez instantanément sa valeur dans plusieurs devises à la fois — avec un prix en direct issu de cinq sources redondantes.",
      fiatBitcoin:"Bitcoin (BTC)", fiatCurious:"Vous voulez savoir ce que c'est en courses ?", fiatCuriousBody:"Satmeter met le Bitcoin à côté de vos dépenses quotidiennes.",
      hypoKicker:"Calculateur", hypoH1a:"Bitcoin vs.", hypoH1b:"Hypothèque",
      hypoStandfirst:"Rembourser plus sur votre hypothèque est un rendement garanti et sans risque égal à votre taux hypothécaire. Le Bitcoin pourrait rapporter plus — ou moins. Entrez vos propres hypothèses et comparez les deux scénarios.",
      hypoWarnTitle:"Ceci n'est pas un conseil financier.", hypoWarnBody:"C'est un modèle de calcul basé sur les hypothèses que vous entrez. Le remboursement anticipé est sans risque ; le rendement Bitcoin ci-dessous est une estimation que vous choisissez, pas une prédiction. Les rendements passés ne garantissent pas l'avenir.",
      hypoPmt:"Montant supplémentaire par mois", hypoYears:"Durée", hypoYearsUnit:"ans", hypoMortRate:"Taux hypothécaire", hypoBtcRate:"Rendement BTC attendu",
      hypoResMort:"Le remboursement anticipé rapporte", hypoResBtc:"Le placer en Bitcoin rapporte",
      hypoHowTitle:"Comment cela est-il calculé ?", hypoHowBody:"Les deux côtés utilisent la même formule d'intérêts composés sur votre montant mensuel : en remboursant plus, vous économisez garantie votre taux hypothécaire sur le montant remboursé ; le côté Bitcoin utilise le pourcentage de rendement que vous fixez. Baissez ce pourcentage pour voir un scénario plus prudent.",
      hypoCurious:"Curieux de savoir ce que vaut déjà votre Bitcoin en courses ?", hypoCuriousBody:"Satmeter met le Bitcoin à côté de vos dépenses quotidiennes.",
      hypoWinsOver:"Le scénario Bitcoin est plus élevé que le remboursement", hypoLosesOver:"Le remboursement est plus élevé que le scénario Bitcoin",
      hypoAssumption:"par mois sur", hypoAssumption2:"ans (hypothèse BTC :", hypoAssumption3:"%/an, taux hypothécaire :",
      dcaKicker:"Calculateur", dcaH1a:"Intérêts composés /", dcaH1b:"DCA",
      dcaStandfirst:"Entrez un montant mensuel fixe, un rendement annuel attendu et une durée. Voyez comment la croissance composée multiplie vos versements — et quelle serait la valeur finale en sats aujourd'hui.",
      dcaPmt:"Versement mensuel", dcaYears:"Durée", dcaYearsUnit:"ans", dcaRate:"Rendement attendu",
      dcaResIn:"Total versé", dcaResFv:"Valeur finale", dcaResGrowth:"Croissance par intérêts composés",
      dcaSatsSub:"C'est la valeur finale, convertie en sats au prix d'aujourd'hui",
      dcaWhySats:"Pourquoi des sats ?", dcaWhySatsBody:"Cette conversion utilise le prix BTC actuel, pas un prix futur prédit — elle montre seulement quel pouvoir d'achat en Bitcoin cette valeur finale représenterait aujourd'hui, à titre purement illustratif.",
      dcaCurious:"Vous voulez voir ce montant en courses ?", dcaCuriousBody:"Satmeter met le Bitcoin à côté de vos dépenses quotidiennes.",
      dcaThatIs:"C'est", dcaBtcAtToday:"BTC au prix d'aujourd'hui (1 BTC =",
      lmTitle:"Choisissez votre devise et votre langue", lmSub:"Les montants passent à la devise de la région choisie. Vous pouvez changer la devise séparément à tout moment.",
      lmSearchPh:"Rechercher langue, pays ou devise…",
      lmFoot:"Votre choix est mémorisé sur cet appareil. Le Bitcoin a un prix mondial unique — seule la devise affichée change."
    },
    de: {
      backToSatmeter:"🛒 Zu satmeter.io", darkMode:"Dunkelmodus", lightMode:"Hellmodus",
      footerMade:"Kostenlose Bitcoin-Rechner, erstellt von", footerPrivacy:"Datenschutz", footerTerms:"Nutzungsbedingungen",
      footerAllTools:"Alle Tools", footerDisclaimer:"Keine Finanzberatung.",
      relatedHeading:"Auch nützlich", ctaSatmeter:"satmeter.io ansehen →",
      idxKicker:"Kostenlos · Live-Preise · kein Konto", idxH1a:"Bitcoin-Rechner von",
      idxStandfirst:"Vier einfache Tools, die mit einem Live-Bitcoin-Kurs rechnen — keine Anmeldung, kein Download. Suchst du den vollständigen Vergleich, der Bitcoin neben deinen täglichen Einkauf stellt? Den findest du auf",
      idxLiveVia:"Live-BTC-Kurs via", idxUpdated:"aktualisiert",
      idxCard1t:"Sats-zu-Währung-Rechner", idxCard1b:"Rechne Satoshis in deine Währung um und zurück, basierend auf dem Live-BTC-Kurs.",
      idxCard2t:"Bitcoin-zu-Fiat-Rechner", idxCard2b:"BTC live in EUR, USD, GBP und mehr umrechnen.",
      idxCard3t:"Bitcoin-vs.-Hypothek-Rechner", idxCard3b:"Was bringt eine Sondertilgung im Vergleich zum gleichen Betrag in Bitcoin?",
      idxCard4t:"Zinseszins- / DCA-Rechner", idxCard4b:"Sieh, was aus einem festen Monatsbetrag durch Zinseszins wird — und was das in Sats ist.",
      idxOpen:"Tool öffnen →", idxDidYouKnow:"Wusstest du schon?",
      idxDidYouKnowBody:"Satmeter zeigt live, was dein Einkauf, Kaffee oder deine Miete in Sats kostet — nicht nur einen Kurs.",
      idxWhyH2:"Warum diese Tools?",
      idxWhyP1:"Das sind kleine, schnelle Rechner, die eine Sache gut machen — kein Konto, keine Tracking-Formulare, sofort eine Antwort. Alle Kurse kommen live über dieselbe Fünf-Quellen-Preisengine, die auch auf",
      idxWhyP2:"Keines dieser Tools ist Finanzberatung. Bitcoin ist volatil; nutze die Ergebnisse zur Veranschaulichung, nicht als Entscheidungsgrundlage.",
      euroKicker:"Rechner", euroH1:"Sats zu", euroStandfirst:"Gib einen Betrag in Sats oder deiner gewählten Währung ein — die andere Seite rechnet automatisch mit, mit dem Live-Bitcoin-Kurs.",
      euroSats:"Satoshis (Sats)", euroAmount:"Betrag", euroFillIn:"Betrag eingeben…", euroWaiting:"Warte auf Live-Kurs…",
      euroKnowTitle:"Gut zu wissen:", euroKnowBody:"1 Bitcoin = 100.000.000 Sats. Ein „Sat“ (Satoshi) ist die kleinste Einheit von Bitcoin, benannt nach Satoshi Nakamoto.",
      euroCurious:"Neugierig, was das in Einkäufen ist?", euroCuriousBody:"Satmeter stellt Bitcoin neben deine täglichen Ausgaben, nicht nur einen Kurs.",
      fiatKicker:"Rechner", fiatH1:"Bitcoin zu", fiatStandfirst:"Gib einen BTC-Betrag ein und sieh sofort den Wert in mehreren Währungen gleichzeitig — mit einem Live-Kurs aus fünf redundanten Quellen.",
      fiatBitcoin:"Bitcoin (BTC)", fiatCurious:"Willst du wissen, was das in Einkäufen ist?", fiatCuriousBody:"Satmeter stellt Bitcoin neben deine täglichen Ausgaben.",
      hypoKicker:"Rechner", hypoH1a:"Bitcoin vs.", hypoH1b:"Hypothek",
      hypoStandfirst:"Eine Sondertilgung deiner Hypothek ist eine garantierte, risikofreie Rendite in Höhe deines Hypothekenzinses. Bitcoin könnte mehr — oder weniger — bringen. Gib deine eigenen Annahmen ein und vergleiche beide Szenarien.",
      hypoWarnTitle:"Dies ist keine Finanzberatung.", hypoWarnBody:"Es ist ein Rechenmodell auf Basis der von dir eingegebenen Annahmen. Die Sondertilgung ist risikofrei; die Bitcoin-Rendite unten ist eine von dir selbst gewählte Schätzung, keine Vorhersage. Vergangene Renditen sind keine Garantie für die Zukunft.",
      hypoPmt:"Zusätzlicher Betrag pro Monat", hypoYears:"Laufzeit", hypoYearsUnit:"Jahre", hypoMortRate:"Hypothekenzins", hypoBtcRate:"Erwartete BTC-Rendite",
      hypoResMort:"Sondertilgung bringt dir", hypoResBtc:"In Bitcoin anlegen bringt dir",
      hypoHowTitle:"Wie wird das berechnet?", hypoHowBody:"Beide Seiten nutzen dieselbe Zinseszins-Formel auf deinen Monatsbetrag: Bei der Sondertilgung sparst du garantiert deinen Hypothekenzins auf den getilgten Betrag; bei Bitcoin wird mit dem von dir selbst festgelegten Renditeprozentsatz gerechnet. Senke diesen Prozentsatz, um ein vorsichtigeres Szenario zu sehen.",
      hypoCurious:"Neugierig, was dein Bitcoin schon jetzt in Einkäufen wert ist?", hypoCuriousBody:"Satmeter stellt Bitcoin neben deine täglichen Ausgaben.",
      hypoWinsOver:"Bitcoin-Szenario liegt höher als die Tilgung", hypoLosesOver:"Die Tilgung liegt höher als das Bitcoin-Szenario",
      hypoAssumption:"pro Monat über", hypoAssumption2:"Jahre (BTC-Annahme:", hypoAssumption3:"%/Jahr, Hypothekenzins:",
      dcaKicker:"Rechner", dcaH1a:"Zinseszins /", dcaH1b:"DCA",
      dcaStandfirst:"Gib einen festen Monatsbetrag, eine erwartete jährliche Rendite und eine Laufzeit ein. Sieh, wie Zinseszins deine Einzahlungen vervielfacht — und was der Endwert heute in Sats wäre.",
      dcaPmt:"Monatliche Einzahlung", dcaYears:"Laufzeit", dcaYearsUnit:"Jahre", dcaRate:"Erwartete Rendite",
      dcaResIn:"Gesamt eingezahlt", dcaResFv:"Endwert", dcaResGrowth:"Wachstum durch Zinseszins",
      dcaSatsSub:"Das ist der Endwert, umgerechnet in Sats zum heutigen Kurs",
      dcaWhySats:"Warum Sats?", dcaWhySatsBody:"Diese Umrechnung nutzt den aktuellen BTC-Kurs, keinen vorhergesagten zukünftigen Kurs — sie zeigt nur, wie viel Bitcoin-Kaufkraft dieser Endwert heute darstellen würde, rein zur Veranschaulichung.",
      dcaCurious:"Willst du diesen Betrag in Einkäufen sehen?", dcaCuriousBody:"Satmeter stellt Bitcoin neben deine täglichen Ausgaben.",
      dcaThatIs:"Das sind", dcaBtcAtToday:"BTC zum heutigen Kurs (1 BTC =",
      lmTitle:"Wähle deine Währung und Sprache", lmSub:"Beträge wechseln zur Währung der gewählten Region. Du kannst die Währung jederzeit separat ändern.",
      lmSearchPh:"Sprache, Land oder Währung suchen…",
      lmFoot:"Deine Wahl wird auf diesem Gerät gespeichert. Bitcoin hat einen weltweiten Preis — nur die angezeigte Währung ändert sich."
    },
    tr: {
      backToSatmeter:"🛒 satmeter.io'ya git", darkMode:"Koyu mod", lightMode:"Açık mod",
      footerMade:"Ücretsiz Bitcoin hesaplayıcıları, geliştiren:", footerPrivacy:"Gizlilik", footerTerms:"Koşullar",
      footerAllTools:"Tüm araçlar", footerDisclaimer:"Finansal tavsiye değildir.",
      relatedHeading:"Ayrıca faydalı", ctaSatmeter:"satmeter.io'yu görüntüle →",
      idxKicker:"Ücretsiz · canlı fiyatlar · hesap gerekmez", idxH1a:"Bitcoin hesaplayıcıları,",
      idxStandfirst:"Canlı Bitcoin fiyatıyla hesaplayan dört basit araç — kayıt yok, indirme yok. Bitcoin'i günlük market alışverişinizle karşılaştıran tam karşılaştırmayı mı arıyorsunuz? O da",
      idxLiveVia:"Canlı BTC fiyatı kaynağı:", idxUpdated:"güncellendi",
      idxCard1t:"Sats'tan para birimine çevirici", idxCard1b:"Satoshi'yi canlı BTC fiyatına göre kendi para biriminize ve geri çevirin.",
      idxCard2t:"Bitcoin'den fiat'a çevirici", idxCard2b:"BTC'yi canlı olarak EUR, USD, GBP ve daha fazlasına çevirin.",
      idxCard3t:"Bitcoin vs. mortgage hesaplayıcısı", idxCard3b:"Ekstra ödeme yapmak, aynı tutarı Bitcoin'e yatırmakla karşılaştırıldığında ne kazandırır?",
      idxCard4t:"Bileşik faiz / DCA hesaplayıcısı", idxCard4b:"Sabit bir aylık tutarın bileşik büyümeyle neye dönüştüğünü görün — ve bunun sats karşılığını.",
      idxOpen:"Aracı aç →", idxDidYouKnow:"Biliyor muydunuz?",
      idxDidYouKnowBody:"Satmeter, market alışverişinizin, kahvenizin veya kiranızın sats cinsinden ne kadar tuttuğunu canlı olarak gösterir — sadece bir fiyat değil.",
      idxWhyH2:"Bu araçlar neden var?",
      idxWhyP1:"Bunlar tek bir şeyi iyi yapan küçük, hızlı hesaplayıcılardır — hesap yok, takip formu yok, anında yanıt. Tüm fiyatlar, ayrıca çalışan aynı beş kaynaklı fiyat motoru üzerinden canlı gelir:",
      idxWhyP2:"Bu araçların hiçbiri finansal tavsiye değildir. Bitcoin oynaktır; sonuçları karar değil, örnek olarak kullanın.",
      euroKicker:"Çevirici", euroH1:"Sats'tan", euroStandfirst:"Sats veya seçtiğiniz para biriminde bir tutar girin — diğer taraf canlı Bitcoin fiyatıyla otomatik olarak güncellenir.",
      euroSats:"Satoshi (sats)", euroAmount:"Tutar", euroFillIn:"Bir tutar girin…", euroWaiting:"Canlı fiyat bekleniyor…",
      euroKnowTitle:"Bilmekte fayda var:", euroKnowBody:"1 Bitcoin = 100.000.000 sats. Bir \"sat\" (satoshi), Satoshi Nakamoto'nun adını taşıyan Bitcoin'in en küçük birimidir.",
      euroCurious:"Bunun market alışverişinde ne olduğunu merak ediyor musunuz?", euroCuriousBody:"Satmeter, Bitcoin'i sadece bir fiyat olarak değil, günlük harcamalarınızın yanında gösterir.",
      fiatKicker:"Çevirici", fiatH1:"Bitcoin'den", fiatStandfirst:"Bir BTC tutarı girin ve değerini beş yedekli kaynaktan gelen canlı bir fiyatla anında birden fazla para biriminde görün.",
      fiatBitcoin:"Bitcoin (BTC)", fiatCurious:"Bunun market alışverişinde ne olduğunu bilmek ister misiniz?", fiatCuriousBody:"Satmeter, Bitcoin'i günlük harcamalarınızın yanında gösterir.",
      hypoKicker:"Hesaplayıcı", hypoH1a:"Bitcoin vs.", hypoH1b:"Mortgage",
      hypoStandfirst:"Mortgage'ınıza ekstra ödeme yapmak, mortgage faiz oranınıza eşit garantili, risksiz bir getiridir. Bitcoin daha fazla — veya daha az — getirebilir. Kendi varsayımlarınızı girin ve iki senaryoyu karşılaştırın.",
      hypoWarnTitle:"Bu finansal tavsiye değildir.", hypoWarnBody:"Girdiğiniz varsayımlara dayanan bir hesaplama modelidir. Ekstra ödeme risksizdir; aşağıdaki Bitcoin getirisi kendi seçtiğiniz bir tahmindir, bir öngörü değildir. Geçmiş getiriler geleceğin garantisi değildir.",
      hypoPmt:"Aylık ekstra tutar", hypoYears:"Vade", hypoYearsUnit:"yıl", hypoMortRate:"Mortgage faiz oranı", hypoBtcRate:"Beklenen BTC getirisi",
      hypoResMort:"Ekstra ödeme size şunu kazandırır", hypoResBtc:"Bitcoin'e yatırmak size şunu kazandırır",
      hypoHowTitle:"Bu nasıl hesaplanır?", hypoHowBody:"Her iki taraf da aylık tutarınız üzerinde aynı bileşik faiz formülünü kullanır: ekstra ödeme yaparak, ödenen tutar üzerinden mortgage faiz oranınızı garantili olarak tasarruf edersiniz; Bitcoin tarafı ise kendi belirlediğiniz getiri yüzdesini kullanır. Daha temkinli bir senaryo görmek için bu yüzdeyi düşürün.",
      hypoCurious:"Bitcoin'inizin şu anda market alışverişinde ne kadar değerinde olduğunu merak ediyor musunuz?", hypoCuriousBody:"Satmeter, Bitcoin'i günlük harcamalarınızın yanında gösterir.",
      hypoWinsOver:"Bitcoin senaryosu ekstra ödemeden daha yüksek", hypoLosesOver:"Ekstra ödeme Bitcoin senaryosundan daha yüksek",
      hypoAssumption:"aylık, şu süre boyunca:", hypoAssumption2:"yıl (BTC varsayımı:", hypoAssumption3:"%/yıl, mortgage faiz oranı:",
      dcaKicker:"Hesaplayıcı", dcaH1a:"Bileşik faiz /", dcaH1b:"DCA",
      dcaStandfirst:"Sabit bir aylık tutar, beklenen yıllık getiri ve bir vade girin. Bileşik büyümenin katkılarınızı nasıl çoğalttığını — ve bugün sats cinsinden son değerin ne olacağını görün.",
      dcaPmt:"Aylık katkı", dcaYears:"Vade", dcaYearsUnit:"yıl", dcaRate:"Beklenen getiri",
      dcaResIn:"Toplam katkı", dcaResFv:"Son değer", dcaResGrowth:"Bileşik faizden gelen büyüme",
      dcaSatsSub:"Bu, son değerin bugünkü fiyattan sats'a çevrilmiş halidir",
      dcaWhySats:"Neden sats?", dcaWhySatsBody:"Bu dönüşüm, tahmini bir gelecek fiyatı değil, bugünkü BTC fiyatını kullanır — sadece bu son değerin bugün ne kadar Bitcoin satın alma gücünü temsil edeceğini, salt örnek olarak gösterir.",
      dcaCurious:"Bu tutarı market alışverişinde görmek ister misiniz?", dcaCuriousBody:"Satmeter, Bitcoin'i günlük harcamalarınızın yanında gösterir.",
      dcaThatIs:"Bu da", dcaBtcAtToday:"bugünkü fiyattan BTC (1 BTC =",
      lmTitle:"Para biriminizi ve dilinizi seçin", lmSub:"Tutarlar, seçtiğiniz bölgenin para birimine göre değişir. Para birimini istediğiniz zaman ayrı olarak değiştirebilirsiniz.",
      lmSearchPh:"Dil, ülke veya para birimi ara…",
      lmFoot:"Seçiminiz bu cihazda hatırlanır. Bitcoin'in tek bir küresel fiyatı vardır — yalnızca görüntülenen para birimi değişir."
    }
  };

  var pill, modal, lmList, lmSearch;
  var lang = "en";
  var currencyManuallyChosen = false;
  try { currencyManuallyChosen = localStorage.getItem(CURRENCY_MANUAL_KEY) === "1"; } catch (e) {}

  function norm(s) {
    s = (s || "").toLowerCase();
    if (s.normalize) s = s.normalize("NFD").replace(/[̀-ͯ]/g, "");
    return s;
  }

  function dictFor(code) {
    var base = (LOCALE_META[code] || {}).base || "en";
    return TOOLS_I18N[base] || TOOLS_I18N.en;
  }

  function T(key) {
    var d = dictFor(lang);
    return (d && d[key] != null) ? d[key] : (TOOLS_I18N.en[key] || "");
  }

  function currentCurrency() {
    var c = null;
    try { c = localStorage.getItem(CURRENCY_KEY); } catch (e) {}
    return c || LANG_CURRENCY[lang] || "EUR";
  }

  function setCurrency(code, manual) {
    try {
      localStorage.setItem(CURRENCY_KEY, code);
      if (manual) { currencyManuallyChosen = true; localStorage.setItem(CURRENCY_MANUAL_KEY, "1"); }
    } catch (e) {}
    global.SatmeterLocale.currency = code;
    document.dispatchEvent(new CustomEvent("satmeter:locale-change", { detail: { lang: lang, currency: code } }));
  }

  function applyTranslations() {
    document.documentElement.setAttribute("lang", (LOCALE_META[lang] || {}).base || "en");
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = T(el.getAttribute("data-i18n"));
      if (v) el.textContent = v;
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var v = T(el.getAttribute("data-i18n-ph"));
      if (v) el.setAttribute("placeholder", v);
    });
    var isDark = document.documentElement.getAttribute("data-theme") === "dark";
    var themeText = document.getElementById("themeText");
    if (themeText) themeText.textContent = isDark ? T("lightMode") : T("darkMode");
  }

  function updatePill() {
    var m = LOCALE_META[lang] || LOCALE_META.en;
    var f = document.getElementById("lpFlag"), c = document.getElementById("lpCode"), u = document.getElementById("lpCur");
    if (f) f.innerHTML = m.flag;
    if (c) c.textContent = m.code;
    if (u) u.textContent = currentCurrency();
  }

  function applyLanguage(code) {
    lang = LOCALE_META[code] ? code : "en";
    if (!currencyManuallyChosen) {
      var wanted = LANG_CURRENCY[lang];
      if (wanted) setCurrency(wanted, false);
    } else {
      setCurrency(currentCurrency(), false);
    }
    try { localStorage.setItem(LOCALE_KEY, lang); } catch (e) {}
    applyTranslations();
    updatePill();
  }

  function buildList(filter) {
    filter = norm(filter).trim();
    lmList.innerHTML = "";
    var shown = 0;
    Object.keys(LOCALE_META).forEach(function (code) {
      var m = LOCALE_META[code];
      var cur = LANG_CURRENCY[code] || "USD";
      var hay = norm([m.name, m.region, code, cur, m.code, CUR_NAMES[cur] || "", REGION_ALIASES[code] || ""].join(" "));
      if (filter && hay.indexOf(filter) === -1) return;
      shown++;
      var b = document.createElement("button");
      b.type = "button";
      b.className = "lm-opt" + (code === lang ? " active" : "");
      b.innerHTML = '<span class="of">' + m.flag + '</span>' +
        '<span class="ob"><span class="on">' + m.name + '</span>' +
        '<span class="os">' + m.region + '</span></span>' +
        '<span class="oc">' + cur + '</span>';
      b.addEventListener("click", function () {
        currencyManuallyChosen = false;
        try { localStorage.removeItem(CURRENCY_MANUAL_KEY); } catch (e) {}
        applyLanguage(code);
        closeModal();
      });
      lmList.appendChild(b);
    });
    if (!shown) {
      var d = document.createElement("div");
      d.className = "lm-empty";
      d.textContent = "No match. Try a country, language or currency code.";
      lmList.appendChild(d);
    }
  }

  function openModal() {
    buildList("");
    lmSearch.value = "";
    modal.classList.add("open");
    pill.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    setTimeout(function () { lmSearch.focus(); }, 60);
  }
  function closeModal() {
    modal.classList.remove("open");
    pill.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  function injectModal() {
    if (document.getElementById("localeModal")) return;
    var wrap = document.createElement("div");
    wrap.innerHTML =
      '<div class="lm-backdrop" id="localeModal" role="dialog" aria-modal="true" aria-labelledby="lmTitle">' +
        '<div class="lm-panel" style="position:relative">' +
          '<button class="lm-close" id="lmClose" type="button" aria-label="Close">&times;</button>' +
          '<div class="lm-head">' +
            '<h3 id="lmTitle" data-i18n="lmTitle">Choose your currency and language</h3>' +
            '<p data-i18n="lmSub">Numbers switch to the currency of the region you pick.</p>' +
          '</div>' +
          '<div class="lm-searchwrap">' +
            '<input class="lm-search" id="lmSearch" type="text" data-i18n-ph="lmSearchPh" placeholder="Search language, country or currency…" autocomplete="off">' +
          '</div>' +
          '<div class="lm-list" id="lmList"></div>' +
          '<div class="lm-foot" data-i18n="lmFoot">Your choice is remembered on this device.</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(wrap.firstChild);
  }

  function initPickerUI() {
    pill = document.getElementById("localePill");
    modal = document.getElementById("localeModal");
    lmList = document.getElementById("lmList");
    lmSearch = document.getElementById("lmSearch");
    if (!pill || !modal) return;
    pill.addEventListener("click", openModal);
    var closeBtn = document.getElementById("lmClose");
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
    });
    lmSearch.addEventListener("input", function () { buildList(lmSearch.value); });
  }

  function detectInitialLanguage() {
    var saved = null;
    try { saved = localStorage.getItem(LOCALE_KEY); } catch (e) {}
    if (saved && LOCALE_META[saved]) return saved;
    var nav = (navigator.language || navigator.userLanguage || "en");
    var lower = nav.toLowerCase();
    var base = lower.split("-")[0];
    var region = (lower.split("-")[1] || "").toUpperCase();
    var exact = Object.keys(LOCALE_META).filter(function (v) { return v.toLowerCase() === lower; })[0];
    if (exact) return exact;
    if (base === "es") return region === "ES" ? "es-ES" : "es-MX";
    if (base === "pt") return region === "PT" ? "pt-PT" : "pt-BR";
    return LOCALE_META[base] ? base : "en";
  }

  global.SatmeterLocale = {
    currency: "EUR",
    lang: "en",
    t: T,
    setCurrency: function (code) { setCurrency(code, true); updatePill(); },
    onChange: function (fn) { document.addEventListener("satmeter:locale-change", fn); },
    currencyName: currencyName
  };

  function boot() {
    injectModal();
    initPickerUI();
    var initial = detectInitialLanguage();
    applyLanguage(initial);
    global.SatmeterLocale.lang = lang;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})(typeof window !== "undefined" ? window : this);
