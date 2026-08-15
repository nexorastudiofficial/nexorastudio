"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  };

  if (done) {
    return (
      <p className="mx-auto mt-7 max-w-md text-sm text-[#B99A67]">
        أهلاً بك في عالم فيلورا. سنخبرك أولاً عن كل إصدار جديد.
      </p>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="mx-auto mt-7 flex max-w-md flex-col gap-4 sm:flex-row"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="البريد الإلكتروني"
        required
        className="flex-1 border-b border-[#B99A67]/30 bg-transparent px-1 py-3 text-sm outline-none transition-colors placeholder:text-[#A9A198]/60 focus:border-[#B99A67]"
      />
      <button className="w-full bg-[#B99A67] py-3.5 text-[10px] font-medium uppercase tracking-[0.25em] text-[#11100F] transition-opacity hover:opacity-90 sm:w-auto sm:px-8">
        اشترك
      </button>
    </form>
  );
}
