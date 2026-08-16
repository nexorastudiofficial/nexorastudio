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
  size?: string;
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

const STORAGE_KEY = "chronova-cart";

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
          (i) => i.slug === item.slug && i.color === item.color
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
        content_category: "Watch",
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
        className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Cart Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-full max-w-md flex-col bg-[#0C0D0F] text-[#F1F1EE] shadow-2xl border-r border-[#292C30] transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-label="حقيبة المقتنيات"
      >
        <div className="flex items-center justify-between border-b border-[#292C30] bg-[#15171A] px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="text-[#B7A27A] text-lg">⌚</span>
            <h2 className="font-serif-display text-lg font-medium tracking-wide text-[#F1F1EE]">
              حقيبة المقتنيات
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
              <span className="text-4xl text-[#8E9298]">⌚</span>
              <p className="font-serif-display text-lg text-[#F1F1EE]">حقيبتك فارغة حالياً</p>
              <p className="text-xs text-[#8E9298] max-w-xs">
                استكشف مجموعتنا من الساعات الكلاسيكية والذكية المصممة بدقة استثنائية.
              </p>
              <Link
                href="/templates/chronova/collections/all"
                onClick={closeCart}
                className="mt-2 rounded-full border border-[#B7A27A] bg-[#B7A27A]/10 px-8 py-3 text-xs font-medium uppercase tracking-[0.18em] text-[#B7A27A] transition-all hover:bg-[#B7A27A] hover:text-[#0C0D0F]"
              >
                استكشف التشكيلة
              </Link>
            </div>
          ) : (
            <>
              <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
                {items.map((item, i) => (
                  <div
                    key={`${item.slug}-${item.color}-${i}`}
                    className="flex gap-4 rounded-lg bg-[#15171A] p-3.5 border border-[#292C30]"
                  >
                    <Link
                      href={`/templates/chronova/product/${item.slug}`}
                      onClick={closeCart}
                      className="relative h-20 w-16 shrink-0 overflow-hidden rounded bg-[#0C0D0F]"
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
                            href={`/templates/chronova/product/${item.slug}`}
                            onClick={closeCart}
                            className="truncate text-xs font-medium text-[#F1F1EE] hover:text-[#B7A27A] transition-colors"
                          >
                            {item.name}
                          </Link>
                          <button
                            onClick={() => removeAt(i)}
                            aria-label="إزالة المنتج"
                            className="shrink-0 text-zinc-500 hover:text-rose-400 transition-colors"
                          >
                            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
                            </svg>
                          </button>
                        </div>
                        <p className="mt-0.5 text-[11px] text-[#8E9298]">
                          {item.color ? `اللون: ${item.color}` : ""}
                        </p>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center rounded border border-[#292C30] bg-[#0C0D0F]">
                          <button
                            onClick={() => updateQty(i, item.qty - 1)}
                            aria-label="إنقاص الكمية"
                            className="flex h-6 w-6 items-center justify-center text-xs text-zinc-400 hover:text-white"
                          >
                            −
                          </button>
                          <span className="w-5 text-center text-xs font-medium text-[#F1F1EE]">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(i, item.qty + 1)}
                            aria-label="زيادة الكمية"
                            className="flex h-6 w-6 items-center justify-center text-xs text-zinc-400 hover:text-white"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-xs font-semibold text-[#B7A27A]">
                          {money(item.price * item.qty)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Drawer footer */}
              <div className="border-t border-[#292C30] bg-[#15171A] px-6 py-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#8E9298]">المجموع الفرعي:</span>
                  <span className="font-serif-display text-xl font-semibold text-[#B7A27A]">
                    {money(value.subtotal)}
                  </span>
                </div>
                <p className="mt-1 text-[10px] text-[#8796A3]">
                  ✓ توصيل مؤمن لجميع الولايات · ضمان أصالة وفحص قبل الدفع
                </p>

                <button
                  onClick={() => {
                    closeCart();
                    router.push("/templates/chronova/order");
                  }}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#B7A27A] py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#0C0D0F] transition-all hover:brightness-110 shadow-lg shadow-[#B7A27A]/20"
                >
                  إتمام الطلب
                  <span aria-hidden>←</span>
                </button>

                <button
                  onClick={closeCart}
                  className="mt-2 w-full py-1 text-center text-[11px] text-[#8E9298] hover:text-[#F1F1EE]"
                >
                  متابعة التصفح
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
