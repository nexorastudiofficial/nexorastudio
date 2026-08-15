"use client";

import { useEffect, useState } from "react";

const ROTATE_MS = 15000;

const templates = [
  {
    slug: "elane",
    name: "ÉLANÉ — أزياء",
    tagline: "متجر فاخر هادئ بطابع تحريري راقٍ للتجارة الإلكترونية",
    tags: ["تحريري", "متجر"],
    sitePrice: "12,000 دج",
    pagePrice: "6,500 دج",
  },
  {
    slug: "velora",
    name: "VELORA — عطور",
    tagline: "متجر عطور فاخر داكن مبني حول المزاج والتسوّق التجريبي",
    tags: ["داكن", "متجر"],
    sitePrice: "12,000 دج",
    pagePrice: "6,500 دج",
  },
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const getTemplateUrl = (slug: string) => `${basePath}/templates/${slug}`;

export default function Showcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || templates.length <= 1) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % templates.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [paused]);

  const goTo = (index: number) => {
    setActive((index + templates.length) % templates.length);
  };

  const current = templates[active];

  return (
    <div
      className="mx-auto max-w-6xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0c18] shadow-[0_0_80px_rgba(139,92,246,0.12)]">
        {/* Browser chrome */}
        <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-500/80" />
            <span className="h-3 w-3 rounded-full bg-amber-400/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
          </div>
          <div className="mx-auto flex min-w-0 flex-1 items-center justify-center rounded-lg bg-black/30 px-4 py-1.5 text-xs text-zinc-400">
            <span className="hidden sm:inline">nexorastudio.app/</span>
            <span className="truncate font-mono">{current.slug}</span>
          </div>
          <a
            href={getTemplateUrl(current.slug)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-1 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-200 transition-colors hover:bg-white/10"
          >
            فتح
            <svg
              viewBox="0 0 24 24"
              className="h-3 w-3 rtl:-scale-x-100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </a>
        </div>

        {/* Frames */}
        <div className="relative h-[420px] sm:h-[560px]">
          {templates.map((t, i) => (
            <iframe
              key={t.slug}
              src={getTemplateUrl(t.slug)}
              title={t.name}
              loading={i === 0 ? "eager" : "lazy"}
              className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${
                i === active ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            />
          ))}

          {/* Auto-rotate progress */}
          {templates.length > 1 && (
            <div className="absolute inset-x-0 top-0 h-0.5 bg-white/10">
              <div
                key={active}
                className="h-full origin-right bg-gradient-to-r from-violet-500 to-cyan-400"
                style={{
                  animation: `showcase-fill ${ROTATE_MS}ms linear forwards`,
                  animationPlayState: paused ? "paused" : "running",
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-semibold text-white">
              {current.name}
            </h3>
            {current.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-violet-400/30 bg-violet-500/10 px-2.5 py-0.5 text-xs text-violet-300"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-1 text-sm text-zinc-400">{current.tagline}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-3 py-1 text-xs font-semibold text-white shadow-lg shadow-violet-600/25">
              موقع كامل {current.sitePrice}
            </span>
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-zinc-300">
              صفحة واحدة {current.pagePrice}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {templates.length > 1 && (
            <>
              <button
                onClick={() => setPaused((v) => !v)}
                aria-label={paused ? "تشغيل التبديل" : "إيقاف التبديل مؤقتًا"}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-zinc-200 transition-colors hover:bg-white/10"
              >
                {paused ? (
                  <svg viewBox="0 0 24 24" className="h-4 w-4 rtl:-scale-x-100" fill="currentColor">
                    <path d="M7 5.5v13a1 1 0 0 0 1.5.9l11-6.5a1 1 0 0 0 0-1.8l-11-6.5A1 1 0 0 0 7 5.5Z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                    <rect x="6" y="5" width="4" height="14" rx="1" />
                    <rect x="14" y="5" width="4" height="14" rx="1" />
                  </svg>
                )}
              </button>
              <button
                onClick={() => goTo(active - 1)}
                aria-label="القالب السابق"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-zinc-200 transition-colors hover:bg-white/10"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 rtl:-scale-x-100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 6l-6 6 6 6" />
                </svg>
              </button>
              <button
                onClick={() => goTo(active + 1)}
                aria-label="القالب التالي"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-zinc-200 transition-colors hover:bg-white/10"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 rtl:-scale-x-100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
              <div className="flex items-center gap-2">
                {templates.map((t, i) => (
                  <button
                    key={t.slug}
                    onClick={() => goTo(i)}
                    aria-label={`إظهار ${t.name}`}
                    className={`h-2 rounded-full transition-all ${
                      i === active
                        ? "w-6 bg-gradient-to-r from-violet-500 to-cyan-400"
                        : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
