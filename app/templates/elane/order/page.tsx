import type { Metadata } from "next";
import OrderPage from "./OrderPage";

export const metadata: Metadata = {
  title: "إرسال طلب — ÉLANÉ",
  description: "اطلب قطعك المفضلة ببساطة مع التوصيل إلى المنزل أو الاستلام من المتجر.",
};

export default function OrderRoute() {
  return <OrderPage />;
}
