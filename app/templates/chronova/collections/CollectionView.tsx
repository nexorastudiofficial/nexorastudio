"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ChronovaHeader from "../ChronovaHeader";
import ChronovaFooter from "../ChronovaFooter";
import ProductCard from "../components/ProductCard";
import { byCategory, categoryLabels } from "../data/products";

const cats = [
  { key: "all", label: "جميع الساعات والإكسسوارات" },
  { key: "smart", label: "الساعات الذكية (Smart)" },
  { key: "classic", label: "الساعات الكلاسيكية (Classic)" },
  { key: "accessories", label: "الأحزمة والشواحن" },
];

export default function CollectionView({ category }: { category: string }) {
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = byCategory(category);
    if (!q) return base;
    return base.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.nameEn.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q)
    );
  }, [category, query]);

  const title =
    category === "all"
      ? "جميع تشكيلات كرونوفا"
      : `تسوّق ${categoryLabels[category] || "المجموعة"}`;

  return (
    <div className="min-h-full bg-[#0C0D0F] text-[#F1F1EE] antialiased">
      <ChronovaHeader />

      <main className="mx-auto max-w-6xl px-4 pb-28 pt-10 sm:px-6">
        {/* Header & Search */}
        <header className="text-center max-w-2xl mx-auto">
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#B7A27A]">
            CHRONOVA Timepieces
          </span>
          <h1 className="mt-3 font-serif-display text-3xl font-light tracking-tight sm:text-5xl text-[#F1F1EE]">
            {title}
          </h1>

          {/* Search bar */}
          <div className="mx-auto mt-6 flex max-w-md items-center gap-2 rounded-full border border-[#292C30] bg-[#15171A] px-4 py-2.5 shadow-xs focus-within:border-[#B7A27A]">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 shrink-0 text-[#8E9298]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن موديل، حركة، مواصفات..."
              className="w-full bg-transparent text-xs text-[#F1F1EE] outline-none placeholder:text-[#8E9298]"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-xs text-[#8E9298] hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <nav className="mt-8 flex flex-wrap justify-center gap-2 text-xs font-medium">
            {cats.map((c) => (
              <Link
                key={c.key}
                href={`/templates/chronova/collections/${c.key}`}
                className={`rounded-full px-5 py-2 text-xs tracking-wider transition-all ${
                  category === c.key
                    ? "bg-[#B7A27A] text-[#0C0D0F] font-semibold shadow-xs"
                    : "border border-[#292C30] bg-[#15171A] text-[#8E9298] hover:border-[#B7A27A]/50 hover:text-[#F1F1EE]"
                }`}
              >
                {c.label}
              </Link>
            ))}
          </nav>
        </header>

        {/* Product Grid */}
        {items.length === 0 ? (
          <div className="mt-16 text-center py-16 bg-[#15171A] rounded-2xl border border-[#292C30] max-w-md mx-auto">
            <span className="text-3xl text-[#8E9298]">⌚</span>
            <p className="mt-3 font-serif-display text-base text-[#F1F1EE]">
              لا توجد ساعات مطابقة لبحثك
            </p>
            <p className="mt-1 text-xs text-[#8E9298]">
              جرّب استخدام كلمات بحث عامة مثل (أوتوماتيك، تيتانيوم، جلد، دايفر).
            </p>
            <button
              onClick={() => setQuery("")}
              className="mt-4 text-xs font-medium text-[#B7A27A] underline underline-offset-4"
            >
              إعادة تعيين البحث
            </button>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {items.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </main>

      <ChronovaFooter />
    </div>
  );
}
