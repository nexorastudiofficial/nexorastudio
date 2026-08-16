"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
  };

  return (
    <div className="mx-auto max-w-xl">
      {done ? (
        <div className="rounded-lg bg-[#A8B5A0]/20 p-6 text-center text-[#30312D] border border-[#A8B5A0]/30">
          <span className="text-2xl">💌</span>
          <h3 className="mt-2 font-serif-display text-lg font-medium">أهلاً بك في نادي نولي!</h3>
          <p className="mt-1 text-xs text-[#30312D]/70">
            تم تسجيل بريدك الإلكتروني بنجاح. ستصلك عروضنا الخاصة وأفكار الهدايا قريباً.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="أدخل بريدك الإلكتروني..."
            required
            className="flex-1 rounded-full border border-[#30312D]/20 bg-white px-5 py-3.5 text-xs text-[#30312D] outline-none placeholder:text-[#30312D]/40 focus:border-[#30312D] shadow-xs"
          />
          <button
            type="submit"
            className="rounded-full bg-[#30312D] px-8 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-[#FAF7F2] transition-colors hover:bg-[#8A725F] shadow-xs"
          >
            انضم إلينا
          </button>
        </form>
      )}
    </div>
  );
}
