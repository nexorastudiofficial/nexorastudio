"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NoliHeader from "../NoliHeader";
import NoliFooter from "../NoliFooter";
import { useCart } from "../cart/CartContext";
import { money } from "../data/money";

const algerianWilayas = [
  "01 - أدرار", "02 - الشلف", "03 - الأغواط", "04 - أم البواقي", "05 - باتنة",
  "06 - بجاية", "07 - بسكرة", "08 - بشار", "09 - البليدة", "10 - البويرة",
  "11 - تمنراست", "12 - تبسة", "13 - تلمسان", "14 - تيارت", "15 - تيزي وزو",
  "16 - الجزائر العاصمة", "17 - الجلفة", "18 - جيجل", "19 - سطيف", "20 - سعيدة",
  "21 - سكيكدة", "22 - سيدي بلعباس", "23 - عنابة", "24 - قالمة", "25 - قسنطينة",
  "26 - المدية", "27 - مستغانم", "28 - المسيلة", "29 - معسكر", "30 - ورقلة",
  "31 - وهران", "32 - البيض", "33 - إليزي", "34 - برج بوعريريج", "35 - بومرداس",
  "36 - الطارف", "37 - تندوف", "38 - تيسمسيلت", "39 - الوادي", "40 - خنشلة",
  "41 - سوق أهراس", "42 - تيبازة", "43 - ميلة", "44 - عين الدفلى", "45 - النعامة",
  "46 - عين تموشنت", "47 - غرداية", "48 - غليزان", "49 - تيميمون", "50 - برج باجي مختار",
  "51 - أولاد جلال", "52 - بني عباس", "53 - عين صالح", "54 - عين قزام", "55 - تقرت",
  "56 - جانت", "57 - المغير", "58 - المنيعة"
];

