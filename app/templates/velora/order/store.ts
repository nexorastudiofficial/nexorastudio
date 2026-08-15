export type VeloraOrder = {
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
  items: {
    no: string;
    nameEn: string;
    type: string;
    size: string;
    price: number;
    qty: number;
    img: string;
  }[];
  subtotal: number;
  fee: number;
  total: number;
};

const load = (): VeloraOrder[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem("velora-orders");
    if (!raw) return [];
    const parsed = JSON.parse(raw) as VeloraOrder[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

let cache: VeloraOrder[] = [];
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
