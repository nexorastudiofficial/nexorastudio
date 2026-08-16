import type { Metadata } from "next";
import OrderPage from "./OrderPage";

export const metadata: Metadata = {
  title: "إتمام الطلب — NOLI & CO.",
  description: "أكمل طلبك من بوتيك نولي & كو مع التوصيل السريع والدفع عند الاستلام.",
};

export default function OrderRoute() {
  return <OrderPage />;
}