export default function OrderPage() {
  const { items, subtotal, clear, count } = useCart();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [wilaya, setWilaya] = useState("16 - الجزائر العاصمة");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const deliveryFee = subtotal >= 5000 ? 0 : 500;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !city || !address) return;

    const fakeOrderNum = "NOLI-" + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(fakeOrderNum);
    setSubmitted(true);
    clear();
  };

  return (
    <div className="min-h-full bg-[#FAF7F2] text-[#30312D] antialiased">
      <NoliHeader />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        {submitted ? (
          /* Order Confirmation Screen */
          <div className="rounded-2xl bg-white p-8 sm:p-12 text-center shadow-xs border border-[#30312D]/10 max-w-2xl mx-auto animate-in zoom-in-95">
            <span className="text-5xl">🎉</span>
            <span className="mt-4 block text-xs font-semibold uppercase tracking-widest text-[#8A725F]">
              تم تسجيل طلبك بنجاح!
            </span>
            <h1 className="mt-2 font-serif-display text-3xl sm:text-4xl text-[#30312D]">
              شكراً لثقتك في NOLI & CO.
            </h1>
            <p className="mt-2 text-xs text-[#30312D]/60 font-mono">
              رقم الطلب: <span className="font-bold text-[#30312D]">{orderNumber}</span>
            </p>

            <div className="mt-6 rounded-lg bg-[#FAF7F2] p-4 text-xs text-[#30312D]/80 text-right space-y-2 border border-[#30312D]/10">
              <p>👤 <strong>الاسم:</strong> {fullName}</p>
              <p>📞 <strong>الهاتف:</strong> {phone}</p>
              <p>📍 <strong>عنوان التوصيل:</strong> {wilaya} — {city} ({address})</p>
              <p>💵 <strong>المبلغ الإجمالي المطلوب:</strong> {money(total)} (الدفع عند الاستلام)</p>
            </div>

            <p className="mt-6 text-xs text-[#8A725F] leading-relaxed">
              📞 سيتصل بك فريق خدمة العملاء خلال ساعات قليلة لتأكيد الطلب وترتيب موعد التوصيل لمنزلك.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/templates/noli"
                className="rounded-full bg-[#30312D] px-8 py-3.5 text-xs font-medium uppercase tracking-wider text-[#FAF7F2] hover:bg-[#8A725F] transition-colors"
              >
                العودة للمتجر
              </Link>
            </div>
          </div>
        ) : (
          /* Order Form */
          <div>
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#8A725F]">
                الدفع عند الاستلام
              </span>
              <h1 className="mt-2 font-serif-display text-3xl sm:text-4xl">
                إتمام الطلب والتوصيل
              </h1>
              <p className="mt-2 text-xs text-[#30312D]/60">
                املأ بياناتك بدقة وسيتم شحن طلبك إلى باب منزلك مع إمكانية المعاينة قبل الدفع.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-10 lg:grid-cols-12">
              {/* Form inputs (7 cols) */}
              <div className="space-y-8 lg:col-span-7">
                {/* 01 — Contact */}
                <div className="rounded-xl bg-white p-6 shadow-xs border border-[#30312D]/10">
                  <div className="flex items-center gap-2 mb-4 border-b border-[#30312D]/10 pb-3">
                    <span className="font-serif-display text-lg text-[#A8B5A0] font-bold">01</span>
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-[#30312D]">
                      معلومات الاتصال
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-[#30312D] mb-1">
                        الاسم واللقب الكامل <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="مثال: ياسمين بن علي"
                        className="w-full rounded-md border border-[#30312D]/20 bg-[#FAF7F2] px-4 py-2.5 text-xs text-[#30312D] outline-none focus:border-[#30312D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#30312D] mb-1">
                        رقم الهاتف للتأكيد <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        dir="ltr"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="05 / 06 / 07 XX XX XX XX"
                        className="w-full rounded-md border border-[#30312D]/20 bg-[#FAF7F2] px-4 py-2.5 text-xs text-[#30312D] outline-none focus:border-[#30312D] font-mono text-left"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#30312D] mb-1">
                        البريد الإلكتروني (اختياري لاستلام التتبع)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                        className="w-full rounded-md border border-[#30312D]/20 bg-[#FAF7F2] px-4 py-2.5 text-xs text-[#30312D] outline-none focus:border-[#30312D]"
                      />
                    </div>
                  </div>
                </div>

                {/* 02 — Delivery */}
                <div className="rounded-xl bg-white p-6 shadow-xs border border-[#30312D]/10">
                  <div className="flex items-center gap-2 mb-4 border-b border-[#30312D]/10 pb-3">
                    <span className="font-serif-display text-lg text-[#A8B5A0] font-bold">02</span>
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-[#30312D]">
                      عنوان التوصيل
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-[#30312D] mb-1">
                        الولاية <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={wilaya}
                        onChange={(e) => setWilaya(e.target.value)}
                        className="w-full rounded-md border border-[#30312D]/20 bg-[#FAF7F2] px-4 py-2.5 text-xs text-[#30312D] outline-none focus:border-[#30312D]"
                      >
                        {algerianWilayas.map((w) => (
                          <option key={w} value={w}>
                            {w}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#30312D] mb-1">
                        البلدية / المدينة <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="مثال: حيدرة، بئر مراد رايس..."
                        className="w-full rounded-md border border-[#30312D]/20 bg-[#FAF7F2] px-4 py-2.5 text-xs text-[#30312D] outline-none focus:border-[#30312D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#30312D] mb-1">
                        العنوان التفصيلي <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="الحي، رقم العمارة، الطابق..."
                        className="w-full rounded-md border border-[#30312D]/20 bg-[#FAF7F2] px-4 py-2.5 text-xs text-[#30312D] outline-none focus:border-[#30312D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#30312D] mb-1">
                        ملاحظات إضافية للمندوب (اختياري)
                      </label>
                      <input
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="أوقات الاتصال المفضلة، تعليمات خاصة..."
                        className="w-full rounded-md border border-[#30312D]/20 bg-[#FAF7F2] px-4 py-2.5 text-xs text-[#30312D] outline-none focus:border-[#30312D]"
                      />
                    </div>
                  </div>
                </div>

                {/* 04 — Payment Method */}
                <div className="rounded-xl bg-white p-6 shadow-xs border border-[#30312D]/10">
                  <div className="flex items-center gap-2 mb-3 border-b border-[#30312D]/10 pb-3">
                    <span className="font-serif-display text-lg text-[#A8B5A0] font-bold">03</span>
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-[#30312D]">
                      طريقة الدفع
                    </h2>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-[#F2E9DC]/60 p-4 border border-[#30312D]/10">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">💵</span>
                      <div>
                        <p className="text-xs font-semibold text-[#30312D]">الدفع نقدًا عند الاستلام (COD)</p>
                        <p className="text-[10px] text-[#30312D]/60">تدفع للمندوب عند وصول الطلب ومعاينته</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-[#A8B5A0] px-2.5 py-0.5 text-[9px] font-bold text-white">
                      مفعّل
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Summary sidebar (5 cols) */}
              <div className="lg:col-span-5">
                <div className="sticky top-28 rounded-xl bg-white p-6 shadow-xs border border-[#30312D]/10">
                  <h2 className="font-serif-display text-lg font-medium text-[#30312D] border-b border-[#30312D]/10 pb-3">
                    ملخص الطلب ({count} منتج)
                  </h2>

                  {items.length === 0 ? (
                    <div className="py-8 text-center text-xs text-[#30312D]/50">
                      حقيبتك فارغة.
                      <Link
                        href="/templates/noli/collections/all"
                        className="block mt-2 font-medium text-[#8A725F] underline"
                      >
                        تصفح المنتجات وأضف ما يعجبك
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className="divide-y divide-[#30312D]/10 max-h-60 overflow-y-auto my-4 pr-1">
                        {items.map((item, idx) => (
                          <div key={idx} className="flex gap-3 py-3">
                            <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded bg-[#FAF7F2]">
                              <Image
                                src={item.img}
                                alt={item.name}
                                fill
                                sizes="50px"
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-medium text-[#30312D] truncate">
                                {item.name}
                              </p>
                              <p className="text-[10px] text-[#30312D]/50">
                                {item.size ? `مقاس: ${item.size}` : ""} {item.color ? `· ${item.color}` : ""} · الكمية: {item.qty}
                              </p>
                              <p className="text-xs font-semibold text-[#30312D] mt-1">
                                {money(item.price * item.qty)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Pricing breakdown */}
                      <div className="border-t border-[#30312D]/10 pt-4 space-y-2 text-xs">
                        <div className="flex justify-between text-[#30312D]/70">
                          <span>المجموع الفرعي:</span>
                          <span>{money(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-[#30312D]/70">
                          <span>رسوم التوصيل:</span>
                          <span>
                            {deliveryFee === 0 ? (
                              <strong className="text-[#A8B5A0]">مجاني 🎉</strong>
                            ) : (
                              money(deliveryFee)
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between border-t border-[#30312D]/10 pt-2 text-sm font-semibold text-[#30312D]">
                          <span>المبلغ الإجمالي:</span>
                          <span className="font-serif-display text-lg">{money(total)}</span>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={items.length === 0}
                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#30312D] py-4 text-xs font-medium uppercase tracking-[0.2em] text-[#FAF7F2] hover:bg-[#8A725F] transition-colors disabled:opacity-40 shadow-sm"
                      >
                        تأكيد الطلب الآن
                        <span aria-hidden>←</span>
                      </button>

                      <p className="mt-3 text-center text-[10px] text-[#30312D]/50">
                        🔒 نضمن لك سرية بياناتك وسرعة التواصل لتأكيد الشحن.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </form>
          </div>
        )}
      </main>

      <NoliFooter />
    </div>
  );
}
