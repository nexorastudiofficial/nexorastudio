import type { Metadata } from "next";
import OrderPage from "./OrderPage";

export const metadata: Metadata = {
  title: "إتمام الطلب — CHRONOVA",
  description: "أكمل طلبك من ساعات كرونوفا مع التوصيل السريع والضمان الدولي والدفع عند الاستلام.",
};

export default function OrderRoute() {
  return <OrderPage />;
}
