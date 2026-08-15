import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/ProductCard";
import QuizSection from "./components/QuizSection";
import { signatureCollection, moods, bestsellers } from "./data/fragrances";

export const metadata: Metadata = {
  title: "VELORA — عطور فاخرة",
  description: "عطرٌ يصبح بصمتك. اكتشفي عطوراً مصنوعة لتترك أثراً لا يُنسى.",
};

const reviews = [
  {
    text: "العلبة وحدها تحسّينها فاخرة. والعطر يدوم طوال اليوم دون أن يختفي.",
    name: "سارة م.",
  },
  {
    text: "أفضل عطر اشتريته على الإطلاق. النفحات تتطوّر بشكل جميل على البشرة عبر الساعات.",
    name: "أمين ر.",
  },
  {
    text: "توصيل سريع وتغليف أنيق جداً. العطر مغري بمعنى الكلمة — لا يُنسى.",
    name: "لينة ح.",
  },
];

const trust = [
  {
    title: "عطور أصلية",
    desc: "منتجات أصلية مئة بالمئة، من مصادر موثوقة.",
  },
  {
    title: "اختيار مدروس",
    desc: "كل عطر يُختار بعناية من أجل جودته وشخصيته.",
  },
  {
    title: "توصيل آمن",
    desc: "تغليف متين صُمّم ليصل عطرك بأمانٍ تام.",
  },
  {
    title: "دعم العملاء",
    desc: "نحن هنا لمساعدتك في العثور على عطرك المثالي.",
  },
];

const instagram = [
  "photo-1526047932273-341f2a7631f9",
  "photo-1534787238916-9ba6764efd4f",
  "photo-1616422285623-13ff0162193c",
  "photo-1585386959984-a4155224a1ad",
  "photo-1523293182086-7651a899d37f",
  "photo-1519669556878-63bdad8a1a49",
];

const heroImg =
  "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1800&auto=format&fit=crop";

