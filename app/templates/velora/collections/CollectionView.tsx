"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ProductCard from "../components/ProductCard";
import {
  byCategory,
  byMood,
  categoryLabels,
  moods,
  type Category,
} from "../data/fragrances";

export default function CollectionView({ category }: { category: Category }) {
  const [q, setQ] = useState("");
  const searchParams = useSearchParams();
  const mood = searchParams.get("mood") ?? undefined;

  const filtered = byCategory(category)
    .filter((f) => !mood || byMood(mood).includes(f))
    .filter(
      (f) =>
        !q.trim() ||
        f.nameEn.toLowerCase().includes(q.trim().toLowerCase()) ||
        f.no.toLowerCase().includes(q.trim().toLowerCase())
    );

  const base = `/templates/velora/collections/${category}`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <header className="text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#B99A67] sm:text-xs">
          VELORA
        </p>
        <h1 className="mt-4 font-serif-display text-4xl font-light tracking-tight text-[#F3EEE6] sm:text-5xl">
          {categoryLabels[category]}
          {mood ? ` · ${moods[mood]?.label ?? ""}` : ""}
        </h1>
        <p className="mt-4 text-sm text-[#A9A198]">
          {filtered.length} عطراً متاحاً
        </p>
      </header>

      <div className="mt-8 flex items-center justify-center">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {(Object.keys(categoryLabels) as Category[]).map((cat) => (
            <Link
              key={cat}
              href={
                mood
                  ? `/templates/velora/collections/${cat}?mood=${mood}`
                  : `/templates/velora/collections/${cat}`
              }
              className={`border px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] transition-colors ${
                cat === category
                  ? "border-[#B99A67] bg-[#B99A67] text-[#11100F]"
                  : "border-[#332F2A] text-[#A9A198] hover:border-[#B99A67] hover:text-[#F3EEE6]"
              }`}
            >
              {categoryLabels[cat]}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <Link
          href={`${base}`}
          className={`border px-4 py-2 text-xs uppercase tracking-[0.15em] transition-colors ${
            !mood
              ? "border-[#B99A67]/60 text-[#B99A67]"
              : "border-[#332F2A] text-[#A9A198] hover:text-[#F3EEE6]"
          }`}
        >
          كل المزاجات
        </Link>
        {Object.entries(moods).map(([key, m]) => (
          <Link
            key={key}
            href={`${base}?mood=${key}`}
            className={`border px-4 py-2 text-xs uppercase tracking-[0.15em] transition-colors ${
              mood === key
                ? "border-[#B99A67]/60 text-[#B99A67]"
                : "border-[#332F2A] text-[#A9A198] hover:text-[#F3EEE6]"
            }`}
          >
            {m.label}
          </Link>
        ))}
      </div>

      <div className="mx-auto mt-8 max-w-md">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="ابحثي عن عطر…"
          className="w-full border-b border-[#332F2A] bg-transparent px-2 py-3 text-sm text-[#F3EEE6] outline-none transition-colors placeholder:text-[#A9A198]/60 focus:border-[#B99A67]"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-4 border border-dashed border-[#332F2A] py-20 text-center">
          <p className="text-sm text-[#A9A198]">لا توجد عطور مطابقة.</p>
          <button
            onClick={() => setQ("")}
            className="border border-[#B99A67] px-8 py-3 text-xs font-medium uppercase tracking-[0.25em] text-[#B99A67] transition-colors hover:bg-[#B99A67] hover:text-[#11100F]"
          >
            مسح البحث
          </button>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((f) => (
            <ProductCard key={f.slug} fragrance={f} />
          ))}
        </div>
      )}
    </div>
  );
}
