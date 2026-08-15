"use client";

import { useState } from "react";
import Link from "next/link";

const faqs = [
  {
    q: "كيف أختار عطري المثالي؟",
    a: "ابدئي بمزاجك: ما الذي تريدين أن تشعري به؟ استخدمي قسم «ابحثي عن عطرك» في الصفحة الرئيسية، أو تصفّحي حسب المزاج في قسم المجموعات. يمكنك دائماً التواصل معنا لمساعدتك.",
  },
  {
    q: "هل عطور فيلورا أصلية؟",
    a: "نعم، جميع عطورنا أصلية مئة بالمئة وتأتي من مصادر موثوقة. نعتني باختيار كل منتج لضمان جودته وشخصيته.",
  },
  {
    q: "ما مدة التوصيل؟",
    a: "نشحن طلبك خلال 48 ساعة من التأكيد، ويصل عادةً خلال 3 إلى 5 أيام عمل حسب الولاية.",
  },
  {
    q: "كم تكلفة التوصيل؟",
    a: "رسوم التوصيل 675 دج للطلبات الأقل من 13,500 دج، ومجانية للطلبات من 13,500 دج فما فوق.",
  },
  {
    q: "هل يمكنني الدفع عند الاستلام؟",
    a: "نعم، نعتمد الدفع عند الاستلام نقداً عند وصول طلبك إلى باب منزلك، وهو الأسلوب الأكثر أماناً وراحة لعملائنا.",
  },
  {
    q: "هل يمكنني إرجاع عطر؟",
    a: "يمكنك إرجاع أي عطر غير مستخدم خلال 14 يوماً من الاستلام، بشرط أن يكون في تغليفه الأصلي. تواصل معنا وسنرتب لك عملية الإرجاع.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="divide-y divide-[#332F2A] border-y border-[#332F2A]">
        {faqs.map((faq, i) => {
          const open = openIndex === i;
          return (
            <div key={faq.q}>
              <button
                onClick={() => setOpenIndex(open ? null : i)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-4 py-6 text-right"
              >
                <span className="text-base text-[#F3EEE6]">{faq.q}</span>
                <span
                  className={`shrink-0 text-[#B99A67] transition-transform duration-300 ${
                    open ? "rotate-45" : ""
                  }`}
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ${
                  open ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-sm leading-relaxed text-[#A9A198]">{faq.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-8 text-center text-sm text-[#A9A198]">
        لم تجدي إجابتك؟{" "}
        <Link
          href="/templates/velora/contact"
          className="text-[#B99A67] underline underline-offset-4"
        >
          تواصلي معنا
        </Link>
        .
      </p>
    </div>
  );
}
