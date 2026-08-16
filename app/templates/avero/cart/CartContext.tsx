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
import { trackAddToCart } from "@/lib/pixel";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  img: string;
  color: string;
  size: string;
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

const STORAGE_KEY = "avero-cart";

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
          (i) => i.slug === item.slug && i.color === item.color && i.size === item.size
        );
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { ...next[idx], qty: Math.min(10, next[idx].qty + qty) };
          return next;
        }
        return [...prev, { ...item, qty }];
      });
      trackAddToCart({
        content_name: item.name,
        content_category: "Footwear",
        content_ids: [item.slug],
        value: item.price * qty,
        currency: "DZD",
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

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-full max-w-md flex-col bg-[#F4F2ED] text-[#171817] shadow-2xl border-r border-[#D8D5CC] transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-label="حقيبة التسوق"
      >
        <div className="flex items-center justify-between border-b border-[#D8D5CC] bg-[#101112] text-[#F4F2ED] px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="text-[#D6FF3F] font-bold">⚡</span>
            <h2 className="font-semibold text-sm uppercase tracking-[0.2em]">
              حقيبة التسوق (BAG)
            </h2>
          </div>
          <button
            onClick={closeCart}
            aria-label="إغلاق الحقيبة"
            className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        {hydratedNow &&
          (items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
              <span className="text-4xl text-[#777873]">👟</span>
              <p className="text-lg font-bold text-[#171817] uppercase tracking-wider">حقيبتك فارغة حالياً</p>
              <p className="text-xs text-[#777873] max-w-xs">
                استكشف أحذية الجري والتمارين والستريت وير المصممة بأعلى معايير الأداء.
              </p>
              <Link
                href="/templates/avero/collections/all"
                onClick={closeCart}
                className="mt-2 rounded-full bg-[#101112] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-[#D6FF3F] transition-all hover:bg-[#101112]/90"
              >
                تسوّق التشكيلة
              </Link>
            </div>
          ) : (
            <>
              <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
                {items.map((item, i) => (
                  <div
                    key={`${item.slug}-${item.color}-${item.size}-${i}`}
                    className="flex gap-4 rounded-xl bg-white p-3.5 border border-[#D8D5CC] shadow-xs"
                  >
                    <Link
                      href={`/templates/avero/product/${item.slug}`}
                      onClick={closeCart}
                      className="relative h-20 w-18 shrink-0 overflow-hidden rounded-lg bg-[#E9E7E0]"
                    >
                      <Image
                        src={item.img}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </Link>
                    <div className="min-w-0 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/templates/avero/product/${item.slug}`}
                            onClick={closeCart}
                            className="truncate text-xs font-bold text-[#171817] hover:text-[#101112]"
                          >
                            {item.name}
                          </Link>
                          <button
                            onClick={() => removeAt(i)}
                            aria-label="إزالة المنتج"
                            className="shrink-0 text-zinc-400 hover:text-rose-500 transition-colors"
                          >
                            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
                            </svg>
                          </button>
                        </div>
                        <p className="mt-0.5 text-[11px] text-[#777873]">
                          {item.color} · مقاس: <span className="font-bold text-[#171817]">{item.size}</span>
                        </p>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-[#D8D5CC] bg-[#F4F2ED]">
                          <button
                            onClick={() => updateQty(i, item.qty - 1)}
                            aria-label="إنقاص الكمية"
                            className="flex h-6 w-6 items-center justify-center text-xs text-zinc-500 hover:text-[#171817]"
                          >
                            −
                          </button>
                          <span className="w-5 text-center text-xs font-bold text-[#171817]">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(i, item.qty + 1)}
                            aria-label="زيادة الكمية"
                            className="flex h-6 w-6 items-center justify-center text-xs text-zinc-500 hover:text-[#171817]"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-xs font-bold text-[#171817]">
                          {money(item.price * item.qty)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Drawer footer */}
              <div className="border-t border-[#D8D5CC] bg-[#E9E7E0] px-6 py-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#777873]">المجموع الفرعي:</span>
                  <span className="text-lg font-bold text-[#171817]">
                    {money(value.subtotal)}
                  </span>
                </div>
                <p className="mt-1 text-[10px] text-[#777873]">
                  ✓ شحن مجاني للطلبات فوق 15,000 دج · تجربة قياس واستبدال سهل
                </p>

                <button
                  onClick={() => {
                    closeCart();
                    router.push("/templates/avero/order");
                  }}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#101112] py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#D6FF3F] transition-all hover:brightness-125 shadow-lg shadow-black/10"
                >
                  إتمام الطلب (CHECKOUT)
                  <span aria-hidden>←</span>
                </button>

                <button
                  onClick={closeCart}
                  className="mt-2 w-full py-1 text-center text-[11px] text-[#777873] hover:text-[#171817]"
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
