import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mira Anders — محفظة أعمال",
  description: "قالب محفظة فاتحة بسيط للمبدعين من NexoraStudio.",
};

const projects = [
  { name: "Aster Bloom", year: "2025", tone: "from-rose-200 to-orange-100" },
  { name: "North Drift", year: "2024", tone: "from-sky-200 to-slate-100" },
  { name: "Clay House", year: "2024", tone: "from-amber-200 to-stone-100" },
  { name: "Salt & Copper", year: "2023", tone: "from-teal-200 to-lime-100" },
];

export default function PortfolioTemplate() {
  return (
    <div className="min-h-full bg-[#faf8f5] text-[#1c1917] antialiased">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <span className="font-serif-display text-base tracking-tight sm:text-lg">Mira Anders</span>
        <div className="flex gap-4 text-sm text-[#1c1917]/70 sm:gap-7">
          <a href="#" className="hover:text-black">الأعمال</a>
          <a href="#" className="hover:text-black">نبذة</a>
          <a href="#" className="hover:text-black">تواصل</a>
        </div>
      </nav>

      <header className="mx-auto max-w-5xl px-4 pb-16 pt-14 sm:px-6 sm:pt-16">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#1c1917]/50">
          إدارة إبداعية
        </p>
        <h1 className="mt-4 max-w-2xl font-serif-display text-4xl font-medium leading-tight tracking-tight sm:text-6xl">
          أصنع علاماتٍ تجارية تبقى في الذاكرة.
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-[#1c1917]/70">
          مديرة فنية مستقلة أعمل مع مؤسسين يهتمون بالحِرفة. هوية بصرية،
          وتحرير، وتغليف.
        </p>
        <a
          href="#"
          className="mt-8 inline-block rounded-full bg-[#1c1917] px-6 py-3 text-sm font-medium text-[#faf8f5]"
        >
          شاهد أعمالًا مختارة
        </a>
      </header>

      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((p) => (
            <a href="#" key={p.name} className="group block">
              <div
                className={`flex aspect-[4/3] items-end justify-between rounded-xl bg-gradient-to-br ${p.tone} p-5 transition-transform group-hover:-translate-y-1`}
              >
                <span className="font-serif-display text-xl text-[#1c1917]/80">
                  {p.name}
                </span>
                <span className="text-xs text-[#1c1917]/50">{p.year}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-[#1c1917] py-12 text-center text-[#faf8f5]">
        <p className="font-serif-display text-2xl">متاحة لتلقي الطلبات</p>
        <a
          href="#"
          className="mt-5 inline-block rounded-full border border-[#faf8f5]/30 px-7 py-3 text-sm font-medium"
        >
          مرحبًا@miraanders.co
        </a>
      </section>
    </div>
  );
}
