export type SavedOrder = {
  ref: string;
  createdAt: string;
  customer: {
    name: string;
    phone: string;
    email: string;
    wilaya: string;
    city: string;
    address: string;
  };
  delivery: "home" | "pickup";
  items: {
    name: string;
    img: string;
    size: string;
    color: string;
    qty: number;
    price: number;
  }[];
  subtotal: number;
  fee: number;
  total: number;
};

const load = (): SavedOrder[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem("elane-orders");
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedOrder[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

let cache: SavedOrder[] = [];
const listeners = new Set<() => void>();

export const orderStore = {
  getSnapshot: () => cache,
  load,
  subscribe: (cb: () => void) => {
    listeners.add(cb);
    return () => {
      listeners.delete(cb);
    };
  },
  refresh: () => {
    cache = load();
    listeners.forEach((cb) => cb());
  },
};
