"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61591467674620";

// You can easily add more desktop apps or POS editions to this list
export const desktopApps = [
  {
    id: "easymart-pos",
    name: "EasyMart POS",
    subtitle: "نظام نقاط البيع وإدارة السوبرماركت والمحلات الغذائية",
    tagline: "حل مكتبي سريع ومستقر للسوبرماركت، يدعم باركود الموازين وتواريخ الصلاحية، ويعمل 100% بدون إنترنت.",
    version: "نسخة Lite ونسخة Pro",
    os: "Windows 10 / 11",
    license: "Lite: 12,000 دج (9,600 دج لأول 10 زبائن) | Pro: 17,000 دج (13,600 دج لأول 10 زبائن) • ترخيص دائم",
    badge: "مخصص للسوبرماركت",
    highlights: [
      {
        title: "بيع وفوترة فائقة السرعة للموازين والباركود",
        description: "قراءة فورية لباركود السلع وباركود الموازين الإلكترونية (اللحوم، الأجبان، والخضر) للقضاء على طوابير السوبرماركت.",
        icon: (
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        ),
      },
      {
        title: "تتبع المخزون وتواريخ الصلاحية (Périmé)",
        description: "إدارة آلاف السلع الاستهلاكية وتنبيهات استباقية بالمنتجات القريبة من انتهاء الصلاحية لتفادي التلف والخسائر.",
        icon: (
          <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
        ),
      },
      {
        title: "كاشيرات متعددة (Multi-Caisse) في نسخة Pro",
        description: "ربط عدة شاشات كاشير في نفس الوقت على مخزون وسيرفر محلي موحد مع حاسوب إدارة منفصل للمخزن.",
        icon: (
          <path d="M4 6h16M4 12h16M4 18h7" />
        ),
      },
      {
        title: "الذكاء الاصطناعي (AI) وتطبيق أندرويد (APK)",
        description: "تحليل ذكي لحركة المبيعات وتوقع نفاذ السلع (AI)، مع تطبيق جوال APK لمتابعة الصندوق وجرد المخزن بهاتفك.",
        icon: (
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.93V17a1 1 0 0 1-2 0v-.07A7.003 7.003 0 0 1 5.07 11H5a1 1 0 0 1 0-2h.07A7.003 7.003 0 0 1 11 5.07V5a1 1 0 0 1 2 0v.07A7.003 7.003 0 0 1 18.93 11H19a1 1 0 0 1 0 2h-.07A7.003 7.003 0 0 1 13 16.93z" />
        ),
      },
      {
        title: "يعمل 100% بدون إنترنت (Offline)",
        description: "استقرار تام وأمان فائق لبياناتك المحلية، وسرعة استجابة لحظية لا تتأثر بانقطاع الإنترنت.",
        icon: (
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        ),
      },
      {
        title: "تقرير إغلاق اليومية (Z-Report) والأرباح",
        description: "جرد دقيق للصندوق ومطابقة السيولة النقدية بنهاية كل وردية، مع حساب صافي الأرباح اليومية والشهرية.",
        icon: (
          <path d="M3 3v18h18M18 9l-5 5-4-4-3 3" />
        ),
      },
      {
        title: "حسابات الموردين وفواتير الشراء",
        description: "تسجيل فواتير موزعي المواد الغذائية، تتبع أسعار الشراء وتحديث أسعار البيع، وسجل دقيق للديون المتبقية.",
        icon: (
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm10 8v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        ),
      },
    ],
    // Placeholders for your POS screenshots/media
    screenshots: [
      {
        title: "واجهات كاشير السوبرماركت",
        category: "نقطة البيع السريعة (POS)",
        image: "/easymart-screens/pos.png",
        description: "واجهة كاشير تفاعلية وسريعة تدعم قارئ الباركود، شاشات اللمس، واختصارات الدفع السريع الفورية.",
      },
      {
        title: "قراءة باركود الموازين",
        category: "إدارة المنتجات والباركود (Products)",
        image: "/easymart-screens/products.png",
        description: "دعم باركود موازين الوزن والسعر (الأجبان، اللحوم، والخضر)، جرد آلاف السلع، وتوليد وطباعة ملصقات الباركود.",
      },
      {
        title: "إدخال فواتير الموزعين",
        category: "الموردون والمشتريات (Suppliers)",
        image: "/easymart-screens/suppliers.png",
        description: "تسجيل فواتير شراء موزعي المواد الغذائية (سيفيتال، صومام، حمود بوعلام، سفينة...) ومتابعة تواريخ الاستحقاق والديون.",
      },
      {
        title: "تقارير جرد اليومية",
        category: "الإحصائيات وجرد الصندوق (Analytics)",
        image: "/easymart-screens/analytics.png",
        description: "تقارير إغلاق اليومية Z-Report، مطابقة سيولة الصندوق، وحساب صافي الأرباح بدقة حقيقية 100%.",
      },
    ],
  },
];

