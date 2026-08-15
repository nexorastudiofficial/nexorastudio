import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "تواصل معنا — VELORA",
  description: "فريق فيلورا متاح دائماً لمساعدتك.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <header className="mx-auto max-w-2xl text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#B99A67] sm:text-xs">
          VELORA
        </p>
        <h1 className="mt-4 font-serif-display text-4xl font-light tracking-tight text-[#F3EEE6] sm:text-5xl">
          تواصل معنا
        </h1>
        <p className="mt-4 text-sm text-[#A9A198]">
          سؤال عن عطر معيّن، أو مساعدة في اختيار توقيعك — نحن هنا.
        </p>
      </header>

      <div className="mx-auto mt-12 grid max-w-4xl gap-10 lg:grid-cols-2">
        <div>
          <ContactForm />
        </div>
        <div className="space-y-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#B99A67]">
              البريد الإلكتروني
            </p>
            <p className="mt-2 text-sm text-[#F3EEE6]" dir="ltr">
              bonjour@velora.dz
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#B99A67]">
              الهاتف
            </p>
            <p className="mt-2 text-sm text-[#F3EEE6]" dir="ltr">
              +213 555 00 00 00
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#B99A67]">
              ساعات العمل
            </p>
            <p className="mt-2 text-sm text-[#F3EEE6]">
              السبت – الخميس: 9:00 – 18:00
            </p>
          </div>
          <div className="border border-[#332F2A] p-6">
            <p className="font-serif-display text-xl font-light text-[#F3EEE6]">
              لستِ متأكدة من عطرك؟
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#A9A198]">
              جربي اختبار توقيعك في ثلاث خطوات، ودعي فيلورا تقترح عليك عطرك
              المثالي.
            </p>
            <Link
              href="/templates/velora#signature"
              className="mt-4 inline-block border border-[#B99A67] px-6 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-[#B99A67] transition-colors hover:bg-[#B99A67] hover:text-[#11100F]"
            >
              ابحثي عن عطرك
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
