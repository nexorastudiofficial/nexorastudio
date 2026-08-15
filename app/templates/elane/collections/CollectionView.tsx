"use client";

import { useMemo, useState } from "react";
import ElaneHeader from "../ElaneHeader";
import ProductCard from "../components/ProductCard";
import { byCategory, categoryLabels } from "../data/products";

const cats = ["all", "women", "men", "accessories"];

export default function CollectionView({ category }: { category: string }) {
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = byCategory(category);
    if (!q) return base;
    return base.filter(
      (p) =>
        p.name.toLowerCase().includes(q) || p.nameEn.toLowerCase().includes(q)
    );
  }, [category, query]);

  const title =
    category === "all"
      ? "المجموعة الكاملة"
      : `تسوّق ${categoryLabels[category]}`;

  return (
    <div className="min-h-full bg-[#F7F3ED] text-[#242321] antialiased">
      <ElaneHeader />

      <main className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6">
        <header className="text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#6F735F] sm:text-xs">
            Élané
          </p>
          <h1 className="mt-3 font-serif-display text-3xl font-light tracking-tight sm:text-5xl">
            {title}
          </h1>
          <div className="mx-auto mt-6 flex max-w-md items-center gap-2 border-b border-[#242321]/30 pb-1 transition-colors focus-within:border-[#242321]">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 shrink-0 text-[#242321]/40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحثي عن قطعة…"
              className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-[#242321]/40"
            />
          </div>

          <nav className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-2 text-xs font-medium uppercase tracking-[0.18em]">
            {cats.map((c) => (
              <a
                key={c}
                href={`/templates/elane/collections/${c}`}
                className={`transition-colors ${
                  category === c
                    ? "border-b border-[#242321] pb-0.5 text-[#242321]"
                    : "text-[#242321]/50 hover:text-[#242321]"
                }`}
              >
                {categoryLabels[c]}
              </a>
            ))}
          </nav>
        </header>

        {items.length === 0 ? (
          <p className="mt-16 text-center text-sm text-[#242321]/60">
            لا توجد نتائج مطابقة لبحثك.
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3">
            {items.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
