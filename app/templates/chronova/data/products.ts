export type WatchType = "classic" | "smart" | "accessories";
export type WatchStyle = "minimal" | "sport" | "classic" | "modern";

export type Product = {
  slug: string;
  name: string;
  nameEn: string;
  price: number;
  category: WatchType;
  style: WatchStyle;
  isNew?: boolean;
  isBestseller?: boolean;
  tagline: string;
  description: string;
  colors: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  warranty: string;

  // Classic Specs
  caseDiameter?: string;
  movement?: string;
  waterResistance?: string;
  glass?: string;
  strapMaterial?: string;

  // Smartwatch Specs
  display?: string;
  batteryLife?: string;
  sensors?: string[];
  healthFeatures?: string[];
  compatibility?: string;
  connectivity?: string;
};

export const categoryLabels: Record<string, string> = {
  all: "جميع الساعات",
  smart: "الساعات الذكية",
  classic: "الساعات الكلاسيكية",
  accessories: "الأحزمة والإكسسوارات",
};

export const categoryLabelsEn: Record<string, string> = {
  all: "All Watches",
  smart: "Smart Watches",
  classic: "Classic Watches",
  accessories: "Straps & Accessories",
};

export const styleLabels: Record<WatchStyle, { title: string; desc: string }> = {
  minimal: {
    title: "Minimal — البساطة الهادئة",
    desc: "تصاميم نقية، خطوط متوازنة، وأناقة غير متكلفة تناسب كل إطلالة.",
  },
  sport: {
    title: "Sport — الأداء الرياضي",
    desc: "هياكل قوية ومقاومة للصدمات، أجهزة استشعار حيوية لمواكبة تمارينك.",
  },
  classic: {
    title: "Classic — الفخامة الخالدة",
    desc: "حركات ميكانيكية دقيقة، زجاج ياقوتي، وأحزمة جلدية إيطالية أصلية.",
  },
  modern: {
    title: "Modern — التقنية المعاصرة",
    desc: "شاشات AMOLED فائقة السطوع، تيتانيوم مصقول، واتصال متواصل بيدك.",
  },
};

const img = (id: string, w = 1000) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

const pool = [
  img("photo-1522335789203-aabd1fc54bc9"), // 0: Luxury chronograph dark
  img("photo-1524805444758-089113d48a6d"), // 1: Classic mechanical watch
  img("photo-1508685096489-7aacd43bd3b1"), // 2: Smartwatch dark AMOLED
  img("photo-1510017803434-a899398421b3"), // 3: Minimal classic watch
  img("photo-1542496658-e33a6d0d50f6"), // 4: Vintage leather chrono
  img("photo-1579586337278-3befd40fd17a"), // 5: Fitness smartwatch active
  img("photo-1614164185128-e4ec99c436d7"), // 6: Diver automatic watch
  img("photo-1518131672697-613becd4fab5"), // 7: Rose gold minimal
  img("photo-1575311373937-040b8e1fd5b6"), // 8: Smartwatch lifestyle display
  img("photo-1509042239860-f550ce710b93"), // 9: Skeleton watch close up
  img("photo-1523275335684-37898b6baf30"), // 10: Smartwatch tech front
  img("photo-1533139502658-0198f920d8e8"), // 11: Steel Milanese strap
  img("photo-1617043786394-f977fa12eddf"), // 12: Premium leather strap
];

const gallery = (primary: string, secondary?: string) => {
  const rest = pool.filter((p) => p !== primary && p !== secondary);
  return secondary ? [primary, secondary, ...rest.slice(0, 2)] : [primary, ...rest.slice(0, 3)];
};

