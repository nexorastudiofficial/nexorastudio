export type Product = {
  slug: string;
  name: string;
  nameEn: string;
  price: number;
  category: "clothing" | "toys" | "gifts";
  ageGroup: "newborn" | "baby" | "toddler" | "little-kid";
  isNew?: boolean;
  isBestseller?: boolean;
  description: string;
  colors?: string[];
  sizes?: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  skills?: string[]; // for toys
  ageRange?: string; // e.g. "12+ months"
  materials?: string;
  care?: string;
  safety?: string;
};

export const sizes = ["0-3M", "3-6M", "6-12M", "12-18M", "18-24M", "2-3Y", "3-4Y", "4-5Y"];

export const categoryLabels: Record<string, string> = {
  clothing: "ملابس",
  toys: "ألعاب",
  gifts: "هدايا",
  all: "جميع المنتجات",
};

export const categoryLabelsEn: Record<string, string> = {
  clothing: "Clothing",
  toys: "Toys",
  gifts: "Gifts",
  all: "All Products",
};

export const ageLabels: Record<string, { label: string; range: string; desc: string; bg: string }> = {
  newborn: {
    label: "حديث الولادة",
    range: "0–3 أشهر",
    desc: "أقمشة فائقة النعومة وتصاميم تسهّل التلبيس",
    bg: "bg-[#F2E9DC]",
  },
  baby: {
    label: "رضيع",
    range: "3–12 شهراً",
    desc: "قطع مريحة ومرنة مصممة للحبو والاستكشاف",
    bg: "bg-[#A8B5A0]/20",
  },
  toddler: {
    label: "طفل دارج",
    range: "1–3 سنوات",
    desc: "أزياء وألعاب تفاعلية للحركة والنشاط اليومي",
    bg: "bg-[#A9BBC4]/20",
  },
  "little-kid": {
    label: "طفل صغير",
    range: "3–6 سنوات",
    desc: "ملابس متينة وألعاب إبداعية لتنمية الخيال",
    bg: "bg-[#E8B9A6]/20",
  },
};

const img = (id: string, w = 1000) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

const pool = [
  img("photo-1522771930-78b353a4aae9"), // 0: baby clothing
  img("photo-1519689680058-324335c77eba"), // 1: baby in knits
  img("photo-1515488042361-ee00e0ddd4e3"), // 2: baby clothes flat lay
  img("photo-1555252333-9f8e92e65df9"), // 3: wooden toys
  img("photo-1596461404969-9ae70f2830c1"), // 4: baby romper
  img("photo-1604917621956-10dfa7cce2e7"), // 5: baby playing
  img("photo-1578662996442-48f60103fc96"), // 6: plush toys
  img("photo-1608106055019-c4da1d8a0965"), // 7: children clothes
  img("photo-1566004100477-7b3be6eb22e4"), // 8: nursery room
  img("photo-1503919545889-aef636e10ad4"), // 9: baby accessories
  img("photo-1607453998774-d533f65dac99"), // 10: wooden blocks
  img("photo-1545558014-8692077e9b5c"), // 11: baby gifts
  img("photo-1611771936404-e8da6d61cae0"), // 12: baby outfit
];

const gallery = (primary: string, secondary?: string) => {
  const rest = pool.filter((p) => p !== primary && p !== secondary);
  return secondary ? [primary, secondary, ...rest.slice(0, 2)] : [primary, ...rest.slice(0, 3)];
};

