import type { Metadata } from "next";
import ChronovaClientPage from "./ChronovaClientPage";

export const metadata: Metadata = {
  title: "CHRONOVA — الساعات الذكية والكلاسيكية الفاخرة",
  description: "متجر ساعات معاصر يجمع بين دقة وحرفية الساعات الميكانيكية الكلاسيكية وأحدث ابتكارات التقنية الذكية — قوالب استوديو نيكسورا.",
};

export default function ChronovaPage() {
  return <ChronovaClientPage />;
}
