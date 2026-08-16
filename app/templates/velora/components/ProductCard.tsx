"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../cart/CartContext";
import { money } from "../data/money";
import { sizePrice, type Fragrance } from "../data/fragrances";
import { trackAddToCart } from "@/lib/pixel";

export default function ProductCard({
  fragrance,
}: {
  fragrance: Fragrance;
}) {
  const { add } = useCart();

  const handleAdd = () => {
    const price = sizePrice(fragrance.price, 1);
    add({
      slug: fragrance.slug,
      no: fragrance.no,
      name: fragrance.name,
      nameEn: fragrance.nameEn,
      type: fragrance.type,
      price,
      img: fragrance.images[0],
      size: "50 مل",
      qty: 1,
    });
    trackAddToCart({
      content_name: `${fragrance.no} — ${fragrance.nameEn}`,
      content_category: "Perfume",
      content_ids: [fragrance.slug],
      value: price,
      currency: "DZD",
    });
  };

  return (
    <div className="group">
      <div className="relative">
        <Link
          href={`/templates/velora/product/${fragrance.slug}`}
          className="block"
        >
          <div className="relative aspect-[3/4] overflow-hidden bg-[#0E0D0C]">
            <Image
              src={fragrance.images[0]}
              alt={`${fragrance.no} — ${fragrance.nameEn}`}
              fill
              sizes="(max-width: 640px) 68vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#11100F]/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            {fragrance.isNew && (
              <span className="absolute right-3 top-3 bg-[#11100F]/80 px-2 py-1 text-[9px] font-medium uppercase tracking-[0.2em] text-[#B99A67]">
                جديد
              </span>
            )}
          </div>
        </Link>
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-stretch transition-transform duration-300 ease-out group-hover:translate-y-0">
          <Link
            href={`/templates/velora/product/${fragrance.slug}`}
            className="flex flex-1 items-center justify-center bg-[#B99A67]/95 py-3 text-center text-[10px] font-medium uppercase tracking-[0.25em] text-[#11100F]"
          >
            عرض سريع
          </Link>
          <button
            onClick={handleAdd}
            aria-label="أضف إلى الحقيبة"
            className="flex w-12 items-center justify-center bg-[#F3EEE6] text-[#11100F] transition-colors hover:bg-[#B99A67]"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </div>
      </div>
      <Link href={`/templates/velora/product/${fragrance.slug}`} className="block">
        <div className="mt-3 flex items-baseline justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#B99A67]">
              {fragrance.no}
            </p>
            <p className="mt-1 truncate text-sm text-[#F3EEE6]">{fragrance.nameEn}</p>
            <p className="mt-0.5 text-xs text-[#A9A198]">{fragrance.type}</p>
          </div>
          <span className="shrink-0 font-serif-display text-base text-[#F3EEE6]">
            {money(fragrance.price)}
          </span>
        </div>
      </Link>
    </div>
  );
}
