import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "La Brasa — مطعم",
  description: "قالب مطعم دافئ بأسلوب تحريري من NexoraStudio.",
};

const menu = [
  { name: "ضلع بقري مدخّن بالجمر", price: "32" },
  { name: "رومانسكو مشوي على النار", price: "21" },
  { name: "تالياطيل بالثوم البري", price: "26" },
  { name: "تشيز كيك بعسل النحل", price: "14" },
];

export default function RestaurantTemplate() {
  return (
    <div className="min-h-full bg-[#150f0a] text-[#f5ede2] antialiased">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <span className="font-serif-display text-xl tracking-wide">La Brasa</span>
        <div className="hidden gap-7 text-sm text-[#f5ede2]/70 md:flex">
          <a href="#" className="hover:text-white">القائمة</a>
          <a href="#" className="hover:text-white">قصتنا</a>
          <a href="#" className="hover:text-white">زورنا</a>
        </div>
        <a
          href="#"
          className="rounded-full border border-amber-400/40 px-5 py-2 text-sm font-medium text-amber-300"
        >
          احجز
        </a>
      </nav>

      <header className="mx-auto max-w-5xl px-4 pb-16 pt-12 text-center sm:px-6 sm:pt-14">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400/80">
          نار · جمر · صنعة
        </p>
        <h1 className="mx-auto mt-5 max-w-2xl font-serif-display text-4xl font-medium leading-tight tracking-tight sm:text-6xl">
          عشاءٌ على الطريقة القديمة
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-[#f5ede2]/70">
          طبخٌ على النار المفتوحة في قاعةٍ تُضاء بالشموع. مكوّنات موسمية
          ومحلية، بلا استعجال.
        </p>

        <div className="relative mx-auto mt-12 h-56 w-56">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-600/60 via-orange-700/40 to-rose-900/50 blur-2xl" />
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-amber-700/50 to-rose-900/60 shadow-[inset_0_-20px_60px_rgba(0,0,0,0.6)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-serif-display text-6xl text-[#1a120a]/80">ب</span>
          </div>
        </div>

        <div className="mx-auto mt-10 grid max-w-md grid-cols-3 gap-4 text-sm">
          <div>
            <p className="font-medium text-amber-300">مفتوح</p>
            <p className="text-[#f5ede2]/60">الثلاثاء–الأحد</p>
          </div>
          <div>
            <p className="font-medium text-amber-300">مقاعد</p>
            <p className="text-[#f5ede2]/60">38 · بجانب المدفأة</p>
          </div>
          <div>
            <p className="font-medium text-amber-300">منذ</p>
            <p className="text-[#f5ede2]/60">2014</p>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {menu.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between border-b border-white/10 pb-4"
            >
              <div>
                <p className="font-serif-display text-lg">{item.name}</p>
                <p className="text-xs text-[#f5ede2]/50">موسمي</p>
              </div>
              <span className="font-medium text-amber-300">${item.price}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-amber-50 py-10 text-center">
        <div className="mx-auto max-w-5xl px-6">
          <p className="font-serif-display text-2xl text-[#150f0a]">
            وجبة واحدة في المساء. سبعة أطباق. احجز مسبقًا.
          </p>
          <a
            href="#"
            className="mt-5 inline-block rounded-full bg-[#150f0a] px-7 py-3 text-sm font-medium text-amber-50"
          >
            احجز طاولة
          </a>
        </div>
      </section>
    </div>
  );
}
