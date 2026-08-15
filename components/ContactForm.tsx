"use client";

import { useState } from "react";

const inputClass =
  "mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-zinc-500 focus:border-violet-400/50 focus:bg-white/[0.05]";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setStatus("sending");
    setError("");

    const body = new FormData();
    body.append("name", name);
    body.append("email", email);
    body.append("phone", phone);
    body.append("message", message);
    body.append("_subject", `رسالة جديدة من ${name}`);
    body.append("_replyto", email);
    body.append("_captcha", "false");
    body.append("_honey", "");

    try {
      const res = await fetch(
        "https://formsubmit.co/ajax/nexorastudiofficial@gmail.com",
        { method: "POST", body }
      );
      const data = await res.json();
      if (!res.ok || data.success !== "true") {
        if (String(data.message || "").toLowerCase().includes("activation")) {
          throw new Error(
            "تحقق من بريدك الإلكتروني واضغط رابط تفعيل النموذج ثم أعد المحاولة."
          );
        }
        throw new Error("فشل الإرسال");
      }
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "تعذّر إرسال الرسالة. حاول مجدداً."
      );
    }
  };

  if (status === "done") {
    return (
      <div className="flex flex-col items-center gap-5 rounded-2xl border border-violet-400/25 bg-white/[0.03] py-20 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/40 text-cyan-300">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <p className="text-2xl font-semibold text-white">شكراً على تواصلك.</p>
        <p className="max-w-sm text-sm text-zinc-400">
          سأعود إليك خلال 24 ساعة على الأكثر. يمكنك أيضاً التواصل المباشر عبر
          صفحة فيسبوك.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <label htmlFor="ct-name" className="text-sm text-zinc-200">
          الاسم الكامل
        </label>
        <input
          id="ct-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="اسمك"
          className={inputClass}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="ct-email" className="text-sm text-zinc-200">
            البريد الإلكتروني
          </label>
          <input
            id="ct-email"
            type="email"
            dir="ltr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@email.com"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="ct-phone" className="text-sm text-zinc-200">
            رقم الهاتف <span className="text-zinc-500">(اختياري)</span>
          </label>
          <input
            id="ct-phone"
            type="tel"
            dir="ltr"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="05 XX XX XX XX"
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label htmlFor="ct-message" className="text-sm text-zinc-200">
          حدثني عن مشروعك
        </label>
        <textarea
          id="ct-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={6}
          placeholder="نوع الموقع، الأفكار، المدة، الميزانية…"
          className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-zinc-500 focus:border-violet-400/50 focus:bg-white/[0.05]"
        />
      </div>
      {status === "error" && (
        <p className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
          {error}
        </p>
      )}
      <button
        disabled={status === "sending"}
        className="w-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 py-4 text-sm font-semibold text-white shadow-xl shadow-violet-600/25 transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "جارٍ الإرسال…" : "إرسال الرسالة"}
      </button>
    </form>
  );
}
