import { CartProvider } from "./cart/CartContext";

export default function ChronovaLayout({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
