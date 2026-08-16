"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/public/logo.png";

const links = [
  { label: "خدماتنا", href: "#features" },
  { label: "أعمالنا", href: "#work" },
  { label: "كيف أعمل", href: "#how-it-works" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#05060b]/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="group flex items-center gap-2.5">
          <Image
            src={logo}
            alt="NexoraStudio"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />

          <span className="text-lg font-semibold tracking-tight text-white">
            NexoraStudio
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#cta"
            data-pixel-event="Lead"
            data-pixel-button="Order Website Header CTA"
            className="rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-violet-600/25 transition-all hover:shadow-violet-500/50 hover:brightness-110"
          >
            اطلب موقعك
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-300 md:hidden"
          aria-label="القائمة"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <path d="M6 6l12 12M18 6 6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-[#05060b]/95 px-6 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm text-zinc-300 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#cta"
              onClick={() => setOpen(false)}
              className="rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-2 text-center text-sm font-medium text-white"
            >
              اطلب موقعك
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
