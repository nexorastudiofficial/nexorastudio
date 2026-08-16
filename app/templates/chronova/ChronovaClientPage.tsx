"use client";

import Image from "next/image";
import Link from "next/link";
import ChronovaHeader from "./ChronovaHeader";
import ChronovaFooter from "./ChronovaFooter";
import ProductCard from "./components/ProductCard";
import WatchComparison from "./components/WatchComparison";
import { products, styleLabels, type WatchStyle } from "./data/products";

const twoWorlds = [
  {
    type: "classic",
    title: "الساعات الكلاسيكية",
    titleEn: "CLASSIC TIMEPIECES",
    subtitle: "صُنعت لتبقى وتتوارثها الأجيال",
    desc: "حركات ميكانيكية دقيقة، زجاج ياقوتي نقي، وفولاذ مصقول يدويًا يعكس فخامة الصناعة التقليدية.",
    img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop",
    href: "/templates/chronova/collections/classic",
    tag: "ميكانيكية · أوتوماتيك",
    accent: "text-[#B7A27A]",
    btnClass: "border-[#B7A27A] text-[#B7A27A] hover:bg-[#B7A27A] hover:text-[#0C0D0F]",
  },
  {
    type: "smart",
    title: "الساعات الذكية",
    titleEn: "SMART WATCHES",
    subtitle: "مبنية لكل ما ينتظرك في المستقبل",
    desc: "شاشات AMOLED فائقة السطوع، تتبع صحي متقدم بمستشعرات طبية، وبطاريات تدوم لأسابيع.",
    img: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1000&auto=format&fit=crop",
    href: "/templates/chronova/collections/smart",
    tag: "AMOLED · تيتانيوم",
    accent: "text-[#8796A3]",
    btnClass: "border-[#8796A3] text-[#8796A3] hover:bg-[#8796A3] hover:text-[#0C0D0F]",
  },
];

const stylesList: { key: WatchStyle; icon: string }[] = [
  { key: "minimal", icon: "⚪" },
  { key: "sport", icon: "⚡" },
  { key: "classic", icon: "⚙" },
  { key: "modern", icon: "✦" },
];

const whyChronova = [
  {
    icon: "💎",
    title: "أصالة وجودة مثبتة",
    desc: "كل ساعة تُصنع من خامات معتمدة (فولاذ 316L، زجاج ياقوتي، سيليكون وتيتانيوم أصيل).",
  },
  {
    icon: "🛡️",
    title: "ضمان دولي سنتين",
    desc: "تغطية شاملة لأداء الحركة الميكانيكية، المكونات التقنية، ومقاومة الماء.",
  },
  {
    icon: "📦",
    title: "توصيل آمن ومفحوص",
    desc: "تغليف فاخر مضاد للصدمات مع إمكانية فحص الساعة ومعاينتها قبل الدفع عند الاستلام.",
  },
  {
    icon: "🤝",
    title: "دعم مستمر بعد الشراء",
    desc: "فريق متخصص لمساعدتك في ضبط الساعة، ربط التطبيق، وتوفير قطع الغيار والأحزمة.",
  },
];

const customerReviews = [
  {
    name: "أحمد م.",
    location: "الجزائر العاصمة",
    rating: 5,
    quote:
      "اشتريت ساعة ARC 01 الأوتوماتيكية، والتصميم في الواقع أفخم بكثير من الصور. وزن الساعة وتشطيب الفولاذ والزجاج الياقوتي ينافس ساعات عالمية بأضعاف السعر!",
    productName: "كرونوفا آرك 01 أوتوماتيك",
    productSlug: "chronova-arc-01",
  },
  {
    name: "يوسف ب.",
    location: "وهران",
    rating: 5,
    quote:
      "ساعة S1 Pro التيتانيوم خفيفة جداً على اليد، والبطارية جلست معي 12 يوماً بدون شحن مع تشغيل الإشعارات وتتبع التمارين. استجابة الشاشة سريعة وممتازة.",
    productName: "كرونوفا S1 برو تيتانيوم",
    productSlug: "chronova-s1-pro",
  },
  {
    name: "كريم س.",
    location: "سطيف",
    rating: 5,
    quote:
      "الكرونوغراف الكلاسيكي مع الحزام الجلدي الإيطالي تحفة فنية. التوصيل كان سريعاً والدفع عند الاستلام بعد المعاينة يعطيك ثقة تامة.",
    productName: "هيريتدج كرونوغراف كلاسيك",
    productSlug: "chronova-heritage-chrono",
  },
];

