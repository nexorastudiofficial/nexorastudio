import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import Navbar from "@/components/Navbar";
import Scene from "@/components/Scene";
import Showcase from "@/components/Showcase";


const services = [
  {
    title: "تصميم مواقع مخصص",
    description:
      "واجهات فريدة تُصمَّم وتُبنى يدوياً على احتياج نشاطك بالضبط — لا قوالب جاهزة ولا مقولبة.",
    icon: (
      <path d="M12 3v3m4.5-1.5-2 2M7.5 4.5l2 2M3 9h18M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
    ),
  },
  {
    title: "متاجر إلكترونية",
    description:
      "متاجر كاملة: سلة مشتريات، طلب، ودفع عند الاستلام — جاهزة للبيع فوراً لعملائك أينما كانوا.",
    icon: (
      <path d="M3 3h2l2.4 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L20 7H6m9 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-7 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    ),
  },
  {
    title: "صفحات هبوط تسويقية",
    description:
      "صفحات سريعة الأثر مصممة لتحويل الزائر إلى عميل، من العنوان إلى زر الطلب.",
    icon: (
      <path d="M12 2v6m0 0a4 4 0 0 0 4 4 6 6 0 0 1-4 4 6 6 0 0 1-4-4 4 4 0 0 0 4-4Zm0 14v6m7-5.5-4.5-2M5 16.5l4.5-2" />
    ),
  },
  {
    title: "هوية بصرية",
    description:
      "شعار وألوان وخطوط وأسلوب بصري متكامل يجعل علامتك تُعرف وتُذكر.",
    icon: (
      <path d="M4 4h6l5.2 5.2a2 2 0 0 1 0 2.8l-3 3a2 2 0 0 1-2.8 0L4 10V4Zm13 13 2.5 2.5M9 6l1 1" />
    ),
  },
  {
    title: "ظهور في محركات البحث",
    description:
      "أساسيات SEO مدمجة في البناء ذاته، ليجدك عملاؤك عبر غوغل من أول يوم.",
    icon: (
      <path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm9 2-4.35-4.35" />
    ),
  },
  {
    title: "دعم وتحديثات",
    description:
      "أنا معك بعد الإطلاق: تحديثات، تعديلات، وصيانة مستمرة ليبقى موقعك في أفضل حال.",
    icon: (
      <path d="M12 21s-7-4.4-7-10a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5.6-7 10-7 10Z" />
    ),
  },
];

const steps = [
  {
    num: "01",
    title: "نتحدث",
    description:
      "أفهم نشاطك وأهدافك وجمهورك، ونحدد معاً شكل الموقع وما يحتاجه زبائنك حقاً.",
  },
  {
    num: "02",
    title: "أصمم وأبني",
    description:
      "تصميم وتطوير يدوي مخصص من الصفر، مع معاينة تدريجية وتعديلات حتى ترضى تماماً.",
  },
  {
    num: "03",
    title: "نطلق وننمو",
    description:
      "إطلاق موقعك مع الاستضافة والنطاق، ودعم وتحديثات مستمرة لنمو أعمالك.",
  },
];

const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61591467674620";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-screen flex-col">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="bg-grid absolute inset-0" />
          <div className="orb left-[-10rem] top-[-8rem] h-96 w-96 bg-violet-600/30" />
          <div className="orb right-[-10rem] top-1/4 h-96 w-96 bg-cyan-500/20" />
          <div className="orb bottom-[-8rem] left-1/3 h-96 w-96 bg-fuchsia-500/15" />
          <Scene />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#05060b]" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 pb-16 pt-24 text-center sm:px-6 sm:pb-20 lg:px-8">
          <h1 className="mt-8 max-w-4xl text-4xl font-semibold leading-[1.2] tracking-tight text-white sm:text-6xl lg:text-7xl">
            مواقعٌ تُصمَّم لتُبنى{" "}
            <span className="text-gradient">لتناسب نشاطك</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
            NexoraStudio استوديو تصميم وتطوير مواقع. أصمّم وأبني موقعك يدوياً من
            الصفر — ليليق بعلامتك، ويحوّل زوّارك إلى عملاء.
          </p>

          <div className="mt-10 flex w-full max-w-sm flex-col items-center gap-4 sm:w-auto sm:max-w-none sm:flex-row">
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-7 text-sm font-semibold text-white shadow-xl shadow-violet-600/30 transition-all hover:shadow-cyan-500/40 hover:brightness-110 sm:w-auto"
            >
              اطلب موقعك الآن
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 transition-transform group-hover:-translate-x-0.5 rtl:-scale-x-100"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </a>
            <Link
              href="/contact"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-white/30 hover:bg-white/10 sm:w-auto"
            >
              أخبرني عن مشروعك
            </Link>
          </div>

          <div className="mt-14 grid w-full max-w-3xl grid-cols-3 gap-4 border-t border-white/10 pt-8 sm:gap-6">
            {[
              ["100%", "تصميم وتطوير مخصص"],
              ["+5", "قوالب حيّة جاهزة"],
              ["24 ساعة", "وقت الرد على طلبك"],
            ].map(([value, label]) => (
              <div key={label}>
                <div className="text-xl font-semibold text-white sm:text-3xl">
                  {value}
                </div>
                <div className="mt-1 text-sm text-zinc-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative scroll-mt-20 overflow-hidden py-16 sm:py-28">
        <div className="orb right-[-12rem] top-20 h-80 w-80 bg-violet-600/20" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold text-cyan-400">
              خدماتنا
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              كل ما يحتاجه موقعك، من الفكرة إلى النشر
            </h2>
            <p className="mt-4 text-lg text-zinc-400">
              لا قوالب جاهزة ولا وسطاء. كل موقع يُصمَّم ويُبنى يدوياً ليلائم
              نشاطك ويحقّق هدفه.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((f) => (
              <div
                key={f.title}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-white/[0.06] hover:shadow-[0_0_45px_rgba(139,92,246,0.18)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600/25 to-cyan-500/25 text-violet-300 transition-colors group-hover:text-cyan-300">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {f.icon}
                  </svg>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work showcase */}
      <section id="work" className="relative scroll-mt-20 overflow-hidden border-t border-white/5 py-16 sm:py-28">
        <div className="orb right-[-10rem] bottom-[-4rem] h-96 w-96 bg-violet-600/20" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold text-cyan-400">أعمالنا</span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              نماذج حيّة، مبنية يدوياً
            </h2>
            <p className="mt-4 text-lg text-zinc-400">
              كل نموذجٍ هنا صفحة حقيقية تعمل فعلاً. تصفّحها، ثم تواصل معي لتحصل
              على موقعٍ بمثل روحها أو تصميمٍ خاص بعلامتك.
            </p>
          </div>

          <Showcase />

          <div className="mt-10 text-center">
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-7 py-3 text-sm font-semibold text-white shadow-xl shadow-violet-600/30 transition-all hover:shadow-cyan-500/40 hover:brightness-110"
            >
              اطلب تصميمًا مخصصًا
            </a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="relative scroll-mt-20 overflow-hidden border-t border-white/5 py-16 sm:py-28">
        <div className="orb left-[-12rem] bottom-0 h-80 w-80 bg-cyan-500/15" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold text-violet-400">
              كيف أعمل
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              من الفكرة إلى الإطلاق في ثلاث خطوات
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.num}
                className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-8"
              >
                <span className="text-gradient text-5xl font-semibold">
                  {step.num}
                </span>
                <h3 className="mt-6 text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="relative scroll-mt-20 py-16 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-violet-400/25 bg-gradient-to-br from-violet-950/60 via-[#0a0b1f]/90 to-cyan-950/60 p-8 text-center shadow-[0_0_80px_rgba(139,92,246,0.15)] sm:p-16">
            <div className="orb left-1/4 top-[-6rem] h-72 w-72 bg-violet-600/40" />
            <div className="orb right-1/4 bottom-[-6rem] h-72 w-72 bg-cyan-500/30" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                جاهز لموقعٍ يليق <span className="text-gradient">بعلامتك</span>؟
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-zinc-300">
                أخبرني عن نشاطك وأهدافك، وسأبني لك موقعاً مصمماً بيدٍ خبيرة يجلب
                لك عملاء — من الفكرة إلى الإطلاق.
              </p>
              <div className="mt-10 flex w-full max-w-sm flex-col items-center justify-center gap-4 sm:w-auto sm:max-w-none sm:flex-row">
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#05060b] shadow-lg transition-transform hover:scale-[1.03] sm:w-auto"
                >
                  تواصل عبر فيسبوك
                </a>
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10 sm:w-auto"
                >
                  أرسل تفاصيل مشروعك
                </Link>
              </div>
              <p className="mt-6 text-xs text-zinc-500">
                رد خلال 24 ساعة · تصميم مخصص · دعم مستمر بعد الإطلاق
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <Image
              src={logo}
              alt="NexoraStudio"
              width={24}
              height={24}
              className="h-6 w-6 object-contain"
            />
            <span className="font-semibold text-white">NexoraStudio</span>
          </div>
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} NexoraStudio, Inc. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-6 text-sm text-zinc-500">
            <Link href="/privacy" className="transition-colors hover:text-white">
              الخصوصية
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              الشروط
            </Link>
            <a
              href="https://www.facebook.com/profile.php?id=61591467674620"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              فيسبوك
            </a>
            <a
              href="https://wa.me/213564086437"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              واتساب
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
