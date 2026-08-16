"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import NoliHeader from "../NoliHeader";
import NoliFooter from "../NoliFooter";
import ProductCard from "../components/ProductCard";
import { byCategory, categoryLabels } from "../data/products";

const cats = [
  { key: "all", label: "جميع المنتجات" },
  { key: "clothing", label: "ملابس الأطفال" },
  { key: "toys", label: "الألعاب التفاعلية" },
  { key: "gifts", label: "الهدايا والحزم" },
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
        p.description.toLowerCase().includes(q)
    );
  }, [category, query]);

  const title =
    category === "all"
      ? "جميع تشكيلات نولي & كو"
      : `تسوّق ${categoryLabels[category] || "المجموعة"}`;

  return (
    <div className="min-h-full bg-[#FAF7F2] text-[#30312D] antialiased">
      <NoliHeader />

      <main className="mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6">
        {/* Header and Search */}
        <header className="text-center max-w-2xl mx-auto">
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#8A725F]">
            NOLI & CO. · بوتيك الأطفال
          </span>
          <h1 className="mt-3 font-serif-display text-3xl font-light tracking-tight sm:text-5xl">
            {title}
          </h1>

          {/* Search bar */}
          <div className="mx-auto mt-6 flex max-w-md items-center gap-2 rounded-full border border-[#30312D]/20 bg-white px-4 py-2 shadow-xs focus-within:border-[#30312D]">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 shrink-0 text-[#30312D]/40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن قطعة، لعبة، أو هدية..."
              className="w-full bg-transparent text-xs text-[#30312D] outline-none placeholder:text-[#30312D]/40"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-xs text-[#30312D]/40 hover:text-[#30312D]"
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
                href={`/templates/noli/collections/${c.key}`}
                className={`rounded-full px-5 py-2 text-xs tracking-wider transition-all ${
                  category === c.key
                    ? "bg-[#30312D] text-[#FAF7F2] shadow-xs"
                    : "border border-[#30312D]/15 bg-white text-[#30312D]/70 hover:border-[#30312D] hover:text-[#30312D]"
                }`}
              >
                {c.label}
              </Link>
            ))}
          </nav>
        </header>

        {/* Product Grid */}
        {items.length === 0 ? (
          <div className="mt-16 text-center py-12 bg-[#F2E9DC]/40 rounded-lg max-w-md mx-auto">
            <span className="text-3xl">🧸</span>
            <p className="mt-3 font-serif-display text-base text-[#30312D]">
              لا توجد منتجات مطابقة لبحثك
            </p>
            <p className="mt-1 text-xs text-[#30312D]/60">
              جرّب استخدام كلمات بحث مختلفة أو تصفح جميع الأقسام.
            </p>
            <button
              onClick={() => setQuery("")}
              className="mt-4 text-xs font-medium text-[#8A725F] underline underline-offset-4"
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

      <NoliFooter />
    </div>
  );
}
