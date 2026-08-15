"use client";
"use no memo";

import { useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { orderStore } from "../order/store";
import { money } from "../data/money";

export default function ConfirmationPage() {
  const orders = useSyncExternalStore(
    orderStore.subscribe,
    orderStore.getSnapshot,
    orderStore.getSnapshot
  );

  useEffect(() => {
    orderStore.refresh();
  }, []);

  const order = orders[orders.length - 1];

  if (!order) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <p className="text-sm text-[#A9A198]">لم نعثر على طلب حديث.</p>
        <Link
          href="/templates/velora/collections/all"
          className="mt-6 inline-block border border-[#B99A67] px-9 py-3.5 text-xs font-medium uppercase tracking-[0.25em] text-[#B99A67] transition-colors hover:bg-[#B99A67] hover:text-[#11100F]"
        >
          متابعة التسوق
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 sm:py-28">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#B99A67] text-[#B99A67]">
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
      <h1 className="mt-8 font-serif-display text-4xl font-light tracking-tight text-[#F3EEE6] sm:text-5xl">
        تم استلام طلبك.
      </h1>
      <p className="mt-4 text-sm text-[#A9A198]">
        شكراً لاختيارك فيلورا. سنتصل بك قريباً لتأكيد تفاصيل طلبك.
      </p>
      <p className="mt-6 font-serif-display text-xl tracking-wider text-[#B99A67]">
        {order.ref}
      </p>

      <div className="mt-10 border border-[#332F2A] bg-[#1A1816] p-6 text-right">
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#A9A198]">
          طلبك
        </p>
        <div className="mt-4 space-y-3">
          {order.items.map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="relative h-16 w-12 shrink-0 overflow-hidden bg-[#0E0D0C]">
                <Image
                  src={item.img}
                  alt={item.no}
                  fill
                  sizes="52px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-[#F3EEE6]">
                  {item.no} · {item.nameEn}
                </p>
                <p className="mt-0.5 text-xs text-[#A9A198]">
                  {item.size} × {item.qty}
                </p>
              </div>
              <span className="text-sm text-[#F3EEE6]">{money(item.price * item.qty)}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 space-y-2 border-t border-[#332F2A] pt-4 text-sm">
          <div className="flex justify-between text-[#A9A198]">
            <span>العطر</span>
            <span>{money(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-[#A9A198]">
            <span>التوصيل</span>
            <span>{order.fee === 0 ? "مجاني" : money(order.fee)}</span>
          </div>
          <div className="flex justify-between text-[#F3EEE6]">
            <span>الإجمالي</span>
            <span className="font-serif-display text-lg text-[#B99A67]">
              {money(order.total)}
            </span>
          </div>
        </div>
      </div>

      <Link
        href="/templates/velora/collections/all"
        className="mt-10 inline-block border border-[#B99A67] px-9 py-3.5 text-xs font-medium uppercase tracking-[0.25em] text-[#B99A67] transition-colors hover:bg-[#B99A67] hover:text-[#11100F]"
      >
        متابعة التسوق
      </Link>
    </div>
  );
}
