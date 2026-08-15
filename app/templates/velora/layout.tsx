import { CartProvider } from "./cart/CartContext";
import VeloraHeader from "./VeloraHeader";
import VeloraFooter from "./VeloraFooter";

export default function VeloraLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-[#11100F] text-[#F3EEE6] antialiased">
        <VeloraHeader />
        <main className="flex-1">{children}</main>
        <VeloraFooter />
      </div>
    </CartProvider>
  );
}
