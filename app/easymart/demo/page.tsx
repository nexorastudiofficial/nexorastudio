"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";

const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61591467674620";

export default function EasyMartDemoPage() {
  const [activeTab, setActiveTab] = useState<"pos" | "products" | "suppliers" | "analytics">("pos");
  const [iframeKey, setIframeKey] = useState(0);

  const demoPages = [
    { id: "pos" as const, label: "نقطة البيع (POS)", hash: "#/pos" },
    { id: "products" as const, label: "إدارة المنتجات (Products)", hash: "#/products" },
    { id: "suppliers" as const, label: "الموردون (Suppliers)", hash: "#/suppliers" },
    { id: "analytics" as const, label: "إحصائيات المبيعات (Sales Analytics)", hash: "#/analytics?tab=sales" },
  ];

  const currentRoute = `/easymart-demo/index.html?standalone=1${demoPages.find(p => p.id === activeTab)?.hash || "#/pos"}`;

  const reloadDemo = () => {
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className="flex h-screen flex-col bg-[#05060b] text-foreground font-sans overflow-hidden">
      
      {/* Top Demo Bar */}
      <header className="z-20 flex h-14 shrink-0 items-center justify-between border-b border-white/10 bg-[#090b17] px-3 sm:px-6 gap-3 overflow-x-auto scrollbar-none">
        
        {/* Brand & Title */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Link href="/easymart" className="flex items-center gap-2 group shrink-0 whitespace-nowrap">
            <Image
              src="/easymart-logo.png"
              alt="EasyMart Pro Logo"
              width={26}
              height={26}
              className="h-6 w-6 object-contain"
            />
            <span className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-400 transition-colors whitespace-nowrap">
              EasyMart Pro
            </span>
          </Link>

          <span className="text-zinc-600">/</span>

          <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400 whitespace-nowrap shrink-0">
            ● تجربة حية للسوبرماركت
          </span>
        </div>

        {/* 4 Dedicated Page Switcher Buttons */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10 shrink-0">
          {demoPages.map((page) => (
            <button
              key={page.id}
              onClick={() => setActiveTab(page.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                activeTab === page.id
                  ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold shadow-md"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {page.label}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <button
            onClick={reloadDemo}
            title="إعادة تحميل التجربة"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-white/10 hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
              <path d="M8 16H3v5" />
            </svg>
            <span className="whitespace-nowrap">إعادة ضبط</span>
          </button>

          <a
            href={currentRoute}
            target="_blank"
            rel="noopener noreferrer"
            title="فتح في نافذة كاملة مستقلة"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-white/10 hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5 shrink-0"
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
            <span className="whitespace-nowrap">نافذة كاملة</span>
          </a>

          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md shadow-cyan-500/20 hover:scale-105 transition-all whitespace-nowrap shrink-0"
          >
            طلب البرنامج
          </a>
        </div>
      </header>

      {/* Mobile Page Tabs */}
      <div className="flex lg:hidden overflow-x-auto border-b border-white/10 bg-[#070913] p-2 gap-1.5 scrollbar-none">
        {demoPages.map((page) => (
          <button
            key={page.id}
            onClick={() => setActiveTab(page.id)}
            className={`shrink-0 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === page.id
                ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {page.label}
          </button>
        ))}
      </div>

      {/* Main Interactive Demo Container */}
      <main className="relative flex-1 w-full bg-[#030408] overflow-hidden">
        <iframe
          key={`${activeTab}-${iframeKey}`}
          src={currentRoute}
          title="EasyMart-Pro Interactive Shell"
          className="h-full w-full border-0"
          allow="clipboard-read; clipboard-write"
        />
      </main>

    </div>
  );
}