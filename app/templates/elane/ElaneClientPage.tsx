"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ElaneHeader from "./ElaneHeader";
import ProductCard from "./components/ProductCard";
import NewsletterForm from "./components/NewsletterForm";
import { products, type Product } from "./data/products";

const categories = [
  { id: "all", name: "الكل" },
  { id: "women", name: "نساء" },
  { id: "men", name: "رجال" },
  { id: "accessories", name: "إكسسوارات" },
];

const lookbook = [
  {
    title: "أزياء الخريف الهادئة",
    tagline: "إطلالات صوفية وكشمير بألوان ترابية ناعمة",
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop",
    link: "/templates/elane/collections/all",
    featuredSlug: "cashmere-sweater",
    featuredName: "كنزة كشمير",
  },
  {
    title: "البناء المعماري للبليزر",
    tagline: "قصّات كتان وصوف متقنة لليوم والمساحات الخاصة",
    img: "https://images.unsplash.com/photo-1467043237213-65f2da53396f?q=80&w=1000&auto=format&fit=crop",
    link: "/templates/elane/collections/all",
    featuredSlug: "linen-oversized-blazer",
    featuredName: "بليزر كتان",
  },
];

const values = [
  {
    number: "01",
    title: "خامات طبيعية 100%",
    desc: "نستخدم الكتان النقي، الصوف المضغوط، والكشمير الفاخر الخالي من الألياف الاصطناعية.",
  },
  {
    number: "02",
    title: "تفاصيل خياطة يدوية",
    desc: "كل قطعة تمر بلمسات أيدي خياطين محترفين لضمان بقائها موسماً بعد موسم.",
  },
  {
    number: "03",
    title: "إنتاج محدود ومستدام",
    desc: "نصنع بكميات محدودة لتقليل الهدر وضمان تميّز إطلالتك في كل مناسبة.",
  },
];

