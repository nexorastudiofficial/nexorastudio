"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../cart/CartContext";
import { money } from "../data/money";
import type { Product } from "../data/products";

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <div className="group">
      <div className="relative">
        <Link href={`/templates/elane/product/${product.slug}`} className="block">
          <div className="relative aspect-[3/4] overflow-hidden bg-white">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 68vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {product.isNew && (
              <span className="absolute right-3 top-3 bg-[#F7F3ED]/90 px-2 py-1 text-[9px] font-medium uppercase tracking-[0.15em] text-[#6F735F]">
                جديد
              </span>
            )}
          </div>
        </Link>
        <button
          onClick={() =>
            add({
              slug: product.slug,
              name: product.name,
              price: product.price,
              img: product.images[0],
              size: "M",
              color: product.colors[0],
              qty: 1,
            })
          }
          className="absolute inset-x-0 bottom-0 bg-[#242321] py-3.5 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-[#F7F3ED] lg:translate-y-full lg:transition-transform lg:duration-300 lg:ease-out lg:group-hover:translate-y-0"
        >
          أضف إلى الحقيبة
        </button>
      </div>
      <Link href={`/templates/elane/product/${product.slug}`} className="block">
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="text-sm">{product.name}</span>
          <span className="text-sm text-[#242321]/60">{money(product.price)}</span>
        </div>
      </Link>
    </div>
  );
}
