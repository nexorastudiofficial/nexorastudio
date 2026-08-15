import type { Metadata } from "next";
import FaqSection from "./FaqSection";

export const metadata: Metadata = {
  title: "الأسئلة الشائعة — VELORA",
  description: "إجابات على أكثر الأسئلة شيوعاً حول عطور فيلورا.",
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <header className="mx-auto max-w-2xl text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#B99A67] sm:text-xs">
          VELORA
        </p>
        <h1 className="mt-4 font-serif-display text-4xl font-light tracking-tight text-[#F3EEE6] sm:text-5xl">
          الأسئلة الشائعة
        </h1>
        <p className="mt-4 text-sm text-[#A9A198]">
          كل ما تحتاجين معرفته قبل إتمام طلبك.
        </p>
      </header>
      <div className="mt-12">
        <FaqSection />
      </div>
    </div>
  );
}
