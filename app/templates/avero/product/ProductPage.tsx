"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AveroHeader from "../AveroHeader";
import AveroFooter from "../AveroFooter";
import Shoe3DViewer from "../components/Shoe3DViewer";
import FindYourFitModal from "../components/FindYourFitModal";
import { byCategory, type Product } from "../data/products";
import { useCart } from "../cart/CartContext";
import { money } from "../data/money";
import { trackAddToCart, trackViewContent } from "@/lib/pixel";

const colorMap: Record<string, string> = {
  "Volt Lime": "#D6FF3F",
  "Triple Black": "#141517",
  "Cloud White": "#FFFFFF",
  "Slate Grey": "#64748b",
  "Desert Sand": "#C5B9A5",
  "Forest Green": "#2d4a3e",
  "Blush Pink": "#f472b6",
  "Sand / Neon": "#d4a373",
  Sand: "#d6cbbe",
  "White / Green": "#15803d",
  "All White": "#f8fafc",
  "White / Navy": "#1e3a8a",
  "Matte Black": "#18191c",
  "Olive Drab": "#4d5c3f",
  "Volt / Black": "#D6FF3F",
  Black: "#141517",
  White: "#FFFFFF",
  "Reflective Silver": "#cbd5e1",
  "Standard Kit": "#101112",
};

