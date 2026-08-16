"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "./cart/CartContext";

const navLinks = [
  { label: "الساعات الذكية", href: "/templates/chronova/collections/smart" },
  { label: "الساعات الكلاسيكية", href: "/templates/chronova/collections/classic" },
  { label: "الأحزمة والإكسسوارات", href: "/templates/chronova/collections/accessories" },
  { label: "جميع المجموعات", href: "/templates/chronova/collections/all" },
];

export default function ChronovaHeader() {
  const [open, setOpen] = useState(false);
  const { count, openCart, hydrated } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-[#0C0D0F]/95 backdrop-blur-md transition-all border-b border-[#292C30]">
      {/* Announcement Bar */}
      <div className="bg-[#15171A] border-b border-[#292C30] px-4 py-2 text-center text-[10px] font-medium tracking-[0.2em] uppercase text-[#B7A27A] sm:text-xs">
        <span>⏱ ضمان دولي شامل لمدة سنتين · توصيل مؤمن ومفحوص لجميع الولايات · الدفع عند الاستلام ⌚</span>
      </div>

      {/* Main Bar */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 sm:py-4">
        {/* Mobile Hamburger Button */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setOpen(!open)}
            aria-label="القائمة الرئيسية"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-300 hover:bg-white/5"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              {open ? (
                <path d="M6 6l12 12M18 6 6 18" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Brand Wordmark */}
        <div className="flex items-center gap-2">
          <Link
            href="/templates/chronova"
            className="flex items-center gap-2 font-serif-display text-2xl sm:text-3xl tracking-[0.2em] text-[#F1F1EE]"
          >
            <span>CHRONOVA</span>
            <span className="text-xs text-[#B7A27A]">✦</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 text-xs font-medium uppercase tracking-[0.2em] text-[#8E9298] lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-[#B7A27A] relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:origin-center after:scale-x-0 after:bg-[#B7A27A] after:transition-transform hover:after:scale-x-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/templates/chronova/collections/all"
            aria-label="بحث"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </Link>

          <Link
            href="/templates/chronova/order"
            aria-label="الطلبات"
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </Link>

          {/* Cart Button */}
          <button
            onClick={openCart}
            aria-label="فتح الحقيبة"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 7 8 3h8l2 4" />
              <path d="M6 7h12l-1 13a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 7Z" />
            </svg>
            {hydrated && count > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#B7A27A] px-1 text-[9px] font-bold text-[#0C0D0F] shadow-xs">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {open && (
        <div className="border-t border-[#292C30] bg-[#0C0D0F] px-6 py-4 lg:hidden animate-in slide-in-from-top duration-200">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm font-medium uppercase tracking-[0.18em] text-[#F1F1EE] hover:text-[#B7A27A]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 border-t border-[#292C30]">
              <Link
                href="/templates/chronova/order"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 py-2 text-xs font-medium uppercase tracking-[0.18em] text-[#B7A27A]"
              >
                <span>📦 متابعة أو إرسال طلب جديد</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
