export type ShoeCategory = "running" | "training" | "lifestyle" | "outdoor" | "accessories";
export type ActivityPurpose = "run" | "train" | "everyday" | "street";
export type Gender = "men" | "women" | "unisex";

export type Product = {
  slug: string;
  name: string;
  nameEn: string;
  price: number;
  category: ShoeCategory;
  activity: ActivityPurpose;
  gender: Gender;
  isNew?: boolean;
  isBestseller?: boolean;
  isDrop?: boolean;
  tagline: string;
  description: string;
  colors: string[];
  sizes: string[];
  images: string[];
  rating: number;
  reviewCount: number;

  // Technical Specs
  weight: string; // e.g. "215g"
  heelDrop: string; // e.g. "8mm"
  cushion: "Responsive" | "Max Cushion" | "Firm & Stable" | "Balanced";
  surface: string; // "Road & Track", "Gym & Studio", "All-Terrain", "City & Street"
  upperMaterial: string;
  soleTech: string;
};

export const allSizes = ["38", "39", "40", "41", "42", "43", "44", "45", "46"];

export const categoryLabels: Record<string, string> = {
  all: "جميع الأحذية",
  men: "أحذية رجالية",
  women: "أحذية نسائية",
  running: "أحذية الجري والماراثون",
  training: "أحذية التمارين والنوادي",
  lifestyle: "أحذية كاجوال وستريت وير",
  outdoor: "أحذية المسارات والمغامرات",
  accessories: "الإكسسوارات والعناية",
};

export const activityCategories: { key: ActivityPurpose; icon: string; title: string; desc: string; tag: string }[] = [
  {
    key: "run",
    icon: "🏃",
    title: "RUN — الجري والسرعة",
    desc: "ألواح كربونية وفوم نتروجيني لامتصاص الصدمات وتحطيم أرقامك القياسية.",
    tag: "خفة وزن ودفع أمامي",
  },
  {
    key: "train",
    icon: "🏋️",
    title: "TRAIN — التمارين والنوادي",
    desc: "ثبات جانبي معزز، ونعل مسطح مضاد للانزلاق لتمارين القوة ورفع الأثقال.",
    tag: "توازن وصلابة",
  },
  {
    key: "everyday",
    icon: "🚶",
    title: "EVERYDAY — الراحة اليومية",
    desc: "نسيج شبكي مرن يتنفس مع قدمك طوال اليوم من الصباح حتى المساء.",
    tag: "وسادة هوائية ناعمة",
  },
  {
    key: "street",
    icon: "🏙️",
    title: "STREET — أزياء الشارع",
    desc: "طابع جريء ومستقبلي يجمع بين راحة الأحذية الرياضية وأناقة الستريت وير.",
    tag: "تصميم أيقوني معاصر",
  },
];

const img = (id: string, w = 1000) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

const pool = [
  img("photo-1542291026-7eec264c27ff"), // 0: Red/Black Nike performance sneaker
  img("photo-1552346154-21d32810aba3"), // 1: White/Grey modern runner
  img("photo-1608231387042-66d1773070a5"), // 2: Neon lime athletic shoe
  img("photo-1595950653106-6c9ebd614d3a"), // 3: Lifestyle street sneaker
  img("photo-1584735935682-2f2b69dff9d2"), // 4: Running close up mesh
  img("photo-1606107557195-0e29a4b5b4aa"), // 5: Volt green athletic
  img("photo-1582588678413-dbf45f4823e9"), // 6: Black minimalist trainer
  img("photo-1575537302964-96cd47c06b1b"), // 7: Modern white chunky
  img("photo-1539185441755-769473a23570"), // 8: Outdoor trail runner
  img("photo-1607522370275-f14206abe5d3"), // 9: Red sport sneaker
  img("photo-1587563871167-1ee9c731aefb"), // 10: Urban fashion sneaker
  img("photo-1514989940743-460b47c0e277"), // 11: Dark training sole
  img("photo-1600185365926-3a2ce3cdb9eb"), // 12: Classic court white
];

