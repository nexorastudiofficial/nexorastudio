import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "الشحن والاسترجاع — VELORA",
  description: "سياسة الشحن والاسترجاع في فيلورا.",
};

const sections = [
  {
    title: "الشحن",
    body: "نشحن إلى جميع ولايات الوطن البالغ عددها 58. يتم تجهيز الطلب خلال 48 ساعة من تأكيده، ويصل عادةً خلال 3 إلى 5 أيام عمل. رسوم التوصيل 675 دج للطلبات التي تقل عن 13,500 دج، والتوصيل مجاني للطلبات من 13,500 دج فما فوق.",
  },
  {
    title: "التغليف",
    body: "كل عطر يُغلّف بعناية في صندوقٍ مبطّن ليصل بأمانٍ تام، مع حفظه من الحرارة والصدمات أثناء النقل.",
  },
  {
    title: "الدفع عند الاستلام",
    body: "نعتمد الدفع نقداً عند الاستلام. تحقق من الطلب عند وصوله قبل الدفع، ودعنا نعرف فوراً في حال وجود أي مشكلة.",
  },
  {
    title: "الاسترجاع والاستبدال",
    body: "يمكنك إرجاع أو استبدال أي عطر غير مستخدم خلال 14 يوماً من تاريخ الاستلام، بشرط أن يكون في تغليفه الأصلي وسليماً. للبدء، تواصل معنا عبر صفحة الاتصال وسنرشدك خلال العملية.",
  },
  {
    title: "المنتجات المعيبة",
    body: "في حال وصول منتجٍ معيب أو تالف، سنقوم باستبداله أو استرداد قيمته كاملة دون أي تكلفة إضافية. تواصل معنا خلال 48 ساعة من الاستلام مع صورة للمنتج.",
  },
];

export default function ShippingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <header className="text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#B99A67] sm:text-xs">
          VELORA
        </p>
        <h1 className="mt-4 font-serif-display text-4xl font-light tracking-tight text-[#F3EEE6] sm:text-5xl">
          الشحن والاسترجاع
        </h1>
      </header>

      <div className="mt-12 space-y-10">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="font-serif-display text-2xl font-light text-[#F3EEE6]">
              {s.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#A9A198]">{s.body}</p>
          </section>
        ))}
      </div>

      <div className="mt-14 border border-[#332F2A] bg-[#1A1816] p-8 text-center">
        <p className="font-serif-display text-2xl font-light text-[#F3EEE6]">
          عندك سؤال آخر؟
        </p>
        <Link
          href="/templates/velora/contact"
          className="mt-5 inline-block border border-[#B99A67] px-8 py-3 text-xs font-medium uppercase tracking-[0.25em] text-[#B99A67] transition-colors hover:bg-[#B99A67] hover:text-[#11100F]"
        >
          تواصل معنا
        </Link>
      </div>
    </div>
  );
}
