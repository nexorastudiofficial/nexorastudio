"use client";

import { useState } from "react";

export default function FindYourFitModal({
  isOpen,
  onClose,
  onSelectSize,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelectSize?: (size: string) => void;
}) {
  const [usualSize, setUsualSize] = useState("42");
  const [brand, setBrand] = useState("Nike");
  const [width, setWidth] = useState<"narrow" | "regular" | "wide">("regular");
  const [result, setResult] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCalculate = () => {
    let sizeNum = parseInt(usualSize, 10);
    // Nike runs snug, Adidas true, Wide feet need +0.5/1 size
    if (brand === "Nike" && width === "wide") {
      sizeNum += 1;
    } else if (width === "wide") {
      sizeNum += 0.5;
    }
    const finalSize = Math.round(sizeNum).toString();
    setResult(finalSize);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-[#F4F2ED] p-6 sm:p-8 text-[#171817] shadow-2xl border border-[#D8D5CC] animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#D8D5CC] pb-4">
          <div className="flex items-center gap-2">
            <span className="text-[#D6FF3F] bg-[#101112] px-2 py-0.5 rounded text-xs font-bold">
              AI FIT
            </span>
            <h3 className="font-bold text-base uppercase tracking-wider">
              أداة قياس المقاس المثالي (FIND YOUR FIT)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-xs text-[#777873] hover:text-[#171817] p-1"
          >
            ✕ إغلاق
          </button>
        </div>

        {result ? (
          <div className="mt-6 text-center py-6">
            <span className="text-4xl">🎯</span>
            <p className="mt-2 text-xs font-mono uppercase tracking-widest text-[#777873]">
              المقاس الموصى به لك في AVERO
            </p>
            <div className="mt-2 font-mono text-5xl font-extrabold text-[#101112]">
              EU {result}
            </div>
            <p className="mt-3 text-xs text-[#777873] max-w-xs mx-auto">
              بناءً على اختيارك لعلامة ({brand}) وطبيعة قدمك ({width === "wide" ? "عريضة" : width === "narrow" ? "ضيقة" : "عادية"}).
            </p>

            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => {
                  if (onSelectSize) onSelectSize(result);
                  onClose();
                }}
                className="rounded-full bg-[#101112] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-[#D6FF3F] hover:brightness-125"
              >
                تطبيق مقاس {result} والمتابعة
              </button>
              <button
                onClick={() => setResult(null)}
                className="rounded-full border border-[#D8D5CC] px-5 py-3.5 text-xs font-medium text-[#777873] hover:text-[#171817]"
              >
                إعادة الحساب
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-6 space-y-5 text-xs">
            {/* Question 1: Usual Size */}
            <div>
              <label className="block font-bold text-[#171817] mb-2 uppercase tracking-wide">
                1. ما هو مقاسك المعتاد في الأحذية الرياضية؟
              </label>
              <div className="grid grid-cols-7 gap-1.5">
                {["39", "40", "41", "42", "43", "44", "45"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setUsualSize(s)}
                    className={`py-2 rounded font-mono font-bold transition-all ${
                      usualSize === s
                        ? "bg-[#101112] text-[#D6FF3F]"
                        : "bg-white border border-[#D8D5CC] text-[#171817] hover:border-[#101112]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2: Usual Brand */}
            <div>
              <label className="block font-bold text-[#171817] mb-2 uppercase tracking-wide">
                2. ما هي الماركة التي ترتديها غالباً؟
              </label>
              <div className="grid grid-cols-4 gap-2">
                {["Nike", "Adidas", "New Balance", "Puma"].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBrand(b)}
                    className={`py-2 rounded font-semibold transition-all ${
                      brand === b
                        ? "bg-[#101112] text-[#D6FF3F]"
                        : "bg-white border border-[#D8D5CC] text-[#171817] hover:border-[#101112]"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 3: Foot Width */}
            <div>
              <label className="block font-bold text-[#171817] mb-2 uppercase tracking-wide">
                3. كيف تصف عرض وطبيعة قدمك؟
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: "narrow", label: "ضيقة / رفيعة" },
                  { key: "regular", label: "عادية / قياسية" },
                  { key: "wide", label: "عريضة / واسعة" },
                ].map((w) => (
                  <button
                    key={w.key}
                    type="button"
                    onClick={() => setWidth(w.key as "narrow" | "regular" | "wide")}
                    className={`py-2.5 rounded font-medium transition-all ${
                      width === w.key
                        ? "bg-[#101112] text-[#D6FF3F]"
                        : "bg-white border border-[#D8D5CC] text-[#171817] hover:border-[#101112]"
                    }`}
                  >
                    {w.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleCalculate}
              className="mt-4 w-full rounded-full bg-[#101112] py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#D6FF3F] hover:brightness-125 transition-all shadow-md"
            >
              احسب مقاسي المثالي الآن
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