export default function ElaneClientPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-full bg-[#F7F3ED] text-[#242321] antialiased">
      <ElaneHeader />

      {/* Hero Section */}
      <section className="relative h-[78vh] min-h-[520px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1600&auto=format&fit=crop"
          alt="ÉLANÉ Luxury Editorial"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-12 sm:mx-auto sm:max-w-6xl sm:pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#F7F3ED]/30 bg-black/30 px-3.5 py-1 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6F735F]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#F7F3ED]/90 sm:text-xs">
              Élané · تشكيلة خريف وشتاء 2026
            </span>
          </div>

          <h1 className="mt-4 max-w-2xl font-serif-display text-4xl font-light leading-[1.12] text-[#F7F3ED] sm:text-6xl lg:text-7xl">
            مُعرَّفٌ بالبساطة، مَبنيٌّ بالحِرفة.
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#F7F3ED]/90 sm:text-base">
            قطعٌ معاصرة صُمّمت لإطلالةٍ أنيقة بلا مجهود — أقمشة طبيعية وخياطة مدروسة لتعاش معك.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/templates/elane/collections/all"
              className="inline-flex items-center justify-center gap-3 bg-[#F7F3ED] px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-[#242321] transition-all hover:bg-white hover:shadow-lg"
            >
              تسوّق المجموعة كاملة
              <span aria-hidden>←</span>
            </Link>
            <a
              href="#editorial"
              className="inline-flex items-center justify-center gap-2 border border-[#F7F3ED]/60 px-7 py-4 text-xs font-medium uppercase tracking-[0.2em] text-[#F7F3ED] transition-colors hover:bg-[#F7F3ED]/10"
            >
              استكشف المجلّة
            </a>
          </div>
        </div>
      </section>

      {/* Category Filter & Catalog Section */}
      <section className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between border-b border-[#242321]/10 pb-6">
          <div>
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#6F735F]">
              تصفّح التشكيلة
            </span>
            <h2 className="mt-1 font-serif-display text-3xl font-light tracking-tight sm:text-4xl">
              المجموعة التحريرية
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-full px-5 py-2 text-xs font-medium uppercase tracking-[0.15em] transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#242321] text-[#F7F3ED] shadow"
                    : "border border-[#242321]/15 bg-transparent text-[#242321]/70 hover:border-[#242321] hover:text-[#242321]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* Editorial Feature Showcase */}
      <section id="editorial" className="border-y border-[#242321]/10 bg-[#EFECE6]">
        <div className="grid lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[580px]">
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop"
              alt="تصميم إطلالة يومية"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
          <div className="flex items-center px-8 py-16 sm:px-12 lg:px-16 lg:py-20">
            <div>
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#6F735F] sm:text-xs">
                مجلّة ÉLANÉ · عدد الخريف
              </span>
              <h2 className="mt-4 font-serif-display text-3xl font-light leading-tight tracking-tight sm:text-5xl">
                فنُّ الإطلالة اليومية الهادئة
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-[#242321]/75 sm:text-base">
                قوامٌ خالد. تفاصيل نحاسية وقصّات حريرية مدروسة. ثقةٌ بلا مجهود تجمع بين الفخامة والراحة اليومية.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[#242321]/15 pt-6 text-xs text-[#242321]/70">
                <div>
                  <p className="font-semibold text-[#242321]">صوف وكشمير نقي</p>
                  <p className="mt-1">منسوج يدويًا بعناية فائقة</p>
                </div>
                <div>
                  <p className="font-semibold text-[#242321]">ألوان ترابية</p>
                  <p className="mt-1">مستوحاة من الطبيعة والهدوء</p>
                </div>
              </div>

              <Link
                href="/templates/elane/collections/all"
                className="mt-8 inline-flex items-center gap-3 border-b-2 border-[#242321] pb-1.5 text-xs font-medium uppercase tracking-[0.2em] transition-colors hover:border-[#6F735F] hover:text-[#6F735F]"
              >
                استكشف دليل الإطلالات كاملًا
                <span aria-hidden>←</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lookbook / Shop the Look */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <div className="text-center">
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#6F735F]">
            Lookbook
          </span>
          <h2 className="mt-2 font-serif-display text-3xl font-light tracking-tight sm:text-4xl">
            إطلالات متناسقة
          </h2>
          <p className="mt-3 text-sm text-[#242321]/60">
            تصفّح وتنسيق إطلالتك مباشرة من جلسات التصوير
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {lookbook.map((lb) => (
            <div key={lb.title} className="group relative overflow-hidden rounded-sm bg-white shadow-sm">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={lb.img}
                  alt={lb.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#F7F3ED]/80">
                    قطعة مميزة
                  </span>
                  <h3 className="font-serif-display text-2xl font-light">{lb.title}</h3>
                  <p className="mt-1 text-xs text-[#F7F3ED]/80">{lb.tagline}</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-5 bg-[#F7F3ED]">
                <div>
                  <span className="text-xs text-[#242321]/60">يتضمن: </span>
                  <span className="text-xs font-semibold text-[#242321]">{lb.featuredName}</span>
                </div>
                <Link
                  href={`/templates/elane/product/${lb.featuredSlug}`}
                  className="inline-flex items-center gap-1.5 border border-[#242321] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.15em] transition-colors hover:bg-[#242321] hover:text-[#F7F3ED]"
                >
                  تسوق القطعة
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Craftsmanship Values */}
      <section id="brand" className="border-y border-[#242321]/10 bg-[#242321] px-6 py-16 text-[#F7F3ED] sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#6F735F]">
              فلسفتنا
            </span>
            <h2 className="mt-3 font-serif-display text-3xl font-light leading-relaxed sm:text-4xl">
              «تبدأ كل قطعة من القماش — ألياف طبيعية، وخياطة مدروسة، واحترامٌ هادئ لكيفية صناعة الأشياء.»
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 border-t border-[#F7F3ED]/15 pt-12">
            {values.map((v) => (
              <div key={v.number} className="space-y-3">
                <span className="text-2xl font-serif-display text-[#6F735F]">{v.number}</span>
                <h3 className="text-lg font-medium text-[#F7F3ED]">{v.title}</h3>
                <p className="text-sm leading-relaxed text-[#F7F3ED]/70">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="mx-auto max-w-2xl px-6 py-16 text-center sm:py-24">
        <h2 className="font-serif-display text-3xl font-light tracking-tight sm:text-4xl">
          انضمّي إلى مجلة ÉLANÉ
        </h2>
        <p className="mt-3 text-sm text-[#242321]/60">
          تنبيهات بأحدث التشكيلات المحدودة والقطع الحصرية.
        </p>
        <NewsletterForm />
      </section>

      {/* Footer */}
      <footer className="border-t border-[#242321]/10 bg-[#EFECE6]">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            <div className="col-span-2 sm:col-span-2">
              <p className="font-serif-display text-2xl tracking-[0.2em]">ÉLANÉ</p>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#242321]/60">
                أزياء معاصرة برؤيةٍ هادئة ومدروسة. صُنعت لترافقك موسمًا بعد موسم.
              </p>
            </div>
            {[
              [
                "المتجر",
                [
                  ["وصل حديثًا", "/templates/elane/collections/all"],
                  ["نساء", "/templates/elane/collections/women"],
                  ["رجال", "/templates/elane/collections/men"],
                  ["المجموعات", "/templates/elane/collections/all"],
                ],
              ],
              [
                "الشركة",
                [
                  ["قصتنا", "#brand"],
                  ["الاستدامة", "#brand"],
                  ["المجلة", "#editorial"],
                  ["النشرة", "#newsletter"],
                ],
              ],
            ].map(([title, items]) => (
              <div key={title as string}>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#242321]/50 sm:text-xs">
                  {title as string}
                </p>
                <ul className="mt-3 space-y-2.5 text-sm text-[#242321]/70">
                  {(items as [string, string][]).map(([item, href]) => (
                    <li key={item}>
                      <Link href={href} className="transition-colors hover:text-[#242321]">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#242321]/10 pt-6 sm:flex-row">
            <p className="text-xs text-[#242321]/50">
              © {new Date().getFullYear()} ÉLANÉ Studio. جميع الحقوق محفوظة.
            </p>
            <div className="flex gap-6 text-xs text-[#242321]/50">
              <Link href="/templates/elane/collections/all" className="transition-colors hover:text-[#242321]">
                انستغرام
              </Link>
              <Link href="/templates/elane/collections/all" className="transition-colors hover:text-[#242321]">
                بينتيريست
              </Link>
              <Link href="/templates/elane/collections/all" className="transition-colors hover:text-[#242321]">
                الخصوصية
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
