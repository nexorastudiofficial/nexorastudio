"use client";

import Link from "next/link";

const rows = [
  {
    feature: "التصميم والأناقة الراقية",
    classic: "✓ ميناء كلاسيكي وزجاج ياقوتي",
    smart: "✓ شاشة AMOLED مخصصة وتيتانيوم",
  },
  {
    feature: "المكالمات والإشعارات الفورية",
    classic: "— بدون شاشات أو تشويش",
    smart: "✓ مكالمات بلوتوث وتنبيهات فورية",
  },
  {
    feature: "مراقبة المؤشرات الصحية (ECG, SpO2)",
    classic: "— غير متوفر",
    smart: "✓ مستشعرات دقيقة ومراقبة نبض 24/7",
  },
  {
    feature: "حركة ميكانيكية / أوتوماتيكية",
    classic: "✓ تروس سويسرية ميكانيكية أصيلة",
    smart: "— معالجات دقيقة وخوارزميات رقمية",
  },
  {
    feature: "الاستقلالية والشحن",
    classic: "✓ تعمل بالحركة أو بطارية لسنوات",
    smart: "✓ شحن مغناطيسي (تدوم حتى 14–30 يوماً)",
  },
  {
    feature: "الاستخدام المثالي",
    classic: "الاجتماعات، المناسبات، والهدايا الفاخرة",
    smart: "الرياضة، العمل، وتتبع النشاط اليومي",
  },
];

export default function WatchComparison() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#292C30] bg-[#15171A]">
      <div className="overflow-x-auto">
        <table className="w-full text-right text-xs">
          <thead>
            <tr className="border-b border-[#292C30] bg-[#0C0D0F]">
              <th className="py-4 px-6 text-sm font-semibold text-[#F1F1EE]">
                المقارنة
              </th>
              <th className="py-4 px-6 text-sm font-semibold text-[#B7A27A]">
                ⚙ الساعات الكلاسيكية (Classic)
              </th>
              <th className="py-4 px-6 text-sm font-semibold text-[#8796A3]">
                ⚡ الساعات الذكية (Smart)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#292C30]">
            {rows.map((row, idx) => (
              <tr
                key={idx}
                className="transition-colors hover:bg-white/[0.02]"
              >
                <td className="py-4 px-6 font-medium text-[#F1F1EE]">
                  {row.feature}
                </td>
                <td className="py-4 px-6 text-[#B7A27A]/90">
                  {row.classic}
                </td>
                <td className="py-4 px-6 text-[#8796A3]">
                  {row.smart}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#292C30] bg-[#0C0D0F] p-6">
        <p className="text-xs text-[#8E9298]">
          💡 يمكنك اختيار ما يلائم أسلوب حياتك أو اقتناء ساعة لكل مناسبة.
        </p>
        <div className="flex items-center gap-3">
          <Link
            href="/templates/chronova/collections/classic"
            className="rounded-full border border-[#B7A27A] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#B7A27A] hover:bg-[#B7A27A] hover:text-[#0C0D0F] transition-all"
          >
            تصفّح الكلاسيكية
          </Link>
          <Link
            href="/templates/chronova/collections/smart"
            className="rounded-full border border-[#8796A3] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#8796A3] hover:bg-[#8796A3] hover:text-[#0C0D0F] transition-all"
          >
            تصفّح الذكية
          </Link>
        </div>
      </div>
    </div>
  );
}
