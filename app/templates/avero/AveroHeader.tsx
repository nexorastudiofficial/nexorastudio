"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "./cart/CartContext";

const navLinks = [
  { label: "رجال (MEN)", href: "/templates/avero/collections/men" },
  { label: "نساء (WOMEN)", href: "/templates/avero/collections/women" },
  { label: "الجري والسرعة (RUN)", href: "/templates/avero/collections/running" },
  { label: "التمارين والنوادي (TRAIN)", href: "/templates/avero/collections/training" },
  { label: "ستريت وير (LIFESTYLE)", href: "/templates/avero/collections/lifestyle" },
];

export default function AveroHeader() {
  const [open, setOpen] = useState(false);
  const { count, openCart, hydrated } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-[#F4F2ED]/95 backdrop-blur-md transition-all border-b border-[#D8D5CC]">
      {/* Announcement Bar */}
      <div className="bg-[#101112] px-4 py-2 text-center text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#D6FF3F] sm:text-xs">
        <span>⚡ شحن مجاني للطلبات فوق 15,000 دج · الدفع عند الاستلام مع إمكانية القياس والتجربة 👟</span>
      </div>

      {/* Main Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 sm:py-4">
        {/* Mobile Hamburger */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setOpen(!open)}
            aria-label="القائمة"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#171817] hover:bg-black/5"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
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
            href="/templates/avero"
            className="flex items-center gap-1.5 font-extrabold text-2xl sm:text-3xl tracking-[0.2em] text-[#171817] uppercase"
          >
            <span>AVERO</span>
            <span className="text-sm text-[#D6FF3F] bg-[#101112] rounded px-1">▲</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 text-xs font-bold uppercase tracking-[0.15em] text-[#777873] lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-[#171817] relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:origin-center after:scale-x-0 after:bg-[#101112] after:transition-transform hover:after:scale-x-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/templates/avero/collections/all"
            aria-label="بحث"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#171817] hover:bg-black/5 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </Link>

          <Link
            href="/templates/avero/order"
            aria-label="الطلبات"
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full text-[#171817] hover:bg-black/5 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </Link>

          {/* Cart Button */}
          <button
            onClick={openCart}
            aria-label="فتح الحقيبة"
            className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#101112] text-[#F4F2ED] hover:brightness-125 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 7 8 3h8l2 4" />
              <path d="M6 7h12l-1 13a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 7Z" />
            </svg>
            {hydrated && count > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#D6FF3F] px-1 text-[9px] font-extrabold text-[#101112] shadow-xs">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {open && (
        <div className="border-t border-[#D8D5CC] bg-[#F4F2ED] px-6 py-4 lg:hidden animate-in slide-in-from-top duration-200">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm font-bold uppercase tracking-[0.18em] text-[#171817] hover:text-[#101112]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 border-t border-[#D8D5CC]">
              <Link
                href="/templates/avero/order"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#101112]"
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
