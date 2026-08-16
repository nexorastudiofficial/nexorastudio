"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import AveroHeader from "../AveroHeader";
import AveroFooter from "../AveroFooter";
import ProductCard from "../components/ProductCard";
import { byCategory, categoryLabels } from "../data/products";

const cats = [
  { key: "all", label: "جميع الأحذية" },
  { key: "men", label: "رجال (MEN)" },
  { key: "women", label: "نساء (WOMEN)" },
  { key: "running", label: "الجري (RUN)" },
  { key: "training", label: "التمارين (TRAIN)" },
  { key: "lifestyle", label: "ستريت وير (LIFESTYLE)" },
  { key: "accessories", label: "الإكسسوارات" },
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
        p.tagline.toLowerCase().includes(q) ||
        p.upperMaterial.toLowerCase().includes(q) ||
        p.soleTech.toLowerCase().includes(q)
    );
  }, [category, query]);

  const title =
    category === "all"
      ? "جميع تشكيلات AVERO"
      : `تسوّق ${categoryLabels[category] || "المجموعة"}`;

  return (
    <div className="min-h-full bg-[#F4F2ED] text-[#171817] antialiased">
      <AveroHeader />

      <main className="mx-auto max-w-7xl px-4 pb-28 pt-10 sm:px-6">
        {/* Header & Search */}
        <header className="text-center max-w-2xl mx-auto">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#777873] bg-[#E9E7E0] px-3 py-1 rounded-full">
            AVERO FOOTWEAR
          </span>
          <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#171817]">
            {title}
          </h1>

          {/* Search bar */}
          <div className="mx-auto mt-6 flex max-w-md items-center gap-2 rounded-full border border-[#D8D5CC] bg-white px-4 py-3 shadow-xs focus-within:border-[#101112]">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 shrink-0 text-[#777873]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن حذاء، تقنية، استخدام..."
              className="w-full bg-transparent text-xs text-[#171817] outline-none placeholder:text-[#777873]"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-xs text-[#777873] hover:text-[#171817]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <nav className="mt-8 flex flex-wrap justify-center gap-2 text-xs font-bold">
            {cats.map((c) => (
              <Link
                key={c.key}
                href={`/templates/avero/collections/${c.key}`}
                className={`rounded-full px-5 py-2.5 text-xs uppercase tracking-wider transition-all ${
                  category === c.key
                    ? "bg-[#101112] text-[#D6FF3F] shadow-xs"
                    : "border border-[#D8D5CC] bg-white text-[#777873] hover:border-[#101112] hover:text-[#171817]"
                }`}
              >
                {c.label}
              </Link>
            ))}
          </nav>
        </header>

        {/* Product Grid */}
        {items.length === 0 ? (
          <div className="mt-16 text-center py-16 bg-white rounded-2xl border border-[#D8D5CC] max-w-md mx-auto">
            <span className="text-3xl">👟</span>
            <p className="mt-3 font-bold text-base text-[#171817]">
              لا توجد أحذية مطابقة لبحثك
            </p>
            <p className="mt-1 text-xs text-[#777873]">
              جرّب استخدام كلمات بحث عامة مثل (كاربون، جري، تمارين، سليب-أون).
            </p>
            <button
              onClick={() => setQuery("")}
              className="mt-4 text-xs font-bold text-[#101112] underline underline-offset-4"
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

      <AveroFooter />
    </div>
  );
}
