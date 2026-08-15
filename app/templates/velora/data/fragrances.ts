export type Fragrance = {
  slug: string;
  no: string;
  name: string;
  nameEn: string;
  type: string;
  price: number;
  category: "women" | "men" | "unisex";
  moods: string[];
  notes: { top: string; heart: string; base: string };
  description: string;
  images: string[];
  isBestseller?: boolean;
  isNew?: boolean;
};

export type Category = "all" | "women" | "men" | "unisex";

export const categoryLabels: Record<Category, string> = {
  all: "الكل",
  women: "نساء",
  men: "رجال",
  unisex: "يونيسكس",
};

export type Size = { label: string; ml: number; mult: number };

export const sizes: Size[] = [
  { label: "30 مل", ml: 30, mult: 0.6 },
  { label: "50 مل", ml: 50, mult: 1 },
  { label: "100 مل", ml: 100, mult: 1.5 },
];

export const sizePrice = (base: number, mult: number) =>
  Math.round((base * mult) / 100) * 100;

export const moods: Record<string, { label: string; desc: string }> = {
  mysterious: { label: "غامض", desc: "داكن · حسّي · لا يُنسى" },
  fresh: { label: "منعش", desc: "نظيف · مفعم بالحيوية · بلا مجهود" },
  seductive: { label: "مغري", desc: "دافئ · حميمي · آسر" },
  elegant: { label: "أنيق", desc: "راقٍ · متطوّر · خالد" },
};

export const quizOptions: { id: string; label: string; slugs: string[] }[] = [
  { id: "fresh", label: "منعش", slugs: ["no02", "no06", "no09"] },
  { id: "sweet", label: "حلو", slugs: ["no05", "no09", "no01"] },
  { id: "woody", label: "خشبي", slugs: ["no03", "no08", "no10"] },
  { id: "floral", label: "زهري", slugs: ["no07", "no04", "no02"] },
  { id: "spicy", label: "حار", slugs: ["no10", "no04", "no03"] },
];

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

const pool = [
  img("photo-1541643600914-78b084683601"),
  img("photo-1594035910387-fea47794261f"),
  img("photo-1523293182086-7651a899d37f"),
  img("photo-1587017539504-67cfbddac569"),
  img("photo-1519669556878-63bdad8a1a49"),
  img("photo-1563170351-be82bc888aa4"),
  img("photo-1588405748880-12d1d2a59f75"),
  img("photo-1548126032-079a0fb0099d"),
  img("photo-1615634260167-c8cdede054de"),
  img("photo-1592945403244-b3fbafd7f539"),
  img("photo-1534787238916-9ba6764efd4f"),
  img("photo-1616422285623-13ff0162193c"),
  img("photo-1585386959984-a4155224a1ad"),
  img("photo-1526047932273-341f2a7631f9"),
];

const gallery = (primary: string) => {
  const rest = pool.filter((p) => p !== primary);
  return [primary, ...rest.slice(0, 3)];
};