export default function DesktopApps() {
  const [selectedApp] = useState(desktopApps[0]);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      id="desktop-apps"
      className="relative scroll-mt-20 overflow-hidden border-t border-white/5 py-16 sm:py-28"
    >
      {/* Background glowing effects */}
      <div className="orb right-[-10rem] top-1/4 h-96 w-96 bg-cyan-500/15" />
      <div className="orb left-[-10rem] bottom-1/4 h-96 w-96 bg-violet-600/20" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-300 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            برامج سطح المكتب • Desktop Solutions
          </div>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            أنظمة وبرمجيات قوية <span className="text-gradient">لإدارة أعمالك</span>
          </h2>
          <p className="mt-4 text-lg text-zinc-400 leading-relaxed">
            حلول سطح مكتب مخصصة للأداء العالي، مصممة للمحلات، المتاجر، والشركات مع استقرار تام وعمل بدون إنترنت.
          </p>
        </div>

        {/* Featured POS App Box */}
        <div className="mt-14 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 backdrop-blur-xl sm:p-10 lg:p-12 shadow-[0_0_60px_rgba(34,211,238,0.06)]">
          
          {/* Top Bar / App Identity */}
          <div className="flex flex-col gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4 sm:items-center">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 via-violet-600/30 to-fuchsia-600/20 p-2.5 ring-1 ring-white/15 shadow-inner">
                <Image
                  src="/easymart-logo.png"
                  alt="EasyMart POS Logo"
                  width={52}
                  height={52}
                  className="h-full w-full object-contain"
                />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-2xl font-bold text-white sm:text-3xl">
                    {selectedApp.name}
                  </h3>
                  <span className="rounded-full bg-cyan-400/15 px-3 py-0.5 text-xs font-semibold text-cyan-300 border border-cyan-400/25">
                    {selectedApp.badge}
                  </span>
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-zinc-400">
                    {selectedApp.version}
                  </span>
                </div>
                <p className="mt-1.5 text-sm sm:text-base text-zinc-400">
                  {selectedApp.subtitle}
                </p>
              </div>
            </div>

            {/* CTA action buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/easymart/demo"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 hover:brightness-110"
              >
                <span className="h-2 w-2 rounded-full bg-slate-950 animate-ping" />
                تجربة الواجهة الحية (Live Demo)
              </Link>

              <Link
                href="/easymart"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 hover:shadow-cyan-500/35"
              >
                صفحة EasyMart ونسخ Lite / Pro
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
              </Link>

              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-white/30 hover:bg-white/10"
              >
                طلب تجربة مباشرة
              </a>
            </div>
          </div>

          {/* System Spec Tags */}
          <div className="mt-6 flex flex-wrap gap-4 text-xs text-zinc-400">
            <div className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 border border-white/5">
              <span className="text-zinc-500">نظام التشغيل:</span>
              <span className="font-medium text-white">{selectedApp.os}</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 border border-white/5">
              <span className="text-zinc-500">نوع الترخيص:</span>
              <span className="font-medium text-white">{selectedApp.license}</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 border border-white/5">
              <span className="text-zinc-500">حالة الاتصال:</span>
              <span className="font-medium text-emerald-400">يعمل بدون إنترنت (100% Offline)</span>
            </div>
          </div>

          {/* Interactive Desktop App Preview Frame */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/15 bg-[#080914] shadow-2xl">
            {/* Window Title Bar */}
            <div className="flex h-10 items-center justify-between border-b border-white/10 bg-white/[0.03] px-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src="/easymart-logo.png"
                  alt="EasyMart POS"
                  width={16}
                  height={16}
                  className="h-4 w-4 object-contain"
                />
                <span className="text-xs font-medium text-zinc-400 font-mono">
                  EasyMart POS — Supermarket Edition
                </span>
              </div>
              <div className="w-12 text-end text-[10px] text-cyan-400 font-mono">Lite / Pro</div>
            </div>

            {/* Window Content / Interactive Screen Mockup */}
            <div className="p-4 sm:p-8">
              {/* Header inside the showcase */}
              <div className="text-center mb-6">
                <h4 className="text-xl font-bold text-white sm:text-2xl">
                  معرض صور وشاشات نظام EasyMart POS
                </h4>
                <p className="mt-1.5 max-w-xl mx-auto text-xs sm:text-sm text-zinc-400">
                  واجهات كاشير السوبرماركت، قراءة باركود الموازين، إدخال فواتير الموزعين، وتقارير جرد اليومية.
                </p>

                {/* Screenshots switcher tabs */}
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {selectedApp.screenshots.map((s, idx) => (
                    <button
                      key={s.title}
                      type="button"
                      onClick={() => setActiveTab(idx)}
                      className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all whitespace-nowrap ${
                        activeTab === idx
                          ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-lg shadow-cyan-500/25 scale-105"
                          : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {s.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Screenshot Display Frame */}
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#090b17] shadow-2xl">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
                  <Image
                    src={selectedApp.screenshots[activeTab].image}
                    alt={selectedApp.screenshots[activeTab].title}
                    fill
                    className="object-contain object-center transition-all duration-300"
                    sizes="(max-width: 1280px) 100vw, 1200px"
                    priority
                  />
                </div>

                {/* Screenshot Caption Footer */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 bg-white/[0.03] px-5 py-3 text-xs">
                  <div className="flex flex-wrap items-center gap-2 text-right">
                    <span className="rounded bg-cyan-500/20 px-2 py-0.5 text-[11px] font-semibold text-cyan-300 border border-cyan-500/30">
                      {selectedApp.screenshots[activeTab].category}
                    </span>
                    <span className="text-zinc-300 font-medium text-xs">
                      {selectedApp.screenshots[activeTab].description}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <a
                      href={selectedApp.screenshots[activeTab].image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-white transition-colors text-xs"
                    >
                      تكبير الصورة ↗
                    </a>
                    <Link
                      href="/easymart/demo"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-colors text-xs"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      تجربة تفاعلية حية
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-12">
            <h4 className="text-lg font-semibold text-white">
              أبرز مميزات نظام EasyMart POS للسوبرماركت (Lite & Pro):
            </h4>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {selectedApp.highlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur transition-all duration-200 hover:border-cyan-400/30 hover:bg-white/[0.04]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {item.icon}
                    </svg>
                  </div>
                  <h5 className="mt-4 font-semibold text-white">{item.title}</h5>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom custom app request banner */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-violet-500/20 bg-gradient-to-r from-violet-950/30 via-transparent to-cyan-950/30 p-6 sm:flex-row">
            <div>
              <h5 className="font-semibold text-white">
                هل تحتاج برنامج سطح مكتب مخصص أو تعديل في نظام الـ POS؟
              </h5>
              <p className="mt-1 text-xs text-zinc-400 sm:text-sm">
                يمكننا إضافة مميزات مخصصة، ربط موازين إلكترونية، أو بناء برنامج كامل يلبي طبيعة نشاطك بدقة.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-slate-950 transition hover:bg-zinc-200 sm:text-sm"
            >
              تواصل لطلب برنامج مخصص
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}