export const products: Product[] = [
  // CLASSIC WATCHES
  {
    slug: "chronova-arc-01",
    name: "كرونوفا آرك 01 أوتوماتيك",
    nameEn: "CHRONOVA ARC 01 Automatic",
    price: 32500,
    category: "classic",
    style: "classic",
    isBestseller: true,
    tagline: "تصميم هندسي خالد بحركة أوتوماتيكية سويسرية دقيقة",
    description:
      "تجسيد للهندسة المعمارية في صناعة الساعات. هيكل مصنوع من الفولاذ المقاوم للصدأ 316L المصقول يدوياً، مع ميناء رمادي داكن غير لامع، وزجاج من الياقوت الأزرق المقاوم للخدش (Sapphire Crystal).",
    colors: ["Space Black", "Silver Steel", "Rose Gold"],
    rating: 5.0,
    reviewCount: 38,
    warranty: "ضمان دولي لمدة سنتين شامل للحركة والهيكل",
    caseDiameter: "40 ملم",
    movement: "أوتوماتيكي (احتياطي طاقة 42 ساعة)",
    waterResistance: "10 ATM (100 متر)",
    glass: "كريستال ياقوتي مضاد للانعكاس",
    strapMaterial: "فولاذ مقاوم للصدأ 316L مع مشبك فراشة",
    images: gallery(pool[0], pool[1]),
  },
  {
    slug: "chronova-heritage-chrono",
    name: "هيريتدج كرونوغراف كلاسيك",
    nameEn: "Heritage Chronograph Vintage",
    price: 28900,
    category: "classic",
    style: "classic",
    isNew: true,
    isBestseller: true,
    tagline: "دقة الكرونوغراف مع فخامة الجلد الإيطالي الأصيل",
    description:
      "مستوحاة من سباقات السيارات الكلاسيكية في الستينيات. تتميز بآلية كرونوغراف دقيقة لقياس الوقت بدقة أجزاء الثانية، مع حزام من الجلد الإيطالي المعتق الذي يزداد جمالاً مع مرور الزمن.",
    colors: ["Cognac Leather", "Obsidian Black"],
    rating: 4.9,
    reviewCount: 29,
    warranty: "ضمان لمدة سنتين",
    caseDiameter: "41 ملم",
    movement: "ميكا-كوارتز هجين (دقة الكوارتز مع سلاسة العقرب الميكانيكي)",
    waterResistance: "5 ATM (50 متراً)",
    glass: "زجاج ياقوتي مزدوج القبة",
    strapMaterial: "جلد بقري إيطالي مدبوغ نباتياً",
    images: gallery(pool[4], pool[0]),
  },
  {
    slug: "chronova-stellar-skeleton",
    name: "ستيلار سكيليتون أوتوماتيك",
    nameEn: "Stellar Skeleton Automatic",
    price: 44000,
    category: "classic",
    style: "modern",
    isBestseller: true,
    tagline: "ميناء هيكلي مكشوف يُظهر سحر التروس والنبض الميكانيكي",
    description:
      "قطعة فنية استثنائية تكشف عن جمال الحركة الميكانيكية المعقدة من خلال واجهة شفافة وخلفية زجاجية تتيح لك رؤية نبض الرقاص والتروس الدقيقة أثناء عملها المتناغم.",
    colors: ["Gunmetal", "Silver"],
    rating: 5.0,
    reviewCount: 17,
    warranty: "ضمان فاخر لمدة 3 سنوات",
    caseDiameter: "42 ملم",
    movement: "ميكانيكي أوتوماتيكي مفرغ بالكامل (24 حجر كريم)",
    waterResistance: "5 ATM (50 متراً)",
    glass: "ياقوت كريستالي أمامي وخلفي (Exhibition Caseback)",
    strapMaterial: "سوار ستانلس ستيل مع وصلات مصقولة",
    images: gallery(pool[9], pool[1]),
  },
  {
    slug: "chronova-diver-pro-300",
    name: "دايفر برو 300 غوص احترافي",
    nameEn: "Diver Pro 300M Automatic",
    price: 37500,
    category: "classic",
    style: "sport",
    tagline: "ساعة غوص احترافية بإطار سيراميك ومقاومة 300 متر",
    description:
      "صُنعت للمغامرات تحت الماء وفي أصعب الظروف. إطار سيراميكي دوار أحادي الاتجاه بـ 120 نقرة، وعقارب مضيئة بمادة Super-LumiNova السويسرية لقراءة واضحة في الظلام الدامس.",
    colors: ["Deep Sea Blue", "Matte Black"],
    rating: 4.8,
    reviewCount: 22,
    warranty: "ضمان مقاومة الماء والضغط لمدة سنتين",
    caseDiameter: "42.5 ملم",
    movement: "أوتوماتيكي عالي الدقة مع صمام تحرير الهيليوم",
    waterResistance: "30 ATM (300 متر)",
    glass: "ياقوت سميك 3 ملم فائق القوة",
    strapMaterial: "فولاذ صلب مع تمديد خاص لبدلة الغوص",
    images: gallery(pool[6], pool[0]),
  },
  {
    slug: "chronova-minimal-mesh",
    name: "مينيمال شبكي فائق النحافة",
    nameEn: "Minimal Slim Mesh Edition",
    price: 19800,
    category: "classic",
    style: "minimal",
    isNew: true,
    tagline: "سماكة 6.8 ملم فقط لتجربة خفيفة على المعصم",
    description:
      "تعتمد فلسفة البساطة الخالصة. تصميم نحيف ومريح ينساب تحت أكمام القميص بسلاسة، مع حزام ميلانيزي شبكي مغناطيسي مرن وقابل للتعديل الفوري.",
    colors: ["All Black", "Silver", "Champagne"],
    rating: 4.9,
    reviewCount: 45,
    warranty: "ضمان لمدة سنتين",
    caseDiameter: "39 ملم",
    movement: "كوارتز ياباني فائق الدقة (عمر البطارية 3 سنوات)",
    waterResistance: "3 ATM (مقاومة لرذاذ الماء والمطر)",
    glass: "زجاج معدني مقوّى مضاد للخدوش",
    strapMaterial: "حزام ميلانيزي ستانلس ستيل شبكي",
    images: gallery(pool[3], pool[7]),
  },
  {
    slug: "chronova-luna-rose",
    name: "لونا روز غولد عرق اللؤلؤ",
    nameEn: "Luna Rose Mother of Pearl",
    price: 26500,
    category: "classic",
    style: "minimal",
    tagline: "ميناء من عرق اللؤلؤ الطبيعي مع إطار بلون الذهب الوردي",
    description:
      "ساعة نسائية راقية بميناء يتلألأ بانعكاسات طبيعية فريدة من عرق اللؤلؤ. لمسة أنثوية فاخرة تناسب الإطلالات اليومية والمناسبات الخاصة.",
    colors: ["Rose Gold / White", "Silver / MOP"],
    rating: 5.0,
    reviewCount: 31,
    warranty: "ضمان لمدة سنتين",
    caseDiameter: "34 ملم",
    movement: "كوارتز سويسري عالي الدقة",
    waterResistance: "5 ATM (50 متراً)",
    glass: "زجاج ياقوتي نقي",
    strapMaterial: "سوار من الفولاذ بلون الذهب الوردي أو جلد ناعم",
    images: gallery(pool[7], pool[3]),
  },

  // SMARTWATCHES
  {
    slug: "chronova-s1-pro",
    name: "كرونوفا S1 برو تيتانيوم الذكية",
    nameEn: "CHRONOVA S1 Pro Titanium",
    price: 27900,
    category: "smart",
    style: "modern",
    isBestseller: true,
    isNew: true,
    tagline: "شاشة AMOLED فائقة، مراقبة صحية متقدمة، وبطارية تدوم 14 يوماً",
    description:
      "الساعة الذكية الرائدة من كرونوفا. تجمع بين هيكل التيتانيوم خفيف الوزن وزجاج الياقوت وشاشة AMOLED نابضة بالحياة تدعم ميزة Always-On Display. مزودة بمستشعرات طبية لمراقبة تخطيط القلب ECG، نسبة الأكسجين SpO2، وتتبع النوم العميق.",
    colors: ["Titanium Grey", "Obsidian Black"],
    rating: 5.0,
    reviewCount: 64,
    warranty: "ضمان تقني لمدة سنة كاملة مع تحديثات نظام مستمرة",
    display: "1.43 بوصة AMOLED فائقة الدقة (466x466) 1000 nits",
    batteryLife: "حتى 14 يوماً في الاستخدام العادي (7 أيام مكثف)",
    sensors: ["مستشعر ECG", "معدل نبضات القلب 24/7", "مقياس الأكسجين SpO2", "مستشعر درجة الحرارة الجلدية", "بارومتر وضغط جوي"],
    healthFeatures: ["تخطيط القلب", "تحليل النوم العلمي", "مراقبة الإجهاد والتنفس", "كشف السقوط التلقائي"],
    compatibility: "متوافقة مع iOS و Android",
    connectivity: "Bluetooth 5.3 + GPS مدمج مزدوج النطاق + NFC",
    waterResistance: "IP68 + 5 ATM (مقاومة للسباحة)",
    images: gallery(pool[2], pool[8]),
  },
  {
    slug: "chronova-active-pulse",
    name: "أكتيف بلس الرياضية الذكية",
    nameEn: "Active Pulse Fitness Smartwatch",
    price: 18500,
    category: "smart",
    style: "sport",
    isBestseller: true,
    tagline: "أكثر من 120 نمطاً رياضياً وتتبع دقيق للمؤشرات الحيوية",
    description:
      "رفيقك المثالي في التمارين واللياقة البدنية. وزن خفيف جداً (38 غرام) مع حزام سيليكون مسامي يمتص العرق، وتتبع ذكي تلقائي لتمارين الجري، السباحة، وركوب الدراجات مع حساب السعرات الحرارية بدقة.",
    colors: ["Graphite Black", "Storm Navy", "Sage Green"],
    rating: 4.8,
    reviewCount: 52,
    warranty: "ضمان لمدة سنة",
    display: "1.39 بوصة AMOLED مقاومة للخدش",
    batteryLife: "حتى 10 أيام",
    sensors: ["مستشعر نبضات القلب البصري Gen-4", "SpO2", "مقياس تسارع سداسي المحاور"],
    healthFeatures: ["120+ نمط رياضي", "مساعد التعافي العضلي", "حساب استهلاك الأكسجين VO2 Max"],
    compatibility: "iOS و Android (تطبيق Chronova Fit)",
    connectivity: "Bluetooth 5.2 (إشعارات + تحكم بالموسيقى)",
    waterResistance: "5 ATM (مقاومة للماء حتى 50 متراً)",
    images: gallery(pool[5], pool[10]),
  },
  {
    slug: "chronova-vanguard-gps",
    name: "فانغارد GPS للمغامرات والأنشطة الخارجية",
    nameEn: "Vanguard Rugged GPS Outdoor",
    price: 34000,
    category: "smart",
    style: "sport",
    isNew: true,
    tagline: "هيكل عسكري مقاوم للصدمات ونظام ملاحة دقيق متعدد الأقمار",
    description:
      "مصممة للبيئات القاسية وتسلق الجبال. مطابقة للمعايير العسكرية MIL-STD-810G لمقاومة الحرارة والصدمات والغبار، مع نظام ملاحة GPS خماسي الأقمار لتحديد المواقع دون الحاجة لهاتفك.",
    colors: ["Desert Tan", "Tactical Black"],
    rating: 4.9,
    reviewCount: 27,
    warranty: "ضمان لمدة سنتين ضد عيوب التصنيع",
    display: "1.4 بوصة شاشة عاكسة واضحة تحت أشعة الشمس المباشرة",
    batteryLife: "حتى 24 يوماً (أو 40 ساعة تشغيل متواصل للـ GPS)",
    sensors: ["GPS مزدوج التردد", "بوصلة رقمية ثلاثية المحاور", "مقياس الارتفاع والضغط الجوي Altimeter"],
    healthFeatures: ["تتبع المسارات والعودة لنقطة البداية", "تنبيهات العواصف والطقس", "تتبع اللياقة في الارتفاعات"],
    compatibility: "iOS و Android",
    connectivity: "Bluetooth + ANT+ لأحزمة الصدر الرياضية",
    waterResistance: "10 ATM (100 متر)",
    images: gallery(pool[10], pool[2]),
  },
  {
    slug: "chronova-luxe-smart",
    name: "لوكس سيراميك الذكية الهجينة",
    nameEn: "Luxe Ceramic Hybrid Smartwatch",
    price: 36500,
    category: "smart",
    style: "modern",
    tagline: "أناقة الساعات السويسرية مع قوة التقنية الذكية الخفية",
    description:
      "تدمج عقارب ميكانيكية حقيقية مع شاشة ذكية سرية تظهر فقط عند لمسها أو وصول إشعار. إطار من السيراميك النقي المصقول بالليزر الذي لا يخدش أبداً، مع شحن لاسلكي سريع.",
    colors: ["Ceramic Black", "Ceramic White & Gold"],
    rating: 5.0,
    reviewCount: 39,
    warranty: "ضمان فاخر لمدة سنتين",
    display: "شاشة لمسية خفية AMOLED مدمجة تحت الميناء الكلاسيكي",
    batteryLife: "حتى 30 يوماً في الوضع الهجين الكلاسيكي",
    sensors: ["مستشعر بصري للنبض", "مقياس النشاط والخطوات", "مستشعر إجهاد"],
    healthFeatures: ["إشعارات ذكية مصفاة", "تحليل النوم", "تتبع النشاط اليومي"],
    compatibility: "iOS و Android",
    connectivity: "Bluetooth Low Energy + شحن لاسلكي مغناطيسي",
    waterResistance: "5 ATM (50 متراً)",
    images: gallery(pool[8], pool[2]),
  },
  {
    slug: "chronova-ultra-connect",
    name: "ألترا كونيكت الذكية مع المكالمات",
    nameEn: "Ultra Connect Smartwatch with BT Calling",
    price: 22500,
    category: "smart",
    style: "modern",
    tagline: "مكبر صوت وميكروفون مدمج لإجراء واستقبال المكالمات بوضوح",
    description:
      "ابقَ على اتصال دائماً دون إخراج هاتفك من جيبك. مكالمات بلوتوث عالية النقاء بفضل تقنية عزل الضوضاء، ومساعد صوتي ذكي للرد على الرسائل والتحكم في مهامك اليومية.",
    colors: ["Midnight Black", "Starlight Silver"],
    rating: 4.8,
    reviewCount: 48,
    warranty: "ضمان لمدة سنة",
    display: "1.45 بوصة AMOLED منحنية الحواف 60Hz",
    batteryLife: "حتى 7–9 أيام",
    sensors: ["ميكروفون وسماعة HD", "مستشعر نبضات القلب وSpO2"],
    healthFeatures: ["مكالمات بلوتوث", "تنبيهات التطبيقات والرسائل", "مراقبة الصحة والنوم"],
    compatibility: "iOS و Android",
    connectivity: "Bluetooth 5.3 للمكالمات والبيانات",
    waterResistance: "IP68 مقاومة للماء والغبار",
    images: gallery(pool[2], pool[5]),
  },

  // ACCESSORIES
  {
    slug: "chronova-milanese-strap",
    name: "حزام ميلانيزي شبكي ستانلس ستيل",
    nameEn: "Milanese Magnetic Mesh Strap (20mm / 22mm)",
    price: 4500,
    category: "accessories",
    style: "minimal",
    isBestseller: true,
    tagline: "شبكة فولاذية مرنة مع إغلاق مغناطيسي سلس وقوي",
    description:
      "حزام شبكي مصقول من الفولاذ المقاوم للصدأ 316L. تصميم خفيف ومرن يلتف حول المعصم بانسيابية، متوافق مع جميع ساعات كرونوفا الكلاسيكية والذكية بمقاس 20 و 22 ملم.",
    colors: ["Space Black", "Silver", "Champagne Gold"],
    rating: 4.9,
    reviewCount: 56,
    warranty: "ضمان الجودة لمدة سنة",
    strapMaterial: "فولاذ مقاوم للصدأ 316L مغناطيسي",
    images: gallery(pool[11], pool[0]),
  },
  {
    slug: "chronova-leather-strap",
    name: "حزام جلد إيطالي أصلي معتق",
    nameEn: "Italian Tuscan Full-Grain Leather Strap",
    price: 5200,
    category: "accessories",
    style: "classic",
    tagline: "جلد طبيعي مدبوغ يدوياً في توسكانا بإيطاليا",
    description:
      "حزام كلاسيكي فاخر مزود بنظام الفك السريع (Quick Release) لتبديل الحزام خلال ثوانٍ معدودة بدون أي أدوات. بطانة داخلية ناعمة لا تسبب حساسية للمعصم.",
    colors: ["Vintage Brown", "Dark Cognac", "Classic Black"],
    rating: 5.0,
    reviewCount: 42,
    warranty: "ضمان الجلد الأصلي لمدة سنة",
    strapMaterial: "جلد بقري إيطالي Full-Grain",
    images: gallery(pool[12], pool[4]),
  },
  {
    slug: "chronova-charging-dock",
    name: "قاعدة شحن لاسلكية سريعة من الألومنيوم",
    nameEn: "Fast Wireless Aluminum Charging Dock",
    price: 3800,
    category: "accessories",
    style: "modern",
    isNew: true,
    tagline: "قاعدة شحن مغناطيسية بتصميم مكتبي أنيق من الألومنيوم المؤكسد",
    description:
      "قاعدة شحن أنيقة تثبت ساعتك الذكية بزاوية مريحة لتتحول إلى ساعة مكتبية أثناء الشحن السريع. مزودة بقاعدة مانعة للانزلاق وحماية ذكية من الحرارة الزائدة.",
    colors: ["Space Grey", "Silver"],
    rating: 4.9,
    reviewCount: 19,
    warranty: "ضمان استبدال لمدة سنة",
    images: gallery(pool[10], pool[2]),
  },
];

export const bySlug = (slug: string) => products.find((p) => p.slug === slug);

export const byCategory = (cat: string) =>
  cat === "all" ? products : products.filter((p) => p.category === cat);

export const byStyle = (style: WatchStyle) =>
  products.filter((p) => p.style === style);

export const bestsellers = () => products.filter((p) => p.isBestseller);
