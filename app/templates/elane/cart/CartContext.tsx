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

const STORAGE_KEY = "elane-cart";

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

      {/* Cart drawer */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-full max-w-sm flex-col bg-[#F7F3ED] text-[#242321] shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-label="حقيبة التسوق"
      >
        <div className="flex items-center justify-between border-b border-[#242321]/10 px-5 py-4">
          <h2 className="text-sm font-medium uppercase tracking-[0.2em]">
            حقيبتك
          </h2>
          <button
            onClick={closeCart}
            aria-label="إغلاق الحقيبة"
            className="flex h-9 w-9 items-center justify-center transition-colors hover:bg-[#242321]/5"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        {hydratedNow &&
          (items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-sm text-[#242321]/60">حقيبتك فارغة حالياً.</p>
            <Link
              href="/templates/elane/collections/all"
              onClick={closeCart}
              className="border border-[#242321] px-8 py-3 text-xs font-medium uppercase tracking-[0.2em] transition-colors hover:bg-[#242321] hover:text-[#F7F3ED]"
            >
              تسوّقي الآن
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
              {items.map((item, i) => (
                <div key={`${item.slug}-${item.size}-${item.color}`} className="flex gap-4">
                  <a
                    href={`/templates/elane/product/${item.slug}`}
                    onClick={closeCart}
                    className="relative h-24 w-20 shrink-0 overflow-hidden bg-white"
                  >
                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </a>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <a
                        href={`/templates/elane/product/${item.slug}`}
                        onClick={closeCart}
                        className="truncate text-sm hover:underline"
                      >
                        {item.name}
                      </a>
                      <button
                        onClick={() => removeAt(i)}
                        aria-label="إزالة المنتج"
                        className="shrink-0 text-[#242321]/40 transition-colors hover:text-[#a8503f]"
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                          <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
                        </svg>
                      </button>
                    </div>
                    <p className="mt-0.5 text-xs text-[#242321]/50">
                      {item.size} · {item.color}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center border border-[#242321]/20">
                        <button
                          onClick={() => updateQty(i, item.qty - 1)}
                          aria-label="إنقاص الكمية"
                          className="flex h-8 w-8 items-center justify-center text-sm transition-colors hover:bg-[#242321]/5"
                        >
                          −
                        </button>
                        <span className="w-7 text-center text-xs">{item.qty}</span>
                        <button
                          onClick={() => updateQty(i, item.qty + 1)}
                          aria-label="زيادة الكمية"
                          className="flex h-8 w-8 items-center justify-center text-sm transition-colors hover:bg-[#242321]/5"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm font-medium">{money(item.price * item.qty)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#242321]/10 px-5 py-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#242321]/70">المجموع الفرعي</span>
                <span className="font-serif-display text-xl">{money(value.subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-[#242321]/50">
                تُحسب رسوم التوصيل عند إتمام الطلب.
              </p>
              <button
                onClick={() => {
                  closeCart();
                  router.push("/templates/elane/order");
                }}
                className="mt-4 flex w-full items-center justify-center bg-[#242321] py-3.5 text-xs font-medium uppercase tracking-[0.25em] text-[#F7F3ED] transition-colors hover:bg-[#242321]/90"
              >
                إتمام الطلب
              </button>
              <button
                onClick={closeCart}
                className="mt-2 w-full py-2 text-xs font-medium uppercase tracking-[0.2em] text-[#242321]/60 transition-colors hover:text-[#242321]"
              >
                متابعة التسوق
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
