import { CartProvider } from "./cart/CartContext";

export default function NoliLayout({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
