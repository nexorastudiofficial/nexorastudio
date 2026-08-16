"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ChronovaHeader from "../ChronovaHeader";
import ChronovaFooter from "../ChronovaFooter";
import { byCategory, type Product } from "../data/products";
import { useCart } from "../cart/CartContext";
import { money } from "../data/money";
import { trackAddToCart, trackViewContent } from "@/lib/pixel";

const trustItems = [
  { icon: "🛡️", text: "ضمان دولي شامل لمدة سنتين مع بطاقة الضمان" },
  { icon: "🚚", text: "شحن مؤمن لجميع ولايات الوطن (48–72 ساعة)" },
  { icon: "💵", text: "الدفع عند الاستلام بعد فحص ومعاينة الساعة" },
  { icon: "🎁", text: "تغليف هدايا فاخر مضاد للصدمات مع كيس ورقي أصلي" },
];

const colorMap: Record<string, string> = {
  "Space Black": "#101114",
  "Obsidian Black": "#141518",
  "Matte Black": "#18191c",
  "All Black": "#0c0d0f",
  "Midnight Black": "#121419",
  "Tactical Black": "#1b1c1e",
  "Ceramic Black": "#090a0c",
  "Silver Steel": "#c0c2c7",
  Silver: "#d1d5db",
  "Starlight Silver": "#e5e7eb",
  "Silver / MOP": "#e2e8f0",
  "Rose Gold": "#b76e79",
  "Rose Gold / White": "#c4848d",
  "Champagne Gold": "#d4af37",
  Champagne: "#cbb67c",
  "Cognac Leather": "#9a382d",
  "Dark Cognac": "#7c2d12",
  "Vintage Brown": "#78350f",
  "Classic Black": "#1c1917",
  Gunmetal: "#475569",
  "Deep Sea Blue": "#1e3a8a",
  "Storm Navy": "#1e293b",
  "Graphite Black": "#334155",
  "Sage Green": "#52796f",
  "Desert Tan": "#d4a373",
  "Titanium Grey": "#64748b",
  "Space Grey": "#4b5563",
};

