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
        <div className="rounded-2xl bg-[#101112] p-6 text-center text-[#F4F2ED] border border-[#222426]">
          <span className="text-2xl text-[#D6FF3F]">⚡</span>
          <h3 className="mt-2 text-base font-bold uppercase tracking-wider text-[#D6FF3F]">
            أهلاً بك في نادي AVERO RUNNERS
          </h3>
          <p className="mt-1 text-xs text-zinc-400">
            تم تسجيلك بنجاح. ستكون أول من يصله إشعار بمواعيد الإطلاق الجديد (THE NEW DROP) والعروض الحصرية.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="أدخل بريدك الإلكتروني للحصول على إشعارات الإطلاق..."
            required
            className="flex-1 rounded-full border border-[#222426] bg-[#101112] px-6 py-4 text-xs text-[#F4F2ED] outline-none placeholder:text-zinc-500 focus:border-[#D6FF3F]"
          />
          <button
            type="submit"
            className="rounded-full bg-[#D6FF3F] px-8 py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[#101112] transition-all hover:brightness-125 shadow-lg shadow-[#D6FF3F]/15"
          >
            اشترك الآن
          </button>
        </form>
      )}
    </div>
  );
}
