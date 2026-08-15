"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../cart/CartContext";
import { money } from "../data/money";
import { fragrances, sizes, sizePrice, type Fragrance } from "../data/fragrances";
import ProductCard from "../components/ProductCard";

const trust = [
  "عطر يدوم طويلاً",
  "تغليف آمن",
  "إرجاع سهل",
];

const notesList = (notes: Fragrance["notes"]) => [
  ["النفحات العليا", notes.top],
  ["النفحات الوسطى", notes.heart],
  ["النفحات الأساسية", notes.base],
];

export default function ProductPage({ fragrance }: { fragrance: Fragrance }) {
  const { add, openCart } = useCart();
  const [active, setActive] = useState(0);
  const [size, setSize] = useState(sizes[1]);

  const price = sizePrice(fragrance.price, size.mult);
  const related = fragrances
    .filter((f) => f.slug !== fragrance.slug && f.category === fragrance.category)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Gallery */}
        <div>
          <div className="relative aspect-[3/4] overflow-hidden bg-[#0E0D0C]">
            <Image
              src={fragrance.images[active] ?? fragrance.images[0]}
              alt={`${fragrance.no} — ${fragrance.nameEn} — صورة ${active + 1}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="mt-3 flex gap-3">
            {fragrance.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setActive(i)}
                aria-label={`إظهار الصورة ${i + 1}`}
                className={`relative aspect-[3/4] w-20 shrink-0 overflow-hidden bg-[#0E0D0C] transition-all ${
                  i === active
                    ? "border border-[#B99A67] opacity-100"
                    : "border border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={img} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#B99A67] sm:text-xs">
            {fragrance.no}
          </p>
          <h1 className="mt-3 font-serif-display text-3xl font-light tracking-tight text-[#F3EEE6] sm:text-5xl">
            {fragrance.nameEn}
          </h1>
          <p className="mt-2 text-sm uppercase tracking-[0.2em] text-[#A9A198]">
            {fragrance.type}
          </p>
          <p className="mt-6 font-serif-display text-2xl text-[#B99A67]">{money(price)}</p>
          <p className="mt-6 text-sm leading-relaxed text-[#A9A198]">
            {fragrance.description}
          </p>

          <div className="mt-8 border-t border-[#332F2A] pt-8">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#A9A198]">
              مكوّنات العطر
            </p>
            <dl className="mt-5 space-y-5">
              {notesList(fragrance.notes).map(([label, value]) => (
                <div key={label} className="flex flex-col gap-1 border-r border-[#B99A67]/30 pr-4">
                  <dt className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#B99A67]">
                    {label}
                  </dt>
                  <dd className="text-sm text-[#F3EEE6]/90">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-8">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#A9A198]">
              الحجم
            </p>
            <div className="mt-4 flex gap-3">
              {sizes.map((s) => (
                <button
                  key={s.ml}
                  onClick={() => setSize(s)}
                  className={`border px-5 py-3 text-sm transition-colors ${
                    size.ml === s.ml
                      ? "border-[#B99A67] bg-[#B99A67] text-[#11100F]"
                      : "border-[#332F2A] text-[#F3EEE6] hover:border-[#B99A67]"
                  }`}
                >
                  {s.label}
                  <span className="mt-0.5 block text-[10px] text-[#A9A198]">
                    {money(sizePrice(fragrance.price, s.mult))}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => {
                add({
                  slug: fragrance.slug,
                  no: fragrance.no,
                  name: fragrance.name,
                  nameEn: fragrance.nameEn,
                  type: fragrance.type,
                  price,
                  img: fragrance.images[0],
                  size: size.label,
                  qty: 1,
                });
                openCart();
              }}
              className="flex-1 bg-[#B99A67] py-4 text-xs font-medium uppercase tracking-[0.25em] text-[#11100F] transition-colors hover:bg-[#C9AA76]"
            >
              أضيفي إلى الحقيبة
            </button>
            <Link
              href="/templates/velora/order"
              className="flex-1 border border-[#F3EEE6]/40 py-4 text-center text-xs font-medium uppercase tracking-[0.25em] text-[#F3EEE6] transition-colors hover:border-[#B99A67] hover:text-[#B99A67]"
            >
              اطلبي الآن
            </Link>
          </div>

          <ul className="mt-7 space-y-2.5">
            {trust.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-[#A9A198]">
                <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-[#B99A67]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-20 border-t border-[#332F2A] pt-16">
          <div className="flex items-end justify-between">
            <h2 className="font-serif-display text-2xl font-light tracking-tight text-[#F3EEE6] sm:text-3xl">
              قد يعجبك أيضاً
            </h2>
            <Link
              href={`/templates/velora/collections/${fragrance.category}`}
              className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#A9A198] transition-colors hover:text-[#B99A67] sm:text-xs"
            >
              عرض الكل
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((f) => (
              <ProductCard key={f.slug} fragrance={f} />
            ))}
          </div>
        </div>
      )}

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#332F2A] bg-[#11100F]/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <p className="font-serif-display text-lg text-[#F3EEE6]">{money(price)}</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#A9A198]">
              {fragrance.no} · {size.label}
            </p>
          </div>
          <button
            onClick={() => {
              add({
                slug: fragrance.slug,
                no: fragrance.no,
                name: fragrance.name,
                nameEn: fragrance.nameEn,
                type: fragrance.type,
                price,
                img: fragrance.images[0],
                size: size.label,
                qty: 1,
              });
              openCart();
            }}
            className="flex-1 bg-[#B99A67] py-3.5 text-xs font-medium uppercase tracking-[0.25em] text-[#11100F] transition-colors hover:bg-[#C9AA76]"
          >
            أضيفي إلى الحقيبة
          </button>
        </div>
      </div>
    </div>
  );
}
