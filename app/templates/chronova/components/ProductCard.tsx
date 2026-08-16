"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../cart/CartContext";
import { money } from "../data/money";
import type { Product } from "../data/products";

const colorMap: Record<string, string> = {
  "Space Black": "bg-[#101114] border-zinc-700",
  "Obsidian Black": "bg-[#141518] border-zinc-700",
  "Matte Black": "bg-[#18191c] border-zinc-700",
  "All Black": "bg-[#0c0d0f] border-zinc-700",
  "Midnight Black": "bg-[#121419] border-zinc-700",
  "Tactical Black": "bg-[#1b1c1e] border-zinc-700",
  "Ceramic Black": "bg-[#090a0c] border-zinc-700",
  "Silver Steel": "bg-[#c0c2c7]",
  Silver: "bg-[#d1d5db]",
  "Starlight Silver": "bg-[#e5e7eb]",
  "Silver / MOP": "bg-[#e2e8f0]",
  "Rose Gold": "bg-[#b76e79]",
  "Rose Gold / White": "bg-[#c4848d]",
  "Champagne Gold": "bg-[#d4af37]",
  Champagne: "bg-[#cbb67c]",
  "Cognac Leather": "bg-[#9a382d]",
  "Dark Cognac": "bg-[#7c2d12]",
  "Vintage Brown": "bg-[#78350f]",
  "Classic Black": "bg-[#1c1917]",
  Gunmetal: "bg-[#475569]",
  "Deep Sea Blue": "bg-[#1e3a8a]",
  "Storm Navy": "bg-[#1e293b]",
  "Graphite Black": "bg-[#334155]",
  "Sage Green": "bg-[#52796f]",
  "Desert Tan": "bg-[#d4a373]",
  "Titanium Grey": "bg-[#64748b]",
  "Space Grey": "bg-[#4b5563]",
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
      qty: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const secondaryImage = product.images[1] || product.images[0];

  return (
    <div className="group relative flex flex-col justify-between rounded-xl bg-[#15171A] p-3.5 border border-[#292C30] transition-all hover:border-[#B7A27A]/40 hover:shadow-[0_0_30px_rgba(183,162,122,0.08)]">
      <div>
        <div className="relative overflow-hidden rounded-lg bg-[#0C0D0F]">
          <Link href={`/templates/chronova/product/${product.slug}`} className="block">
            <div className="relative aspect-[4/5] overflow-hidden">
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
                {product.category === "smart" ? (
                  <span className="rounded-full bg-[#8796A3]/20 border border-[#8796A3]/40 backdrop-blur-xs px-2.5 py-0.5 text-[9px] font-medium tracking-wider text-[#8796A3]">
                    ⚡ SMART
                  </span>
                ) : product.category === "classic" ? (
                  <span className="rounded-full bg-[#B7A27A]/20 border border-[#B7A27A]/40 backdrop-blur-xs px-2.5 py-0.5 text-[9px] font-medium tracking-wider text-[#B7A27A]">
                    ⚙ CLASSIC
                  </span>
                ) : (
                  <span className="rounded-full bg-white/10 backdrop-blur-xs px-2.5 py-0.5 text-[9px] font-medium text-zinc-300">
                    ACCESSORY
                  </span>
                )}
                {product.isBestseller && (
                  <span className="rounded-full bg-[#B7A27A] px-2.5 py-0.5 text-[9px] font-semibold text-[#0C0D0F]">
                    الأكثر طلباً
                  </span>
                )}
              </div>
            </div>
          </Link>

          {/* Quick Add Slide-up Button */}
          <button
            onClick={handleAdd}
            className={`absolute inset-x-0 bottom-0 z-20 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${
              added
                ? "bg-emerald-500 text-white lg:translate-y-0"
                : "bg-[#B7A27A] text-[#0C0D0F] hover:brightness-110 lg:translate-y-full lg:group-hover:translate-y-0"
            }`}
          >
            {added ? "تمت الإضافة ✓" : "+ إضافة سريعة"}
          </button>
        </div>

        {/* Product Details */}
        <div className="pt-3">
          {/* Key Spec Badge Pill */}
          <div className="flex items-center gap-2 text-[10px] text-[#8E9298] font-mono">
            {product.category === "smart" ? (
              <span>{product.batteryLife?.replace("حتى ", "") || "AMOLED"}</span>
            ) : product.category === "classic" ? (
              <span>{product.caseDiameter} · {product.waterResistance}</span>
            ) : (
              <span>متوافق 20/22mm</span>
            )}
          </div>

          <Link href={`/templates/chronova/product/${product.slug}`} className="block mt-1">
            <h3 className="text-sm font-medium text-[#F1F1EE] group-hover:text-[#B7A27A] transition-colors leading-snug">
              {product.name}
            </h3>
            <p className="mt-0.5 text-[11px] text-[#8E9298] font-serif-display truncate">
              {product.nameEn}
            </p>
          </Link>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-[#292C30] pt-2.5">
        <span className="text-sm font-semibold text-[#B7A27A]">
          {money(product.price)}
        </span>

        {/* Color Dots */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1">
            {product.colors.slice(0, 3).map((c) => (
              <span
                key={c}
                title={c}
                className={`h-2.5 w-2.5 rounded-full border border-black/30 ${colorMap[c] || "bg-zinc-500"}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
