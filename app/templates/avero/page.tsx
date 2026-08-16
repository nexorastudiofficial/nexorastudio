import type { Metadata } from "next";
import AveroClientPage from "./AveroClientPage";

export const metadata: Metadata = {
  title: "AVERO — Move Different | أحذية الجري والتمارين والستريت وير ثلاثية الأبعاد",
  description: "علامة أحذية معاصرة تجمع بين هندسة الأداء الرياضي المتطورة، التكنولوجيا الثلاثية الأبعاد، وراحة الاستخدام اليومي — قوالب استوديو نيكسورا.",
};

export default function AveroPage() {
  return <AveroClientPage />;
}
