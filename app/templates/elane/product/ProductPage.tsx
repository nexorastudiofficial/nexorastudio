"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ElaneHeader from "../ElaneHeader";
import { bySlug, sizes, type Product } from "../data/products";
import { useCart } from "../cart/CartContext";
import { money } from "../data/money";

const trust = [
  "شحن مجاني للطلبات فوق 13,500 دج",
  "إرجاع سهل",
  "دفع آمن",
  "التوصيل خلال 3–5 أيام عمل",
];

const sizeGuide = [
  ["المقاس", "الصدر (سم)", "الطول (سم)"],
  ["XS", "84", "64"],
  ["S", "90", "66"],
  ["M", "96", "68"],
  ["L", "102", "70"],
  ["XL", "110", "72"],
];

function Check() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0 text-[#6F735F]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function ProductPage({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const [color, setColor] = useState<string>(product.colors[0]);
  const [size, setSize] = useState<string>("");
  const [qty, setQty] = useState(1);
  const [openAcc, setOpenAcc] = useState<number | null>(null);
  const [showBar, setShowBar] = useState(false);
  const { add } = useCart();

  const images = product.images;
  const look = ["wide-leg-trousers", "leather-bag", "suede-loafers"]
    .map(bySlug)
    .filter((p): p is Product => Boolean(p));

  const mobileRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = infoRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setShowBar(!entry.isIntersecting),
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleMobileScroll = () => {
    const el = mobileRef.current;
    if (!el || !el.clientWidth) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActive(Math.min(images.length - 1, Math.max(0, index)));
  };

  const scrollToImage = (i: number) => {
    const index = Math.min(images.length - 1, Math.max(0, i));
    setActive(index);
    const el = mobileRef.current;
    if (el) el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
  };

  const addToBag = () => {
    if (!size) return;
    add({
      slug: product.slug,
      name: product.name,
      price: product.price,
      img: images[0],
      size,
      color,
      qty,
    });
  };

  const addAllToBag = () => {
    if (look.length === 0) return;
    look.forEach((item) =>
      add({
        slug: item.slug,
        name: item.name,
        price: item.price,
        img: item.images[0],
        size: "M",
        color: item.colors[0],
        qty: 1,
      })
    );
  };

  const accordions = [
    {
      title: "الوصف",
      content: product.description,
    },
    {
      title: "الخامات والعناية",
      content:
        "ألياف طبيعية من مصادر مستدامة. غسل يدوي بارد، لا تُعصَر، وكيّ على نار هادئة. صُنع ليدوم مواسم طويلة.",
    },
    {
      title: "الشحن والإرجاع",
      content:
        "شحن مجاني للطلبات فوق 13,500 دج. يتم الشحن خلال 48 ساعة، والتوصيل خلال 3–5 أيام عمل. إرجاع مجاني خلال 30 يومًا دون أسئلة.",
    },
    {
      title: "دليل المقاسات",
      content: (
        <table className="w-full border-collapse text-sm">
          <tbody>
            {sizeGuide.map((row, i) => (
              <tr key={row[0]} className={i > 0 ? "border-t border-[#242321]/10" : ""}>
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`py-2.5 pl-2 text-right ${
                      i === 0
                        ? "text-xs font-medium uppercase tracking-[0.15em] text-[#242321]/50"
                        : j === 0
                          ? "font-medium"
                          : "text-[#242321]/70"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ),
    },
  ];

  return (
    <div className="min-h-full bg-[#F7F3ED] text-[#242321] antialiased">
      <ElaneHeader />

      <main className="mx-auto max-w-6xl px-4 pb-28 pt-6 sm:px-6 lg:pb-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-[#242321]/50">
          <Link href="/templates/elane" className="hover:text-[#242321]">الرئيسية</Link>
          <span>/</span>
          <Link
            href={`/templates/elane/collections/${product.category}`}
            className="hover:text-[#242321]"
          >
            {product.category === "women"
              ? "نساء"
              : product.category === "men"
                ? "رجال"
                : "إكسسوارات"}
          </Link>
          <span>/</span>
          <span className="text-[#242321]/80">{product.nameEn}</span>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <div>
            {/* Mobile swipe gallery */}
            <div className="lg:hidden">
              <div
                ref={mobileRef}
                onScroll={handleMobileScroll}
                className="flex snap-x snap-mandatory overflow-x-auto"
              >
                {images.map((img, i) => (
                  <div key={img} className="w-full shrink-0 snap-center">
                    <div className="relative aspect-[3/4] bg-white">
                      <Image
                        src={img}
                        alt={`${product.nameEn} — صورة ${i + 1}`}
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToImage(i)}
                    aria-label={`إظهار الصورة ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === active ? "w-5 bg-[#242321]" : "w-1.5 bg-[#242321]/25"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop gallery */}
            <div className="hidden lg:block">
              <div className="group relative aspect-[3/4] overflow-hidden bg-white">
                <Image
                  src={images[active] ?? images[0]}
                  alt={`${product.nameEn} — صورة ${active + 1}`}
                  fill
                  priority
                  sizes="50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>
              <div className="mt-3 grid grid-cols-4 gap-3">
                {images.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setActive(i)}
                    className={`relative aspect-[3/4] overflow-hidden bg-white transition-all ${
                      i === active
                        ? "ring-2 ring-[#242321] ring-offset-2 ring-offset-[#F7F3ED]"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`صورة مصغّرة ${i + 1}`}
                      fill
                      sizes="12vw"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product info */}
          <div ref={infoRef}>
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#6F735F]">
              {product.category === "women" ? "نساء" : product.category === "men" ? "رجال" : "إكسسوارات"}
              {product.isNew ? " · جديد" : ""}
            </p>
            <h1 className="mt-2 font-serif-display text-3xl font-light tracking-tight sm:text-4xl">
              {product.nameEn}
            </h1>
            <p className="mt-2 font-serif-display text-2xl">{money(product.price)}</p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#242321]/70">
              {product.description}
            </p>

            {/* Color */}
            <div className="mt-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#242321]/60">
                اللون — <span className="text-[#242321]">{color}</span>
              </p>
              <div className="mt-3 flex gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    aria-label={c}
                    className={`h-9 w-9 rounded-full border transition-all ${
                      color === c
                        ? "ring-2 ring-[#242321] ring-offset-2 ring-offset-[#F7F3ED]"
                        : "border-[#242321]/20 hover:border-[#242321]/60"
                    }`}
                    style={{ backgroundColor: c === "Ivory" ? "#f5f0e8" : c === "White" ? "#ffffff" : c === "Black" ? "#242321" : c === "Olive" ? "#6F735F" : c === "Camel" ? "#b08050" : c === "Tan" ? "#c7a47b" : c === "Sand" ? "#d8cbb4" : c === "Sky" ? "#a8bfd6" : c === "Navy" ? "#2c3547" : c === "Champagne" ? "#e9dcbe" : c === "Sage" ? "#a3aa8a" : c === "Grey" ? "#9a9a96" : c === "Rose" ? "#d9a8a0" : c === "Bordeaux" ? "#6f2d3e" : "#b7aa9a" }}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#242321]/60">
                  المقاس
                </p>
                <button
                  onClick={() => {
                    setOpenAcc(openAcc === 3 ? null : 3);
                  }}
                  className="text-xs text-[#242321]/60 underline underline-offset-4 transition-colors hover:text-[#242321]"
                >
                  دليل المقاسات
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`h-11 min-w-11 border px-3 text-sm transition-colors ${
                      size === s
                        ? "border-[#242321] bg-[#242321] text-[#F7F3ED]"
                        : "border-[#242321]/25 hover:border-[#242321]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + CTA */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <div className="flex w-fit items-center border border-[#242321]/25">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="إنقاص الكمية"
                  className="flex h-12 w-12 items-center justify-center text-lg transition-colors hover:bg-[#242321]/5"
                >
                  −
                </button>
                <span className="w-10 text-center text-sm">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(10, q + 1))}
                  aria-label="زيادة الكمية"
                  className="flex h-12 w-12 items-center justify-center text-lg transition-colors hover:bg-[#242321]/5"
                >
                  +
                </button>
              </div>
              <button
                onClick={addToBag}
                disabled={!size}
                className="flex h-12 flex-1 items-center justify-center gap-3 bg-[#242321] text-xs font-medium uppercase tracking-[0.25em] text-[#F7F3ED] transition-colors hover:bg-[#242321]/90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                أضف إلى الحقيبة
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 7 8 3h8l2 4" />
                  <path d="M6 7h12l-1 13a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 7Z" />
                </svg>
              </button>
            </div>
            {!size && (
              <p className="mt-2 text-xs text-[#242321]/50">اختر المقاس للمتابعة</p>
            )}

            {/* Trust */}
            <div className="mt-8 grid grid-cols-1 gap-2.5 border-t border-[#242321]/10 pt-6 sm:grid-cols-2">
              {trust.map((t) => (
                <div key={t} className="flex items-center gap-2.5 text-xs text-[#242321]/70">
                  <Check />
                  {t}
                </div>
              ))}
            </div>

            {/* Accordions */}
            <div className="mt-8 border-t border-[#242321]/10">
              {accordions.map((a, i) => (
                <div key={a.title} className="border-b border-[#242321]/10">
                  <button
                    onClick={() => setOpenAcc(openAcc === i ? null : i)}
                    aria-expanded={openAcc === i}
                    className="flex w-full items-center justify-between py-4 text-xs font-medium uppercase tracking-[0.18em] transition-colors hover:text-[#6F735F]"
                  >
                    <span>{a.title}</span>
                    <svg
                      viewBox="0 0 24 24"
                      className={`h-4 w-4 transition-transform duration-300 ${
                        openAcc === i ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  {openAcc === i && (
                    <div className="pb-5 text-sm leading-relaxed text-[#242321]/70">
                      {a.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Complete the look */}
        {look.length > 0 && (
          <section className="mt-16 border-t border-[#242321]/10 pt-10 lg:mt-20">
            <h2 className="font-serif-display text-2xl font-light tracking-tight sm:text-3xl">
              أكملي الإطلالة
            </h2>
            <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-6">
              {look.map((item) => (
                <Link
                  key={item.slug}
                  href={`/templates/elane/product/${item.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-white">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 32vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-2.5 truncate text-xs text-[#242321]/80 sm:text-sm">
                    {item.name}
                  </p>
                  <p className="text-xs text-[#242321]/60 sm:text-sm">
                    {money(item.price)}
                  </p>
                </Link>
              ))}
            </div>
            <button
              onClick={addAllToBag}
              className="mt-6 w-full border border-[#242321] py-3.5 text-xs font-medium uppercase tracking-[0.25em] transition-colors hover:bg-[#242321] hover:text-[#F7F3ED] sm:w-auto sm:px-10"
            >
              أضف الكل إلى الحقيبة
            </button>
          </section>
        )}
      </main>

      {/* Sticky mobile purchase bar */}
      <div
        className={`fixed inset-x-0 bottom-0 z-30 border-t border-[#242321]/10 bg-[#F7F3ED]/95 px-4 py-3 backdrop-blur transition-transform duration-300 lg:hidden ${
          showBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <span className="font-serif-display text-xl">{money(product.price)}</span>
          <button
            onClick={addToBag}
            disabled={!size}
            className="flex h-12 flex-1 max-w-64 items-center justify-center gap-2 bg-[#242321] text-[11px] font-medium uppercase tracking-[0.2em] text-[#F7F3ED] transition-opacity disabled:opacity-40"
          >
            أضف إلى الحقيبة
          </button>
        </div>
      </div>
    </div>
  );
}
