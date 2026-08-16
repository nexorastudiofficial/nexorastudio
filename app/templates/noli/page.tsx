import type { Metadata } from "next";
import NoliClientPage from "./NoliClientPage";

export const metadata: Metadata = {
  title: "NOLI & CO. — بوتيك ملابس وألعاب الأطفال",
  description: "ملابس وألعاب أطفال فاخرة وطبيعية مصممة للحظاتهم الأولى — قوالب استوديو نيكسورا.",
};

export default function NoliPage() {
  return <NoliClientPage />;
}
