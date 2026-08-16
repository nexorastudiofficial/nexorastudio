import type { Metadata } from "next";
import OrderPage from "./OrderPage";

export const metadata: Metadata = {
  title: "إتمام الطلب — AVERO",
  description: "أكمل طلبك من أحذية أفيرو مع التوصيل السريع لـ 58 ولاية والدفع عند الاستلام مع إمكانية فحص وتجربة المقاس.",
};

export default function OrderRoute() {
  return <OrderPage />;
}
