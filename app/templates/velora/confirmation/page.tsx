import type { Metadata } from "next";
import ConfirmationPage from "./ConfirmationPage";

export const metadata: Metadata = {
  title: "تأكيد الطلب — VELORA",
  description: "تم استلام طلبك من فيلورا.",
};

export default function ConfirmationRoute() {
  return <ConfirmationPage />;
}
