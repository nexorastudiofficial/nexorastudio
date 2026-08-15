import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pulse — إطلاق SaaS",
  description: "قالب صفحة منتج SaaS داكنة تركّز على التحويل من NexoraStudio.",
};

const features = [
  {
    title: "تحليلات فورية",
    description: "راقب عمليات التسجيل والإيراد والاحتفاظ لحظيًا بينما يُطلق فريقك.",
  },
  {
    title: "تقارير آلية",
    description: "ملخصات أسبوعية لكل الأطراف المعنية، دون الحاجة إلى لوحات تحكم.",
  },
  {
    title: "مساحة عمل الفريق",
    description: "مؤشرات مشتركة وطرق عرض محفوظة وتعليقات في مكان عملك.",
  },
];

export default function SaasTemplate() {
  return (
    <div className="min-h-full bg-[#07081a] text-zinc-100 antialiased">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <span className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 text-xs font-bold text-white">
            P
          </span>
          <span className="text-lg font-semibold tracking-tight">Pulse</span>
        </span>
        <div className="hidden gap-7 text-sm text-zinc-400 md:flex">
          <a href="#" className="hover:text-white">المنتج</a>
          <a href="#" className="hover:text-white">الأسعار</a>
          <a href="#" className="hover:text-white">العملاء</a>
        </div>
        <a
          href="#"
          className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#07081a]"
        >
          سجّل مجانًا
        </a>
      </nav>

      <header className="mx-auto max-w-6xl px-4 pb-16 pt-12 text-center sm:px-6 sm:pt-16">
        <span className="inline-block rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
          جديد · التسعير حسب الاستخدام متاح الآن
        </span>
        <h1 className="mx-auto mt-6 max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          اعرف أرقامك، <span className="text-indigo-400">قبل الجميع</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-zinc-400">
          Pulse يحوّل بيانات منتجك الخام إلى قصة جاهزة لمجلس الإدارة — كل ساعة،
          تلقائيًا.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#"
            className="rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30"
          >
            ابدأ فترة التجربة
          </a>
          <a
            href="#"
            className="rounded-lg border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold backdrop-blur hover:bg-white/10"
          >
            احجز عرضًا
          </a>
        </div>

        <div className="mt-16 rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-950/60 to-cyan-950/40 p-6 text-right sm:p-8">
          <div className="flex items-end justify-between border-b border-white/10 pb-4">
            <div>
              <p className="text-xs text-zinc-500">الإيراد الشهري المتكرر</p>
              <p className="text-3xl font-bold">$284,920</p>
            </div>
            <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
              +18.4% شهريًا
            </span>
          </div>
          <div className="mt-6 flex items-end gap-1.5">
            {[40, 55, 48, 72, 64, 88, 82, 100, 96, 120, 116, 138].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h * 0.45}px` }}
                className="flex-1 rounded-t bg-gradient-to-t from-indigo-600/40 to-cyan-400/70"
              />
            ))}
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-6"
            >
              <div className="mb-3 h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500/30 to-cyan-400/30" />
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 bg-white/[0.02] py-12 text-center">
        <p className="text-2xl font-semibold tracking-tight">
          موثوق به من{" "}
          <span className="text-indigo-400">أكثر من 3,000</span> فريق منتج
        </p>
        <a
          href="#"
          className="mt-6 inline-block rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#07081a]"
        >
          ابدأ اليوم
        </a>
      </section>
    </div>
  );
}
