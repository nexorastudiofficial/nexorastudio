"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../cart/CartContext";
import { money } from "../data/money";
import type { Product } from "../data/products";
import { trackAddToCart } from "@/lib/pixel";

const colorMap: Record<string, string> = {
  Ivory: "bg-[#F5F2EB] border-zinc-300",
  Black: "bg-[#18181b]",
  Olive: "bg-[#555d42]",
  Camel: "bg-[#b8860b]",
  Champagne: "bg-[#e8d3b9]",
  Sage: "bg-[#9cb09d]",
  Grey: "bg-[#808080]",
  White: "bg-white border-zinc-300",
  Sand: "bg-[#d7c4b7]",
  Sky: "bg-[#a5c4d4]",
  Navy: "bg-[#1b2a4a]",
  Tan: "bg-[#c18c5d]",
  Rose: "bg-[#e8b4b8]",
  Bordeaux: "bg-[#581825]",
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
      size: "M",
      color: product.colors[0],
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
    <div className="group relative">
      <div className="relative overflow-hidden bg-[#EFECE6] rounded-sm">
        <Link href={`/templates/elane/product/${product.slug}`} className="block">
          <div className="relative aspect-[3/4] overflow-hidden">
            {/* Primary Image */}
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 68vw, 25vw"
              className="object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0"
            />
            {/* Secondary Hover Image */}
            <Image
              src={secondaryImage}
              alt={`${product.name} - 2`}
              fill
              sizes="(max-width: 640px) 68vw, 25vw"
              className="object-cover opacity-0 transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:opacity-100 absolute inset-0"
            />

            {product.isNew && (
              <span className="absolute right-3 top-3 z-10 bg-[#242321]/90 backdrop-blur-md px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.2em] text-[#F7F3ED]">
                جديد
              </span>
            )}
          </div>
        </Link>

        {/* Quick Add Button */}
        <button
          onClick={handleAdd}
          className={`absolute inset-x-0 bottom-0 z-20 py-3.5 text-center text-[10px] font-medium uppercase tracking-[0.2em] transition-all duration-300 ${
            added
              ? "bg-[#6F735F] text-white lg:translate-y-0"
              : "bg-[#242321] text-[#F7F3ED] hover:bg-black lg:translate-y-full lg:group-hover:translate-y-0"
          }`}
        >
          {added ? "تمت الإضافة إلى الحقيبة ✓" : "أضف إلى الحقيبة"}
        </button>
      </div>

      <Link href={`/templates/elane/product/${product.slug}`} className="block pt-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-medium text-[#242321] group-hover:text-[#6F735F] transition-colors">
              {product.name}
            </h3>
            <p className="mt-0.5 text-xs text-[#242321]/50 font-serif-display">
              {product.nameEn}
            </p>
          </div>
          <span className="text-sm font-medium text-[#242321] shrink-0">
            {money(product.price)}
          </span>
        </div>

        {/* Color preview dots */}
        {product.colors && product.colors.length > 0 && (
          <div className="mt-2 flex items-center gap-1.5">
            {product.colors.map((col) => (
              <span
                key={col}
                title={col}
                className={`h-2.5 w-2.5 rounded-full border border-black/10 ${
                  colorMap[col] || "bg-zinc-400"
                }`}
              />
            ))}
          </div>
        )}
      </Link>
    </div>
  );
}

