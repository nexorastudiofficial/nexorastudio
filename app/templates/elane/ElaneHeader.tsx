"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "./cart/CartContext";

const navLinks = [
  { label: "وصل حديثًا", href: "/templates/elane/collections/all" },
  { label: "نساء", href: "/templates/elane/collections/women" },
  { label: "رجال", href: "/templates/elane/collections/men" },
  { label: "إكسسوارات", href: "/templates/elane/collections/accessories" },
];

export default function ElaneHeader() {
  const [open, setOpen] = useState(false);
  const { count, hydrated, openCart } = useCart();

  return (
    <header className="sticky top-0 z-30 border-b border-[#242321]/10 bg-[#F7F3ED]/90 backdrop-blur">
      <div className="relative mx-auto grid h-16 max-w-6xl grid-cols-3 items-center px-4 sm:px-6 lg:flex lg:justify-between">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center justify-self-start text-[#242321] lg:hidden"
        >
          {open ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>

        <a
          href="/templates/elane"
          className="font-serif-display justify-self-center text-2xl tracking-[0.2em]"
        >
          ÉLANÉ
        </a>

        <nav className="hidden items-center gap-8 text-xs font-medium uppercase tracking-[0.18em] text-[#242321]/70 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-[#242321]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1 justify-self-end sm:gap-2 lg:gap-5">
          <Link
            href="/templates/elane/collections/all"
            aria-label="تسوّق الكل"
            className="flex h-10 w-10 items-center justify-center"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </Link>
          <Link
            href="/templates/elane/orders"
            aria-label="طلباتي"
            className="hidden h-10 w-10 items-center justify-center sm:flex"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
            </svg>
          </Link>
          <button
            onClick={openCart}
            aria-label="فتح الحقيبة"
            className="relative flex h-10 w-10 items-center justify-center"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 7 8 3h8l2 4" />
              <path d="M6 7h12l-1 13a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 7Z" />
            </svg>
            {hydrated && count > 0 && (
              <span className="absolute left-0.5 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#242321] px-1 text-[9px] text-[#F7F3ED]">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-[#242321]/10 bg-[#F7F3ED] px-6 py-4 lg:hidden">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-sm font-medium uppercase tracking-[0.18em] text-[#242321]/80 transition-colors hover:text-[#242321]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Link
            href="/templates/elane/collections/all"
            onClick={() => setOpen(false)}
            className="mt-3 block border border-[#242321] py-3 text-center text-xs font-medium uppercase tracking-[0.2em]"
          >
            تسوّق المجموعة
          </Link>
        </nav>
      )}
    </header>
  );
}