export default function ChronovaClientPage() {
  const featured = products.filter((p) => p.isBestseller).slice(0, 4);

  return (
    <div className="min-h-full bg-[#0C0D0F] text-[#F1F1EE] antialiased selection:bg-[#B7A27A]/30">
      <ChronovaHeader />

      {/* 1. Hero Section (Balanced 2-Column Luxury Layout) */}
      <section className="relative overflow-hidden border-b border-[#292C30] bg-[#0A0B0D]">
        {/* Subtle radial titanium and gold glow */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#B7A27A]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-10 w-72 h-72 bg-[#8796A3]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16 lg:py-20 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Typography & CTAs (6 cols) */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-right">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#B7A27A]/40 bg-[#15171A]/80 px-4 py-1.5 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#B7A27A] animate-pulse" />
                <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#B7A27A] sm:text-xs">
                  Modern Precision · 2026 Timepieces
                </span>
              </div>

              <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.12] text-[#F1F1EE]">
                الوقت، <br className="hidden sm:inline" />
                <span className="text-[#B7A27A] italic">برؤيةٍ معاصرة.</span>
              </h1>

              <p className="text-sm leading-relaxed text-[#8E9298] max-w-lg mx-auto lg:mx-0">
                دقة الحاضر وتصميم يعيش لما بعد الغد — حيث تلتقي حرفية الساعات الميكانيكية الأصيلة مع أحدث ابتكارات التقنية الذكية.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  href="/templates/chronova/collections/smart"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#B7A27A] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#0C0D0F] transition-all hover:brightness-110 shadow-lg shadow-[#B7A27A]/20"
                >
                  استكشف الساعات الذكية
                  <span aria-hidden>←</span>
                </Link>
                <Link
                  href="/templates/chronova/collections/classic"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#F1F1EE] backdrop-blur-xs transition-colors hover:bg-white/10 hover:border-white/40"
                >
                  الساعات الكلاسيكية
                </Link>
              </div>

              {/* Trust micro-badges */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-[11px] text-[#8E9298]">
                <span className="flex items-center gap-1.5">
                  <span className="text-[#B7A27A]">✦</span> ضمان رسمي سنتين
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[#B7A27A]">✦</span> فحص ومعاينة قبل الدفع
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[#B7A27A]">✦</span> توصيل 58 ولاية
                </span>
              </div>
            </div>

            {/* Right Column: Hero Visual Card (6 cols) */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden rounded-2xl border border-[#292C30] bg-[#15171A] shadow-2xl group">
                <Image
                  src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop"
                  alt="CHRONOVA Luxury Watch"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D0F] via-transparent to-transparent opacity-80" />

                {/* Floating Specs Pill */}
                <div className="absolute bottom-4 inset-x-4 flex items-center justify-between rounded-xl bg-black/60 border border-white/10 p-3.5 backdrop-blur-md text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-[#B7A27A] block">FLAGSHIP EDITION</span>
                    <span className="font-serif-display text-sm text-[#F1F1EE]">CHRONOVA ARC 01 Automatic</span>
                  </div>
                  <div className="text-left">
                    <span className="font-serif-display text-sm font-semibold text-[#B7A27A] block">32,500 دج</span>
                    <span className="text-[10px] text-[#8E9298]">فولاذ 316L · ياقوت</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Two Worlds Section ("Choose Your Time") */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#B7A27A]">
            عالمين من الدقة
          </span>
          <h2 className="mt-2 font-serif-display text-3xl font-light tracking-tight sm:text-4xl text-[#F1F1EE]">
            اختر أسلوبك في قياس الوقت
          </h2>
          <p className="mt-2 text-xs text-[#8E9298]">
            صُممت كل مجموعة بمعايير هندسية متطورة لتمنحك الأداء والأناقة التي تبحث عنها
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
          {twoWorlds.map((world) => (
            <div
              key={world.titleEn}
              className="group relative flex flex-col justify-end overflow-hidden rounded-2xl border border-[#292C30] bg-[#15171A] p-8 aspect-[4/5] shadow-xl"
            >
              <Image
                src={world.img}
                alt={world.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D0F] via-[#0C0D0F]/60 to-transparent" />

              <div className="relative z-10">
                <span className={`inline-block rounded-full bg-black/60 border border-white/10 px-3 py-1 text-[10px] font-mono uppercase tracking-widest ${world.accent} mb-3`}>
                  {world.tag}
                </span>
                <h3 className="font-serif-display text-3xl font-light text-[#F1F1EE]">
                  {world.title}
                </h3>
                <p className="mt-1 text-sm text-[#F1F1EE]/80 font-medium">
                  {world.subtitle}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-[#8E9298] max-w-md">
                  {world.desc}
                </p>

                <div className="mt-6">
                  <Link
                    href={world.href}
                    className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] transition-all ${world.btnClass}`}
                  >
                    <span>استكشف التشكيلة</span>
                    <span aria-hidden>←</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Watches ("THE COLLECTION") */}
      <section className="bg-[#15171A] py-20 sm:py-28 border-y border-[#292C30]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#292C30] pb-6">
            <div>
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#B7A27A]">
                المجموعة المختارة
              </span>
              <h2 className="mt-1 font-serif-display text-3xl font-light tracking-tight sm:text-4xl text-[#F1F1EE]">
                ساعات مميزة
              </h2>
            </div>
            <Link
              href="/templates/chronova/collections/all"
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[#8E9298] hover:text-[#B7A27A] transition-colors"
            >
              <span>عرض جميع الموديلات</span>
              <span aria-hidden>←</span>
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Smartwatch Technology Highlight ("More than a watch.") */}
      <section className="border-b border-[#292C30] bg-[#0C0D0F]">
        <div className="grid lg:grid-cols-2">
          <div className="flex items-center px-8 py-16 sm:px-12 lg:px-16 lg:py-24 bg-[#15171A]">
            <div>
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#8796A3]">
                التقنية القابلة للارتداء
              </span>
              <h2 className="mt-3 font-serif-display text-3xl font-light leading-tight tracking-tight sm:text-5xl text-[#F1F1EE]">
                أكثر من مجرد ساعة.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-[#8E9298]">
                مستشعرات دقيقة لمراقبة الصحة والنشاط اليومي، اتصال سريع للمكالمات والإشعارات، وشاشات AMOLED ساطعة في ضوء الشمس — محاطة بهياكل تيتانيوم متينة.
              </p>

              {/* 4 Tech Pillars */}
              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[#292C30] pt-6 text-xs">
                <div>
                  <p className="font-semibold text-[#F1F1EE] flex items-center gap-1.5">
                    <span className="text-rose-400">❤️</span> مراقبة صحية متقدمة
                  </p>
                  <p className="mt-1 text-[11px] text-[#8E9298]">تخطيط ECG، أكسجين الدم، وتتبع النوم</p>
                </div>
                <div>
                  <p className="font-semibold text-[#F1F1EE] flex items-center gap-1.5">
                    <span className="text-emerald-400">🏃</span> لياقة ورياضة
                  </p>
                  <p className="mt-1 text-[11px] text-[#8E9298]">أكثر من 120 نمطاً مع GPS دقيق</p>
                </div>
                <div>
                  <p className="font-semibold text-[#F1F1EE] flex items-center gap-1.5">
                    <span className="text-cyan-400">📱</span> اتصال فوري
                  </p>
                  <p className="mt-1 text-[11px] text-[#8E9298]">مكالمات بلوتوث وتنبيهات التطبيقات</p>
                </div>
                <div>
                  <p className="font-semibold text-[#F1F1EE] flex items-center gap-1.5">
                    <span className="text-amber-400">🔋</span> بطارية استثنائية
                  </p>
                  <p className="mt-1 text-[11px] text-[#8E9298]">حتى 14–30 يوماً من الاستخدام</p>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/templates/chronova/collections/smart"
                  className="inline-flex items-center gap-2 rounded-full border border-[#8796A3] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#8796A3] transition-all hover:bg-[#8796A3] hover:text-[#0C0D0F]"
                >
                  تصفّح الساعات الذكية
                  <span aria-hidden>←</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[580px]">
            <Image
              src="https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1200&auto=format&fit=crop"
              alt="CHRONOVA Smartwatch Technology"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 5. Classic Watch Craftsmanship Highlight ("Made to stand the test of time.") */}
      <section className="border-b border-[#292C30] bg-[#0C0D0F]">
        <div className="grid lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[580px] order-2 lg:order-1">
            <Image
              src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1200&auto=format&fit=crop"
              alt="Classic Watch Craftsmanship"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="flex items-center px-8 py-16 sm:px-12 lg:px-16 lg:py-24 bg-[#0C0D0F] order-1 lg:order-2">
            <div>
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#B7A27A]">
                دقة الصناعة والحرفية
              </span>
              <h2 className="mt-3 font-serif-display text-3xl font-light leading-tight tracking-tight sm:text-5xl text-[#F1F1EE]">
                صُنعت لتتحدى اختبار الزمن.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-[#8E9298]">
                حركات أوتوماتيكية ميكانيكية لا تعتمد على الشحن. تروس مصقولة بعناية، زجاج ياقوتي لا يخدش، وهياكل من الفولاذ المقاوم للصدأ 316L تمنحك إحساساً حقيقياً بالفخامة.
              </p>

              {/* 3 Classic Pillars */}
              <div className="mt-8 space-y-3.5 border-t border-[#292C30] pt-6 text-xs text-[#8E9298]">
                <div className="flex items-start gap-3">
                  <span className="text-[#B7A27A] text-sm">⚙</span>
                  <div>
                    <p className="font-semibold text-[#F1F1EE]">حركات أوتوماتيكية دقيقة</p>
                    <p className="text-[11px] text-[#8E9298]">تعمل بحركة معصمك مع احتياطي طاقة يدوم لأيام</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#B7A27A] text-sm">💎</span>
                  <div>
                    <p className="font-semibold text-[#F1F1EE]">كريستال ياقوتي مضاد للانعكاس</p>
                    <p className="text-[11px] text-[#8E9298]">أعلى درجات الصلابة لمقاومة الخدش والصدمات</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#B7A27A] text-sm">🏛</span>
                  <div>
                    <p className="font-semibold text-[#F1F1EE]">أبعاد كلاسيكية وتصميم خالد</p>
                    <p className="text-[11px] text-[#8E9298]">قصات هندسية متوازنة تزيد من هيبة إطلالتك</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/templates/chronova/collections/classic"
                  className="inline-flex items-center gap-2 rounded-full border border-[#B7A27A] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#B7A27A] transition-all hover:bg-[#B7A27A] hover:text-[#0C0D0F]"
                >
                  تصفّح الساعات الكلاسيكية
                  <span aria-hidden>←</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Shop by Style ("Find your style") */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#B7A27A]">
            تسوّق حسب الطابع
          </span>
          <h2 className="mt-2 font-serif-display text-3xl font-light tracking-tight sm:text-4xl text-[#F1F1EE]">
            ابحث عن ساعتك المثالية
          </h2>
          <p className="mt-2 text-xs text-[#8E9298]">
            اختر النمط الذي يعبر عن شخصيتك وأسلوب حياتك
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stylesList.map(({ key, icon }) => {
            const info = styleLabels[key];
            return (
              <Link
                key={key}
                href={`/templates/chronova/collections/all`}
                className="group flex flex-col justify-between rounded-xl border border-[#292C30] bg-[#15171A] p-6 transition-all hover:border-[#B7A27A]/50 hover:shadow-lg"
              >
                <div>
                  <span className="text-2xl text-[#B7A27A]">{icon}</span>
                  <h3 className="mt-4 font-serif-display text-xl font-medium text-[#F1F1EE] group-hover:text-[#B7A27A] transition-colors">
                    {info.title.split(" — ")[0]}
                  </h3>
                  <p className="mt-1 text-xs text-[#B7A27A] font-medium">
                    {info.title.split(" — ")[1]}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-[#8E9298]">
                    {info.desc}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-[#B7A27A]">
                  <span>عرض الموديلات</span>
                  <span aria-hidden>←</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 7. Comparison Matrix ("Which one is right for you?") */}
      <section className="bg-[#15171A] py-20 sm:py-28 border-y border-[#292C30]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#B7A27A]">
              دليل الاختيار
            </span>
            <h2 className="mt-2 font-serif-display text-3xl font-light tracking-tight sm:text-4xl text-[#F1F1EE]">
              أيّهما أنسب لاحتياجك؟
            </h2>
            <p className="mt-2 text-xs text-[#8E9298]">
              مقارنة مباشرة بين ميزات الساعات الكلاسيكية والذكية لمساعدتك في اتخاذ القرار
            </p>
          </div>

          <WatchComparison />
        </div>
      </section>

      {/* 8. Why CHRONOVA (Trust & Pillars) */}
      <section id="why-chronova" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#B7A27A]">
            معايير الثقة
          </span>
          <h2 className="mt-3 font-serif-display text-3xl font-light leading-relaxed sm:text-4xl text-[#F1F1EE]">
            لماذا تقتني ساعتك من CHRONOVA؟
          </h2>
          <p className="mt-2 text-xs text-[#8E9298]">
            نضمن لك تجربة اقتناء تليق بقيمة ومكانة ساعتك القادمة.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 border-t border-[#292C30] pt-12">
          {whyChronova.map((item) => (
            <div key={item.title} className="space-y-3 text-center sm:text-right">
              <span className="text-3xl inline-block">{item.icon}</span>
              <h3 className="font-serif-display text-lg font-medium text-[#F1F1EE]">
                {item.title}
              </h3>
              <p className="text-xs text-[#8E9298] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Warranty Section ("Confidence comes standard.") */}
      <section id="warranty" className="border-y border-[#292C30] bg-[#15171A] py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#B7A27A]">
            الضمان الدولي المعتمد
          </span>
          <h2 className="mt-3 font-serif-display text-3xl font-light sm:text-4xl text-[#F1F1EE]">
            الثقة تأتي كمعيار أساسي مع كل ساعة.
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-[#8E9298] leading-relaxed max-w-2xl mx-auto">
            جميع ساعات كرونوفا مشمولة ببطاقة ضمان رسمي لمدة سنتين تغطي حركة الساعة، الدوائر التقنية، ومقاومة الماء مع فريق دعم وصيانة محلي جاهز لخدمتك دائماً.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/templates/chronova/collections/all"
              className="rounded-full bg-[#B7A27A] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#0C0D0F] hover:brightness-110 transition-all shadow-lg shadow-[#B7A27A]/20"
            >
              تسوّق بثقة تامة
            </Link>
          </div>
        </div>
      </section>

      {/* 10. Reviews Section */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#B7A27A]">
            تجارب العملاء
          </span>
          <h2 className="mt-2 font-serif-display text-3xl font-light tracking-tight sm:text-4xl text-[#F1F1EE]">
            آراء مقتني ساعات كرونوفا
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {customerReviews.map((rev) => (
            <div
              key={rev.name}
              className="flex flex-col justify-between rounded-xl bg-[#15171A] p-6 border border-[#292C30]"
            >
              <div>
                <div className="flex items-center gap-1 text-[#B7A27A] text-sm">
                  <span>★★★★★</span>
                </div>
                <p className="mt-4 text-xs italic leading-relaxed text-[#F1F1EE]/80">
                  «{rev.quote}»
                </p>
              </div>

              <div className="mt-6 border-t border-[#292C30] pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-[#F1F1EE]">{rev.name}</p>
                    <p className="text-[10px] text-[#8E9298]">{rev.location}</p>
                  </div>
                  <Link
                    href={`/templates/chronova/product/${rev.productSlug}`}
                    className="text-[10px] text-[#B7A27A] hover:underline truncate max-w-[130px]"
                  >
                    {rev.productName}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. Footer */}
      <ChronovaFooter />
    </div>
  );
}
