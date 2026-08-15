import type { Metadata } from "next";
import OrdersPage from "./OrdersPage";

export const metadata: Metadata = {
  title: "طلباتي — ÉLANÉ",
  description: "تتبّع طلباتك من ÉLANÉ.",
};

export default function OrdersRoute() {
  return <OrdersPage />;
}
