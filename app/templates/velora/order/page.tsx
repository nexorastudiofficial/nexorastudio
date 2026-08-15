import type { Metadata } from "next";
import OrderPage from "./OrderPage";

export const metadata: Metadata = {
  title: "أكملي طلبك — VELORA",
  description: "أكملي طلبك من فيلورا مع الدفع عند الاستلام.",
};

export default function OrderRoute() {
  return <OrderPage />;
}
