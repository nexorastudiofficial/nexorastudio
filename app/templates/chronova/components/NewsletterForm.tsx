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
        <div className="rounded-xl bg-[#15171A] p-6 text-center text-[#F1F1EE] border border-[#B7A27A]/30">
          <span className="text-2xl text-[#B7A27A]">⌚</span>
          <h3 className="mt-2 font-serif-display text-lg font-medium text-[#B7A27A]">
            أهلاً بك في نادي كرونوفا
          </h3>
          <p className="mt-1 text-xs text-[#8E9298]">
            تم تسجيل بريدك بنجاح. ستصلك تحديثات الإصدارات المحدودة وعروض الساعات الحصرية أولاً.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="أدخل بريدك الإلكتروني لتلقي الإصدارات الجديدة..."
            required
            className="flex-1 rounded-full border border-[#292C30] bg-[#15171A] px-5 py-3.5 text-xs text-[#F1F1EE] outline-none placeholder:text-[#8E9298]/60 focus:border-[#B7A27A]"
          />
          <button
            type="submit"
            className="rounded-full bg-[#B7A27A] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#0C0D0F] transition-all hover:brightness-110 shadow-lg shadow-[#B7A27A]/20"
          >
            انضم الآن
          </button>
        </form>
      )}
    </div>
  );
}
