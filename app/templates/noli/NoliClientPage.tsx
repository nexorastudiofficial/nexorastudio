"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NoliHeader from "./NoliHeader";
import NoliFooter from "./NoliFooter";
import ProductCard from "./components/ProductCard";
import { products, ageLabels, type Product } from "./data/products";
import { money } from "./data/money";

const categoriesCards = [
  {
    title: "ملابس الأطفال",
    titleEn: "CLOTHING",
    desc: "قطع أساسية ناعمة من القطن العضوي والكتان",
    img: "https://images.unsplash.com/photo-1522771930-78b353a4aae9?q=80&w=800&auto=format&fit=crop",
    href: "/templates/noli/collections/clothing",
    tag: "0–6 سنوات",
  },
  {
    title: "الألعاب الخشبية والحسية",
    titleEn: "TOYS",
    desc: "ألعاب مونتيسوري طبيعية تنمّي الفضول والمهارات",
    img: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=800&auto=format&fit=crop",
    href: "/templates/noli/collections/toys",
    tag: "آمنة 100%",
  },
  {
    title: "صناديق وحزم الهدايا",
    titleEn: "GIFTS & SETS",
    desc: "مجموعات منسقة بعناية لأول أيام الأمومة وأعياد الميلاد",
    img: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=800&auto=format&fit=crop",
    href: "/templates/noli/collections/gifts",
    tag: "تغليف فاخر",
  },
];

const ageStages = [
  { key: "newborn", icon: "🍼" },
  { key: "baby", icon: "🧸" },
  { key: "toddler", icon: "🌱" },
  { key: "little-kid", icon: "🎨" },
];

const whyNoli = [
  {
    icon: "✦",
    title: "منتقاة بعناية وتفكير",
    titleEn: "Thoughtfully Chosen",
    desc: "كل قطعة تم اختيارها وتصميمها مع وضع راحة الأسرة اليومية في المقام الأول.",
  },
  {
    icon: "◉",
    title: "مصنوعة للحياة اليومية",
    titleEn: "Made for Everyday Life",
    desc: "أقمشة مرنة وخياطة متينة تتحمل الغسيل المتكرر والحركة الحقيقية للطفولة.",
  },
  {
    icon: "❋",
    title: "بسيطة وأنيقة",
    titleEn: "Beautifully Simple",
    desc: "تصاميم وألوان ترابية هادئة تناسب المنزل العصري وتبتعد عن الصخب.",
  },
  {
    icon: "♡",
    title: "لحظات وتفاصيل صغيرة",
    titleEn: "Little Joys",
    desc: "لأن اللحظات اليومية مع طفلك تستحق دائماً لمسة دافئة واستثنائية.",
  },
];

const parentReviews = [
  {
    name: "سارة م.",
    location: "الجزائر العاصمة",
    rating: 5,
    quote:
      "الرومبير المضلع ناعم للغاية والقياس كان مضبوطاً تماماً. ابنتي ترتديه في كل الأوقات، والقماش يحافظ على جودته بعد كل غسلة!",
    productName: "رومبير قطني مضلع عضوي",
    productSlug: "organic-ribbed-romper",
  },
  {
    name: "أحمد وفاطمة ك.",
    location: "وهران",
    rating: 5,
    quote:
      "جودة الألعاب الخشبية رائعة وآمنة تماماً. أفضل بكثير من الألعاب البلاستيكية المنتشرة. ابني يقضي ساعات في تركيب قوس قزح.",
    productName: "لعبة تكديس الحلقات الخشبية",
    productSlug: "wooden-stacking-toy",
  },
  {
    name: "لينا ب.",
    location: "قسنطينة",
    rating: 5,
    quote:
      "صندوق المولود الجديد كان الهدية المثالية لصديقتي. التغليف فخم جداً والأقمشة طبيعية 100% ورائحتها نقية.",
    productName: "صندوق المولود الجديد الترحيبي",
    productSlug: "newborn-starter-set",
  },
];

