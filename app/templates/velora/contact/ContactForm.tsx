"use client";

import { useState } from "react";

const inputClass =
  "mt-2 w-full border border-[#332F2A] bg-[#11100F] px-4 py-3.5 text-sm text-[#F3EEE6] outline-none transition-colors placeholder:text-[#A9A198]/50 focus:border-[#B99A67]";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setDone(true);
  };

  if (done) {
    return (
      <div className="flex flex-col items-center gap-5 border border-[#B99A67]/50 bg-[#1A1816] py-20 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#B99A67] text-[#B99A67]">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <p className="font-serif-display text-2xl font-light text-[#F3EEE6]">
          شكراً لتواصلك معنا.
        </p>
        <p className="max-w-sm text-sm text-[#A9A198]">
          سنعود إليك في أقرب وقت ممكن. فريق فيلورا متاح دائماً لمساعدتك.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <label htmlFor="c-name" className="text-sm text-[#F3EEE6]">
          الاسم الكامل
        </label>
        <input
          id="c-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="الاسم واللقب"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="c-email" className="text-sm text-[#F3EEE6]">
          البريد الإلكتروني
        </label>
        <input
          id="c-email"
          type="email"
          dir="ltr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@email.com"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="c-message" className="text-sm text-[#F3EEE6]">
          رسالتك
        </label>
        <textarea
          id="c-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          placeholder="كيف يمكننا مساعدتك؟"
          className="mt-2 w-full resize-none border border-[#332F2A] bg-[#11100F] px-4 py-3.5 text-sm text-[#F3EEE6] outline-none transition-colors placeholder:text-[#A9A198]/50 focus:border-[#B99A67]"
        />
      </div>
      <button className="w-full bg-[#B99A67] py-4 text-xs font-medium uppercase tracking-[0.3em] text-[#11100F] transition-colors hover:bg-[#C9AA76]">
        إرسال
      </button>
    </form>
  );
}
