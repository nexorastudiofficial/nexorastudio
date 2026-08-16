"use client";
"use no memo";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { money } from "../data/money";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  img: string;
  size: string;
  color: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  hydrated: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
  updateQty: (index: number, qty: number) => void;
  removeAt: (index: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "noli-cart";

let hydrated = false;
const hydrationListeners = new Set<() => void>();
const hydrationStore = {
  subscribe: (cb: () => void) => {
    hydrationListeners.add(cb);
    return () => {
      hydrationListeners.delete(cb);
    };
  },
  getSnapshot: () => hydrated,
  getServerSnapshot: () => false,
};

const load = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(load);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const hydratedNow = useSyncExternalStore(
    hydrationStore.subscribe,
    hydrationStore.getSnapshot,
    hydrationStore.getServerSnapshot
  );

  useEffect(() => {
    hydrated = true;
    hydrationListeners.forEach((cb) => cb());
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const add = useCallback(
    (item: Omit<CartItem, "qty"> & { qty?: number }) => {
      const qty = item.qty ?? 1;
      setItems((prev) => {
        const idx = prev.findIndex(
          (i) =>
            i.slug === item.slug && i.size === item.size && i.color === item.color
        );
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { ...next[idx], qty: Math.min(10, next[idx].qty + qty) };
          return next;
        }
        return [...prev, { ...item, qty }];
      });
      setIsOpen(true);
    },
    []
  );

  const updateQty = useCallback((index: number, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((_, i) => i !== index)
        : prev.map((item, i) =>
            i === index ? { ...item, qty: Math.min(10, qty) } : item
          )
    );
  }, []);

  const removeAt = useCallback((index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((n, i) => n + i.qty * i.price, 0);
    return {
      items,
      count,
      subtotal,
      hydrated: hydratedNow,
      isOpen,
      openCart,
      closeCart,
      add,
      updateQty,
      removeAt,
      clear,
    };
  }, [items, hydratedNow, isOpen, openCart, closeCart, add, updateQty, removeAt, clear]);

  return (
    <CartContext.Provider value={value}>
      {children}

      {/* Cart drawer overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Cart drawer panel */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-full max-w-sm flex-col bg-[#FAF7F2] text-[#30312D] shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-label="حقيبة التسوق"
      >
        <div className="flex items-center justify-between border-b border-[#30312D]/10 px-6 py-4 bg-[#F2E9DC]">
          <div className="flex items-center gap-2">
            <span className="text-lg">🧸</span>
            <h2 className="font-serif-display text-lg font-medium tracking-wide">
              حقيبة التسوق
            </h2>
          </div>
          <button
            onClick={closeCart}
            aria-label="إغلاق الحقيبة"
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-black/5"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        {hydratedNow &&
          (items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
              <span className="text-4xl">🍼</span>
              <p className="font-serif-display text-lg text-[#30312D]">حقيبتك فارغة حالياً</p>
              <p className="text-xs text-[#30312D]/60 max-w-xs">
                استكشف مجموعتنا المنتقاة بعناية من ملابس وألعاب الأطفال الطبيعية.
              </p>
              <Link
                href="/templates/noli/collections/all"
                onClick={closeCart}
                className="mt-2 rounded-full bg-[#30312D] px-7 py-3 text-xs font-medium uppercase tracking-[0.18em] text-[#FAF7F2] transition-colors hover:bg-[#8A725F]"
              >
                تسوّق الآن
              </Link>
            </div>
          ) : (
            <>
              <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
                {items.map((item, i) => (
                  <div
                    key={`${item.slug}-${item.size}-${item.color}-${i}`}
                    className="flex gap-4 rounded-lg bg-white p-3 border border-[#30312D]/5 shadow-xs"
                  >
                    <Link
                      href={`/templates/noli/product/${item.slug}`}
                      onClick={closeCart}
                      className="relative h-20 w-16 shrink-0 overflow-hidden rounded bg-[#FAF7F2]"
                    >
                      <Image
                        src={item.img}
                        alt={item.name}
                        fill
                        sizes="70px"
                        className="object-cover"
                      />
                    </Link>
                    <div className="min-w-0 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/templates/noli/product/${item.slug}`}
                            onClick={closeCart}
                            className="truncate text-xs font-medium text-[#30312D] hover:text-[#8A725F] transition-colors"
                          >
                            {item.name}
                          </Link>
                          <button
                            onClick={() => removeAt(i)}
                            aria-label="إزالة المنتج"
                            className="shrink-0 text-[#30312D]/30 transition-colors hover:text-rose-500"
                          >
                            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
                            </svg>
                          </button>
                        </div>
                        <p className="mt-0.5 text-[11px] text-[#30312D]/50">
                          {item.size ? `المقاس: ${item.size}` : ""} {item.color ? `· ${item.color}` : ""}
                        </p>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center rounded border border-[#30312D]/15 bg-[#FAF7F2]">
                          <button
                            onClick={() => updateQty(i, item.qty - 1)}
                            aria-label="إنقاص الكمية"
                            className="flex h-6 w-6 items-center justify-center text-xs transition-colors hover:bg-black/5"
                          >
                            −
                          </button>
                          <span className="w-5 text-center text-xs font-medium">{item.qty}</span>
                          <button
                            onClick={() => updateQty(i, item.qty + 1)}
                            aria-label="زيادة الكمية"
                            className="flex h-6 w-6 items-center justify-center text-xs transition-colors hover:bg-black/5"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-xs font-semibold text-[#30312D]">
                          {money(item.price * item.qty)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Drawer footer */}
              <div className="border-t border-[#30312D]/10 bg-[#F2E9DC] px-5 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#30312D]/70">المجموع الفرعي:</span>
                  <span className="font-serif-display text-lg font-semibold text-[#30312D]">
                    {money(value.subtotal)}
                  </span>
                </div>
                <p className="mt-1 text-[10px] text-[#8A725F]">
                  ✓ توصيل مجاني للطلبات فوق 5,000 دج · الدفع عند الاستلام
                </p>

                <button
                  onClick={() => {
                    closeCart();
                    router.push("/templates/noli/order");
                  }}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-[#30312D] py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-[#FAF7F2] transition-colors hover:bg-[#8A725F]"
                >
                  إتمام الطلب
                  <span aria-hidden>←</span>
                </button>

                <button
                  onClick={closeCart}
                  className="mt-2 w-full py-1 text-center text-[11px] text-[#30312D]/60 hover:text-[#30312D]"
                >
                  متابعة التسوّق
                </button>
              </div>
            </>
          ))}
      </aside>
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
