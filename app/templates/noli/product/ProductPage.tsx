"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NoliHeader from "../NoliHeader";
import NoliFooter from "../NoliFooter";
import { byCategory, sizes as allSizes, type Product } from "../data/products";
import { useCart } from "../cart/CartContext";
import { money } from "../data/money";
import { trackAddToCart, trackViewContent } from "@/lib/pixel";

const trustItems = [
  { icon: "✓", text: "خامات قطنية وعضوية 100% آمنة للرضع" },
  { icon: "✓", text: "توصيل سريع لجميع ولايات الوطن (48–72 ساعة)" },
  { icon: "✓", text: "الدفع عند الاستلام بعد المعاينة" },
  { icon: "✓", text: "إرجاع واستبدال سهل خلال 14 يوماً" },
];

const sizeGuideTable = [
  ["المقاس", "العمر التقريبي", "الوزن (كغ)", "الطول (سم)"],
  ["0-3M", "0–3 أشهر", "3 – 5.5", "50 – 60"],
  ["3-6M", "3–6 أشهر", "5.5 – 7.5", "60 – 68"],
  ["6-12M", "6–12 شهراً", "7.5 – 10", "68 – 78"],
  ["12-18M", "12–18 شهراً", "10 – 12", "78 – 84"],
  ["18-24M", "18–24 شهراً", "12 – 13.5", "84 – 90"],
  ["2-3Y", "2–3 سنوات", "13.5 – 15", "90 – 98"],
];

const colorMap: Record<string, string> = {
  Cream: "#F5F2EB",
  Sage: "#A8B5A0",
  "Dusty Blue": "#A9BBC4",
  Oatmeal: "#D4C9B8",
  "Dusty Rose": "#D4A5A5",
  Natural: "#E8DFD0",
  Cloud: "#E8E4DE",
  Peach: "#E8B9A6",
  Camel: "#B08050",
  Cocoa: "#8B7355",
};

