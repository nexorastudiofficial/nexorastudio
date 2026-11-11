"use client";

import { useState, useRef, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import easymartLogo from "@/public/easymart-logo.png";
import posScreen from "@/public/easymart-screens/pos.png";
import productsScreen from "@/public/easymart-screens/products.png";
import suppliersScreen from "@/public/easymart-screens/suppliers.png";
import analyticsScreen from "@/public/easymart-screens/analytics.png";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61591467674620";

// EasyMart POS Live Interactive Pages for quick check
export const supermarketScreenshots = [
  {
    id: "pos",
    title: "شاشة الكاشير السريعة ونقطة البيع (POS)",
    tag: "نقطة البيع الرئيسية (POS)",
    route: `${BASE_PATH}/easymart-demo/index.html?standalone=1#/pos`,
    image: posScreen,
    description:
      "واجهة كاشير تفاعلية مصممة لتحمل ضغط وسرعة طوابير السوبرماركت. دعم فوري لقارئ الباركود، باركود الموازين الإلكترونية (الوزن والسعر)، والبحث اللحظي عن السلع.",
    features: [
      "دعم باركود الموازين الإلكترونية للأجبان، اللحوم، والخضر",
      "معالجة فورية للمبيعات في ثوانٍ للقضاء على طوابير الانتظار",
      "إمكانية تعليق فاتورة زبون واستئنافها دون تعطيل الكاشير",
      "حساب الإرجاع وتوليد وصل البيع فوراً",
    ],
  },
  {
    id: "products",
    title: "شاشة إدارة المنتجات والباركود (Products)",
    tag: "إدارة المنتجات (Products)",
    route: `${BASE_PATH}/easymart-demo/index.html?standalone=1#/products`,
    image: productsScreen,
    description:
      "جدول متكامل لإدارة آلاف المنتجات الاستهلاكية، تصنيفها بالأقسام، تحديد أسعار الشراء والبيع، وتوليد وطباعة ملصقات الباركود.",
    features: [
      "قائمة تفاعلية بالأسعار والكميات والمخزون",
      "توليد وطباعة ملصقات الباركود بمختلف المقاسات",
      "تصنيف المنتجات حسب الأقسام الغذائية",
      "بحث فوري بالاسم، الكود، أو الباركود",
    ],
  },
  {
    id: "suppliers",
    title: "شاشة الموردين وفواتير الشراء (Suppliers)",
    tag: "الموردون والمشتريات (Suppliers)",
    route: `${BASE_PATH}/easymart-demo/index.html?standalone=1#/suppliers`,
    image: suppliersScreen,
    description:
      "تسجيل سريع لفواتير شراء موزعي المواد الغذائية، تتبع أسعار الشراء وتحديث أسعار البيع تلقائياً، مع دفتر حسابات دقيق لمستحقات الموزعين.",
    features: [
      "سجل كامل لموزعي المواد الغذائية والألبان",
      "تتبع الديون المتبقية وتواريخ الاستحقاق",
      "كشف حساب تفصيلي وفواتير التوريد",
      "أرقام هواتف وعناوين الموزعين المعتمدين",
    ],
  },
  {
    id: "analytics",
    title: "لوحة إحصائيات وتقارير المبيعات (Sales Analytics)",
    tag: "إحصائيات المبيعات (Sales Analytics)",
    route: `${BASE_PATH}/easymart-demo/index.html?standalone=1#/analytics?tab=sales`,
    image: analyticsScreen,
    description:
      "لوحة تحكم إحصائية تفصيلية لمبيعات السوبرماركت تعرض المبيعات بالساعة، ساعات الذروة، متوسط سلة المشتريات، ومقارنة الفترات الزمنية.",
    features: [
      "تحليل حجم وقيمة المبيعات بالساعة واليوم",
      "رسوم بيانية تفاعلية لساعات الذروة الأكثر إقبالاً",
      "متوسط سلة المشتريات ومعدل إنفاق الزبائن",
      "مقارنة المبيعات بين الفترات وحساب النمو الدوري",
    ],
  },
];

const supermarketFeatures = [
  {
    title: "قراءة باركود الموازين الإلكترونية",
    description: "قراءة تلقائية لباركود الوزن والسعر الصادر من موازين الأجبان واللحوم والخضر مباشرة إلى الفاتورة.",
    icon: (
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    ),
  },
  {
    title: "تنبيهات تواريخ انتهاء الصلاحية",
    description: "إشعارات قبل انتهاء صلاحية المواد الغذائية بأيام أو أسابيع لتصريفها وتفادي تلف السلع.",
    icon: (
      <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
    ),
  },
  {
    title: "العمل 100% بدون إنترنت (Offline)",
    description: "سرعة استجابة فورية دون توقف حتى عند انقطاع الإنترنت، وقاعدة بيانات محلية محمية ومستقرة.",
    icon: (
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    ),
  },
  {
    title: "سرعة خيالية في أوقات الذروة",
    description: "أداء فائق لا يتأثر بزيادة المنتجات حتى مع وجود أكثر من 20,000 صنف غذائي واستيعاب الطوابير الطويلة.",
    icon: (
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    ),
  },
  {
    title: "نظام كاشيرات متعددة (Multi-Caisse)",
    description: "ربط عدة شاشات كاشير في نفس الوقت على مخزون موحد وسيرفر محلي آمن في السوبرماركت (في نسخة Pro).",
    icon: (
      <path d="M4 6h16M4 12h16M4 18h7" />
    ),
  },
  {
    title: "جرد الصندوق ومنع الأخطاء والسرقات",
    description: "صلاحيات مشددة لمستخدمي الكاشير، مع قفل التعديل على الفواتير ومطابقة دقيقة لمداخيل الصندوق.",
    icon: (
      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    ),
  },
  {
    title: "الذكاء الاصطناعي التنبؤي (AI) في نسخة Pro",
    description: "تحليل ذكي لحركة المبيعات، التنبؤ بمواسم الطلب ونفاد السلع، واقتراح كميات الشراء المثالية تلقائياً.",
    icon: (
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.93V17a1 1 0 0 1-2 0v-.07A7.003 7.003 0 0 1 5.07 11H5a1 1 0 0 1 0-2h.07A7.003 7.003 0 0 1 11 5.07V5a1 1 0 0 1 2 0v.07A7.003 7.003 0 0 1 18.93 11H19a1 1 0 0 1 0 2h-.07A7.003 7.003 0 0 1 13 16.93z" />
    ),
  },
  {
    title: "تطبيق أندرويد للهاتف (APK) في نسخة Pro",
    description: "تطبيق جوال خاص بالسوبرماركت يمكنك من متابعة مبيعات الصندوق لحظياً من أي مكان وجرد المخزن بكاميرا هاتفك.",
    icon: (
      <path d="M17 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-5 18a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 12 20z" />
    ),
  },
];

const comparisonData = [
  { feature: "النشاط المناسب", lite: "ميني ماركت، بقالة، محل مواد غذائية فردي", pro: "سوبرماركت متوسط وكبير، سوبرات متعددة الكاشيرات" },
  { feature: "عدد أجهزة الكاشير", lite: "جهاز كاشير واحد (مستقل)", pro: "كاشيرات متعددة (Multi-Caisse) غير محدودة" },
  { feature: "حاسوب إدارة ومخزن منفصل", lite: "—", pro: "نعم (ربط شبكة محلية مع كاشيرات البيع)" },
  { feature: "الذكاء الاصطناعي (AI Assistant)", lite: "—", pro: "نعم (تحليل المبيعات، توقع نفاذ السلع، واقتراح الشراء)" },
  { feature: "تطبيق الهاتف الذكي (Android APK)", lite: "—", pro: "نعم (متابعة الصندوق لحظياً وجرد المخزن بالهاتف)" },
  { feature: "دعم موازين الباركود الإلكترونية", lite: "—", pro: "نعم (تلقائي مع باركود الوزن والسعر)" },
  { feature: "تتبع تواريخ الصلاحية (Périmé)", lite: "—", pro: "نظام تنبيهات متقدم وفلاتر زمنية" },
  { feature: "صلاحيات الكاشير والإدارة", lite: "أساسية", pro: "متقدمة ومفصلة مع سجل نشاط الموظفين" },
  { feature: "العمل بدون إنترنت (100% Offline)", lite: "نعم", pro: "نعم" },
  { feature: "قارئ الباركود وطابعات 80mm/58mm", lite: "نعم", pro: "نعم" },
  { feature: "حساب الأرباح وجرد اليومية (Z-Report)", lite: "نعم", pro: "نعم (مفصل لكل كاشير + إجمالي)" },
  { feature: "السعر الأساسي", lite: "12,000 دج (ترخيص دائم)", pro: "17,000 دج (ترخيص دائم)" },
  { feature: "عرض أول 10 زبائن (خصم 20%)", lite: "9,600 دج فقط (توفير 2,400 دج)", pro: "13,600 دج فقط (توفير 3,400 دج)" },
  { feature: "الترخيص والدفع", lite: "ترخيص دائم مدى الحياة (دفعة واحدة)", pro: "ترخيص دائم مدى الحياة (دفعة واحدة)" },
  { feature: "الدعم الفني والمرافقة المجانية", lite: "دعم فني ومرافقة مجانية لمدة 6 أشهر", pro: "دعم فني ومرافقة مجانية شاملة لمدة 1 سنة (12 شهراً)" },
];

function ShowcaseScaledViewport({
  route,
  title,
  tag,
  image,
}: {
  route: string;
  title: string;
  tag: string;
  image?: StaticImageData;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.6);
  const [fitMode, setFitMode] = useState<"fit" | "actual">("fit");
  const [mode, setMode] = useState<"interactive" | "screenshot">("interactive");

  const BASE_WIDTH = 1200;
  const BASE_HEIGHT = 760;

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      if (clientWidth <= 0 || clientHeight <= 0) return;

      // Fit 100% of both width and height inside the showcase container bounds
      const scaleX = clientWidth / BASE_WIDTH;
      const scaleY = clientHeight / BASE_HEIGHT;
      const calculatedScale = Math.min(scaleX, scaleY);
      setScale(calculatedScale);
    };

    handleResize();
    const ro = new ResizeObserver(handleResize);
    if (containerRef.current) {
      ro.observe(containerRef.current);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const currentScale = fitMode === "fit" ? scale : 1;

  return (
    <div className="flex flex-col gap-2.5">
      {/* Top scale controls bar */}
      <div className="flex items-center justify-between px-2 text-xs text-zinc-400 gap-2 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg p-0.5 shrink-0">
          <button
            type="button"
            onClick={() => setMode("interactive")}
            className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 ${
              mode === "interactive"
                ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold shadow"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            تجربة تفاعلية (Live)
          </button>
          {image && (
            <button
              type="button"
              onClick={() => setMode("screenshot")}
              className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 ${
                mode === "screenshot"
                  ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold shadow"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              لقطة شاشة حقيقية (HD)
            </button>
          )}
        </div>

        {mode === "interactive" && (
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-0.5 shrink-0">
            <button
              type="button"
              onClick={() => setFitMode("fit")}
              className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 ${
                fitMode === "fit"
                  ? "bg-cyan-500 text-slate-950 font-bold shadow"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              ملائمة كاملة (100% Fit)
            </button>
            <button
              type="button"
              onClick={() => setFitMode("actual")}
              className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 ${
                fitMode === "actual"
                  ? "bg-cyan-500 text-slate-950 font-bold shadow"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              المقاس الأصلي (1:1)
            </button>
          </div>
        )}
      </div>

      {/* Scaled Showcase Frame Container */}
      <div
        ref={containerRef}
        className="relative h-[480px] sm:h-[560px] md:h-[620px] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#060814] shadow-2xl flex items-center justify-center"
      >
        {mode === "screenshot" && image ? (
          <div className="w-full h-full p-2 sm:p-4 flex items-center justify-center bg-black/40">
            <Image
              src={image}
              alt={title}
              className="w-full h-full object-contain rounded-xl"
              priority
            />
          </div>
        ) : (
          <div
            style={{
              width: `${BASE_WIDTH}px`,
              height: `${BASE_HEIGHT}px`,
              transform: `scale(${currentScale})`,
              transformOrigin: "center center",
              flexShrink: 0,
            }}
            className="transition-transform duration-200"
          >
            <iframe
              key={route}
              src={route}
              title={title}
              className="h-full w-full border-0 select-none bg-[#090b17]"
              allow="clipboard-read; clipboard-write"
            />
          </div>
        )}
      </div>

      {/* Footer hint & external open */}
      <div className="flex items-center justify-between px-1 text-xs text-zinc-400">
        <span className="flex items-center gap-1.5 text-zinc-400 text-[11px]">
          💡 كل تفاصيل الشاشة ظاهرة بالكامل ويمكنك النقر والتجربة الحية مباشرة.
        </span>
        <a
          href={route}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 text-[11px] font-semibold"
        >
          فتح {tag} في نافذة كاملة ↗
        </a>
      </div>
    </div>
  );
}

export default function EasyMartPage() {
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  const activeScreen = supermarketScreenshots[activeScreenIndex];

  return (
    <div className="min-h-screen bg-[#05060b] text-foreground font-sans selection:bg-cyan-500/30">
      
      {/* Background Ambience */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="bg-grid absolute inset-0 opacity-40" />
        <div className="orb right-[-10rem] top-[-5rem] h-96 w-96 bg-cyan-500/20" />
        <div className="orb left-[-10rem] top-1/3 h-96 w-96 bg-violet-600/25" />
        <div className="orb right-1/4 bottom-[-10rem] h-96 w-96 bg-emerald-600/15" />
      </div>

      {/* Top Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#05060b]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8 gap-2 sm:gap-4 overflow-x-auto scrollbar-none">
          
          {/* Brand */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 whitespace-nowrap">
            <Link href="/" className="flex items-center gap-2 group shrink-0 whitespace-nowrap">
              <Image
                src={logo}
                alt="NexoraStudio"
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
              />
              <span className="text-xs sm:text-sm font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors whitespace-nowrap">
                NexoraStudio
              </span>
            </Link>

            <span className="text-zinc-600">/</span>

            <div className="flex items-center gap-2 shrink-0 whitespace-nowrap">
              <Image
                src={easymartLogo}
                alt="EasyMart POS"
                width={20}
                height={20}
                className="h-5 w-5 object-contain"
              />
              <span className="text-xs font-bold text-cyan-400 bg-cyan-400/10 px-2.5 py-1 rounded-md border border-cyan-400/20 whitespace-nowrap">
                EasyMart POS
              </span>
              <span className="hidden xl:inline-block text-[11px] text-zinc-400 whitespace-nowrap">
                نظام إدارة السوبرماركت والمحلات الغذائية
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs xl:text-sm text-zinc-400 shrink-0 whitespace-nowrap">
            <Link
              href="/easymart/demo"
              className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 rounded-full transition-colors whitespace-nowrap shrink-0"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="whitespace-nowrap">تجربة الواجهة الحية (Live Demo)</span>
            </Link>
            <a href="#screens" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              شاشات النظام
            </a>
            <a href="#features" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              مميزات السوبرماركت
            </a>
            <a href="#versions" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              Lite مقابل Pro
            </a>
            <a href="#compare" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              جدول المقارنة
            </a>
          </div>

          {/* Header Action CTA */}
          <div className="flex items-center gap-3 shrink-0 whitespace-nowrap">
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 whitespace-nowrap shrink-0"
            >
              <span className="whitespace-nowrap">طلب تجربة EasyMart</span>
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5 rtl:-scale-x-100 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500/20 via-violet-600/30 to-fuchsia-600/20 p-3 ring-1 ring-white/15 shadow-2xl shadow-cyan-500/20">
            <Image
              src={easymartLogo}
              alt="EasyMart POS Logo"
              width={64}
              height={64}
              className="h-full w-full object-contain"
              priority
            />
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-300 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            نظام نقاط البيع وإدارة المخزون المخصص حصرياً للسوبرماركت
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.15]">
            برنامج <span className="text-gradient">EasyMart POS</span>
            <br />
            السرعة والتحكم الكامل في السوبرماركت
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-300 leading-relaxed sm:text-xl">
            نظام سطح مكتب قوي لنظام ويندوز يعمل <strong className="text-emerald-400 font-semibold">100% بدون إنترنت</strong>.
            صُمم خصيصاً للقضاء على طوابير السوبرماركت، قراءة باركود الموازين، مراقبة تواريخ الصلاحية، وجرد آلاف السلع بدقة لا تخطئ.
          </p>

          {/* Quick Version Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
            <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-2 flex items-center gap-2">
              <span className="rounded bg-cyan-500/20 text-cyan-300 text-xs font-bold px-2 py-0.5 border border-cyan-500/30">
                نسخة Lite
              </span>
              <span className="text-zinc-300">
                <strong className="text-white font-bold">9,600 دج</strong>{" "}
                <span className="line-through text-zinc-500 text-xs">12,000 دج</span>{" "}
                (خصم 20% لأول 10 زبائن + 6 أشهر دعم فني)
              </span>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-2 flex items-center gap-2">
              <span className="rounded bg-violet-500/20 text-violet-300 text-xs font-bold px-2 py-0.5 border border-violet-500/30">
                نسخة Pro
              </span>
              <span className="text-zinc-300">
                <strong className="text-white font-bold">13,600 دج</strong>{" "}
                <span className="line-through text-zinc-500 text-xs">17,000 دج</span>{" "}
                (خصم 20% لأول 10 زبائن + سنة دعم فني)
              </span>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/easymart/demo"
              className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-500/25 transition-all hover:scale-105 hover:brightness-110"
            >
              <span className="h-2 w-2 rounded-full bg-slate-950 animate-ping" />
              جرب واجهة البرنامج الآن (Live Demo)
            </Link>

            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-8 text-sm font-semibold text-white shadow-xl shadow-cyan-500/30 transition-all hover:scale-105"
            >
              اطلب نسختك الآن (Lite أو Pro)
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 rtl:-scale-x-100"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </a>

            <a
              href="#versions"
              className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              مقارنة الباقات والأسعار
            </a>
          </div>
        </div>

        {/* Featured Interactive Screenshot Mockup Frame */}
        <div id="screens" className="mx-auto mt-16 max-w-6xl scroll-mt-24">
          <div className="overflow-hidden rounded-3xl border border-white/15 bg-[#090b17] shadow-[0_0_80px_rgba(34,211,238,0.12)]">
            
            {/* Window header */}
            <div className="flex h-11 items-center justify-between border-b border-white/10 bg-white/[0.04] px-5">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="text-xs font-mono font-medium text-zinc-300">
                EasyMart POS — {activeScreen.title}
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={activeScreen.route}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 px-2.5 py-0.5 rounded transition-colors"
                >
                  فتح بملء الشاشة ↗
                </a>
              </div>
            </div>

            {/* Screen Selector Tabs */}
            <div className="flex overflow-x-auto border-b border-white/10 bg-white/[0.02] p-2.5 gap-2 scrollbar-none">
              {supermarketScreenshots.map((screen, idx) => (
                <button
                  key={screen.id}
                  onClick={() => setActiveScreenIndex(idx)}
                  className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium transition-all whitespace-nowrap ${
                    activeScreenIndex === idx
                      ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold shadow-md"
                      : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="whitespace-nowrap">{screen.tag}</span>
                </button>
              ))}
            </div>

            {/* Display Area */}
            <div className="p-4 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Visual Image / Interactive Live Shell Container */}
                <div className="lg:col-span-8">
                  <ShowcaseScaledViewport
                    route={activeScreen.route}
                    title={activeScreen.title}
                    tag={activeScreen.tag}
                    image={activeScreen.image}
                  />
                </div>

                {/* Details for active screen */}
                <div className="lg:col-span-4 flex flex-col justify-center">
                  <span className="text-xs font-semibold text-cyan-400">
                    {activeScreen.tag}
                  </span>
                  <h3 className="mt-2 text-2xl font-bold text-white">
                    {activeScreen.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                    {activeScreen.description}
                  </p>

                  <div className="mt-6 space-y-2.5">
                    {activeScreen.features.map((item) => (
                      <div key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">
                          ✓
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-col gap-2.5">
                    <a
                      href={activeScreen.route}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 px-5 py-3 text-xs sm:text-sm font-semibold text-white shadow-md hover:brightness-110 transition-all"
                    >
                      فتح هذه الشاشة بملء الشاشة
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>

                    <a
                      href={FACEBOOK_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-5 py-2.5 text-xs font-medium text-zinc-300 hover:bg-white/15 hover:text-white transition-colors"
                    >
                      طلب استفسار عن البرنامج
                    </a>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Supermarket Specific Features */}
      <section id="features" className="relative border-t border-white/5 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold text-cyan-400">هندسة متخصصة للسوبرماركت</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              لماذا EasyMart هو الخيار الأنسب لمتجرك الغذائي؟
            </h2>
            <p className="mt-3 text-base text-zinc-400">
              حلول عملية لمعالجة التحديات اليومية: من ازدحام الكاشير إلى تواريخ الصلاحية والسلع الموزونة.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {supermarketFeatures.map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/[0.05]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {item.icon}
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lite vs Pro Versions Breakdown */}
      <section id="versions" className="relative border-t border-white/5 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold text-violet-400">اختر النسخة المناسبة</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              إصدارات EasyMart POS: نسخة Lite ونسخة Pro
            </h2>
            <p className="mt-3 text-base text-zinc-400">
              كلا الإصدارين بترخيص دائم مدى الحياة وبدون أي رسوم أو اشتراكات شهرية.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 max-w-5xl mx-auto">
            
            {/* LITE VERSION */}
            <div className="relative flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-10 backdrop-blur-xl transition-all hover:border-white/20">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-cyan-500/10 border border-cyan-500/25 px-3 py-1 text-xs font-bold text-cyan-300">
                    نسخة Lite
                  </span>
                  <span className="text-xs text-zinc-400">للمحلات الفردية والميني ماركت</span>
                </div>

                <h3 className="mt-4 text-2xl font-bold text-white">
                  EasyMart Lite
                </h3>
                <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
                  النسخة الخفيفة والسريعة، مصممة للميني ماركت والبقالات التي تعمل بنقطة بيع واحدة (كاشير واحد).
                </p>

                <div className="my-6 border-t border-white/10 pt-6">
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white">9,600 دج</span>
                    <span className="text-base text-zinc-500 line-through">12,000 دج</span>
                    <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-bold text-emerald-400">
                      تخفيض 20%
                    </span>
                  </div>
                  <div className="text-xs text-amber-400 font-semibold mt-2 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping shrink-0" />
                    عرض خاص لأول 10 زبائن فقط! (السعر العادي: 12,000 دج)
                  </div>
                  <div className="text-xs text-cyan-400 mt-1 font-semibold">
                    ترخيص دائم لجهاز واحد • دفع لمرة واحدة • دعم فني مجاني 6 أشهر
                  </div>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-zinc-300">
                  <div className="font-semibold text-white">المميزات المشمولة:</div>
                  <div className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">✓</span>
                    <span>كاشير بيع سريع متوافق مع كافة قارئات الباركود</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">✓</span>
                    <span>طباعة الفواتير ووصولات البيع الحرارية 80mm و 58mm</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">✓</span>
                    <span>إدارة المخزون وتتبع كميات السلع وأسعار البيع والشراء</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">✓</span>
                    <span>تقرير إغلاق اليومية (Z-Report) وحساب الأرباح اليومية</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">✓</span>
                    <span>دفتر حسابات ديون الزبائن والموردين</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">✓</span>
                    <span>يعمل 100% بدون إنترنت مع نسخ احتياطي بنقرة واحدة</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">✓</span>
                    <strong className="text-white">دعم فني ومرافقة مجانية لمدة 6 أشهر عن بُعد</strong>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-white/10 py-3.5 text-sm font-semibold text-white hover:bg-white/20 transition-all"
                >
                  طلب نسخة EasyMart Lite
                </a>
              </div>
            </div>

            {/* PRO VERSION */}
            <div className="relative flex flex-col justify-between rounded-3xl border border-cyan-400/50 bg-gradient-to-b from-cyan-950/30 via-[#0a0c1b] to-[#070814] p-8 sm:p-10 backdrop-blur-xl shadow-[0_0_60px_rgba(34,211,238,0.18)] ring-1 ring-cyan-400/40">
              
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-4 py-1 text-xs font-bold text-white shadow-lg">
                الأكثر قوة للسوبرماركت
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-violet-500/20 border border-violet-500/30 px-3 py-1 text-xs font-bold text-violet-300">
                    نسخة Pro الكاملة
                  </span>
                  <span className="text-xs text-cyan-300">للسوبرماركت المتوسط والكبير</span>
                </div>

                <h3 className="mt-4 text-2xl font-bold text-white">
                  EasyMart Pro
                </h3>
                <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
                  النسخة المتكاملة لإدارة السوبرماركت متعدد الكاشيرات، مع ربط موازين الباركود، مراقبة تواريخ الصلاحية، وشبكة محلية موحدة.
                </p>

                <div className="my-6 border-t border-white/10 pt-6">
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white">13,600 دج</span>
                    <span className="text-base text-zinc-500 line-through">17,000 دج</span>
                    <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-bold text-emerald-400">
                      تخفيض 20%
                    </span>
                  </div>
                  <div className="text-xs text-amber-400 font-semibold mt-2 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping shrink-0" />
                    عرض خاص لأول 10 زبائن فقط! (السعر العادي: 17,000 دج)
                  </div>
                  <div className="text-xs text-cyan-400 mt-1 font-semibold">
                    ترخيص دائم • كاشيرات متعددة • دعم فني مجاني لمدة 1 سنة كاملة
                  </div>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-zinc-300">
                  <div className="font-semibold text-white">كل مميزات Lite بالإضافة إلى:</div>
                  <div className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">✨</span>
                    <strong className="text-white">الذكاء الاصطناعي (AI Assistant):</strong>
                    <span>توقع نفاذ السلع، تحليل المبيعات، واقتراح كميات الشراء الذكية</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">📱</span>
                    <strong className="text-white">تطبيق الهاتف (Android APK):</strong>
                    <span>متابعة مبيعات الصندوق لحظياً وجرد المخزن بهاتفك الذكي</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <strong className="text-white">نظام كاشيرات متعددة (Multi-Caisse)</strong> متصلة بسيرفر مركزي
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <strong className="text-white">دعم متقدم لباركود الموازين الإلكترونية</strong> (اللحوم، الأجبان، الخضر)
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <strong className="text-white">نظام تتبع تواريخ انتهاء الصلاحية</strong> وإشعارات مسبقة
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>حاسوب إدارة منفصل لإدخال الفواتير ومراقبة المخزن أثناء عمل الكاشيرات</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>نظام صلاحيات متقدم (كاشير، مسؤول مخزن، مدير) لمنع التلاعب</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>تقارير مفصلة لمبيعات كل كاشير ومراقبة حركة الصناديق</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <strong className="text-white">دعم فني مجاني ومرافقة شاملة ذات أولوية لمدة سنة كاملة (12 شهراً)</strong>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 hover:brightness-110 transition-all"
                >
                  طلب نسخة EasyMart Pro
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section id="compare" className="relative border-t border-white/5 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-semibold text-cyan-400">مقارنة شاملة</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              جدول المقارنة بين EasyMart Lite و Pro
            </h2>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
            <table className="w-full text-right text-xs sm:text-sm">
              <thead className="border-b border-white/10 bg-white/[0.04]">
                <tr>
                  <th className="py-4 px-4 sm:px-6 font-semibold text-white">الميزة</th>
                  <th className="py-4 px-4 sm:px-6 font-semibold text-cyan-300">EasyMart Lite</th>
                  <th className="py-4 px-4 sm:px-6 font-semibold text-violet-300">EasyMart Pro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {comparisonData.map((row, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-medium text-white">{row.feature}</td>
                    <td className="py-3.5 px-4 sm:px-6 text-zinc-300">{row.lite}</td>
                    <td className="py-3.5 px-4 sm:px-6 text-zinc-200 font-semibold">{row.pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Final Call To Action */}
      <section className="relative py-16 sm:py-24 border-t border-white/5">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/40 via-[#0a0b1f]/90 to-violet-950/40 p-8 text-center sm:p-14 shadow-[0_0_60px_rgba(34,211,238,0.12)]">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              ابدأ في تنظيم وإدارة السوبرماركت الخاص بك باحترافية
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-zinc-300">
              تواصل معنا لتحديد النسخة المناسبة (Lite أو Pro)، مع الاستفادة من الدعم الفني المجاني (6 أشهر لنسخة Lite وسنة كاملة لنسخة Pro) والمرافقة لتشغيل النظام.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-cyan-500/30 hover:scale-105 transition-all"
              >
                تواصل معنا عبر فيسبوك
              </a>
              <Link
                href="/contact"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                طلب استفسار وتخصيص
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-xs text-zinc-500">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image src={logo} alt="NexoraStudio" width={20} height={20} className="h-5 w-5 object-contain" />
            <span className="text-zinc-400 font-medium">NexoraStudio</span>
            <span>— جميع الحقوق محفوظة © {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
            <Link href="/" className="hover:text-white transition-colors">الرئيسية</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">سياسة الخصوصية</Link>
            <Link href="/terms" className="hover:text-white transition-colors">الشروط والأحكام</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}