export default function ProductPage({ product }: { product: Product }) {
  const [activeImg, setActiveImg] = useState(0);
  const [viewMode, setViewMode] = useState<"gallery" | "3d">("gallery");
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors ? product.colors[0] : ""
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes ? product.sizes[0] : "42"
  );
  const [qty, setQty] = useState(1);
  const [openAcc, setOpenAcc] = useState<number | null>(0);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [showFitModal, setShowFitModal] = useState(false);

  const { add } = useCart();
  const infoRef = useRef<HTMLDivElement>(null);

  // Related products
  const related = byCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  useEffect(() => {
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

  const handleAddToCart = () => {
    add({
      slug: product.slug,
      name: product.name,
      price: product.price,
      img: product.images[0],
      color: selectedColor,
      size: selectedSize,
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
      title: "تفاصيل وهندسة الحذاء",
      content: product.description,
    },
    {
      title: "الخامات وتكنولوجيا النعل",
      content: `الجزء العلوي: ${product.upperMaterial}. تكنولوجيا النعل: ${product.soleTech}. الوزن: ${product.weight}. ميلان الكعب: ${product.heelDrop}. مستوى التوسيد: ${product.cushion}. الأسطح المناسبة: ${product.surface}.`,
    },
    {
      title: "الشحن، تجربة القياس، والدفع عند الاستلام",
      content:
        "شحن مباشر لباب منزلك لجميع الولايات خلال 48 إلى 72 ساعة. يمكنك تجربة ومعاينة الحذاء بحضور المندوب قبل سداد المبلغ نقداً عند الاستلام. الاستبدال متاح وسلس خلال 14 يوماً.",
    },
  ];

  return (
    <div className="min-h-full bg-[#F4F2ED] text-[#171817] antialiased">
      <AveroHeader />

      <main className="mx-auto max-w-7xl px-4 pb-28 pt-6 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#777873] mb-6">
          <Link href="/templates/avero" className="hover:text-[#171817] transition-colors">
            الرئيسية
          </Link>
          <span>/</span>
          <Link
            href={`/templates/avero/collections/${product.category}`}
            className="hover:text-[#171817] transition-colors"
          >
            {product.category === "running"
              ? "أحذية الجري"
              : product.category === "training"
                ? "أحذية التمارين"
                : product.category === "lifestyle"
                  ? "ستريت وير"
                  : "الإكسسوارات"}
          </Link>
          <span>/</span>
          <span className="text-[#171817] font-bold truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* Product Grid Layout */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* LEFT: Viewer (Gallery vs 3D Interactive toggle) (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* View Mode Toggle Switch */}
            <div className="flex justify-center sm:justify-start gap-2">
              <button
                onClick={() => setViewMode("gallery")}
                className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                  viewMode === "gallery"
                    ? "bg-[#101112] text-[#D6FF3F] shadow-xs"
                    : "bg-white border border-[#D8D5CC] text-[#777873] hover:text-[#171817]"
                }`}
              >
                📸 صور المنتج (Gallery)
              </button>
              <button
                onClick={() => setViewMode("3d")}
                className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  viewMode === "3d"
                    ? "bg-[#101112] text-[#D6FF3F] shadow-xs"
                    : "bg-white border border-[#D8D5CC] text-[#777873] hover:text-[#171817]"
                }`}
              >
                <span>🌐 عارض ثلاثي الأبعاد (3D Interactive)</span>
                <span className="h-2 w-2 rounded-full bg-[#D6FF3F] animate-pulse" />
              </button>
            </div>

            {viewMode === "3d" ? (
              <div className="rounded-2xl bg-[#E9E7E0] p-4 border border-[#D8D5CC]">
                <Shoe3DViewer />
              </div>
            ) : (
              <div>
                <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#D8D5CC] bg-[#E9E7E0]">
                  <Image
                    src={product.images[activeImg] || product.images[0]}
                    alt={product.name}
                    fill
                    priority
                    sizes="60vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Thumbnails */}
                <div className="mt-3.5 grid grid-cols-4 gap-3">
                  {product.images.map((imgUrl, idx) => (
                    <button
                      key={imgUrl + idx}
                      onClick={() => setActiveImg(idx)}
                      className={`relative aspect-[4/3] overflow-hidden rounded-xl border bg-[#E9E7E0] transition-all ${
                        idx === activeImg
                          ? "border-[#101112] ring-2 ring-[#101112]"
                          : "border-[#D8D5CC] opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={imgUrl}
                        alt={`صورة ${idx + 1}`}
                        fill
                        sizes="15vw"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Product Details (5 cols) */}
          <div ref={infoRef} className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#101112] text-[#D6FF3F] px-3 py-1 text-[10px] font-mono font-bold tracking-widest uppercase">
                  {product.category.toUpperCase()}
                </span>
                {product.isDrop && (
                  <span className="rounded-full bg-[#D6FF3F] px-3 py-1 text-[10px] font-mono font-extrabold text-[#101112]">
                    ⚡ LIMITED DROP
                  </span>
                )}
              </div>

              <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#171817]">
                {product.name}
              </h1>
              <p className="mt-1 text-xs text-[#777873] font-mono">
                {product.nameEn}
              </p>

              {/* Price & Rating */}
              <div className="mt-4 flex items-center justify-between border-b border-[#D8D5CC] pb-4">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#171817]">
                  {money(product.price)}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-[#777873]">
                  <span className="text-amber-500 text-sm">★★★★★</span>
                  <span>({product.reviewCount} تقييم رياضي)</span>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed text-[#777873]">
              {product.description}
            </p>

            {/* Quick Tech Specs Card */}
            <div className="rounded-xl bg-white p-4 border border-[#D8D5CC] shadow-xs">
              <p className="text-xs font-bold uppercase tracking-wider text-[#171817] mb-3">
                ⚡ المواصفات التقنية للأداء
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs text-[#777873] font-mono">
                <div>
                  <span className="text-[#171817] block font-bold">الوزن:</span>
                  <span>{product.weight}</span>
                </div>
                <div>
                  <span className="text-[#171817] block font-bold">الميلان (Drop):</span>
                  <span>{product.heelDrop}</span>
                </div>
                <div>
                  <span className="text-[#171817] block font-bold">التوسيد:</span>
                  <span>{product.cushion}</span>
                </div>
                <div>
                  <span className="text-[#171817] block font-bold">السطح:</span>
                  <span>{product.surface}</span>
                </div>
              </div>
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#777873]">
                  اللون — <span className="text-[#171817]">{selectedColor}</span>
                </p>
                <div className="mt-3 flex gap-2.5">
                  {product.colors.map((col) => (
                    <button
                      key={col}
                      onClick={() => setSelectedColor(col)}
                      aria-label={col}
                      className={`relative h-8 w-8 rounded-full border border-black/20 transition-all ${
                        selectedColor === col
                          ? "ring-2 ring-[#101112] ring-offset-2 ring-offset-[#F4F2ED] scale-110"
                          : "hover:scale-105"
                      }`}
                      style={{ backgroundColor: colorMap[col] || "#888" }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#777873]">
                    المقاس (EU SIZE)
                  </p>
                  <button
                    onClick={() => setShowFitModal(true)}
                    className="text-xs font-bold text-[#101112] underline underline-offset-4 hover:text-[#777873]"
                  >
                    🎯 حاسبة المقاس (Find Your Fit)
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`h-11 min-w-12 rounded-xl font-mono text-xs font-bold transition-all ${
                        selectedSize === s
                          ? "bg-[#101112] text-[#D6FF3F] shadow-xs"
                          : "bg-white border border-[#D8D5CC] text-[#171817] hover:border-[#101112]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Add to Cart CTA */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center pt-2">
              <div className="flex w-fit items-center rounded-full border border-[#D8D5CC] bg-white px-2 py-1">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="إنقاص"
                  className="flex h-9 w-9 items-center justify-center text-sm font-bold text-zinc-500 hover:text-[#171817] rounded-full"
                >
                  −
                </button>
                <span className="w-8 text-center text-xs font-bold text-[#171817]">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(10, q + 1))}
                  aria-label="زيادة"
                  className="flex h-9 w-9 items-center justify-center text-sm font-bold text-zinc-500 hover:text-[#171817] rounded-full"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex h-13 flex-1 items-center justify-center gap-2 rounded-full bg-[#101112] px-8 text-xs font-extrabold uppercase tracking-[0.2em] text-[#D6FF3F] transition-all hover:brightness-125 shadow-lg shadow-black/10"
              >
                أضف إلى حقيبة التسوق (ADD TO BAG)
                <span aria-hidden>←</span>
              </button>
            </div>

            {/* Accordions */}
            <div className="border-t border-[#D8D5CC] divide-y divide-[#D8D5CC] pt-2">
              {accordions.map((acc, idx) => (
                <div key={acc.title} className="py-4">
                  <button
                    onClick={() => setOpenAcc(openAcc === idx ? null : idx)}
                    className="flex w-full items-center justify-between text-xs font-bold text-[#171817] hover:text-[#101112]"
                  >
                    <span>{acc.title}</span>
                    <span className="text-sm font-mono">{openAcc === idx ? "−" : "+"}</span>
                  </button>
                  {openAcc === idx && (
                    <p className="mt-3 text-xs leading-relaxed text-[#777873]">
                      {acc.content}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Footwear */}
        {related.length > 0 && (
          <section className="mt-20 border-t border-[#D8D5CC] pt-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#171817]">
              أحذية أخرى تناسب أسلوب حركتك
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/templates/avero/product/${item.slug}`}
                  className="group flex flex-col justify-between rounded-2xl bg-white p-4 border border-[#D8D5CC] shadow-xs hover:border-[#101112] transition-all"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#E9E7E0]">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-3">
                    <h3 className="text-xs font-bold text-[#171817] truncate">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-xs font-extrabold text-[#171817]">
                      {money(item.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Sticky Mobile Purchase Bar */}
      <div
        className={`fixed inset-x-0 bottom-0 z-30 border-t border-[#D8D5CC] bg-[#F4F2ED]/95 px-4 py-3 backdrop-blur transition-transform duration-300 lg:hidden shadow-lg ${
          showStickyBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] text-[#777873] truncate max-w-[130px]">
              {product.name} (مقاس {selectedSize})
            </p>
            <p className="text-base font-extrabold text-[#171817]">
              {money(product.price)}
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex-1 rounded-full bg-[#101112] py-3 text-xs font-extrabold uppercase tracking-[0.18em] text-[#D6FF3F]"
          >
            أضف للحقيبة
          </button>
        </div>
      </div>

      <AveroFooter />

      {/* Find Your Fit Modal */}
      <FindYourFitModal
        isOpen={showFitModal}
        onClose={() => setShowFitModal(false)}
        onSelectSize={(size) => setSelectedSize(size)}
      />
    </div>
  );
}