export default function ProductPage({ product }: { product: Product }) {
  const [activeImg, setActiveImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors ? product.colors[0] : ""
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes ? product.sizes[0] : ""
  );
  const [qty, setQty] = useState(1);
  const [openAcc, setOpenAcc] = useState<number | null>(0);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [showSizeModal, setShowSizeModal] = useState(false);

  const { add } = useCart();
  const infoRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  // Related products in the same category
  const related = byCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  useEffect(() => {
    // Track ViewContent event
    trackViewContent({
      content_name: product.name,
      content_category: product.category,
      content_ids: [product.slug],
      value: product.price,
      currency: "DZD",
    });
  }, [product]);

  useEffect(() => {
    const el = infoRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleMobileScroll = () => {
    const el = mobileRef.current;
    if (!el || !el.clientWidth) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActiveImg(Math.min(product.images.length - 1, Math.max(0, index)));
  };

  const handleAddToCart = () => {
    add({
      slug: product.slug,
      name: product.name,
      price: product.price,
      img: product.images[0],
      size: selectedSize,
      color: selectedColor,
      qty,
    });
    trackAddToCart({
      content_name: product.name,
      content_category: product.category,
      content_ids: [product.slug],
      value: product.price * qty,
      currency: "DZD",
    });
  };

  const accordions = [
    {
      title: "تفاصيل ووصف المنتج",
      content: product.description,
    },
    {
      title: product.category === "toys" ? "معايير السلامة والجودة" : "الخامات وإرشادات الغسيل",
      content:
        product.category === "toys"
          ? (product.safety || "خشب طبيعي ودهانات مائية آمنة 100% للأطفال.") +
            " " +
            (product.materials || "")
          : (product.materials || "100% قطن عضوي طبيعي.") +
            " " +
            (product.care || "غسيل آلي على حرارة 30° مئوية، تجفيف في الظل."),
    },
    {
      title: "الشحن، التوصيل والدفع عند الاستلام",
      content:
        "يتم تجهيز وشحن الطلبات خلال 24 ساعة. التوصيل متوفر لجميع ولايات الوطن (48–72 ساعة). الدفع نقدًا عند الاستلام بعد معاينة طلبك والتأكد منه.",
    },
  ];

  return (
    <div className="min-h-full bg-[#FAF7F2] text-[#30312D] antialiased">
      <NoliHeader />

      <main className="mx-auto max-w-6xl px-4 pb-24 pt-6 sm:px-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#30312D]/50 mb-6">
          <Link href="/templates/noli" className="hover:text-[#30312D] transition-colors">
            الرئيسية
          </Link>
          <span>/</span>
          <Link
            href={`/templates/noli/collections/${product.category}`}
            className="hover:text-[#30312D] transition-colors"
          >
            {product.category === "clothing"
              ? "ملابس"
              : product.category === "toys"
                ? "ألعاب"
                : "هدايا"}
          </Link>
          <span>/</span>
          <span className="text-[#30312D] font-medium truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* Product Grid Layout */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* LEFT: Image Gallery */}
          <div>
            {/* Mobile swipe carousel */}
            <div className="lg:hidden">
              <div
                ref={mobileRef}
                onScroll={handleMobileScroll}
                className="flex snap-x snap-mandatory overflow-x-auto rounded-lg"
              >
                {product.images.map((imgUrl, idx) => (
                  <div key={imgUrl + idx} className="w-full shrink-0 snap-center">
                    <div className="relative aspect-[3/4] bg-[#F2E9DC]">
                      <Image
                        src={imgUrl}
                        alt={`${product.name} — ${idx + 1}`}
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
              {/* Dot Indicators */}
              <div className="mt-3 flex justify-center gap-1.5">
                {product.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveImg(idx);
                      mobileRef.current?.scrollTo({
                        left: idx * (mobileRef.current?.clientWidth || 0),
                        behavior: "smooth",
                      });
                    }}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === activeImg ? "w-5 bg-[#30312D]" : "w-1.5 bg-[#30312D]/20"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop Gallery */}
            <div className="hidden lg:block">
              <div className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-[#F2E9DC]">
                <Image
                  src={product.images[activeImg] || product.images[0]}
                  alt={product.name}
                  fill
                  priority
                  sizes="50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Thumbnails */}
              <div className="mt-3 grid grid-cols-4 gap-3">
                {product.images.map((imgUrl, idx) => (
                  <button
                    key={imgUrl + idx}
                    onClick={() => setActiveImg(idx)}
                    className={`relative aspect-[3/4] overflow-hidden rounded bg-[#F2E9DC] transition-all ${
                      idx === activeImg
                        ? "ring-2 ring-[#30312D] ring-offset-2 ring-offset-[#FAF7F2]"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={imgUrl}
                      alt={`صورة ${idx + 1}`}
                      fill
                      sizes="12vw"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Product Details & Purchase Form */}
          <div ref={infoRef}>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#E8B9A6]/30 px-3 py-1 text-[10px] font-medium tracking-widest uppercase text-[#30312D]">
                {product.category === "clothing"
                  ? "ملابس قطنية"
                  : product.category === "toys"
                    ? "ألعاب تعليمية"
                    : "صندوق هدية"}
              </span>
              {product.isBestseller && (
                <span className="rounded-full bg-[#A8B5A0] px-3 py-1 text-[10px] font-medium text-white">
                  الأكثر مبيعاً ⭐
                </span>
              )}
            </div>

            <h1 className="mt-3 font-serif-display text-3xl font-light tracking-tight sm:text-4xl text-[#30312D]">
              {product.name}
            </h1>
            <p className="mt-1 text-xs text-[#8A725F] font-serif-display">
              {product.nameEn}
            </p>

            {/* Price & Rating */}
            <div className="mt-4 flex items-center justify-between border-b border-[#30312D]/10 pb-4">
              <span className="font-serif-display text-2xl font-semibold text-[#30312D]">
                {money(product.price)}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-[#30312D]/70">
                <span className="text-amber-500 text-sm">★★★★★</span>
                <span>({product.reviewCount} تقييم موثق)</span>
              </div>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-[#30312D]/75">
              {product.description}
            </p>

            {/* Toy Specifics (Age Range & Skills) */}
            {product.category === "toys" && (
              <div className="mt-6 space-y-3 rounded-lg bg-[#F2E9DC]/60 p-4 border border-[#30312D]/5">
                {product.ageRange && (
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-semibold text-[#30312D]">العمر المناسب:</span>
                    <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-[#8A725F]">
                      {product.ageRange}
                    </span>
                  </div>
                )}
                {product.skills && product.skills.length > 0 && (
                  <div>
                    <span className="text-xs font-semibold text-[#30312D] block mb-2">
                      المهارات التي يطورها الطفل:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {product.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-white px-3 py-1 text-[11px] font-medium text-[#30312D] border border-[#30312D]/10"
                        >
                          ✦ {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Clothing Specifics: Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-6">
                <p className="text-xs font-medium uppercase tracking-wider text-[#30312D]/70">
                  اللون — <span className="text-[#30312D] font-bold">{selectedColor}</span>
                </p>
                <div className="mt-3 flex gap-2.5">
                  {product.colors.map((col) => (
                    <button
                      key={col}
                      onClick={() => setSelectedColor(col)}
                      aria-label={col}
                      className={`relative h-8 w-8 rounded-full border border-black/10 transition-all ${
                        selectedColor === col
                          ? "ring-2 ring-[#30312D] ring-offset-2 ring-offset-[#FAF7F2] scale-110"
                          : "hover:scale-105"
                      }`}
                      style={{ backgroundColor: colorMap[col] || "#ccc" }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Clothing Specifics: Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium uppercase tracking-wider text-[#30312D]/70">
                    المقاس
                  </p>
                  <button
                    onClick={() => setShowSizeModal(true)}
                    className="text-xs text-[#8A725F] underline underline-offset-4 hover:text-[#30312D] transition-colors"
                  >
                    📏 دليل المقاسات
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`h-10 min-w-14 rounded-md border px-3 text-xs font-medium transition-all ${
                        selectedSize === s
                          ? "border-[#30312D] bg-[#30312D] text-[#FAF7F2] shadow-xs"
                          : "border-[#30312D]/20 bg-white text-[#30312D] hover:border-[#30312D]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Add to Cart CTA */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex w-fit items-center rounded-full border border-[#30312D]/20 bg-white px-2 py-1">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="إنقاص الكمية"
                  className="flex h-9 w-9 items-center justify-center text-sm font-bold text-[#30312D] hover:bg-black/5 rounded-full"
                >
                  −
                </button>
                <span className="w-8 text-center text-xs font-bold">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(10, q + 1))}
                  aria-label="زيادة الكمية"
                  className="flex h-9 w-9 items-center justify-center text-sm font-bold text-[#30312D] hover:bg-black/5 rounded-full"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#30312D] px-8 text-xs font-medium uppercase tracking-[0.2em] text-[#FAF7F2] transition-colors hover:bg-[#8A725F] shadow-sm"
              >
                أضف إلى حقيبة التسوق
                <span aria-hidden>←</span>
              </button>
            </div>

            {/* Trust Signals */}
            <div className="mt-8 grid grid-cols-1 gap-2.5 rounded-lg bg-[#F2E9DC]/40 p-4 border border-[#30312D]/10">
              {trustItems.map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-xs text-[#30312D]/80">
                  <span className="text-[#A8B5A0] font-bold">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Accordions */}
            <div className="mt-8 border-t border-[#30312D]/10 divide-y divide-[#30312D]/10">
              {accordions.map((acc, idx) => (
                <div key={acc.title} className="py-4">
                  <button
                    onClick={() => setOpenAcc(openAcc === idx ? null : idx)}
                    className="flex w-full items-center justify-between text-xs font-semibold text-[#30312D] hover:text-[#8A725F] transition-colors"
                  >
                    <span>{acc.title}</span>
                    <span className="text-sm">{openAcc === idx ? "−" : "+"}</span>
                  </button>
                  {openAcc === idx && (
                    <p className="mt-3 text-xs leading-relaxed text-[#30312D]/75">
                      {acc.content}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Complete the Look / Related Products */}
        {related.length > 0 && (
          <section className="mt-20 border-t border-[#30312D]/10 pt-12">
            <h2 className="font-serif-display text-2xl font-light tracking-tight sm:text-3xl text-[#30312D]">
              منتجات يفضلها أولياء الأمور أيضاً
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/templates/noli/product/${item.slug}`}
                  className="group flex flex-col justify-between rounded-lg bg-white p-3 border border-[#30312D]/5 shadow-xs hover:shadow-md transition-all"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded bg-[#FAF7F2]">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-3">
                    <h3 className="text-xs font-medium text-[#30312D] truncate group-hover:text-[#8A725F]">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-[#30312D]">
                      {money(item.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Size Guide Modal */}
      {showSizeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
          onClick={() => setShowSizeModal(false)}
        >
          <div
            className="w-full max-w-lg rounded-xl bg-[#FAF7F2] p-6 text-[#30312D] shadow-2xl border border-[#30312D]/10 animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#30312D]/10 pb-4">
              <h3 className="font-serif-display text-lg font-medium">📏 دليل مقاسات نولي & كو</h3>
              <button
                onClick={() => setShowSizeModal(false)}
                className="text-xs text-[#30312D]/50 hover:text-[#30312D]"
              >
                ✕ إغلاق
              </button>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-center text-xs">
                <thead>
                  <tr className="bg-[#F2E9DC] text-[#30312D]">
                    {sizeGuideTable[0].map((h) => (
                      <th key={h} className="py-2 px-3 font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#30312D]/10">
                  {sizeGuideTable.slice(1).map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-black/5">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="py-2.5 px-3">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-[10px] text-[#30312D]/60 text-center">
              💡 إذا كان طفلك بين مقاسين، نوصي باختيار المقاس الأكبر لضمان راحة إضافية وفترة استخدام أطول.
            </p>
          </div>
        </div>
      )}

      {/* Sticky Mobile Bottom Bar */}
      <div
        className={`fixed inset-x-0 bottom-0 z-30 border-t border-[#30312D]/10 bg-[#FAF7F2]/95 px-4 py-3 backdrop-blur transition-transform duration-300 lg:hidden shadow-lg ${
          showStickyBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] text-[#30312D]/60 truncate max-w-[140px]">
              {product.name}
            </p>
            <p className="font-serif-display text-base font-semibold text-[#30312D]">
              {money(product.price)}
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex-1 rounded-full bg-[#30312D] py-3 text-xs font-medium uppercase tracking-[0.18em] text-[#FAF7F2] shadow-sm hover:bg-[#8A725F]"
          >
            أضف للحقيبة
          </button>
        </div>
      </div>

      <NoliFooter />
    </div>
  );
}