export default function NoliClientPage() {
  const [selectedAge, setSelectedAge] = useState<string>("all");

  const bestsellersList = products.filter((p) => p.isBestseller).slice(0, 4);
  const giftSets = products.filter((p) => p.category === "gifts");

  return (
    <div className="min-h-full bg-[#FAF7F2] text-[#30312D] antialiased selection:bg-[#E8B9A6]/30">
      <NoliHeader />

      {/* 1. Hero Section */}
      <section className="relative h-[82vh] min-h-[540px] overflow-hidden bg-[#EAE3D8]">
        <Image
          src="https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1600&auto=format&fit=crop"
          alt="NOLI & CO. — Modern Baby Boutique"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%]"
        />
        {/* Soft atmospheric gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-black/10" />

        <div className="absolute inset-x-0 bottom-0 px-6 pb-12 sm:mx-auto sm:max-w-6xl sm:pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/25 px-3.5 py-1 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E8B9A6]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/90 sm:text-xs">
              NOLI & CO. · مجموعة ربيع وصيف 2026
            </span>
          </div>

          <h1 className="mt-4 max-w-2xl font-serif-display text-4xl font-light leading-[1.12] text-white sm:text-6xl lg:text-7xl">
            صُنعت للحظاتهم الصغيرة.
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/90 sm:text-base">
            ملابس وألعاب منتقاة بعناية من خامات طبيعية لترافق نموهم، ولعبهم، وكل تفاصيل طفولتهم الجميلة.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/templates/noli/collections/clothing"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FAF7F2] px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-[#30312D] transition-all hover:bg-white hover:shadow-lg shadow-xs"
            >
              تسوّق الملابس
              <span aria-hidden>←</span>
            </Link>
            <Link
              href="/templates/noli/collections/toys"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/70 bg-white/10 px-7 py-4 text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-xs transition-colors hover:bg-white/20"
            >
              استكشف الألعاب
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Category Cards Section ("Find something little") */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#8A725F]">
            اكتشف عالم نولي
          </span>
          <h2 className="mt-2 font-serif-display text-3xl font-light tracking-tight sm:text-4xl">
            كل ما يحتاجه طفلك
          </h2>
          <p className="mt-2 text-xs text-[#30312D]/65">
            تصنيفات واضحة ومختارة بعناية لتسهيل التسوق للأمهات والآباء
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {categoriesCards.map((cat) => (
            <Link
              key={cat.titleEn}
              href={cat.href}
              className="group relative flex flex-col justify-end overflow-hidden rounded-lg bg-[#F2E9DC] p-6 shadow-xs transition-all hover:shadow-md aspect-[4/5]"
            >
              <Image
                src={cat.img}
                alt={cat.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

              <div className="relative z-10 text-white">
                <span className="inline-block rounded-full bg-white/20 backdrop-blur-xs px-2.5 py-0.5 text-[9px] font-medium tracking-widest uppercase mb-2">
                  {cat.tag}
                </span>
                <h3 className="font-serif-display text-2xl font-medium tracking-wide">
                  {cat.title}
                </h3>
                <p className="mt-1 text-xs text-white/80 line-clamp-2">
                  {cat.desc}
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-[#FAF7F2] group-hover:text-[#E8B9A6] transition-colors">
                  <span>تصفّح المجموعة</span>
                  <span aria-hidden>←</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Bestsellers Section ("Loved by little ones") */}
      <section className="bg-[#F2E9DC]/60 py-16 sm:py-24 border-y border-[#30312D]/10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#30312D]/10 pb-6">
            <div>
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#8A725F]">
                أحبّه الصغار واختاره الآباء
              </span>
              <h2 className="mt-1 font-serif-display text-3xl font-light tracking-tight sm:text-4xl">
                القطع الأكثر طلباً
              </h2>
            </div>
            <Link
              href="/templates/noli/collections/all"
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[#30312D]/75 hover:text-[#30312D] transition-colors"
            >
              <span>عرض جميع المنتجات</span>
              <span aria-hidden>←</span>
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {bestsellersList.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Shop By Age Section ("Shop their stage") */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#8A725F]">
            تسوّق حسب المرحلة
          </span>
          <h2 className="mt-2 font-serif-display text-3xl font-light tracking-tight sm:text-4xl">
            لكل مرحلة نمو ما يناسبها
          </h2>
          <p className="mt-2 text-xs text-[#30312D]/65">
            اختر عمر طفلك وسنعرض لك المقاسات والألعاب المتوافقة مع مهاراته
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {ageStages.map(({ key, icon }) => {
            const info = ageLabels[key];
            return (
              <Link
                key={key}
                href={`/templates/noli/collections/all`}
                className={`group flex flex-col justify-between rounded-lg p-6 transition-all hover:shadow-md border border-[#30312D]/5 ${info.bg}`}
              >
                <div>
                  <span className="text-3xl">{icon}</span>
                  <h3 className="mt-4 font-serif-display text-xl font-medium text-[#30312D]">
                    {info.label}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-[#8A725F]">
                    {info.range}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-[#30312D]/70">
                    {info.desc}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1 text-[11px] font-medium uppercase tracking-wider text-[#30312D] group-hover:text-[#8A725F] transition-colors">
                  <span>تسوّق المرحلة</span>
                  <span aria-hidden>←</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 5. Clothing Editorial Split */}
      <section className="border-y border-[#30312D]/10 bg-[#FAF7F2]">
        <div className="grid lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[560px]">
            <Image
              src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1000&auto=format&fit=crop"
              alt="Baby Clothing Editorial"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="flex items-center px-8 py-16 sm:px-12 lg:px-16 lg:py-20 bg-[#F2E9DC]">
            <div>
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#8A725F]">
                الملابس اليومية
              </span>
              <h2 className="mt-3 font-serif-display text-3xl font-light leading-tight tracking-tight sm:text-5xl text-[#30312D]">
                أقمشة ناعمة لأيامهم المليئة بالحركة
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-[#30312D]/75">
                نستخدم القطن العضوي والكتان الطبيعي المريح. قصات واسعة تسهّل التلبيس وتتحرك مع طفلك دون أي ضغط، لتبقى ناعمة حتى بعد عشرات الغسلات.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium text-[#30312D]/80 border-t border-[#30312D]/10 pt-4">
                <span>✓ أقمشة قطنية عضوية 100%</span>
                <span>✓ خالية من النيكل والمواد الضارة</span>
                <span>✓ سهلة التبديل السريع</span>
              </div>

              <Link
                href="/templates/noli/collections/clothing"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#30312D] px-7 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-[#FAF7F2] transition-colors hover:bg-[#8A725F]"
              >
                تسوّق تشكيلة الملابس
                <span aria-hidden>←</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Toy Editorial Split (Reversed) */}
      <section className="border-b border-[#30312D]/10 bg-[#FAF7F2]">
        <div className="grid lg:grid-cols-2">
          <div className="flex items-center px-8 py-16 sm:px-12 lg:px-16 lg:py-20 order-2 lg:order-1">
            <div>
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#A8B5A0]">
                الألعاب الهادفة
              </span>
              <h2 className="mt-3 font-serif-display text-3xl font-light leading-tight tracking-tight sm:text-5xl text-[#30312D]">
                دعهم يكتشفون ويتعلمون.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-[#30312D]/75">
                ألعاب خشبية مصقولة يدوياً بتشطيبات طبيعية آمنة تماماً، مصممة لتحفيز التركيز والإبداع الحسي وفق فلسفة مونتيسوري دون الحاجة لشاشات أو أصوات صاخبة.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-[#30312D]/80 border-t border-[#30312D]/10 pt-4">
                <div>
                  <p className="font-semibold text-[#30312D]">خشب زان طبيعي</p>
                  <p className="text-[11px] text-[#30312D]/60">مصنوع من غابات مستدامة</p>
                </div>
                <div>
                  <p className="font-semibold text-[#30312D]">دهانات مائية آمنة</p>
                  <p className="text-[11px] text-[#30312D]/60">خالية تماماً من السموم</p>
                </div>
              </div>

              <Link
                href="/templates/noli/collections/toys"
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#30312D] px-7 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-[#30312D] transition-colors hover:bg-[#30312D] hover:text-[#FAF7F2]"
              >
                تسوّق جميع الألعاب
                <span aria-hidden>←</span>
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[560px] order-1 lg:order-2">
            <Image
              src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1000&auto=format&fit=crop"
              alt="Wooden Toys Editorial"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 7. Gift Sets / Bundles Section */}
      <section className="bg-[#F2E9DC] py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#8A725F]">
              هدايا تُسعد القلوب
            </span>
            <h2 className="mt-2 font-serif-display text-3xl font-light tracking-tight sm:text-4xl text-[#30312D]">
              حزم وصناديق هدايا استثنائية
            </h2>
            <p className="mt-2 text-xs text-[#30312D]/65">
              مجموعات هدايا جاهزة ببطاقات تهنئة وتغليف فاخر يليق بالمناسبات الخاصة
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {giftSets.map((gift) => (
              <div
                key={gift.slug}
                className="group flex flex-col justify-between rounded-lg bg-white p-5 shadow-xs border border-[#30312D]/5 transition-all hover:shadow-md"
              >
                <div>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-[#FAF7F2]">
                    <Image
                      src={gift.images[0]}
                      alt={gift.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-3 right-3 rounded-full bg-[#E8B9A6] px-2.5 py-0.5 text-[9px] font-semibold text-[#30312D]">
                      حزمة موفرة
                    </span>
                  </div>

                  <h3 className="mt-4 font-serif-display text-lg font-medium text-[#30312D]">
                    {gift.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#30312D]/70 line-clamp-3">
                    {gift.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[#30312D]/10 pt-4">
                  <div>
                    <span className="text-xs text-[#30312D]/50 block">السعر:</span>
                    <span className="font-serif-display text-base font-semibold text-[#30312D]">
                      {money(gift.price)}
                    </span>
                  </div>
                  <Link
                    href={`/templates/noli/product/${gift.slug}`}
                    className="rounded-full bg-[#30312D] px-5 py-2.5 text-xs font-medium text-[#FAF7F2] transition-colors hover:bg-[#8A725F]"
                  >
                    تسوّق الحزمة
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Why NOLI & CO.? Section (Trust & Pillars) */}
      <section id="why-noli" className="bg-[#30312D] text-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#A8B5A0]">
              فلسفة وقيم نولي
            </span>
            <h2 className="mt-3 font-serif-display text-3xl font-light leading-relaxed sm:text-4xl text-white">
              لماذا يثق بنا الآباء والأمهات؟
            </h2>
            <p className="mt-2 text-xs text-white/70">
              صممنا كل تفصيلة في نولي لتكون تجربة التسوق لأطفالكم آمنة ومريحة وموثوقة.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 border-t border-white/10 pt-12">
            {whyNoli.map((item) => (
              <div key={item.titleEn} className="text-center space-y-3">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-xl text-[#E8B9A6]">
                  {item.icon}
                </span>
                <h3 className="font-serif-display text-lg font-medium text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Reviews Section ("Parents are loving it") */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#8A725F]">
            تجارب حقيقية
          </span>
          <h2 className="mt-2 font-serif-display text-3xl font-light tracking-tight sm:text-4xl text-[#30312D]">
            آراء وتجارب الأمهات والآباء
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {parentReviews.map((rev) => (
            <div
              key={rev.name}
              className="flex flex-col justify-between rounded-lg bg-[#F2E9DC]/60 p-6 border border-[#30312D]/10"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 text-sm">
                  <span>★★★★★</span>
                </div>
                <p className="mt-4 text-xs italic leading-relaxed text-[#30312D]/80">
                  «{rev.quote}»
                </p>
              </div>

              <div className="mt-6 border-t border-[#30312D]/10 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-[#30312D]">{rev.name}</p>
                    <p className="text-[10px] text-[#30312D]/50">{rev.location}</p>
                  </div>
                  <Link
                    href={`/templates/noli/product/${rev.productSlug}`}
                    className="text-[10px] text-[#8A725F] hover:underline truncate max-w-[130px]"
                  >
                    {rev.productName}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Footer */}
      <NoliFooter />
    </div>
  );
}
