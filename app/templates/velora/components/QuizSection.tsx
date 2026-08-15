"use client";

import { useState } from "react";
import { quizOptions, fragrances } from "../data/fragrances";
import ProductCard from "./ProductCard";

export default function QuizSection() {
  const [picked, setPicked] = useState<string | null>(null);

  const results = picked
    ? quizOptions.find((o) => o.id === picked)?.slugs
        .map((slug) => fragrances.find((f) => f.slug === slug))
        .filter(Boolean)
    : [];

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#B99A67] sm:text-xs">
          اكتشفي توقيعك
        </p>
        <h2 className="mt-4 font-serif-display text-3xl font-light tracking-tight text-[#F3EEE6] sm:text-5xl">
          ابحثي عن عطرك
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-[#A9A198] sm:text-base">
          لستِ متأكدة ما الذي يناسبك؟ أجبِ عن سؤالٍ واحد ودعي فيلورا تقترح عليك
          عطرك المثالي.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-xl text-center">
        <p className="text-sm font-medium text-[#F3EEE6]">
          ما نوع العطر الذي تفضّلين؟
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          {quizOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setPicked(opt.id)}
              className={`border px-6 py-3 text-sm font-medium uppercase tracking-[0.2em] transition-all ${
                picked === opt.id
                  ? "border-[#B99A67] bg-[#B99A67] text-[#11100F]"
                  : "border-[#332F2A] text-[#A9A198] hover:border-[#B99A67] hover:text-[#F3EEE6]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {results && results.length > 0 && (
        <div className="mt-14">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-col items-center gap-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#B99A67] sm:text-xs">
                اخترناها لك بناءً على تفضيلك
              </p>
              <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
                {results.map((f) => f && <ProductCard key={f.slug} fragrance={f} />)}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
