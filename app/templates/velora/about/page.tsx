import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "عن فيلورا — VELORA",
  description: "دار عطور فاخرة تصمّم عطوراً تصبح جزءاً من هويتك.",
};

const values = [
  {
    title: "الصياغة",
    desc: "كل عطرٍ يُصاغ بعناية من مكوّنات مختارة بعناية، ليحكي قصةً متكاملة.",
  },
  {
    title: "الحضور",
    desc: "نصنع عطوراً تُلاحظ من دون أن تُصرّح. حضورٌ هادئ، لكنه لا يُنسى.",
  },
  {
    title: "الصدق",
    desc: "منتجات أصلية، ومواعيد احترام، وتواصل بشري حقيقي مع كل عميل.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <header className="mx-auto max-w-2xl text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#B99A67] sm:text-xs">
          VELORA
        </p>
        <h1 className="mt-4 font-serif-display text-4xl font-light tracking-tight text-[#F3EEE6] sm:text-6xl">
          دارٌ تُصاغ فيها القصص
        </h1>
        <p className="mt-6 text-base leading-relaxed text-[#A9A198]">
          وُلدت فيلورا من إيمانٍ بسيط: العطر ليس منتجاً نشتريه، بل جزءٌ من
          القصة التي نحكيها عن أنفسنا. كل زجاجةٍ تحمل توقيعاً صُمم ليكون
          بصمتك.
        </p>
      </header>

      <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#0E0D0C]">
          <Image
            src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1400&auto=format&fit=crop"
            alt="زجاجة عطر فيلورا"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="space-y-5 text-sm leading-relaxed text-[#A9A198] sm:text-base">
          <p>
            نؤمن أن اختيار العطر يجب أن يكون رحلة مشاعر، لا قائمة مصطلحات.
            لذلك بنينا فيلورا حول فكرة بسيطة: اختاري ما تشعرين به، وسنجد لك
            عطراً يليق به.
          </p>
          <p>
            من نفحات العود الداكنة إلى انتعاش الحمضيات، كل تركيب في مجموعتنا
            يمر باختيارٍ مدروس واختبارٍ دقيق، لنقدّم لك عطراً تحبينه بالفعل.
          </p>
        </div>
      </div>

      <div className="mt-16 grid gap-5 md:grid-cols-3">
        {values.map((value) => (
          <div key={value.title} className="border border-[#332F2A] p-8">
            <span className="block h-px w-8 bg-[#B99A67]" />
            <h3 className="mt-5 font-serif-display text-2xl font-light text-[#F3EEE6]">
              {value.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#A9A198]">
              {value.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link
          href="/templates/velora/collections/all"
          className="inline-block bg-[#B99A67] px-10 py-4 text-xs font-medium uppercase tracking-[0.25em] text-[#11100F] transition-colors hover:bg-[#C9AA76]"
        >
          اكتشفي المجموعة
        </Link>
      </div>
    </div>
  );
}
