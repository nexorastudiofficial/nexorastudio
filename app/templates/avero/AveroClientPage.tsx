"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AveroHeader from "./AveroHeader";
import AveroFooter from "./AveroFooter";
import ProductCard from "./components/ProductCard";
import Shoe3DViewer from "./components/Shoe3DViewer";
import Exploded3DView from "./components/Exploded3DView";
import FindYourFitModal from "./components/FindYourFitModal";
import { products, activityCategories } from "./data/products";
import { money } from "./data/money";

const athletesReviews = [
  {
    name: "سامي ع.",
    role: "عدّاء ماراثون — الجزائر العاصمة",
    rating: 5,
    quote:
      "استخدمت حذاء X1 Pro في تدريبات نصف الماراثون، واللوح الكربوني مع الفوم النتروجيني يعطيك دفعة واضحة توفر طاقتك في الكيلومترات الأخيرة. يستحق كل دينار!",
    productName: "أفيرو X1 برو كاربون",
    productSlug: "avero-x1-pro",
  },
  {
    name: "رمزي ك.",
    role: "مدرب لياقة بدنية — وهران",
    rating: 5,
    quote:
      "حذاء Apex للتمارين ثابت جداً في تمارين السكوات والقفز. النعل المسطح يمنحك توازناً مثالياً وخفة في الحركة دون أي انزلاق.",
    productName: "أبكس كروس ترينر للنوادي",
    productSlug: "avero-apex-trainer",
  },
  {
    name: "إيناس ب.",
    role: "عاشقة ستريت وير — قسنطينة",
    rating: 5,
    quote:
      "حذاء Orbit Runner يجمع بين تصميم الستريت وير الفخم والراحة اليومية المذهلة. التصميم يلفت الأنظار وخفيف جداً على القدم.",
    productName: "أوربت رانر ستريت وير",
    productSlug: "avero-orbit-runner",
  },
];

const trustItems = [
  {
    icon: "👟",
    title: "تجربة القياس عند الاستلام",
    desc: "يمكنك تجربة مقاس الحذاء بحضور المندوب قبل دفع المبلغ لضمان ملاءمته التامة.",
  },
  {
    icon: "🔄",
    title: "استبدال مقاس مجاني وسهل",
    desc: "إذا لم يكن المقاس مناسباً، نوفر خدمة استبدال سريعة للمقاس خلال 14 يوماً.",
  },
  {
    icon: "🔬",
    title: "خامات هندسية مختبرة",
    desc: "أقمشة Monomesh وفوم نتروجيني وألواح كربونية مصممة لأعلى أداء رياضي.",
  },
  {
    icon: "🚚",
    title: "توصيل سريع لـ 58 ولاية",
    desc: "شحن مؤمن ومباشر لباب منزلك خلال 48 إلى 72 ساعة.",
  },
];