export default function ProductPage({ product }: { product: Product }) {
  const [activeImg, setActiveImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors ? product.colors[0] : ""
  );
  const [qty, setQty] = useState(1);
  const [openAcc, setOpenAcc] = useState<number | null>(0);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const { add } = useCart();
  const infoRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  // Related timepieces
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
      title: "الوصف والتفاصيل الهندسية",
      content: product.description,
    },
    {
      title: product.category === "smart" ? "المواصفات التقنية والحساسات" : "مواصفات الحركة والزجاج",
      content:
        product.category === "smart"
          ? `الشاشة: ${product.display || "AMOLED"}. عمر البطارية: ${product.batteryLife || "حتى 14 يوماً"}. الاتصال: ${product.connectivity || "Bluetooth"}. التوافق: ${product.compatibility || "iOS و Android"}. مقاومة الماء: ${product.waterResistance || "5 ATM"}.`
          : `الحركة: ${product.movement || "أوتوماتيكي"}. القطر: ${product.caseDiameter || "40mm"}. الزجاج: ${product.glass || "ياقوتي مضاد للانعكاس"}. الحزام: ${product.strapMaterial || "فولاذ مقاوم للصدأ"}. مقاومة الماء: ${product.waterResistance || "10 ATM"}.`,
    },
    {
      title: "الضمان، الشحن، والدفع عند الاستلام",
      content: `${product.warranty}. يتم تجهيز الطلب وشحنه بعناية خلال 24 ساعة. التوصيل متوفر لجميع الولايات مع إمكانية فحص الساعة والتأكد من مطابقتها قبل سداد المبلغ.`,
    },
  ];

  return (
    <div className="min-h-full bg-[#0C0D0F] text-[#F1F1EE] antialiased">
      <ChronovaHeader />

      <main className="mx-auto max-w-6xl px-4 pb-28 pt-6 sm:px-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#8E9298] mb-6">
          <Link href="/templates/chronova" className="hover:text-[#B7A27A] transition-colors">
            الرئيسية
          </Link>
          <span>/</span>
          <Link
            href={`/templates/chronova/collections/${product.category}`}
            className="hover:text-[#B7A27A] transition-colors"
          >
            {product.category === "smart"
              ? "الساعات الذكية"
              : product.category === "classic"
                ? "الساعات الكلاسيكية"
                : "الإكسسوارات"}
          </Link>
          <span>/</span>
          <span className="text-[#F1F1EE] font-medium truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* Product Grid */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* LEFT: Images */}
          <div>
            {/* Mobile swipe */}
            <div className="lg:hidden">
              <div
                ref={mobileRef}
                onScroll={handleMobileScroll}
                className="flex snap-x snap-mandatory overflow-x-auto rounded-xl border border-[#292C30]"
              >
                {product.images.map((imgUrl, idx) => (
                  <div key={imgUrl + idx} className="w-full shrink-0 snap-center">
                    <div className="relative aspect-[4/5] bg-[#15171A]">
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
                      idx === activeImg ? "w-5 bg-[#B7A27A]" : "w-1.5 bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop Gallery */}
            <div className="hidden lg:block">
              <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#292C30] bg-[#15171A]">
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
              <div className="mt-3.5 grid grid-cols-4 gap-3">
                {product.images.map((imgUrl, idx) => (
                  <button
                    key={imgUrl + idx}
                    onClick={() => setActiveImg(idx)}
                    className={`relative aspect-[4/5] overflow-hidden rounded-xl border bg-[#15171A] transition-all ${
                      idx === activeImg
                        ? "border-[#B7A27A] ring-1 ring-[#B7A27A]"
                        : "border-[#292C30] opacity-60 hover:opacity-100"
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

          {/* RIGHT: Product Info */}
          <div ref={infoRef}>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#15171A] border border-[#292C30] px-3 py-1 text-[10px] font-mono tracking-widest uppercase text-[#B7A27A]">
                {product.category === "smart" ? "⚡ SMARTWATCH" : "⚙ CLASSIC WATCH"}
              </span>
              {product.isBestseller && (
                <span className="rounded-full bg-[#B7A27A] px-3 py-1 text-[10px] font-bold text-[#0C0D0F]">
                  الأكثر مبيعاً ⭐
                </span>
              )}
            </div>

            <h1 className="mt-3 font-serif-display text-3xl font-light tracking-tight sm:text-4xl text-[#F1F1EE]">
              {product.name}
            </h1>
            <p className="mt-1 text-xs text-[#8E9298] font-serif-display">
              {product.nameEn}
            </p>

            {/* Price & Rating */}
            <div className="mt-4 flex items-center justify-between border-b border-[#292C30] pb-4">
              <span className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#B7A27A]">
                {money(product.price)}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-[#8E9298]">
                <span className="text-[#B7A27A] text-sm">★★★★★</span>
                <span>({product.reviewCount} تقييم موثق)</span>
              </div>
            </div>

            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-[#8E9298]">
              {product.description}
            </p>

            {/* SPEC HIGHLIGHT BOX */}
            <div className="mt-6 rounded-xl bg-[#15171A] p-4 border border-[#292C30]">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#F1F1EE] mb-3">
                {product.category === "smart" ? "⚡ أبرز المواصفات التقنية" : "⚙ المواصفات الميكانيكية"}
              </p>

              {product.category === "smart" ? (
                <div className="grid grid-cols-2 gap-3 text-xs text-[#8E9298]">
                  <div>
                    <span className="text-[#F1F1EE] block font-medium">الشاشة:</span>
                    <span className="text-[11px]">{product.display}</span>
                  </div>
                  <div>
                    <span className="text-[#F1F1EE] block font-medium">عمر البطارية:</span>
                    <span className="text-[11px] text-[#8796A3]">{product.batteryLife}</span>
                  </div>
                  <div>
                    <span className="text-[#F1F1EE] block font-medium">مقاومة الماء:</span>
                    <span className="text-[11px]">{product.waterResistance}</span>
                  </div>
                  <div>
                    <span className="text-[#F1F1EE] block font-medium">التوافق:</span>
                    <span className="text-[11px]">{product.compatibility}</span>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 text-xs text-[#8E9298]">
                  <div>
                    <span className="text-[#F1F1EE] block font-medium">قطر الهيكل:</span>
                    <span className="text-[11px]">{product.caseDiameter}</span>
                  </div>
                  <div>
                    <span className="text-[#F1F1EE] block font-medium">نوع الحركة:</span>
                    <span className="text-[11px] text-[#B7A27A]">{product.movement}</span>
                  </div>
                  <div>
                    <span className="text-[#F1F1EE] block font-medium">مقاومة الماء:</span>
                    <span className="text-[11px]">{product.waterResistance}</span>
                  </div>
                  <div>
                    <span className="text-[#F1F1EE] block font-medium">الزجاج:</span>
                    <span className="text-[11px]">{product.glass}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Color variants */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium uppercase tracking-wider text-[#8E9298]">
                    اللون / الهيكل — <span className="text-[#F1F1EE] font-bold">{selectedColor}</span>
                  </p>
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="text-xs text-[#B7A27A] hover:underline"
                  >
                    📏 دليل مقاس المعصم
                  </button>
                </div>
                <div className="mt-3 flex gap-2.5">
                  {product.colors.map((col) => (
                    <button
                      key={col}
                      onClick={() => setSelectedColor(col)}
                      aria-label={col}
                      className={`relative h-8 w-8 rounded-full border border-black/40 transition-all ${
                        selectedColor === col
                          ? "ring-2 ring-[#B7A27A] ring-offset-2 ring-offset-[#0C0D0F] scale-110"
                          : "hover:scale-105"
                      }`}
                      style={{ backgroundColor: colorMap[col] || "#555" }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex w-fit items-center rounded-full border border-[#292C30] bg-[#15171A] px-2 py-1">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="إنقاص الكمية"
                  className="flex h-9 w-9 items-center justify-center text-sm font-bold text-zinc-400 hover:text-white rounded-full"
                >
                  −
                </button>
                <span className="w-8 text-center text-xs font-bold text-[#F1F1EE]">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(10, q + 1))}
                  aria-label="زيادة الكمية"
                  className="flex h-9 w-9 items-center justify-center text-sm font-bold text-zinc-400 hover:text-white rounded-full"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#B7A27A] px-8 text-xs font-semibold uppercase tracking-[0.2em] text-[#0C0D0F] transition-all hover:brightness-110 shadow-lg shadow-[#B7A27A]/20"
              >
                أضف إلى حقيبة المقتنيات
                <span aria-hidden>←</span>
              </button>
            </div>

            {/* Trust Points */}
            <div className="mt-8 grid grid-cols-1 gap-2.5 rounded-xl bg-[#15171A] p-4 border border-[#292C30]">
              {trustItems.map((item) => (
                <div key={item.text} className="flex items-center gap-2.5 text-xs text-[#8E9298]">
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Accordions */}
            <div className="mt-8 border-t border-[#292C30] divide-y divide-[#292C30]">
              {accordions.map((acc, idx) => (
                <div key={acc.title} className="py-4">
                  <button
                    onClick={() => setOpenAcc(openAcc === idx ? null : idx)}
                    className="flex w-full items-center justify-between text-xs font-semibold text-[#F1F1EE] hover:text-[#B7A27A] transition-colors"
                  >
                    <span>{acc.title}</span>
                    <span className="text-sm text-[#B7A27A]">{openAcc === idx ? "−" : "+"}</span>
                  </button>
                  {openAcc === idx && (
                    <p className="mt-3 text-xs leading-relaxed text-[#8E9298]">
                      {acc.content}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Watches */}
        {related.length > 0 && (
          <section className="mt-20 border-t border-[#292C30] pt-12">
            <h2 className="font-serif-display text-2xl font-light tracking-tight sm:text-3xl text-[#F1F1EE]">
              موديلات أخرى قد تثير اهتمامك
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/templates/chronova/product/${item.slug}`}
                  className="group flex flex-col justify-between rounded-xl bg-[#15171A] p-4 border border-[#292C30] transition-all hover:border-[#B7A27A]/50"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-[#0C0D0F]">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-3">
                    <h3 className="text-xs font-medium text-[#F1F1EE] truncate group-hover:text-[#B7A27A]">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-[#B7A27A]">
                      {money(item.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Wrist Guide Modal */}
      {showSizeGuide && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs"
          onClick={() => setShowSizeGuide(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-[#15171A] p-6 text-[#F1F1EE] border border-[#292C30] shadow-2xl animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#292C30] pb-4">
              <h3 className="font-serif-display text-lg font-medium text-[#B7A27A]">
                📏 دليل اختيار قطر الساعة المناسب لمعصمك
              </h3>
              <button
                onClick={() => setShowSizeGuide(false)}
                className="text-xs text-zinc-400 hover:text-white"
              >
                ✕ إغلاق
              </button>
            </div>
            <div className="mt-4 space-y-3 text-xs text-[#8E9298]">
              <p>• <strong>34 – 38 ملم:</strong> مثالي للمعاصم الرفيعة والمتوسطة (أقل من 16 سم)، وللساعات الكلاسيكية والنسائية الراقية.</p>
              <p>• <strong>39 – 41 ملم:</strong> القطر الذهبي الأكثر تنوعاً وتناسباً مع غالبية مقاسات المعاصم (16 – 18 سم).</p>
              <p>• <strong>42 – 44 ملم:</strong> مظهر رياضي وجريء، مثالي للساعات الذكية وساعات الغوص والكرونوغراف الرياضية.</p>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Mobile Bar */}
      <div
        className={`fixed inset-x-0 bottom-0 z-30 border-t border-[#292C30] bg-[#0C0D0F]/95 px-4 py-3 backdrop-blur transition-transform duration-300 lg:hidden shadow-lg ${
          showStickyBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] text-[#8E9298] truncate max-w-[140px]">
              {product.name}
            </p>
            <p className="font-serif-display text-base font-semibold text-[#B7A27A]">
              {money(product.price)}
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex-1 rounded-full bg-[#B7A27A] py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#0C0D0F]"
          >
            أضف للحقيبة
          </button>
        </div>
      </div>

      <ChronovaFooter />
    </div>
  );
}
