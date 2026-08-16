import { CartProvider } from "./cart/CartContext";

export default function AveroLayout({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