export default function AveroClientPage() {
  const [showFitModal, setShowFitModal] = useState(false);
  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 4);
  const dropProduct = products.find((p) => p.isDrop) || products[0];

  return (
    <div className="min-h-full bg-[#F4F2ED] text-[#171817] antialiased selection:bg-[#D6FF3F] selection:text-[#101112]">
      <AveroHeader />

      {/* 1. 3D HERO SECTION */}
      <section className="relative overflow-hidden border-b border-[#D8D5CC] bg-[#F4F2ED]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left: Headline & CTAs */}
            <div className="lg:col-span-5 space-y-6 text-center lg:text-right">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/80 px-4 py-1.5 backdrop-blur-md shadow-xs">
                <span className="h-2 w-2 rounded-full bg-[#D6FF3F] animate-pulse" />
                <span className="text-[10px] font-mono font-extrabold uppercase tracking-[0.25em] text-[#171817]">
                  NEW GENERATION FOOTWEAR · 2026
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight leading-[0.95] text-[#171817]">
                MOVE <br />
                <span className="text-stroke">DIFFERENT.</span>
              </h1>

              <p className="text-sm sm:text-base text-[#777873] leading-relaxed max-w-md mx-auto lg:mx-0 font-medium">
                هندسة الأداء الرياضي تلتقي مع تكنولوجيا الأحذية ثلاثية الأبعاد وأناقة الستريت وير المعاصر.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  href="/templates/avero/collections/men"
                  className="inline-flex items-center gap-2 rounded-full bg-[#101112] px-8 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[#D6FF3F] transition-all hover:brightness-125 shadow-lg shadow-black/10"
                >
                  تسوق أحذية الرجال (MEN)
                  <span aria-hidden>←</span>
                </Link>
                <Link
                  href="/templates/avero/collections/women"
                  className="inline-flex items-center gap-2 rounded-full border border-[#D8D5CC] bg-white px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#171817] hover:border-[#101112] transition-colors shadow-xs"
                >
                  تسوق أحذية النساء (WOMEN)
                </Link>
              </div>

              {/* Fit Finder Trigger Badge */}
              <div className="pt-4">
                <button
                  onClick={() => setShowFitModal(true)}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#171817] hover:text-[#777873] underline underline-offset-4 transition-colors"
                >
                  <span>🎯 لست متأكداً من مقاسك؟ جرب أداة (Find Your Fit)</span>
                </button>
              </div>
            </div>

            {/* Right: 3D Shoe Viewer */}
            <div className="lg:col-span-7 rounded-2xl bg-[#E9E7E0] p-4 sm:p-6 border border-[#D8D5CC] shadow-inner">
              <Shoe3DViewer />
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE NEW DROP SPOTLIGHT */}
      <section className="bg-[#101112] text-[#F4F2ED] py-16 sm:py-24 border-b border-[#222426]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between border-b border-[#222426] pb-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#D6FF3F] animate-ping" />
              <span className="text-xs font-mono font-extrabold uppercase tracking-[0.25em] text-[#D6FF3F]">
                THE NEW DROP · إصدار محدود
              </span>
            </div>
            <span className="text-xs font-mono text-zinc-500">LIMITED EDITION</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Image */}
            <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#171817] border border-[#222426]">
              <Image
                src={dropProduct.images[0]}
                alt={dropProduct.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
              <div className="absolute top-4 right-4 rounded-full bg-[#D6FF3F] px-3.5 py-1 text-xs font-mono font-black text-[#101112]">
                CARBON-GLIDE 2026
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D6FF3F]">
                FLAGSHIP PERFORMANCE
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
                {dropProduct.name}
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {dropProduct.description}
              </p>

              <div className="grid grid-cols-3 gap-3 border-y border-[#222426] py-4 text-xs font-mono">
                <div>
                  <span className="text-zinc-500 block">الوزن:</span>
                  <span className="text-white font-bold">{dropProduct.weight}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">الفوم:</span>
                  <span className="text-[#D6FF3F] font-bold">NitroPulse</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">السعر:</span>
                  <span className="text-white font-bold">{money(dropProduct.price)}</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={`/templates/avero/product/${dropProduct.slug}`}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#D6FF3F] px-8 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[#101112] hover:brightness-125 transition-all shadow-lg"
                >
                  اكتشف حذاء X1 برو
                  <span aria-hidden>←</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 3D EXPLODED LAYER STORY ("BUILT FROM THE GROUND UP") */}
      <section id="tech-story" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#171817] bg-[#D6FF3F] px-3 py-1 rounded-full">
            3D ANATOMY
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#171817]">
            صُنع من الأساس ليتحدى الجاذبية
          </h2>
          <p className="mt-2 text-xs text-[#777873]">
            استكشف الهندسة الداخلية التي تجعل أحذية AVERO الأسرع والأكثر راحة.
          </p>
        </div>

        <Exploded3DView />
      </section>

      {/* 4. SHOP BY PURPOSE / ACTIVITY ("WHAT ARE YOU MOVING FOR?") */}
      <section className="bg-[#E9E7E0] py-20 sm:py-28 border-y border-[#D8D5CC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#777873]">
              تسوّق حسب الهدف
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#171817]">
              ما هو هدف حركتك اليوم؟
            </h2>
            <p className="mt-2 text-xs text-[#777873]">
              اختر نشاطك لنقترح لك الحذاء المصمم خصيصاً لتحقيق أعلى أداء
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {activityCategories.map((act) => (
              <Link
                key={act.key}
                href={`/templates/avero/collections/${act.key === "run" ? "running" : act.key === "train" ? "training" : act.key === "street" ? "lifestyle" : "all"}`}
                className="group flex flex-col justify-between rounded-2xl bg-white p-6 border border-[#D8D5CC] transition-all hover:border-[#101112] hover:shadow-md"
              >
                <div>
                  <span className="text-3xl">{act.icon}</span>
                  <span className="mt-4 block text-[10px] font-mono font-bold uppercase tracking-wider text-[#777873]">
                    {act.tag}
                  </span>
                  <h3 className="mt-1 text-xl font-extrabold uppercase text-[#171817] group-hover:text-[#101112]">
                    {act.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#777873]">
                    {act.desc}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#101112]">
                  <span>تصفح المجموعة</span>
                  <span aria-hidden>←</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BESTSELLERS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D8D5CC] pb-6">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#777873]">
              الأكثر طلباً وتفضيلاً
            </span>
            <h2 className="mt-1 text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#171817]">
              تشكيلة النخبة
            </h2>
          </div>
          <Link
            href="/templates/avero/collections/all"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#777873] hover:text-[#171817] transition-colors"
          >
            <span>عرض جميع الأحذية</span>
            <span aria-hidden>←</span>
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {bestsellers.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* 6. FIND YOUR FIT BANNER */}
      <section className="bg-[#101112] text-[#F4F2ED] py-16 border-y border-[#222426]">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <span className="text-3xl">🎯</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            المقاس الصحيح من المرة الأولى
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            لا داعي للحيرة أو التردد بشأن مقاسك. خوارزمية القياس الخاصة بـ AVERO تقارن مقاسك المعتاد في العلامات العالمية مع طبيعة قدمك لتمنحك المقاس الأنسب بدقة تامة.
          </p>
          <button
            onClick={() => setShowFitModal(true)}
            className="mt-8 rounded-full bg-[#D6FF3F] px-9 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[#101112] hover:brightness-125 transition-all shadow-lg"
          >
            جرب حاسبة المقاس (FIND YOUR FIT)
          </button>
        </div>
      </section>

      {/* 7. TRUST & QUALITY PILLARS */}
      <section id="trust" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#777873]">
            معايير الثقة
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#171817]">
            صُممت للحياة الحقيقية (BUILT FOR REAL LIFE)
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white p-6 border border-[#D8D5CC] space-y-3"
            >
              <span className="text-3xl">{item.icon}</span>
              <h3 className="text-base font-bold text-[#171817]">{item.title}</h3>
              <p className="text-xs leading-relaxed text-[#777873]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. ATHLETES & COMMUNITY REVIEWS */}
      <section className="bg-[#E9E7E0] py-20 sm:py-28 border-t border-[#D8D5CC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#777873]">
              ON THE MOVE
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#171817]">
              تجارب العدائين والرياضيين
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {athletesReviews.map((rev) => (
              <div
                key={rev.name}
                className="flex flex-col justify-between rounded-2xl bg-white p-6 border border-[#D8D5CC]"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 text-sm">
                    <span>★★★★★</span>
                  </div>
                  <p className="mt-4 text-xs italic leading-relaxed text-[#171817]">
                    «{rev.quote}»
                  </p>
                </div>

                <div className="mt-6 border-t border-[#D8D5CC] pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#171817]">{rev.name}</p>
                      <p className="text-[10px] text-[#777873]">{rev.role}</p>
                    </div>
                    <Link
                      href={`/templates/avero/product/${rev.productSlug}`}
                      className="text-[10px] font-mono font-bold text-[#101112] hover:underline truncate max-w-[130px]"
                    >
                      {rev.productName}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <AveroFooter />

      {/* Find Your Fit Modal Instance */}
      <FindYourFitModal
        isOpen={showFitModal}
        onClose={() => setShowFitModal(false)}
      />
    </div>
  );
}
