"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../cart/CartContext";
import { money } from "../data/money";
import type { Product } from "../data/products";

const colorMap: Record<string, string> = {
  "Volt Lime": "bg-[#D6FF3F]",
  "Triple Black": "bg-[#141517]",
  "Cloud White": "bg-[#FFFFFF] border-zinc-300",
  "Slate Grey": "bg-[#64748b]",
  "Desert Sand": "bg-[#C5B9A5]",
  "Forest Green": "bg-[#2d4a3e]",
  "Blush Pink": "bg-[#f472b6]",
  "Sand / Neon": "bg-[#d4a373]",
  Sand: "bg-[#d6cbbe]",
  "White / Green": "bg-[#15803d]",
  "All White": "bg-[#f8fafc] border-zinc-300",
  "White / Navy": "bg-[#1e3a8a]",
  "Matte Black": "bg-[#18191c]",
  "Olive Drab": "bg-[#4d5c3f]",
  "Volt / Black": "bg-[#D6FF3F]",
  Black: "bg-[#141517]",
  White: "bg-[#FFFFFF] border-zinc-300",
  "Reflective Silver": "bg-[#cbd5e1]",
  "Standard Kit": "bg-[#101112]",
};

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add({
      slug: product.slug,
      name: product.name,
      price: product.price,
      img: product.images[0],
      color: product.colors[0],
      size: product.sizes[0] || "42",
      qty: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const secondaryImage = product.images[1] || product.images[0];

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-white p-4 border border-[#D8D5CC] shadow-xs transition-all hover:border-[#101112] hover:shadow-md">
      <div>
        <div className="relative overflow-hidden rounded-xl bg-[#E9E7E0]">
          <Link href={`/templates/avero/product/${product.slug}`} className="block">
            <div className="relative aspect-[4/3] overflow-hidden">
              {/* Primary Image */}
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0"
              />
              {/* Secondary Hover Image */}
              <Image
                src={secondaryImage}
                alt={`${product.name} - 2`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover opacity-0 transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:opacity-100 absolute inset-0"
              />

              {/* Badges */}
              <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
                {product.isDrop && (
                  <span className="rounded-full bg-[#D6FF3F] px-3 py-1 text-[9px] font-mono font-extrabold uppercase tracking-widest text-[#101112] shadow-xs">
                    ⚡ NEW DROP
                  </span>
                )}
                {product.isBestseller && !product.isDrop && (
                  <span className="rounded-full bg-[#101112] px-2.5 py-0.5 text-[9px] font-bold text-[#F4F2ED]">
                    الأكثر مبيعاً
                  </span>
                )}
              </div>
            </div>
          </Link>

          {/* Quick Add Slide-up Button */}
          <button
            onClick={handleAdd}
            className={`absolute inset-x-0 bottom-0 z-20 py-3 text-center text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
              added
                ? "bg-emerald-500 text-white lg:translate-y-0"
                : "bg-[#101112] text-[#D6FF3F] hover:brightness-125 lg:translate-y-full lg:group-hover:translate-y-0"
            }`}
          >
            {added ? "تمت الإضافة ✓" : "+ إضافة سريعة"}
          </button>
        </div>

        {/* Product Details */}
        <div className="pt-3">
          {/* Activity / Tech Spec Badge */}
          <div className="flex items-center gap-2 text-[10px] text-[#777873] font-mono">
            <span>{product.weight}</span>
            <span>·</span>
            <span>{product.cushion}</span>
          </div>

          <Link href={`/templates/avero/product/${product.slug}`} className="block mt-1">
            <h3 className="text-sm font-bold text-[#171817] group-hover:text-[#101112] transition-colors leading-snug">
              {product.name}
            </h3>
            <p className="mt-0.5 text-[11px] text-[#777873] font-mono truncate">
              {product.nameEn}
            </p>
          </Link>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-[#D8D5CC]/60 pt-2.5">
        <span className="text-sm font-extrabold text-[#171817]">
          {money(product.price)}
        </span>

        {/* Color Dots */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1">
            {product.colors.slice(0, 3).map((c) => (
              <span
                key={c}
                title={c}
                className={`h-2.5 w-2.5 rounded-full border border-black/15 ${colorMap[c] || "bg-zinc-400"}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
