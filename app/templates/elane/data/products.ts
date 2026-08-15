export type Product = {
  slug: string;
  name: string;
  nameEn: string;
  price: number;
  category: "women" | "men" | "accessories";
  isNew?: boolean;
  description: string;
  colors: string[];
  images: string[];
};

export const sizes = ["XS", "S", "M", "L", "XL"];

export const categoryLabels: Record<string, string> = {
  women: "نساء",
  men: "رجال",
  accessories: "إكسسوارات",
  all: "الكل",
};

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

const pool = [
  img("photo-1467043237213-65f2da53396f"),
  img("photo-1524504388940-b1c1722653e1"),
  img("photo-1515372039744-b8f02a3ae446"),
  img("photo-1445205170230-053b83016050"),
  img("photo-1509631179647-0177331693ae"),
  img("photo-1539109136881-3be0616acf4b"),
  img("photo-1483985988355-763728e1935b"),
  img("photo-1496747611176-843222e1e57c"),
  img("photo-1469334031218-e382a71b716b"),
  img("photo-1490481651871-ab68de25d43d"),
  img("photo-1473966968600-fa801b869a1a"),
  img("photo-1548036328-c9fa89d128fa"),
  img("photo-1520975954732-35dd22299614"),
];

const gallery = (primary: string) => {
  const rest = pool.filter((p) => p !== primary);
  return [primary, ...rest.slice(0, 3)];
};

const base: Omit<Product, "slug" | "name" | "nameEn" | "price" | "images"> = {
  category: "women",
  colors: ["Ivory", "Black", "Olive"],
  description:
    "قصّة مدروسة وخامات طبيعية صُنعت لتدوم. تفاصيل تُلاحظ عن قرب، وقصّات مريحة تُلبس كل يوم.",
};

export const products: Product[] = [
  {
    ...base,
    slug: "linen-oversized-blazer",
    name: "بليزر كتان بقصّة واسعة",
    nameEn: "Linen Oversized Blazer",
    price: 17415,
    colors: ["Ivory", "Black", "Olive"],
    description:
      "قصّة ضخمة مريحة على الكتفين مع طية صدر واضحة وأزرار طبيعية. قماش كتان خفيف يمزج بين الرقي والراحة، صُنع ليكون قطعتك اليومية من الصباح إلى المساء.",
    images: gallery(pool[0]),
  },
  {
    ...base,
    slug: "cashmere-sweater",
    name: "كنزة كشمير",
    nameEn: "Cashmere Sweater",
    price: 37800,
    colors: ["Camel", "Ivory", "Black"],
    description:
      "كشمير فاخر بنعومة استثنائية، قصّة متوسطة تكمّل طبقات إطلالتك. دفء خفيف يليق بأمسيات الشتاء الطويلة.",
    images: gallery(pool[3]),
  },
  {
    ...base,
    slug: "silk-satin-dress",
    name: "فستان ساتان",
    nameEn: "Silk Satin Dress",
    price: 41850,
    colors: ["Black", "Champagne", "Sage"],
    description:
      "ساتان حريري ينسدل بسلاسة مع لمعان هادئ. فستان بقصّة انسيابية تناسب السهرات والمناسبات الخاصة.",
    images: gallery(pool[1]),
  },
  {
    ...base,
    slug: "wool-overcoat",
    name: "معطف صوف",
    nameEn: "Wool Overcoat",
    price: 56700,
    colors: ["Camel", "Black", "Grey"],
    description:
      "صوف مضغوط بقصّة معمارية وكتفين محددين. معطف خالد يتحول إلى قطعته المفضلة في موسم البرد.",
    images: gallery(pool[2]),
  },
  {
    ...base,
    slug: "tailored-trousers",
    name: "بنطال بقصّة دقيقة",
    nameEn: "Tailored Trousers",
    price: 32400,
    category: "women",
    description:
      "بنطال بقصّة كلاسيكية مدروسة من قماش صوفي ناعم. خطّ رفيع يطيل القامة ويكمل بدلتك أو إطلالتك اليومية.",
    images: gallery(pool[7]),
  },
  {
    ...base,
    slug: "pleated-skirt",
    name: "تنورة مطويّة",
    nameEn: "Pleated Skirt",
    price: 31050,
    category: "women",
    description:
      "تنورة طويلة بطيّات دقيقة تتحرك معك برشاقة. خامات خفيفة وقصّة أنثوية تجمع بين الرقي والحركة.",
    images: gallery(pool[4]),
  },
  {
    ...base,
    slug: "linen-shirt",
    name: "قميص كتان",
    nameEn: "Linen Shirt",
    price: 21600,
    category: "men",
    colors: ["White", "Sand", "Sky"],
    description:
      "قميص كتان بقصّة مريحة يتهوى بسرعة في الحر. قطعة أساسية بأكمام طويلة يمكن لفها بأسلوبك الخاص.",
    images: gallery(pool[5]),
  },
  {
    ...base,
    slug: "knitted-polo",
    name: "بولو محبوك",
    nameEn: "Knitted Polo",
    price: 25650,
    category: "men",
    isNew: true,
    colors: ["Navy", "Ivory", "Olive"],
    description:
      "بولو محبوك من خيوط قطنية ناعمة، بقصّة مضبوطة لا تفقد شكلها. أناقة يومية بين الكاجوال والرسمي.",
    images: gallery(pool[9]),
  },
  {
    ...base,
    slug: "wide-leg-trousers",
    name: "بنطال واسع الساق",
    nameEn: "Wide-Leg Trousers",
    price: 12015,
    category: "women",
    isNew: true,
    colors: ["Ivory", "Black", "Olive"],
    description:
      "بنطال بقصّة واسعة من قماش خفيف ينسدل بسلاسة. مريح وأنيق في آن واحد، ويتماشى مع البليزر أو القميص.",
    images: gallery(pool[10]),
  },
  {
    ...base,
    slug: "leather-bag",
    name: "حقيبة جلد",
    nameEn: "Leather Bag",
    price: 10125,
    category: "accessories",
    isNew: true,
    colors: ["Tan", "Black", "Camel"],
    description:
      "حقيبة يد من جلد طبيعي يدوي الحياكة، بتفاصيل نحاسية وصنعة تُلاحظ عن قرب. رفيقتك اليومية الأناقة.",
    images: gallery(pool[11]),
  },
  {
    ...base,
    slug: "suede-loafers",
    name: "جزمات جلدية",
    nameEn: "Suede Loafers",
    price: 13230,
    category: "men",
    isNew: true,
    colors: ["Tan", "Black", "Bordeaux"],
    description:
      "جزمة لوفرز من جلد مالدرو بنعل مرن. توازن بين الراحة والفخامة يخدمك من الاجتماعات إلى الأمسيات.",
    images: gallery(pool[12]),
  },
  {
    ...base,
    slug: "silk-blouse",
    name: "قميص حريري",
    nameEn: "Silk Blouse",
    price: 27000,
    category: "women",
    isNew: true,
    colors: ["Ivory", "Black", "Rose"],
    description:
      "قميص حرير بقصّة انسيابية ورقبة متدرجة. لمعان ناعم يرفع أي إطلالة، من المكتب إلى العشاء.",
    images: gallery(pool[8]),
  },
];

export const bySlug = (slug: string) => products.find((p) => p.slug === slug);

export const byCategory = (cat: string) =>
  cat === "all" ? products : products.filter((p) => p.category === cat);
