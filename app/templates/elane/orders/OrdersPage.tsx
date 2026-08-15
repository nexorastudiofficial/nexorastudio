"use client";
"use no memo";

import { useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import ElaneHeader from "../ElaneHeader";
import { orderStore } from "./store";

const money = (n: number) => `${n.toLocaleString("en-US")} دج`;

export default function OrdersPage() {
  const orders = useSyncExternalStore(
    orderStore.subscribe,
    orderStore.getSnapshot,
    orderStore.getSnapshot
  );

  useEffect(() => {
    orderStore.refresh();
  }, []);

  const date = (iso: string) =>
    new Date(iso).toLocaleDateString("ar-DZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="min-h-full bg-[#F7F3ED] text-[#242321] antialiased">
      <ElaneHeader />
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-10 sm:px-6">
        <header className="text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#6F735F] sm:text-xs">
            Élané
          </p>
          <h1 className="mt-3 font-serif-display text-3xl font-light tracking-tight sm:text-4xl">
            طلباتي
          </h1>
        </header>

        {orders.length === 0 ? (
          <div className="mt-12 flex flex-col items-center gap-4 border border-dashed border-[#242321]/20 py-16 text-center">
            <p className="text-sm text-[#242321]/60">لا توجد طلبات بعد.</p>
            <Link
              href="/templates/elane/collections/all"
              className="border border-[#242321] px-8 py-3 text-xs font-medium uppercase tracking-[0.2em] transition-colors hover:bg-[#242321] hover:text-[#F7F3ED]"
            >
              تسوّقي الآن
            </Link>
          </div>
        ) : (
          <div className="mt-10 space-y-6">
            {orders.map((order) => (
              <div key={order.ref} className="border border-[#242321]/15 bg-white/50 p-6">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#242321]/10 pb-4">
                  <span className="font-serif-display text-lg">{order.ref}</span>
                  <span className="text-xs text-[#242321]/50">{date(order.createdAt)}</span>
                </div>
                <div className="mt-4 space-y-3">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="relative h-14 w-12 shrink-0 overflow-hidden bg-white">
                        <Image
                          src={item.img}
                          alt={item.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm">{item.name}</p>
                        <p className="text-xs text-[#242321]/50">
                          {item.size} · {item.color} · الكمية {item.qty}
                        </p>
                      </div>
                      <span className="text-sm font-medium">
                        {money(item.price * item.qty)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-[#242321]/10 pt-4">
                  <div>
                    <p className="text-xs text-[#242321]/50">
                      {order.delivery === "pickup" ? "استلام من المتجر" : "توصيل إلى المنزل"}
                    </p>
                    <p className="text-xs text-[#242321]/50">{order.customer.name}</p>
                  </div>
                  <span className="font-serif-display text-lg">{money(order.total)}</span>
                </div>
                <span className="mt-4 inline-block bg-[#6F735F]/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-[#6F735F]">
                  قيد التأكيد
                </span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
