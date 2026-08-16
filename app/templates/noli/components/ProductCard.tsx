"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../cart/CartContext";
import { money } from "../data/money";
import type { Product } from "../data/products";
import { trackAddToCart } from "@/lib/pixel";

const colorMap: Record<string, string> = {
  Cream: "bg-[#F5F2EB] border-zinc-300",
  Sage: "bg-[#A8B5A0]",
  "Dusty Blue": "bg-[#A9BBC4]",
  Oatmeal: "bg-[#D4C9B8]",
  "Dusty Rose": "bg-[#D4A5A5]",
  Natural: "bg-[#E8DFD0]",
  Cloud: "bg-[#E8E4DE] border-zinc-300",
  Peach: "bg-[#E8B9A6]",
  Camel: "bg-[#B08050]",
  Cocoa: "bg-[#8B7355]",
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
      size: product.sizes ? product.sizes[0] : "",
      color: product.colors ? product.colors[0] : "",
      qty: 1,
    });
    trackAddToCart({
      content_name: product.name,
      content_category: product.category,
      content_ids: [product.slug],
      value: product.price,
      currency: "DZD",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const secondaryImage = product.images[1] || product.images[0];

  return (
    <div className="group relative flex flex-col justify-between">
      <div>
        <div className="relative overflow-hidden rounded-md bg-[#F2E9DC]">
          <Link href={`/templates/noli/product/${product.slug}`} className="block">
            <div className="relative aspect-[3/4] overflow-hidden">
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
              <div className="absolute right-3 top-3 z-10 flex flex-col gap-1">
                {product.isBestseller && (
                  <span className="rounded-full bg-[#E8B9A6] px-2.5 py-0.5 text-[9px] font-medium tracking-wider text-[#30312D] shadow-xs">
                    الأكثر طلباً ⭐
                  </span>
                )}
                {product.isNew && (
                  <span className="rounded-full bg-[#A8B5A0] px-2.5 py-0.5 text-[9px] font-medium tracking-wider text-white shadow-xs">
                    جديد
                  </span>
                )}
              </div>
            </div>
          </Link>

          {/* Quick Add Slide-up Button */}
          <button
            onClick={handleAdd}
            className={`absolute inset-x-0 bottom-0 z-20 py-3 text-center text-[11px] font-medium uppercase tracking-[0.18em] transition-all duration-300 ${
              added
                ? "bg-[#A8B5A0] text-white lg:translate-y-0"
                : "bg-[#30312D] text-[#FAF7F2] hover:bg-[#8A725F] lg:translate-y-full lg:group-hover:translate-y-0"
            }`}
          >
            {added ? "تمت الإضافة ✓" : "+ إضافة سريعة"}
          </button>
        </div>

        {/* Product Details */}
        <div className="pt-3">
          {/* Rating */}
          <div className="flex items-center gap-1 text-amber-500 text-[10px]">
            <span>★★★★★</span>
            <span className="text-[10px] text-[#30312D]/40">({product.reviewCount})</span>
          </div>

          <Link href={`/templates/noli/product/${product.slug}`} className="block mt-1">
            <h3 className="text-sm font-medium text-[#30312D] group-hover:text-[#8A725F] transition-colors leading-snug">
              {product.name}
            </h3>
            <p className="mt-0.5 text-[11px] text-[#30312D]/50 font-serif-display">
              {product.nameEn}
            </p>
          </Link>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-[#30312D]">
          {money(product.price)}
        </span>

        {/* Color Dots */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1">
            {product.colors.map((c) => (
              <span
                key={c}
                title={c}
                className={`h-2 w-2 rounded-full border border-black/10 ${colorMap[c] || "bg-stone-300"}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