export default function VeloraHome() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroImg}
            alt="زجاجة عطر فيلورا"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#11100F] via-[#11100F]/40 to-[#11100F]/30" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-16 pt-28 sm:px-6 sm:pb-20">
          <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#B99A67] sm:text-xs">
            VELORA · دار عطور
          </p>
          <h1 className="mt-5 max-w-2xl font-serif-display text-4xl font-light leading-[1.15] tracking-tight text-[#F3EEE6] sm:text-6xl">
            عطرٌ يصبح
            <br />
            بصمتك.
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-[#F3EEE6]/80 sm:text-base">
            اكتشفي عطوراً صُنعت لترك أثراً لا يُنسى — من النفحة الأولى إلى آخر
            أثرٍ يبقى.
          </p>
          <div className="mt-9 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <Link
              href="/templates/velora/collections/all"
              className="inline-flex w-full items-center justify-center bg-[#B99A67] px-9 py-4 text-xs font-medium uppercase tracking-[0.25em] text-[#11100F] transition-colors hover:bg-[#C9AA76] sm:w-auto"
            >
              اكتشفي المجموعة
            </Link>
            <a
              href="#signature"
              className="inline-flex w-full items-center justify-center border border-[#F3EEE6]/40 px-9 py-4 text-xs font-medium uppercase tracking-[0.25em] text-[#F3EEE6] transition-colors hover:border-[#F3EEE6] hover:bg-[#F3EEE6]/10 sm:w-auto"
            >
              تسوّقي الأكثر مبيعاً
            </a>
          </div>
        </div>
      </section>

      {/* Signature collection */}
      <section id="signature" className="scroll-mt-20 border-t border-[#332F2A]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#B99A67] sm:text-xs">
                VELORA
              </p>
              <h2 className="mt-3 font-serif-display text-3xl font-light tracking-tight text-[#F3EEE6] sm:text-5xl">
                المجموعة التوقيعية
              </h2>
            </div>
            <Link
              href="/templates/velora/collections/all"
              className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#A9A198] transition-colors hover:text-[#B99A67] sm:text-xs"
            >
              عرض الكل
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {signatureCollection.map((f) => (
              <ProductCard key={f.slug} fragrance={f} />
            ))}
          </div>
        </div>
      </section>

      {/* Shop by mood */}
      <section className="border-t border-[#332F2A] bg-[#0E0D0C]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#B99A67] sm:text-xs">
              تسوّقي حسب المزاج
            </p>
            <h2 className="mt-4 font-serif-display text-3xl font-light tracking-tight text-[#F3EEE6] sm:text-5xl">
              اختاري مزاجك
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#A9A198] sm:text-base">
              لا حاجة لفهم مصطلحات العطور. اختاري ما تريدين أن تشعري به، ونحن
              نختار لك.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(moods).map(([key, mood]) => (
              <a
                key={key}
                href={`/templates/velora/collections/all?mood=${key}`}
                className="group relative border border-[#332F2A] p-8 transition-colors duration-300 hover:border-[#B99A67]/60 hover:bg-[#1A1816]"
              >
                <span className="font-serif-display text-4xl text-[#B99A67]/30 transition-colors group-hover:text-[#B99A67]">
                  {key === "mysterious" ? "01" : key === "fresh" ? "02" : key === "seductive" ? "03" : "04"}
                </span>
                <h3 className="mt-6 font-serif-display text-2xl font-light text-[#F3EEE6]">
                  {mood.label}
                </h3>
                <p className="mt-2 text-xs tracking-wide text-[#A9A198]">{mood.desc}</p>
                <span className="mt-6 block text-[10px] font-medium uppercase tracking-[0.25em] text-[#B99A67] transition-opacity group-hover:opacity-100 sm:opacity-0">
                  تسوّقي ←
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="border-t border-[#332F2A]">
        <QuizSection />
      </section>

      {/* Trust */}
      <section className="border-t border-[#332F2A] bg-[#0E0D0C]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif-display text-3xl font-light tracking-tight text-[#F3EEE6] sm:text-4xl">
              لماذا فيلورا
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trust.map((item) => (
              <div key={item.title} className="border border-[#332F2A] p-7">
                <span className="block h-px w-8 bg-[#B99A67]" />
                <h3 className="mt-5 text-base font-medium text-[#F3EEE6]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#A9A198]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="border-t border-[#332F2A]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#B99A67] sm:text-xs">
                الأكثر طلباً
              </p>
              <h2 className="mt-3 font-serif-display text-3xl font-light tracking-tight text-[#F3EEE6] sm:text-5xl">
                الأكثر مبيعاً
              </h2>
            </div>
            <Link
              href="/templates/velora/collections/all"
              className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#A9A198] transition-colors hover:text-[#B99A67] sm:text-xs"
            >
              عرض الكل
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bestsellers.map((f) => (
              <ProductCard key={f.slug} fragrance={f} />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="border-t border-[#332F2A] bg-[#0E0D0C]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#B99A67] sm:text-xs">
              آراء العملاء
            </p>
            <h2 className="mt-4 font-serif-display text-3xl font-light tracking-tight text-[#F3EEE6] sm:text-4xl">
              أحبّه عشّاق العطور
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {reviews.map((review) => (
              <figure key={review.name} className="border border-[#332F2A] p-8">
                <div className="flex gap-1 text-[#B99A67]" aria-label="5 من 5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
                      <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="mt-5 text-sm leading-relaxed text-[#F3EEE6]/90">
                  “{review.text}”
                </blockquote>
                <figcaption className="mt-5 text-xs font-medium uppercase tracking-[0.2em] text-[#A9A198]">
                  — {review.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram */}
      <section className="border-t border-[#332F2A]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#B99A67] sm:text-xs">
              من عالم فيلورا
            </p>
            <h2 className="mt-4 font-serif-display text-3xl font-light tracking-tight text-[#F3EEE6] sm:text-4xl">
              @velora.parfums
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {instagram.map((id, i) => (
              <a
                key={id}
                href="/templates/velora/contact"
                className="group relative aspect-square overflow-hidden bg-[#0E0D0C]"
              >
                <Image
                  src={`https://images.unsplash.com/${id}?q=80&w=600&auto=format&fit=crop`}
                  alt={`إلهام فيلورا ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 16vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#11100F]/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href="/templates/velora/contact"
              className="inline-flex items-center justify-center border border-[#F3EEE6]/30 px-9 py-4 text-xs font-medium uppercase tracking-[0.25em] text-[#F3EEE6] transition-colors hover:border-[#B99A67] hover:text-[#B99A67]"
            >
              تابعي فيلورا
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