export const fragrances: Fragrance[] = [
  {
    slug: "no01",
    no: "NO.01",
    name: "عنبر و فانيليا",
    nameEn: "Amber & Vanilla",
    type: "Eau de Parfum",
    price: 12000,
    category: "unisex",
    moods: ["elegant", "seductive"],
    notes: {
      top: "برغموت · فلفل وردي",
      heart: "ياسمين · ورد",
      base: "فانيليا · خشب الصندل · عنبر",
    },
    description:
      "عطر دافئ وراقٍ بنته حول العنبر والفانيليا وخشب الصندل. حضور خالد يترك أثراً لا يُنسى حيثما ذهبت.",
    images: gallery(pool[0]),
    isBestseller: true,
  },
  {
    slug: "no02",
    no: "NO.02",
    name: "برغموت و مسك أبيض",
    nameEn: "Bergamot & White Musk",
    type: "Eau de Parfum",
    price: 11000,
    category: "women",
    moods: ["fresh", "elegant"],
    notes: {
      top: "برغموت · زهر البرتقال",
      heart: "نيرولي · ياسمين",
      base: "مسك أبيض · عنبر",
    },
    description:
      "انتعاش نظيف ونقي كنسمة صباح. برغموت متألق مع مسك أبيض ناعم يمنحك إحساساً منعشاً يدوم طوال اليوم.",
    images: gallery(pool[3]),
    isNew: true,
  },
  {
    slug: "no03",
    no: "NO.03",
    name: "عود و جلد",
    nameEn: "Oud & Leather",
    type: "Eau de Parfum",
    price: 13000,
    category: "men",
    moods: ["mysterious"],
    notes: {
      top: "تبغ · فلفل أسود",
      heart: "جلد · بخور",
      base: "عود · عنبر",
    },
    description:
      "حضور داكن وغامض. العود يلتقي الجلد والتبغ في تركيبة قوية تُعبّر عن شخصية لا تُضاهى.",
    images: gallery(pool[1]),
    isBestseller: true,
  },
  {
    slug: "no04",
    no: "NO.04",
    name: "ورد و زعفران",
    nameEn: "Rose & Saffron",
    type: "Eau de Parfum",
    price: 12500,
    category: "women",
    moods: ["seductive"],
    notes: {
      top: "زعفران · توت",
      heart: "ورد دمشقي",
      base: "عود · مسك",
    },
    description:
      "أنوثة آسرة بعمق الزعفران وعبق الورد الدمشقي. عطر دافئ وحميمي يخطف الأنظار ويترك حضوراً لا يُنسى.",
    images: gallery(pool[2]),
    isBestseller: true,
  },
  {
    slug: "no05",
    no: "NO.05",
    name: "لافندر و فانيليا",
    nameEn: "Lavender & Vanilla",
    type: "Eau de Parfum",
    price: 10500,
    category: "unisex",
    moods: ["elegant"],
    notes: {
      top: "لافندر · هيليوتروب",
      heart: "تونكا · ياسمين",
      base: "فانيليا · عنبر",
    },
    description:
      "توازن هادئ بين عشبي اللافندر ودِفء الفانيليا. رقيّ كلاسيكي يصلح لكل الأوقات ولكل الأجواء.",
    images: gallery(pool[4]),
    isNew: true,
  },
  {
    slug: "no06",
    no: "NO.06",
    name: "جريب فروت و نعناع",
    nameEn: "Grapefruit & Mint",
    type: "Eau de Parfum",
    price: 10000,
    category: "men",
    moods: ["fresh"],
    notes: {
      top: "جريب فروت · نعناع",
      heart: "إكليل الجبل · جيرانيوم",
      base: "أرز · مسك",
    },
    description:
      "حيوية لا تُقاوم بجرعة منعشة من الجريب فروت والنعناع. طاقة نظيفة لإطلالة يومية بلا مجهود.",
    images: gallery(pool[5]),
  },
  {
    slug: "no07",
    no: "NO.07",
    name: "ياسمين و خشب صندل",
    nameEn: "Jasmine & Sandalwood",
    type: "Eau de Parfum",
    price: 11500,
    category: "women",
    moods: ["seductive", "elegant"],
    notes: {
      top: "برغموت · فلفل",
      heart: "ياسمين · يلانغ يلانغ",
      base: "خشب الصندل · فانيليا",
    },
    description:
      "ياسمين مخملي يتشابك مع خشب الصندل في تناغم دافئ وجذاب. عطر لمساءاتٍ يُراد لها أن تُذكر.",
    images: gallery(pool[6]),
  },
  {
    slug: "no08",
    no: "NO.08",
    name: "أرز و فيتيفر",
    nameEn: "Cedar & Vetiver",
    type: "Eau de Parfum",
    price: 12000,
    category: "men",
    moods: ["mysterious"],
    notes: {
      top: "ليمون · جريب فروت",
      heart: "أرز · فيتيفر",
      base: "مسك · باتشولي",
    },
    description:
      "رائحة خشب جافة وأنيقة. أرز قوي مع فيتيفر ترابي يمنحك ثقة وهدوءاً في كل إطلالة.",
    images: gallery(pool[7]),
    isNew: true,
  },
  {
    slug: "no09",
    no: "NO.09",
    name: "تين و جوز الهند",
    nameEn: "Fig & Coconut",
    type: "Eau de Parfum",
    price: 10000,
    category: "women",
    moods: ["fresh"],
    notes: {
      top: "تين · ليمون",
      heart: "جوز الهند · زهر التين",
      base: "هليوتروب · مسك",
    },
    description:
      "نعومة مشمسة بحلاوة التين ودِفء جوز الهند. عطر مريح يعيدك إلى أيام الصيف الهادئة.",
    images: gallery(pool[8]),
  },
  {
    slug: "no10",
    no: "NO.10",
    name: "عنبر و بخور",
    nameEn: "Amber & Incense",
    type: "Eau de Parfum",
    price: 13000,
    category: "unisex",
    moods: ["mysterious"],
    notes: {
      top: "فلفل وردي · هيل",
      heart: "بخور · لبان",
      base: "عنبر · توابل دافئة",
    },
    description:
      "سحر الأمكنة القديمة في قارورة. عنبر عميق مع بخور مهيب وتوابل دافئة لتوقيعٍ لا يُخطئه أحد.",
    images: gallery(pool[9]),
  },
];

export const bySlug = (slug: string) => fragrances.find((f) => f.slug === slug);

export const byCategory = (cat: Category) =>
  cat === "all" ? fragrances : fragrances.filter((f) => f.category === cat);

export const byMood = (mood: string) =>
  fragrances.filter((f) => f.moods.includes(mood));

export const bestsellers = fragrances.filter((f) => f.isBestseller);

export const signatureCollection = fragrances.slice(0, 4);