export const products: Product[] = [
  // CLOTHING
  {
    slug: "organic-ribbed-romper",
    name: "رومبير قطني مضلع عضوي",
    nameEn: "Organic Ribbed Romper",
    price: 3400,
    category: "clothing",
    ageGroup: "baby",
    isBestseller: true,
    description:
      "رومبير من القطن العضوي 100% المضلع فائق النعومة، مزود بأزرار سفلية خشبية لسهولة التبديل. مصمم ليوفر الراحة الكاملة لطفلك أثناء النوم واللعب.",
    colors: ["Cream", "Sage", "Dusty Blue"],
    sizes: ["0-3M", "3-6M", "6-12M", "12-18M"],
    rating: 5.0,
    reviewCount: 24,
    materials: "100% قطن عضوي معتمد GOTS وخالي من المواد الكيميائية الضارة.",
    care: "غسيل آلي على حرارة 30° مئوية، تجفيف في الظل، كي لطيف.",
    safety: "أزرار خالية من النيكل ومثبتة بإحكام فائق.",
    images: gallery(pool[0], pool[4]),
  },
  {
    slug: "cotton-knit-sweater",
    name: "كنزة صوفية محبوكة ناعمة",
    nameEn: "Cotton Knit Sweater",
    price: 4200,
    category: "clothing",
    ageGroup: "toddler",
    isNew: true,
    isBestseller: true,
    description:
      "كنزة محبوكة بخيوط قطنية طبيعية دافئة ومريحة، بقصة عصرية وأكمام ريجلان مريحة تمنح طفلك حرية الحركة في الأيام الباردة.",
    colors: ["Oatmeal", "Sage", "Dusty Rose"],
    sizes: ["12-18M", "18-24M", "2-3Y", "3-4Y"],
    rating: 5.0,
    reviewCount: 18,
    materials: "100% خيوط قطن ناعم ومضاد للحساسية.",
    care: "غسيل يدوي أو دورة أقمشة صوف خفيفة، تجفيف مسطح.",
    safety: "خيوط طبيعية لا تسبب حكة أو تهيج للبشرة الحساسة.",
    images: gallery(pool[1], pool[7]),
  },
  {
    slug: "muslin-bodysuit-set",
    name: "طقم بودي موسلين مزدوج",
    nameEn: "Muslin Bodysuit Set",
    price: 3900,
    category: "clothing",
    ageGroup: "newborn",
    isBestseller: true,
    description:
      "طقم مكون من قطعتي بودي من قماش الموسلين الخفيف القابل للتنفس. نسيج يزداد نعومة مع كل غسلة ومثالي للأيام الدافئة وبشرة المواليد الجدد.",
    colors: ["Natural", "Cloud"],
    sizes: ["0-3M", "3-6M"],
    rating: 4.9,
    reviewCount: 31,
    materials: "100% قطن موسلين عضوي مزدوج الطبقة.",
    care: "غسيل آلي بارد، لا تستخدم المبيضات.",
    safety: "صبغات مائية طبيعية صديقة للبيئة والرضع.",
    images: gallery(pool[2], pool[0]),
  },
  {
    slug: "organic-sleepsuit",
    name: "بدلة نوم متكاملة للأطفال",
    nameEn: "Organic Cotton Sleepsuit",
    price: 3600,
    category: "clothing",
    ageGroup: "baby",
    isNew: false,
    description:
      "بدلة نوم مزودة بسحاب ثنائي الاتجاه محمي لتبديل الحفاضات في الليل بسهولة وسرعة ودون إيقاظ طفلك. أقدام مغطاة للدفء.",
    colors: ["Cream", "Sage"],
    sizes: ["0-3M", "3-6M", "6-12M"],
    rating: 4.9,
    reviewCount: 15,
    materials: "100% قطن عضوي محبوك فائق النعومة.",
    care: "غسيل آلي دافئ، تجفيف على حرارة منخفضة.",
    safety: "سحاب YKK مع غطاء حماية عند الذقن لمنع الخدوش.",
    images: gallery(pool[4], pool[2]),
  },
  {
    slug: "linen-bloomers",
    name: "شورت بلومرز كتان أنيق",
    nameEn: "Linen Bloomers",
    price: 2400,
    category: "clothing",
    ageGroup: "baby",
    isNew: true,
    description:
      "بلومرز كلاسيكي من الكتان الطبيعي بخصر مطاطي ناعم وأفخاذ مريحة تغطي الحفاضة بأناقة وتكتمل مع الجوارب والقمصان.",
    colors: ["Natural", "Dusty Blue", "Peach"],
    sizes: ["3-6M", "6-12M", "12-18M"],
    rating: 4.8,
    reviewCount: 9,
    materials: "100% كتان طبيعي نقي مغسول بالإنزيمات لنعومة فورية.",
    care: "غسيل آلي بارد، كي بدرجة حرارة متوسطة للكتان.",
    safety: "مطاط داخلي عريض لا يضغط على بطن الطفل.",
    images: gallery(pool[7], pool[12]),
  },
  {
    slug: "chunky-knit-cardigan",
    name: "كارديجان صوف محبوك سميك",
    nameEn: "Chunky Knit Cardigan",
    price: 4800,
    category: "clothing",
    ageGroup: "toddler",
    isBestseller: true,
    description:
      "كارديجان سميك دافئ بأزرار خشب جوز الهند الطبيعية. قطعة فاخرة ترافق طفلك في النزهات والمناسبات العائلية.",
    colors: ["Cream", "Camel"],
    sizes: ["12-18M", "18-24M", "2-3Y", "3-4Y"],
    rating: 5.0,
    reviewCount: 22,
    materials: "مزيج قطن عضوي وصوف ميرينو غير مسبب للحكة.",
    care: "غسيل يدوي بماء فاتر وتجفيف مسطح على منشفة.",
    safety: "أزرار خشبية مثبتة بخيوط مزدوجة آمنة.",
    images: gallery(pool[12], pool[1]),
  },
  {
    slug: "ribbed-leggings",
    name: "بنطال ليقنز مضلع مرن",
    nameEn: "Ribbed Leggings",
    price: 2100,
    category: "clothing",
    ageGroup: "baby",
    description:
      "ليقنز يومي أساسي بقماش مضلع مطاطي يسمح بحرية حركة الأرجل عند الحبو والمشي، مع خصر عالي يحافظ على دفء البطن.",
    colors: ["Oatmeal", "Sage", "Cocoa"],
    sizes: ["3-6M", "6-12M", "12-18M", "18-24M"],
    rating: 4.8,
    reviewCount: 27,
    materials: "95% قطن عضوي، 5% إيلاستين للمرونة.",
    care: "غسيل آلي مع ألوان مماثلة.",
    safety: "أصباغ آمنة خالية من الفورمالديهايد والمواد الثقيلة.",
    images: gallery(pool[0], pool[9]),
  },
  {
    slug: "waffle-dungarees",
    name: "سالوبيت وافل محبوك",
    nameEn: "Waffle Knit Dungarees",
    price: 4500,
    category: "clothing",
    ageGroup: "toddler",
    isNew: true,
    description:
      "سالوبيت بنقشة الوافل العصرية بحمالات قابلة للتعديل لمواكبة نمو طفلك، مع جيب أمامي أنيق وأزرار سفلية عملية.",
    colors: ["Oatmeal", "Dusty Blue"],
    sizes: ["12-18M", "18-24M", "2-3Y"],
    rating: 4.9,
    reviewCount: 11,
    materials: "100% قطن وافل مريح ومتين.",
    care: "غسيل آلي 30° مئوية، كوي بالبخار الخفيف.",
    safety: "حمالات آمنة بأزرار خشبية مستديرة الحواف.",
    images: gallery(pool[9], pool[7]),
  },

  // TOYS
  {
    slug: "wooden-stacking-toy",
    name: "لعبة تكديس الحلقات الخشبية",
    nameEn: "Wooden Stacking Toy",
    price: 3200,
    category: "toys",
    ageGroup: "baby",
    isBestseller: true,
    ageRange: "12+ شهراً",
    skills: ["المهارات الحركية الدقيقة", "التنسيق البصري الحركي", "حل المشكلات"],
    description:
      "لعبة كلاسيكية مصنوعة يدويًا من خشب الزان الصلب بألوان ترابية هادئة. تساعد الطفل على إدراك الأحجام والتسلسل وتطوير التوازن والتركيز.",
    rating: 5.0,
    reviewCount: 19,
    materials: "خشب زان طبيعي 100% من غابات مستدامة معتمد FSC.",
    care: "امسح بقطعة قماش مبللة، لا تغمر في الماء.",
    safety: "دهانات مائية غير سامة ومطابقة للمواصفات الأوروبية EN71.",
    images: gallery(pool[3], pool[10]),
  },
  {
    slug: "sensory-teether-set",
    name: "طقم عضاضات حسية سيليكون وخشب",
    nameEn: "Sensory Teether Set",
    price: 2200,
    category: "toys",
    ageGroup: "newborn",
    isNew: true,
    ageRange: "3+ أشهر",
    skills: ["الاستكشاف الحسي", "الإمساك والقبض", "تسكين التسنين"],
    description:
      "مجموعة من حلقتي تسنين تجمع بين سيليكون الطعام الصحي وخشب القيقب الأملس، بملمس محبب يساعد على تهدئة لثة الرضيع عند ظهور الأسنان الأولى.",
    rating: 4.9,
    reviewCount: 33,
    materials: "سيليكون غذائي 100% خالي من BPA وPVC والفثالات + خشب قيقب طبيعي.",
    care: "يغسل بالماء الدافئ والصابون اللطيف.",
    safety: "مختبر طبيًا وآمن تمامًا للتعقيم والمضغ اليومي.",
    images: gallery(pool[9], pool[5]),
  },
  {
    slug: "plush-bunny",
    name: "أرنب محشو من القطن العضوي",
    nameEn: "Organic Cotton Plush Bunny",
    price: 2900,
    category: "toys",
    ageGroup: "newborn",
    isBestseller: true,
    ageRange: "منذ الولادة (0+)",
    skills: ["الشعور بالأمان والراحة", "التحفيز اللمسي", "التعلق الإيجابي"],
    description:
      "رفيق النوم واللعب المفضل. دمية أرنب محشوة بحشوة طبيعية لا تسبب الحساسية، بأذنين طويلتين يسهل على يد الرضيع الصغيرة الإمساك بهما.",
    rating: 5.0,
    reviewCount: 41,
    materials: "قماش خارجي من القطن العضوي 100% مع حشوة ألياف ذرة قابلة للتحلل.",
    care: "غسيل يدوي أو دورة حساسة داخل كيس غسيل، تجفيف هوائي.",
    safety: "عيون وملامح مطرزة يدويًا بدون أزرار أو قطع بلاستيكية صغيرة.",
    images: gallery(pool[6], pool[8]),
  },
  {
    slug: "wooden-rainbow",
    name: "قوس قزح خشبي ترابي تفاعلي",
    nameEn: "Wooden Rainbow Stacker",
    price: 4600,
    category: "toys",
    ageGroup: "toddler",
    ageRange: "18+ شهراً",
    skills: ["الإبداع والخيال المفتوح", "الإدراك الفضائي", "التوازن"],
    description:
      "قوس قزح مونتيسوري يتكون من 8 أقواس بألوان باستيل هادئة. لعبة ذات نهايات مفتوحة تتحول إلى جسور، وأنفاق، وبيوت للدمى حسب خيال طفلك.",
    rating: 4.8,
    reviewCount: 16,
    materials: "خشب صنوبر معالج يدويًا بحواف مستديرة ناعمة.",
    care: "تنظيف بقطعة قماش جافة أو شبه رطبة.",
    safety: "مطلي بزيوت نباتية وأصباغ عضوية غير سامة.",
    images: gallery(pool[10], pool[3]),
  },
  {
    slug: "pretend-play-kitchen",
    name: "مجموعة أدوات المطبخ الخشبية",
    nameEn: "Wooden Play Kitchen Set",
    price: 5800,
    category: "toys",
    ageGroup: "little-kid",
    isNew: true,
    ageRange: "3+ سنوات",
    skills: ["لعب الأدوار والتخيل", "التواصل اللغوي", "التعاون الاجتماعي"],
    description:
      "طقم أدوات طبخ خشبية للأطفال يضم مقلاة، قدر، وملاعق وأواني بهارات خشبية بحجم مثالي للأيدي الصغيرة، لتشجيع اللعب التخيلي الممتع.",
    rating: 5.0,
    reviewCount: 8,
    materials: "خشب بتولا صلب مصقول بدقة مع طلاء مائي آمن.",
    care: "امسح بقطعة قماش ناعمة.",
    safety: "حواف مستديرة مصممة لتجربة لعب آمنة تمامًا للأطفال.",
    images: gallery(pool[5], pool[10]),
  },

  // GIFTS & BUNDLES
  {
    slug: "newborn-starter-set",
    name: "صندوق المولود الجديد الترحيبي",
    nameEn: "The Newborn Starter Set",
    price: 9800,
    category: "gifts",
    ageGroup: "newborn",
    isBestseller: true,
    description:
      "الهدية المثالية لأول أيام الأمومة. يحتوي الصندوق الفاخر على: بودي قطني عضوي، سالوبيت ناعم، بطانية موسلين مزدوجة، وعضاضة خشبية، مع دمية أرنب محشوة وبطاقة تهنئة.",
    rating: 5.0,
    reviewCount: 37,
    materials: "جميع القطع مصنوعة من القطن العضوي وخشب الزان الطبيعي.",
    care: "مرفق دليل عناية خاص بكل قطعة داخل الصندوق.",
    safety: "صندوق فاخر مربوط بشريط كتان، آمن وجاهز للإهداء فورًا.",
    images: gallery(pool[11], pool[2]),
  },
  {
    slug: "first-birthday-bundle",
    name: "حزمة احتفال عيد الميلاد الأول",
    nameEn: "First Birthday Bundle",
    price: 7400,
    category: "gifts",
    ageGroup: "baby",
    description:
      "مجموعة منتقاة خصيصًا لعمر السنة. تضم كنزة محبوكة دافئة، لعبة تكديس الحلقات الخشبية، وتاج قماشي تذكاري فاخر.",
    rating: 4.9,
    reviewCount: 14,
    materials: "قطن محبوك وخشب زان معتمد.",
    care: "دليل غسيل مرفق.",
    safety: "مناسبة ومعتمدة للأعمار من 12 إلى 24 شهراً.",
    images: gallery(pool[8], pool[11]),
  },
  {
    slug: "sibling-gift-set",
    name: "طقم هدية الأخ الأكبر والمولود",
    nameEn: "Sibling Gift Set",
    price: 6200,
    category: "gifts",
    ageGroup: "toddler",
    isNew: true,
    description:
      "طقم مدروس للاحتفال بقدوم فرد جديد في العائلة. يتضمن قميصين متطابقين للأخ الأكبر والصغير مع لعبة خشبية مشتركة.",
    rating: 5.0,
    reviewCount: 6,
    materials: "100% قطن عضوي فائق الجودة.",
    care: "غسيل آلي دافئ.",
    safety: "أقمشة آمنة وخالية من أي مهيجات.",
    images: gallery(pool[1], pool[11]),
  },
];

export const bySlug = (slug: string) => products.find((p) => p.slug === slug);

export const byCategory = (cat: string) =>
  cat === "all" ? products : products.filter((p) => p.category === cat);

export const byAge = (age: string) =>
  age === "all" ? products : products.filter((p) => p.ageGroup === age);

export const bestsellers = () => products.filter((p) => p.isBestseller);
