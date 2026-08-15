import { CartProvider } from "./cart/CartContext";

export default function ElaneLayout({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