const gallery = (primary: string, secondary?: string) => {
  const rest = pool.filter((p) => p !== primary && p !== secondary);
  return secondary ? [primary, secondary, ...rest.slice(0, 2)] : [primary, ...rest.slice(0, 3)];
};

export const products: Product[] = [
  // RUNNING
  {
    slug: "avero-x1-pro",
    name: "أفيرو X1 برو كاربون",
    nameEn: "AVERO X1 Pro Carbon Runner",
    price: 19500,
    category: "running",
    activity: "run",
    gender: "unisex",
    isDrop: true,
    isBestseller: true,
    isNew: true,
    tagline: "حذاء السباقات الرائد بلوح كربوني كامل وفوم نتروجيني فائق الارتداد",
    description:
      "قمة الابتكار في السرعة. صُمم حذاء X1 Pro بنظام الدفع الكربوني المنحني (Carbon-Glide Plate) المدمج بين طبقتين من فوم NitroPulse فائق الخفة، ليمنحك استرجاعاً للطاقة بنسبة 85% مع كل خطوة على مضمار السباق.",
    colors: ["Volt Lime", "Triple Black", "Cloud White"],
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    rating: 5.0,
    reviewCount: 78,
    weight: "198 غرام (مقاس 42)",
    heelDrop: "8 ملم",
    cushion: "Max Cushion",
    surface: "Road & Marathon Track",
    upperMaterial: "نسيج شبكي فائق التهوية Monomesh خالي من الدرزات",
    soleTech: "لوح كربون كامل + نعل خارجي مطاطي عالي التماسك في المنعطفات",
    images: gallery(pool[0], pool[2]),
  },
  {
    slug: "avero-stride-boost",
    name: "سترايد بوست للجري اليومي",
    nameEn: "Stride Boost Daily Trainer",
    price: 16800,
    category: "running",
    activity: "run",
    gender: "men",
    isBestseller: true,
    tagline: "وسادة هوائية متطورة لامتصاص الصدمات في المسافات الطويلة",
    description:
      "شريكك الموثوق في التمارين اليومية والجري الصباحي. يوفر دعماً استثنائياً لقوس القدم مع بطانة كعب مقواة تحمي مفاصلك من الإجهاد في الجري على الإسفلت.",
    colors: ["Cloud White", "Triple Black", "Slate Grey"],
    sizes: ["40", "41", "42", "43", "44", "45", "46"],
    rating: 4.9,
    reviewCount: 54,
    weight: "235 غرام",
    heelDrop: "10 ملم",
    cushion: "Balanced",
    surface: "Road & Pavement",
    upperMaterial: "نسيج FlyKnit مرن ومقاوم للتمزق",
    soleTech: "فوم مزدوج الكثافة Dual-Foam مع أخاديد مرونة ديناميكية",
    images: gallery(pool[1], pool[4]),
  },
  {
    slug: "avero-trail-matrix",
    name: "تريل ماتريكس للمسارات الجبلية",
    nameEn: "Trail Matrix All-Terrain Runner",
    price: 18200,
    category: "outdoor",
    activity: "run",
    gender: "unisex",
    isNew: true,
    tagline: "نعل مدبب مع مانع انزلاق مخصص للطرق الوعرة والصخور المبللة",
    description:
      "مصمم لعشاق الجري في الطبيعة والمناطق الجبلية. يتميز بطبقة حماية من الصخور (Rock Plate) عند مقدمة القدم، ونعل خارجي بحواف مطاطية بارزة بعمق 5 ملم تمنحك تماسكاً فائقاً في الطين والمنحدرات.",
    colors: ["Desert Sand", "Triple Black", "Forest Green"],
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    rating: 4.8,
    reviewCount: 31,
    weight: "270 غرام",
    heelDrop: "6 ملم",
    cushion: "Firm & Stable",
    surface: "Trail, Mud & Mountain",
    upperMaterial: "نسيج Ripstop مقوّى طارد للماء والأتربة",
    soleTech: "مطاط Vibram MegaGrip ببروزات مضادة للانزلاق في كافة الاتجاهات",
    images: gallery(pool[8], pool[11]),
  },

  // TRAINING & GYM
  {
    slug: "avero-apex-trainer",
    name: "أبكس كروس ترينر للنوادي",
    nameEn: "Apex Cross-Trainer Stability",
    price: 15500,
    category: "training",
    activity: "train",
    gender: "men",
    isBestseller: true,
    tagline: "قاعدة عريضة ودعم جانبي لتمارين الكروس فيت ورفع الأثقال",
    description:
      "الحذاء الأفضل لتمارين HIIT، القفز، والسكوات. كعب عريض ومسطح يوفر ثباتاً مطلقاً تحت الأحمال الثقيلة، مع جوانب مطاطية ممتدة لحماية الحذاء أثناء تسلق الحبال.",
    colors: ["Triple Black", "Volt Lime", "Slate Grey"],
    sizes: ["40", "41", "42", "43", "44", "45"],
    rating: 4.9,
    reviewCount: 62,
    weight: "285 غرام",
    heelDrop: "4 ملم",
    cushion: "Firm & Stable",
    surface: "Gym, Turf & Studio",
    upperMaterial: "شبك معزز بطبقات TPU المقاومة للاحتكاك",
    soleTech: "نعل مسطح مانع للانزلاق مع قفص تثبيت الكعب TPU",
    images: gallery(pool[6], pool[5]),
  },
  {
    slug: "avero-core-lift",
    name: "كور ليفت باور للتدريب المكثف",
    nameEn: "Core Lift Zero-Drop Trainer",
    price: 17000,
    category: "training",
    activity: "train",
    gender: "women",
    isNew: true,
    tagline: "تصميم Zero-Drop بملمس طبيعي يمنحك اتصالاً كاملاً مع الأرضية",
    description:
      "حذاء تدريب نسائي بدون ميلان في النعل (Zero-Drop) يساعد في تفعيل عضلات القدم وتحسين التوازن أثناء تمارين الأرجل والسكوات والديدليفت.",
    colors: ["Cloud White", "Blush Pink", "Triple Black"],
    sizes: ["38", "39", "40", "41", "42"],
    rating: 5.0,
    reviewCount: 29,
    weight: "220 غرام",
    heelDrop: "0 ملم (Zero Drop)",
    cushion: "Firm & Stable",
    surface: "Gym & Lifting Platform",
    upperMaterial: "نسيج شبكي ناعم وقابل للتنفس مع حزام تثبيت أوسط",
    soleTech: "نعل مطاطي عالي التماسك مع نقطة ارتكاز دائرية للدوران",
    images: gallery(pool[11], pool[6]),
  },

  // LIFESTYLE & STREET
  {
    slug: "avero-orbit-runner",
    name: "أوربت رانر ستريت وير",
    nameEn: "Orbit Runner Chunky Streetwear",
    price: 18900,
    category: "lifestyle",
    activity: "street",
    gender: "unisex",
    isBestseller: true,
    tagline: "تصميم مستقبلي بحواف هندسية جريئة وملمس فاخر",
    description:
      "يجمع بين أحدث صيحات أزياء الشارع العالمية وراحة الأحذية الرياضية. نعل أوسط منحوت بطبقات هندسية ثلاثية الأبعاد، مع تفاصيل عاكسة للضوء في الظلام.",
    colors: ["Cloud White", "Triple Black", "Sand / Neon"],
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    rating: 5.0,
    reviewCount: 84,
    weight: "310 غرام",
    heelDrop: "8 ملم",
    cushion: "Max Cushion",
    surface: "Urban & Streetwear",
    upperMaterial: "مزيج من الجلد السويدي الفاخر والشبك التقني والألياف العاكسة 3M",
    soleTech: "نعل أوسط منحوت من فوم HyperFoam المريح للمشي الطويل",
    images: gallery(pool[7], pool[3]),
  },
  {
    slug: "avero-flux-slip",
    name: "فلوكس سليب-أون خفيف الوزن",
    nameEn: "Flux Knit Slip-On Cloud",
    price: 13500,
    category: "lifestyle",
    activity: "everyday",
    gender: "unisex",
    isNew: true,
    tagline: "تصميم حذاء الشراب (Sock-Knit) ينساب على قدمك دون الحاجة لرباط",
    description:
      "الراحة المطلقة في المشي والسفر. جزء علوي محبوك كقطعة واحدة يحيط بقدمك كالجورب، يسهل ارتداؤه وخلعه في ثوانٍ مع وزن خفيف يجعلك تشعر وكأنك تمشي على الهواء.",
    colors: ["Triple Black", "Slate Grey", "Sand"],
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    rating: 4.8,
    reviewCount: 47,
    weight: "175 غرام",
    heelDrop: "6 ملم",
    cushion: "Responsive",
    surface: "Everyday Walking & Travel",
    upperMaterial: "نسيج 3D Knit مطاطي متكيف مع شكل القدم",
    soleTech: "نعل خفيف الوزن فائق النعومة ممتص للاهتزازات",
    images: gallery(pool[3], pool[10]),
  },
  {
    slug: "avero-retro-court",
    name: "ريترو كورت كلاسيك جلد طبيعي",
    nameEn: "Retro Court Minimal Leather",
    price: 16200,
    category: "lifestyle",
    activity: "street",
    gender: "men",
    tagline: "جلد بقري طبيعي نقي بتصميم كورت كلاسيكي نظيف",
    description:
      "حذاء كلاسيكي أنيق مستوحى من ملاعب التنس في الثمانينيات. مصنوع يدوياً من الجلد الطبيعي الأبيض مع نعل كلاسيكي مخيّط بالكامل لضمان المتانة لسنوات.",
    colors: ["White / Green", "All White", "White / Navy"],
    sizes: ["40", "41", "42", "43", "44", "45"],
    rating: 4.9,
    reviewCount: 38,
    weight: "320 غرام",
    heelDrop: "0 ملم",
    cushion: "Balanced",
    surface: "Daily Casual & Smart Casual",
    upperMaterial: "100% جلد طبيعي ناعم ومقاوم للتشقق",
    soleTech: "نعل مطاطي مقوى ومخيّط يدويًا (Stitched Cupsole)",
    images: gallery(pool[12], pool[7]),
  },
  {
    slug: "avero-storm-boot",
    name: "ستورم بوت عالي ضد الماء",
    nameEn: "Storm Boot Waterproof High-Top",
    price: 22000,
    category: "outdoor",
    activity: "everyday",
    gender: "men",
    isNew: true,
    tagline: "حماية كاملة من الأمطار والبرد مع مظهر تكتيكي حضري معاصر",
    description:
      "حذاء شتوي عالي الرقبة مزود بغشاء داخلي مقاوم للماء 100% ويسمح بتهوية القدم. يحافظ على جفاف قدميك في الأجواء الممطرة والباردة.",
    colors: ["Matte Black", "Olive Drab"],
    sizes: ["41", "42", "43", "44", "45", "46"],
    rating: 5.0,
    reviewCount: 19,
    weight: "390 غرام",
    heelDrop: "10 ملم",
    cushion: "Max Cushion",
    surface: "Rain, Winter & Urban Outdoor",
    upperMaterial: "غشاء مقاوم للماء HydroGuard مع ياقة مبطنة بالنيوبرين",
    soleTech: "نعل شتوي مفرغ بمداس خشن لمنع الانزلاق على الأسطح الزلقة",
    images: gallery(pool[10], pool[8]),
  },

  // ACCESSORIES
  {
    slug: "avero-ergonomic-insoles",
    name: "ضبان ميموري فوم مريح للأحذية",
    nameEn: "Ergonomic Memory Foam Sport Insoles",
    price: 2800,
    category: "accessories",
    activity: "everyday",
    gender: "unisex",
    isBestseller: true,
    tagline: "دعم مخصص لقوس القدم وتخفيف فوري لإجهاد الكعب",
    description:
      "ضبان طبي رياضي قابل للقص ليناسب أي مقاس حذاء. مزود بوسادة جل عند الكعب تمتص الصدمات وتقلل من آلام باطن القدم.",
    colors: ["Volt / Black"],
    sizes: ["38-41", "42-45"],
    rating: 4.9,
    reviewCount: 71,
    weight: "45 غرام",
    heelDrop: "5 ملم",
    cushion: "Max Cushion",
    surface: "Fits all footwear",
    upperMaterial: "قماش مضاد للبكتيريا والرائحة",
    soleTech: "طبقة ميموري فوم مزدوجة مع وسادة جل سيليكونية",
    images: gallery(pool[4], pool[1]),
  },
  {
    slug: "avero-quick-laces",
    name: "أربطة مرنة بنظام القفل السريع",
    nameEn: "Elastic Lock Lacing System (2 Pairs)",
    price: 1600,
    category: "accessories",
    activity: "run",
    gender: "unisex",
    tagline: "لا داعي لربط الحذاء مجدداً — تحويل أي حذاء إلى سليب-أون",
    description:
      "أربطة مطاطية مع قفل ألومنيوم دوار ذكي. توفر ضغطاً متساوياً على القدم وتمنع انفكاك الرباط أثناء الجري والتمارين.",
    colors: ["Volt Lime", "Black", "White", "Reflective Silver"],
    sizes: ["Universal (120cm)"],
    rating: 4.8,
    reviewCount: 93,
    weight: "20 غرام",
    heelDrop: "—",
    cushion: "Balanced",
    surface: "Universal",
    upperMaterial: "خيوط مطاطية لاتكس مغزولة مع ألياف عاكسة",
    soleTech: "مشبك ألومنيوم كروي مانع للارتخاء",
    images: gallery(pool[5], pool[0]),
  },
  {
    slug: "avero-shoe-care-kit",
    name: "طقم تنظيف وعناية بالأحذية الاحترافي",
    nameEn: "Pro Footwear Care & Protect Kit",
    price: 3500,
    category: "accessories",
    activity: "street",
    gender: "unisex",
    isNew: true,
    tagline: "رغوة تنظيف فورية + بخاخ نانو عازل للماء + فرشاة ناعمة",
    description:
      "يحافظ على حذائك كالجديد. يحتوي الطقم على رغوة تنظيف عضوية آمنة على جميع الخامات (الشبك، الجلد، السويد)، فرشاة خشبية بشعيرات ناعمة، وبخاخ عازل للماء والسوائل.",
    colors: ["Standard Kit"],
    sizes: ["One Size"],
    rating: 5.0,
    reviewCount: 36,
    weight: "350 غرام",
    heelDrop: "—",
    cushion: "Balanced",
    surface: "Universal",
    upperMaterial: "مكونات طبيعية خالية من الكيماويات القاسية",
    soleTech: "آمن على المطاط والفوم والأقمشة الحساسة",
    images: gallery(pool[2], pool[7]),
  },
];

export const bySlug = (slug: string) => products.find((p) => p.slug === slug);

export const byCategory = (cat: string) => {
  if (cat === "all") return products;
  if (cat === "men") return products.filter((p) => p.gender === "men" || p.gender === "unisex");
  if (cat === "women") return products.filter((p) => p.gender === "women" || p.gender === "unisex");
  return products.filter((p) => p.category === cat);
};

export const byActivity = (act: ActivityPurpose) =>
  products.filter((p) => p.activity === act);

export const bestsellers = () => products.filter((p) => p.isBestseller);
