/* Satmeter — site-wide hardware wallet affiliate module.
 *
 * Injects two placements on every page that includes this file:
 *   1. An in-content recommendation card (mobile + desktop)
 *   2. A compact card in the left ad-rail (desktop only)
 *
 * Every link carries rel="nofollow sponsored noopener" and every placement
 * carries a visible affiliate disclosure, per FTC and AdSense guidance.
 *
 * Text is translated into every language the site supports and updates
 * live when the visitor switches language with the site's own language
 * picker — it does not require a page reload. Language is read from
 * <html lang="...">, which both satmeter.io's picker (assets set in
 * index.html's own applyLanguage) and tools.satmeter.io's picker
 * (assets/locale.js) already keep up to date; a MutationObserver watches
 * that attribute so this file needs no direct coupling to either picker.
 *
 * ---------------------------------------------------------------------------
 * EDIT ONLY THE CONFIG BLOCK BELOW (for links/images). Translations live in
 * WP_I18N further down.
 * ---------------------------------------------------------------------------
 */
(function () {
  "use strict";

  /* ========================= CONFIG ========================= */

  /* --- BitBox (Shift Crypto, Switzerland) — referral code rldjkhmt --- */
  var BITBOX = "https://shop.bitbox.swiss/?ref=rldjkhmt";

  /* --- Trezor (SatoshiLabs) — aff_id 846530. Confirmed offer mapping:
         137 = Trezor Shop, general store
         238 = Trezor Safe 5, Bitcoin-only edition
         237 = Trezor Keep Metal 20, single-share seed backup plate
         389 = EXTRA10 promo (may expire — check before using)
         133 / 352 = older links, unused                             --- */
  var TZ = "https://affil.trezor.io/aff_c?aff_id=846530&source=satmeter.io&offer_id=";
  var TREZOR = TZ + "238";        /* headline product */
  var TREZOR_STORE = TZ + "137";  /* generic store */
  var TREZOR_METAL = TZ + "237";  /* seed backup plate */

  /* --- Ledger (Ledger SAS, France) — affiliate ref c58f6c59f4b1 --- */
  var LEDGER = "https://shop.ledger.com/?r=c58f6c59f4b1";

  /* --- Product photos (optional) ---------------------------------------
     Leave "" to render fast, text-only cards.

     To add photos: download the affiliate creatives, resize them to about
     600px on the long edge, save them into /assets/, and put the filenames
     here. Do NOT hotlink the originals from the affiliate CDN — they are
     3000x4000px and several megabytes, which would wreck page speed.

     Example:  var IMG_BITBOX = "bitbox02.jpg";                          */
  var IMG_BITBOX = "bitbox02.jpg?v=1";
  var IMG_TREZOR = "trezor-safe5.jpg?v=1";

  /* Ledger has three creatives — one is picked at random per page load so
     visitors see a mix across the site instead of always the same shot. */
  var IMG_LEDGER = [
    "ledger-nano-s-plus-gold.jpg?v=1",
    "ledger-nano-s-plus-orange.jpg?v=1",
    "ledger-nano-s-plus-box.jpg?v=1"
  ];

  /* ======================= END CONFIG ======================= */

  if (document.getElementById("sm-aff-style")) return;

  var REL = 'rel="nofollow sponsored noopener" target="_blank"';

  var path = location.pathname;
  var inArticles = /\/articles\//.test(path);
  var isSpanishPath = /^\/es\//.test(path);
  var isWalletPage = /where-to-store-your-sats/.test(path);

  var toRoot = inArticles ? "../" : "";
  if (isSpanishPath) toRoot = inArticles ? "../../" : "../";

  function assetUrl(file) {
    return file ? toRoot + "assets/" + file : "";
  }

  /* Picked once per page load, so the in-content card and the rail card
     (if both are on the page) show the same shot, but a different visitor
     — or the same visitor on a different page — is likely to see a
     different one of the three Ledger creatives. */
  var ledgerImg = Array.isArray(IMG_LEDGER)
    ? IMG_LEDGER[Math.floor(Math.random() * IMG_LEDGER.length)]
    : IMG_LEDGER;

  function walletGuideUrl() {
    return toRoot + (isSpanishPath ? "es/articles/" : "articles/") +
           "where-to-store-your-sats.html";
  }

  /* ---------- translations ----------
     Product names ("BitBox02", "Trezor Safe 5") stay untranslated —
     they're brand names. Every other visible string is translated for
     every language satmeter.io and tools.satmeter.io support. English is
     the fallback for any language code not listed here (there currently
     isn't one — both sites' full language lists are covered). */
  var WP_I18N = {
    en: {
      heading: "Don't leave your sats on an exchange",
      intro: "You know what your spending is worth in sats. The next question is where to keep it. A hardware wallet keeps your keys off the internet and out of reach.",
      bbTag: "Bitcoin-only · Swiss-made", bbDesc: "Open source, and the simpler setup of the two. A solid first wallet.", bbPrice: "from ~€120",
      tzTag: "Bitcoin-only · Touchscreen", tzDesc: "From the original manufacturer, since 2014. Longest track record in the field.", tzPrice: "from ~€80",
      ledgerTag: "Multi-coin · USB-C", ledgerDesc: "Certified secure chip (CC EAL6+), and the cheapest way to get your keys off an exchange. Runs through the Ledger Live app.", ledgerPrice: "from ~€79",
      shop: "Check price", metal: "Back up your seed phrase on metal, not paper", guide: "Read the full self-custody guide",
      disclosure: "Affiliate links. If you buy through them we earn a commission, at no extra cost to you. We only link wallets we would recommend anyway.",
      railHeading: "Where do your sats live?", railText: "The three hardware wallets we'd actually recommend, compared honestly.",
      railCta: "Read the guide", railNote: "Affiliate links. No extra cost to you."
    },
    es: {
      heading: "No dejes tus sats en un exchange",
      intro: "Ya sabes cuánto valen tus compras en sats. La siguiente pregunta es dónde guardarlos. Un monedero de hardware mantiene tus claves fuera de internet.",
      bbTag: "Solo-Bitcoin · Suizo", bbDesc: "Código abierto y la configuración más simple de las dos. Buena primera opción.", bbPrice: "desde ~120 €",
      tzTag: "Solo-Bitcoin · Pantalla táctil", tzDesc: "Del fabricante original, desde 2014. Historial más largo del sector.", tzPrice: "desde ~80 €",
      ledgerTag: "Multi-moneda · USB-C", ledgerDesc: "Chip seguro certificado (CC EAL6+), y la forma más barata de sacar tus claves de un exchange. Funciona con la app Ledger Live.", ledgerPrice: "desde ~79 €",
      shop: "Ver precio", metal: "Respalda tu frase semilla en metal, no en papel", guide: "Leer la guía completa de custodia propia",
      disclosure: "Enlaces de afiliado. Si compras a través de ellos ganamos una comisión, sin coste extra para ti. Solo enlazamos monederos que recomendaríamos igualmente.",
      railHeading: "¿Dónde guardas tus sats?", railText: "Los tres monederos de hardware que de verdad recomendamos, comparados con honestidad.",
      railCta: "Ver la guía", railNote: "Enlaces de afiliado. Sin coste extra para ti."
    },
    nl: {
      heading: "Laat je sats niet op een exchange staan",
      intro: "Je weet al wat je uitgaven waard zijn in sats. De volgende vraag is waar je ze bewaart. Een hardware wallet houdt je keys offline en buiten bereik.",
      bbTag: "Alleen Bitcoin · Zwitsers", bbDesc: "Open source, en de simpelste van de twee om in te stellen. Een solide eerste wallet.", bbPrice: "vanaf ~€120",
      tzTag: "Alleen Bitcoin · Touchscreen", tzDesc: "Van de originele fabrikant, sinds 2014. Langste trackrecord in de sector.", tzPrice: "vanaf ~€80",
      ledgerTag: "Multi-coin · USB-C", ledgerDesc: "Gecertificeerde secure chip (CC EAL6+), en de goedkoopste manier om je keys van een exchange te halen. Werkt via de Ledger Live-app.", ledgerPrice: "vanaf ~€79",
      shop: "Bekijk prijs", metal: "Back-up je seed phrase op metaal, niet op papier", guide: "Lees de volledige self-custody gids",
      disclosure: "Affiliate-links. Als je hierdoor koopt, verdienen wij een commissie, zonder extra kosten voor jou. We linken alleen wallets die we sowieso zouden aanraden.",
      railHeading: "Waar staan jouw sats?", railText: "De drie hardware wallets die we echt aanraden, eerlijk vergeleken.",
      railCta: "Lees de gids", railNote: "Affiliate-links. Geen extra kosten voor jou."
    },
    pt: {
      heading: "Não deixe seus sats numa exchange",
      intro: "Você já sabe quanto valem seus gastos em sats. A próxima pergunta é onde guardá-los. Uma carteira de hardware mantém suas chaves fora da internet e fora de alcance.",
      bbTag: "Somente Bitcoin · Suíça", bbDesc: "Código aberto, e a configuração mais simples das duas. Uma boa primeira carteira.", bbPrice: "a partir de ~€120",
      tzTag: "Somente Bitcoin · Touchscreen", tzDesc: "Do fabricante original, desde 2014. Maior histórico do setor.", tzPrice: "a partir de ~€80",
      ledgerTag: "Multi-moedas · USB-C", ledgerDesc: "Chip seguro certificado (CC EAL6+), e a forma mais barata de tirar suas chaves de uma exchange. Funciona com o app Ledger Live.", ledgerPrice: "a partir de ~€79",
      shop: "Ver preço", metal: "Faça backup da sua seed phrase em metal, não em papel", guide: "Leia o guia completo de autocustódia",
      disclosure: "Links de afiliado. Se você comprar através deles, ganhamos uma comissão, sem custo extra para você. Só indicamos carteiras que recomendaríamos de qualquer forma.",
      railHeading: "Onde estão seus sats?", railText: "As três carteiras de hardware que realmente recomendamos, comparadas com honestidade.",
      railCta: "Ler o guia", railNote: "Links de afiliado. Sem custo extra para você."
    },
    fr: {
      heading: "Ne laissez pas vos sats sur un exchange",
      intro: "Vous savez déjà ce que valent vos dépenses en sats. La question suivante est où les garder. Un wallet matériel garde vos clés hors ligne et hors de portée.",
      bbTag: "Bitcoin uniquement · Suisse", bbDesc: "Open source, et la configuration la plus simple des deux. Un solide premier wallet.", bbPrice: "à partir de ~120 €",
      tzTag: "Bitcoin uniquement · Écran tactile", tzDesc: "Du fabricant d'origine, depuis 2014. Le plus long historique du secteur.", tzPrice: "à partir de ~80 €",
      ledgerTag: "Multi-cryptos · USB-C", ledgerDesc: "Puce sécurisée certifiée (CC EAL6+), et le moyen le moins cher de sortir vos clés d'un exchange. Fonctionne avec l'appli Ledger Live.", ledgerPrice: "à partir de ~79 €",
      shop: "Voir le prix", metal: "Sauvegardez votre phrase de récupération sur du métal, pas sur papier", guide: "Lire le guide complet de l'auto-conservation",
      disclosure: "Liens d'affiliation. Si vous achetez via ces liens, nous touchons une commission, sans frais supplémentaires pour vous. Nous ne recommandons que des wallets que nous conseillerions de toute façon.",
      railHeading: "Où vivent vos sats ?", railText: "Les trois wallets matériels que nous recommandons vraiment, comparés honnêtement.",
      railCta: "Lire le guide", railNote: "Liens d'affiliation. Aucun frais supplémentaire pour vous."
    },
    de: {
      heading: "Lass deine Sats nicht auf einer Exchange liegen",
      intro: "Du weißt schon, was deine Ausgaben in Sats wert sind. Die nächste Frage ist, wo du sie aufbewahrst. Eine Hardware-Wallet hält deine Keys offline und außer Reichweite.",
      bbTag: "Nur Bitcoin · Schweizer Fertigung", bbDesc: "Open Source, und die einfachere Einrichtung der beiden. Eine solide erste Wallet.", bbPrice: "ab ~120 €",
      tzTag: "Nur Bitcoin · Touchscreen", tzDesc: "Vom Originalhersteller, seit 2014. Längste Erfolgsbilanz der Branche.", tzPrice: "ab ~80 €",
      ledgerTag: "Multi-Coin · USB-C", ledgerDesc: "Zertifizierter Secure-Chip (CC EAL6+), und der günstigste Weg, deine Keys von einer Exchange zu holen. Läuft über die Ledger-Live-App.", ledgerPrice: "ab ~79 €",
      shop: "Preis ansehen", metal: "Sichere deine Seed-Phrase auf Metall, nicht auf Papier", guide: "Den vollständigen Self-Custody-Guide lesen",
      disclosure: "Affiliate-Links. Wenn du darüber kaufst, verdienen wir eine Provision, ohne Mehrkosten für dich. Wir verlinken nur Wallets, die wir sowieso empfehlen würden.",
      railHeading: "Wo leben deine Sats?", railText: "Die drei Hardware-Wallets, die wir wirklich empfehlen, ehrlich verglichen.",
      railCta: "Guide lesen", railNote: "Affiliate-Links. Keine Mehrkosten für dich."
    },
    tr: {
      heading: "Sats'larınızı bir borsada bırakmayın",
      intro: "Harcamalarınızın sats cinsinden ne kadar ettiğini zaten biliyorsunuz. Sıradaki soru, onları nerede saklayacağınız. Bir donanım cüzdanı, anahtarlarınızı internetten ve erişimden uzak tutar.",
      bbTag: "Yalnızca Bitcoin · İsviçre yapımı", bbDesc: "Açık kaynak, ve ikisinden kurulumu daha basit olanı. Sağlam bir ilk cüzdan.", bbPrice: "~120 €'dan başlayan fiyatlarla",
      tzTag: "Yalnızca Bitcoin · Dokunmatik ekran", tzDesc: "Orijinal üreticiden, 2014'ten beri. Sektördeki en uzun geçmiş.", tzPrice: "~80 €'dan başlayan fiyatlarla",
      ledgerTag: "Çoklu coin · USB-C", ledgerDesc: "Sertifikalı güvenli çip (CC EAL6+) ve anahtarlarınızı bir borsadan çıkarmanın en ucuz yolu. Ledger Live uygulaması üzerinden çalışır.", ledgerPrice: "~79 €'dan başlayan fiyatlarla",
      shop: "Fiyata bak", metal: "Kurtarma ifadenizi kağıda değil, metale yedekleyin", guide: "Tam kendi kendine saklama rehberini okuyun",
      disclosure: "İştirak bağlantıları. Bunlar üzerinden satın alırsanız, size ekstra maliyet olmadan komisyon kazanırız. Sadece zaten önereceğimiz cüzdanlara bağlantı veriyoruz.",
      railHeading: "Sats'larınız nerede yaşıyor?", railText: "Gerçekten önerdiğimiz üç donanım cüzdanı, dürüstçe karşılaştırıldı.",
      railCta: "Rehberi oku", railNote: "İştirak bağlantıları. Size ekstra maliyet yok."
    },
    zh: {
      heading: "别把你的 sats 留在交易所",
      intro: "你已经知道你的花费值多少 sats。下一个问题是把它们存在哪里。硬件钱包能让你的密钥离线，远离触及。",
      bbTag: "仅支持比特币 · 瑞士制造", bbDesc: "开源，两者中设置更简单的一个。可靠的入门钱包。", bbPrice: "约 €120 起",
      tzTag: "仅支持比特币 · 触摸屏", tzDesc: "来自原厂，自 2014 年起。业内最长的记录。", tzPrice: "约 €80 起",
      ledgerTag: "多币种 · USB-C", ledgerDesc: "经过认证的安全芯片（CC EAL6+），是把密钥从交易所转移出来最便宜的方式。通过 Ledger Live 应用使用。", ledgerPrice: "约 €79 起",
      shop: "查看价格", metal: "把你的助记词备份在金属上，而不是纸上", guide: "阅读完整的自托管指南",
      disclosure: "联盟链接。如果你通过这些链接购买，我们会赚取佣金，你无需支付额外费用。我们只推荐我们本来就会推荐的钱包。",
      railHeading: "你的 sats 存放在哪里？", railText: "我们真正推荐的三款硬件钱包，诚实比较。",
      railCta: "阅读指南", railNote: "联盟链接。你无需支付额外费用。"
    },
    hi: {
      heading: "अपने sats को एक्सचेंज पर मत छोड़िए",
      intro: "आप पहले से जानते हैं कि आपका खर्च sats में कितना है। अगला सवाल यह है कि उन्हें कहां रखा जाए। एक हार्डवेयर वॉलेट आपकी keys को इंटरनेट से दूर और पहुंच से बाहर रखता है।",
      bbTag: "केवल बिटकॉइन · स्विस निर्मित", bbDesc: "ओपन सोर्स, और दोनों में से सेटअप करने में आसान। एक ठोस पहला वॉलेट।", bbPrice: "~€120 से शुरू",
      tzTag: "केवल बिटकॉइन · टचस्क्रीन", tzDesc: "मूल निर्माता से, 2014 से। क्षेत्र में सबसे लंबा ट्रैक रिकॉर्ड।", tzPrice: "~€80 से शुरू",
      ledgerTag: "मल्टी-कॉइन · USB-C", ledgerDesc: "प्रमाणित सिक्योर चिप (CC EAL6+), और एक्सचेंज से अपनी keys निकालने का सबसे सस्ता तरीका। Ledger Live ऐप के ज़रिए काम करता है।", ledgerPrice: "~€79 से शुरू",
      shop: "कीमत देखें", metal: "अपना सीड फ्रेज़ धातु पर बैकअप करें, कागज़ पर नहीं", guide: "पूरी सेल्फ-कस्टडी गाइड पग़ें",
      disclosure: "एफिलिएट लिंक। यदि आप इनके ज़रिए खरीदते हैं, तो हमें कमीशन मिलता है, आपके लिए बिना किसी अतिरिक्त लागत के। हम केवल उन्हीं वॉलेट्स को लिंक करते हैं जिन्हें हम वैसे भी सुझाते।",
      railHeading: "आपके sats कहां रहते हैं?", railText: "तीन हार्डवेयर वॉलेट जिन्हें हम वाकई सुझाते हैं, ईमानदारी से तुलना की गई।",
      railCta: "गाइड पग़ें", railNote: "एफिलिएट लिंक। आपके लिए कोई अतिरिक्त खर्च नहीं।"
    },
    ar: {
      heading: "لा تترك سाتاتك في منصة تداول",
      intro: "أنت تعرف بالفعل قيمة إنفاقك بالساتات. السؤال التالي هو أين تحتفظ بها. محفظة الأجهزة تبقي مفاتيحك بعيدة عن الإنترنت وخارج المتناول.",
      bbTag: "بيتكوين فقط · صناعة سويسرية", bbDesc: "مفتوحة المصدر، وأبسط الاثنتين في الإعداد. محفظة أولى موثوقة.", bbPrice: "من ~120 يورو",
      tzTag: "بيتكوين فقط · شاشة لمس", tzDesc: "من الشركة المصنعة الأصلية، منذ 2014. أطول سجل حافل في المجال.", tzPrice: "من ~80 يورو",
      ledgerTag: "متعدد العملات · USB-C", ledgerDesc: "شريحة آمنة معتمدة (CC EAL6+)، وأرخص طريقة لإخراج مفاتيحك من منصة تداول. يعمل عبر تطبيق Ledger Live.", ledgerPrice: "من ~79 يورو",
      shop: "تحقق من السعر", metal: "احتفظ بنسخة احتياطية من عبارة الاسترداد على معدن، وليس على ورق", guide: "اقرأ الدليل الكامل للحفظ الذاتي",
      disclosure: "روابط تابعة. إذا اشتريت عبرها، نكسب عمولة دون أي تكلفة إضافية عليك. نربط فقط بالمحافظ التي كنا سنوصي بها على أي حال.",
      railHeading: "أين تعيش ساتاتك؟", railText: "محافظ الأجهزة الثلاث اللتان نوصي بهما فعلاً، مقارنة بصدق.",
      railCta: "اقرأ الدليل", railNote: "روابط تابعة. لا تكلفة إضافية عليك."
    },
    bn: {
      heading: "আপনার sats একটি এক্সচেঞ্জে রেখে দেবেন না",
      intro: "আপনি ইতিমধ্যে জানেন আপনার খরচ sats-এ কত। পরের প্রশ্ন হলো সেগুলো কোথায় রাখবেন। একটি হার্ডওয়্যার ওয়ালেট আপনার key ইন্টারনেট থেকে দূরে ও নাগালের বাইরে রাখে।",
      bbTag: "শুধু বিটকয়িন · সুইজ তৈরি", bbDesc: "ওপেন সোর্স, এবং দुটির মধ্যে সেটআপ করা সহজ। একটি নির্ভরযোগ্য প্রথম ওয়ালেট।", bbPrice: "~€120 থেকে শুরু",
      tzTag: "শুধু বিটকয়িন · টাচস্ক্রিন", tzDesc: "মূল নির্মাতার কাছ থেকে, 2014 সাল থেকে। এই খাতে সবচেয়ে দীর্ঘ ট্র্যাক রেকর্ড।", tzPrice: "~€80 থেকে শুরু",
      ledgerTag: "মাল্টি-কয়েন · USB-C", ledgerDesc: "সার্টিফাইড সিকিউর চিপ (CC EAL6+), এবং এক্সচেঞ্জ থেকে আপনার key বের করার সবচেয়ে সাশ্রয়ী উপায়। Ledger Live অ্যাপের মাধ্যমে কাজ করে।", ledgerPrice: "~€79 থেকে শুরু",
      shop: "দাম দেখুন", metal: "আপনার সিড ফ্রেজ কাগবজে নয়, ধাতুতে ব্যাকআপ করুন", guide: "সম্পূর্ণ সেলফ-কাস্টডি গাইড পড়ুন",
      disclosure: "অ্যাফিলিয়েট লিঙ্ক। আপনি এগুলোর মাধ্যমে কিনলে আমরা কমিশন পাই, আপনার জন্য কোনো অতিরিক্ত খরচ ছাড়াই। আমরা শুধু সেই ওয়ালেটগুলো লিঙ্ক করি যা আমরা এমনিতেও সুপারিশ করতাম।",
      railHeading: "আপনার sats কোথায় থাকে?", railText: "তিনটি হার্ডওয়্যার ওয়ালেট যা আমরা সত্যই সুপারিশ করি, সৎভাবে তুলনা করা।",
      railCta: "গাইড পড়ুন", railNote: "অ্যাফিলিয়েট লিঙ্ক। আপনার জন্য কোনো অতিরিক্ত খরচ নেই।"
    },
    ru: {
      heading: "Не оставляйте свои sats на бирже",
      intro: "Вы уже знаете, сколько стоят ваши траты в sats. Следующий вопрос — где их хранить. Аппаратный кошелёк держит ваши ключи офлайн и вне досягаемости.",
      bbTag: "Только биткоин · Швейцарское производство", bbDesc: "Открытый исходный код, и более простая настройка из двух. Надёжный первый кошелёк.", bbPrice: "от ~120 €",
      tzTag: "Только биткоин · Сенсорный экран", tzDesc: "От оригинального производителя, с 2014 года. Самая долгая репутация в отрасли.", tzPrice: "от ~80 €",
      ledgerTag: "Мультивалютный · USB-C", ledgerDesc: "Сертифицированный защищённый чип (CC EAL6+) и самый недорогой способ забрать ключи с биржи. Работает через приложение Ledger Live.", ledgerPrice: "от ~79 €",
      shop: "Узнать цену", metal: "Резервируйте seed-фразу на металле, а не на бумаге", guide: "Прочитать полное руководство по самостоятельному хранению",
      disclosure: "Партнёрские ссылки. Если вы покупаете по ним, мы получаем комиссию без дополнительных затрат для вас. Мы ссылаемся только на кошельки, которые рекомендовали бы в любом случае.",
      railHeading: "Где живут ваши sats?", railText: "Три аппаратных кошелька, которые мы действительно рекомендуем, честно сравнены.",
      railCta: "Читать руководство", railNote: "Партнёрские ссылки. Без дополнительных затрат для вас."
    },
    ja: {
      heading: "sats を取引所に置いたままにしないで",
      intro: "自分の支出が sats でどれくらいか、もうご存じですね。次の問題はどこに保管するかです。ハードウェアウォレットなら鍵をオフラインで、手の届かない場所に保てます。",
      bbTag: "ビットコイン専用 · スイス製", bbDesc: "オープンソースで、2つのうちセットアップが簡単な方。最初の1台として頼りになります。", bbPrice: "約€120から",
      tzTag: "ビットコイン専用 · タッチスクリーン", tzDesc: "2014年以来のオリジナルメーカー製。業界最長の実績。", tzPrice: "約€80から",
      ledgerTag: "マルチコイン対応 · USB-C", ledgerDesc: "認証済みのセキュアチップ（CC EAL6+）を搭載し、取引所から鍵を移す最も安い方法です。Ledger Live アプリで管理します。", ledgerPrice: "約€79から",
      shop: "価格を見る", metal: "シードフレーズは紙ではなく金属にバックアップを", guide: "セルフカストディの完全ガイドを読む",
      disclosure: "アフィリエイトリンクです。これらを通じて購入いただくと、追加費用なしで私たちに手数料が入ります。もともとおすすめしたいウォレットだけをリンクしています。",
      railHeading: "あなたの sats はどこに？", railText: "本当におすすめできる3つのハードウェアウォレットを、正直に比較。",
      railCta: "ガイドを読む", railNote: "アフィリエイトリンクです。追加費用はありません。"
    },
    ko: {
      heading: "satsを 거래소에 두지 마세요",
      intro: "지출이 sats로 얼마인지는 이미 알고 계시죠. 다음 질문은 그것을 어디에 보관할지입니다. 하드웨어 지갑은 키를 인터넷에서 분리해 손이 닿지 않는 곳에 보관합니다.",
      bbTag: "비트코인 전용 · 스위스 제작", bbDesc: "오픈 소스이며, 둘 중 설정이 더 간단합니다. 드든한 첫 지갑입니다.", bbPrice: "약 €120부터",
      tzTag: "비트코인 전용 · 터치스크린", tzDesc: "2014년부터 원제조사가 만든 제품. 업계 최장 실적.", tzPrice: "약 €80부터",
      ledgerTag: "멀티코인 · USB-C", ledgerDesc: "인증된 보안 칩(CC EAL6+)을 탑재했으며, 거래소에서 키를 옮기는 가장 저렴한 방법입니다. Ledger Live 앱으로 관리합니다.", ledgerPrice: "약 €79부터",
      shop: "가격 확인", metal: "시드 문구는 종이가 아닌 금속에 백업하세요", guide: "전체 셀프 커스터디 가이드 읽기",
      disclosure: "제휴 링크입니다. 이를 통해 구매하시면 추가 비용 없이 저희가 수수료를 받습니다. 저희가 어차피 추천할 지갑만 링크합니다.",
      railHeading: "당신의 sats는 어디에 있나요?", railText: "저희가 정말로 추천하는 세 하드웨어 지갑을 정직하게 비교했습니다.",
      railCta: "가이드 읽기", railNote: "제휴 링크입니다. 추가 비용은 없습니다."
    },
    id: {
      heading: "Jangan simpan sats Anda di exchange",
      intro: "Anda sudah tahu berapa nilai pengeluaran Anda dalam sats. Pertanyaan berikutnya adalah di mana menyimpannya. Dompet hardware menjaga kunci Anda tetap offline dan di luar jangkauan.",
      bbTag: "Khusus Bitcoin · Buatan Swiss", bbDesc: "Open source, dan yang lebih mudah diatur dari keduanya. Dompet pertama yang solid.", bbPrice: "mulai ~€120",
      tzTag: "Khusus Bitcoin · Layar sentuh", tzDesc: "Dari produsen asli, sejak 2014. Rekam jejak terpanjang di bidang ini.", tzPrice: "mulai ~€80",
      ledgerTag: "Multi-koin · USB-C", ledgerDesc: "Chip aman tersertifikasi (CC EAL6+), dan cara termurah untuk memindahkan kunci Anda dari exchange. Dijalankan melalui aplikasi Ledger Live.", ledgerPrice: "mulai ~€79",
      shop: "Cek harga", metal: "Cadangkan frasa seed Anda di logam, bukan kertas", guide: "Baca panduan lengkap self-custody",
      disclosure: "Tautan afiliasi. Jika Anda membeli melaluinya, kami mendapat komisi, tanpa biaya tambahan untuk Anda. Kami hanya menautkan dompet yang memang akan kami rekomendasikan.",
      railHeading: "Di mana sats Anda disimpan?", railText: "Tiga dompet hardware yang benar-benar kami rekomendasikan, dibandingkan secara jujur.",
      railCta: "Baca panduan", railNote: "Tautan afiliasi. Tidak ada biaya tambahan untuk Anda."
    },
    vi: {
      heading: "Đừng để sats của bạn trên sàn giao dịch",
      intro: "Bạn đã biết chi tiêu của mình đáng giá bao nhiêu sats. Câu hỏi tiếp theo là giữ chúng ở đâu. Ví cứng giữ khóa của bạn ngoại tuyến và ngoài tầm với.",
      bbTag: "Chỉ Bitcoin · Sản xuất tại Thụy Sỹ", bbDesc: "Mã nguồn mở, và là lựa chọn dễ thiết lập hơn trong hai loại. Một ví đầu tay đáng tin cậy.", bbPrice: "từ ~€120",
      tzTag: "Chỉ Bitcoin · Màn hình cảm ứng", tzDesc: "Từ nhà sản xuất gốc, từ năm 2014. Bề dày kinh nghiệm lâu nhất trong ngành.", tzPrice: "từ ~€80",
      ledgerTag: "Đa tiền điện tử · USB-C", ledgerDesc: "Chip bảo mật được chứng nhận (CC EAL6+), và là cách rẻ nhất để đưa khóa của bạn ra khỏi sàn giao dịch. Hoạt động qua ứng dụng Ledger Live.", ledgerPrice: "từ ~€79",
      shop: "Xem giá", metal: "Sao lưu cụm từ khôi phục trên kim loại, không phải giấy", guide: "Đọc hướng dẫn đầy đủ về tự lưu trữ",
      disclosure: "Liên kết đối tác. Nếu bạn mua qua đó, chúng tôi nhận hoa hồng, không tốn thêm chi phí cho bạn. Chúng tôi chỉ liên kết đến những ví mà dù sao chúng tôi cũng sẽ giới thiệu.",
      railHeading: "Sats của bạn đang ở đâu?", railText: "Ba ví cứng mà chúng tôi thực sự khuyên dùng, so sánh trung thực.",
      railCta: "Đọc hướng dẫn", railNote: "Liên kết đối tác. Không tốn thêm chi phí cho bạn."
    }
  };

  function baseLang() {
    var l = (document.documentElement.getAttribute("lang") || "en").toLowerCase();
    return l.split("-")[0];
  }

  function dict() {
    return WP_I18N[baseLang()] || WP_I18N.en;
  }

  function injectStyles() {
    var css =
      '.sm-aff{border:1px solid var(--border);border-radius:16px;' +
      'background:var(--surface);padding:20px;margin:30px 0;}' +
      '.sm-aff-h{font-size:1.15rem;font-weight:700;margin:0 0 8px;' +
      'color:var(--text);line-height:1.3;}' +
      '.sm-aff-p{margin:0 0 16px;color:var(--muted);font-size:.95rem;' +
      'line-height:1.6;}' +
      '.sm-aff-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;}' +
      '@media (max-width:900px){.sm-aff-grid{grid-template-columns:1fr 1fr;}}' +
      '@media (max-width:600px){.sm-aff-grid{grid-template-columns:1fr;}}' +
      '.sm-aff-card{position:relative;border:1px solid var(--border);' +
      'border-radius:12px;background:var(--surface-2);padding:15px;' +
      'display:flex;flex-direction:column;min-width:0;}' +
      '.sm-aff-card img{width:100%;height:130px;object-fit:contain;' +
      'border-radius:8px;background:#fff;margin-bottom:12px;}' +
      '.sm-aff-name{font-weight:700;font-size:1.02rem;color:var(--text);' +
      'line-height:1.25;}' +
      '.sm-aff-tag{font-size:.72rem;font-weight:700;letter-spacing:.04em;' +
      'text-transform:uppercase;color:var(--orange-deep,#c9740c);' +
      'margin:5px 0 8px;}' +
      '.sm-aff-d{font-size:.86rem;color:var(--muted);line-height:1.55;' +
      'margin-bottom:14px;flex:1;}' +
      '.sm-aff-btn{display:flex;align-items:center;justify-content:center;' +
      'gap:8px;text-align:center;text-decoration:none;padding:11px 14px;' +
      'border-radius:10px;font-weight:700;font-size:.9rem;' +
      'background:var(--orange,#f7931a);color:#151515;border:none;' +
      'transition:filter .15s ease,transform .15s ease;}' +
      '.sm-aff-btn:hover{filter:brightness(1.07);transform:translateY(-1px);}' +
      '.sm-aff-btn:active{transform:translateY(0);}' +
      '.sm-aff-price{font-weight:600;font-size:.82rem;opacity:.72;}' +
      '.sm-aff-metal{margin:15px 0 0;font-size:.88rem;line-height:1.5;}' +
      '.sm-aff-metal a{color:var(--text);text-decoration:underline;' +
      'text-decoration-color:var(--border);text-underline-offset:3px;}' +
      '.sm-aff-metal a:hover{text-decoration-color:var(--orange,#f7931a);}' +
      '.sm-aff-guide{display:inline-block;margin-top:13px;font-size:.9rem;' +
      'font-weight:600;color:var(--blue,#1877f2);text-decoration:none;}' +
      '.sm-aff-guide:hover{text-decoration:underline;}' +
      '.sm-aff-foot{margin:16px 0 0;font-size:.74rem;color:var(--muted);' +
      'line-height:1.5;}' +
      /* --- rail placement (desktop) --- */
      '.sm-aff-rail{border:1px solid var(--border);border-radius:14px;' +
      'background:var(--surface);padding:15px;margin-bottom:18px;}' +
      '.sm-aff-rail img{width:100%;height:120px;object-fit:contain;' +
      'border-radius:8px;background:#fff;margin-bottom:11px;}' +
      '.sm-aff-rail-h{font-weight:700;font-size:.95rem;color:var(--text);' +
      'margin-bottom:6px;line-height:1.3;}' +
      '.sm-aff-rail-p{font-size:.8rem;color:var(--muted);line-height:1.5;' +
      'margin-bottom:11px;}' +
      '.sm-aff-rail .sm-aff-btn{font-size:.85rem;padding:9px 12px;' +
      'background:var(--blue,#1877f2);color:#fff;}' +
      '.sm-aff-rail-links{margin:10px 0 0;font-size:.78rem;line-height:1.7;}' +
      '.sm-aff-rail-links a{color:var(--text);text-decoration:none;' +
      'border-bottom:1px solid var(--border);}' +
      '.sm-aff-rail-links a:hover{border-bottom-color:var(--orange,#f7931a);}' +
      '.sm-aff-rail-note{margin:10px 0 0;font-size:.66rem;color:var(--muted);' +
      'line-height:1.45;}';

    var s = document.createElement("style");
    s.id = "sm-aff-style";
    s.textContent = css;
    document.head.appendChild(s);
  }

  function productCard(L, name, tag, desc, price, url, img) {
    var picture = "";
    if (img) {
      picture = '<a href="' + url + '" ' + REL + ' tabindex="-1" aria-hidden="true">' +
                '<img src="' + assetUrl(img) + '" alt="' + name + '" ' +
                'loading="lazy" decoding="async" width="600" height="400"></a>';
    }
    return '<div class="sm-aff-card">' +
             picture +
             '<div class="sm-aff-name">' + name + '</div>' +
             '<div class="sm-aff-tag">' + tag + '</div>' +
             '<div class="sm-aff-d">' + desc + '</div>' +
             '<a class="sm-aff-btn" href="' + url + '" ' + REL + '>' +
               '<span>' + L.shop + '</span>' +
               '<span class="sm-aff-price">' + price + '</span>' +
             '</a>' +
           '</div>';
  }

  function inContentHtml() {
    var L = dict();
    return '<p class="sm-aff-h">&#128274; ' + L.heading + '</p>' +
      '<p class="sm-aff-p">' + L.intro + '</p>' +
      '<div class="sm-aff-grid">' +
        productCard(L, "BitBox02", L.bbTag, L.bbDesc, L.bbPrice, BITBOX, IMG_BITBOX) +
        productCard(L, "Trezor Safe 5", L.tzTag, L.tzDesc, L.tzPrice, TREZOR, IMG_TREZOR) +
        productCard(L, "Ledger Nano S Plus", L.ledgerTag, L.ledgerDesc, L.ledgerPrice, LEDGER, ledgerImg) +
      '</div>' +
      '<p class="sm-aff-metal">&#128737;&#65039; <a href="' + TREZOR_METAL + '" ' + REL + '>' +
        L.metal + '</a></p>' +
      (isWalletPage ? '' :
        '<a class="sm-aff-guide" href="' + walletGuideUrl() + '">' +
        L.guide + ' &rarr;</a>') +
      '<p class="sm-aff-foot">' + L.disclosure + '</p>';
  }

  function railHtml() {
    var L = dict();
    return '<div class="sm-aff-rail-h">' + L.railHeading + '</div>' +
      '<div class="sm-aff-rail-p">' + L.railText + '</div>' +
      '<a class="sm-aff-btn" href="' + walletGuideUrl() + '">' +
        L.railCta + ' &rarr;</a>' +
      '<p class="sm-aff-rail-links">' +
        '<a href="' + BITBOX + '" ' + REL + '>BitBox02</a><br>' +
        '<a href="' + TREZOR_STORE + '" ' + REL + '>Trezor</a><br>' +
        '<a href="' + LEDGER + '" ' + REL + '>Ledger</a>' +
      '</p>' +
      '<p class="sm-aff-rail-note">' + L.railNote + '</p>';
  }

  function buildInContent() {
    var el = document.createElement("aside");
    el.className = "sm-aff";
    el.setAttribute("aria-label", "Hardware wallet recommendations");
    el.innerHTML = inContentHtml();
    return el;
  }

  function buildRail() {
    var el = document.createElement("div");
    el.className = "sm-aff-rail";
    el.innerHTML = railHtml();
    return el;
  }

  function placeInContent() {
    var anchor = document.querySelector(".related") ||
                 document.querySelector(".ad-banner") ||
                 document.querySelector("article > footer") ||
                 document.querySelector("footer");
    if (anchor && anchor.parentNode) {
      anchor.parentNode.insertBefore(buildInContent(), anchor);
    }
  }

  function placeRail() {
    var rail = document.querySelector(".ad-rail .ad-sticky");
    if (!rail) return;
    rail.insertBefore(buildRail(), rail.firstChild);
  }

  var lastLang = null;

  function refresh() {
    var cur = baseLang();
    if (cur === lastLang) return;
    lastLang = cur;
    var inContentEl = document.querySelector(".sm-aff");
    if (inContentEl) inContentEl.innerHTML = inContentHtml();
    var railEl = document.querySelector(".sm-aff-rail");
    if (railEl) railEl.innerHTML = railHtml();
  }

  function watchLanguage() {
    lastLang = baseLang();
    if (!("MutationObserver" in window)) return;
    var mo = new MutationObserver(refresh);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    // Tools site also fires this event on change — harmless extra check.
    document.addEventListener("satmeter:locale-change", refresh);
  }

  function boot() {
    injectStyles();
    placeInContent();
    placeRail();
    watchLanguage();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
