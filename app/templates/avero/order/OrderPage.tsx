"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AveroHeader from "../AveroHeader";
import AveroFooter from "../AveroFooter";
import { useCart } from "../cart/CartContext";
import { money } from "../data/money";
import { trackPurchase } from "@/lib/pixel";

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

  const deliveryFee = subtotal >= 15000 ? 0 : 500;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !city || !address) return;

    const fakeOrderNum = "AVR-" + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(fakeOrderNum);
    trackPurchase({
      value: total,
      order_id: fakeOrderNum,
      num_items: count,
      currency: "DZD",
    });
    setSubmitted(true);
    clear();
  };

  return (
    <div className="min-h-full bg-[#F4F2ED] text-[#171817] antialiased">
      <AveroHeader />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        {submitted ? (
          /* Order Confirmation Screen */
          <div className="rounded-2xl bg-white p-8 sm:p-12 text-center border border-[#D8D5CC] max-w-2xl mx-auto shadow-2xl animate-in zoom-in-95">
            <span className="text-5xl">⚡</span>
            <span className="mt-4 block text-xs font-mono font-extrabold uppercase tracking-widest text-[#101112]">
              تم تسجيل طلبك وتجهيز الشحنة!
            </span>
            <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#171817]">
              شكراً لاختيارك AVERO
            </h1>
            <p className="mt-2 text-xs text-[#777873] font-mono">
              رقم الطلب: <span className="font-bold text-[#101112]">{orderNumber}</span>
            </p>

            <div className="mt-6 rounded-xl bg-[#F4F2ED] p-5 text-xs text-[#171817] text-right space-y-2.5 border border-[#D8D5CC]">
              <p>👤 <strong>الاسم:</strong> {fullName}</p>
              <p>📞 <strong>الهاتف:</strong> <span className="font-mono">{phone}</span></p>
              <p>📍 <strong>العنوان:</strong> {wilaya} — {city} ({address})</p>
              <p>💵 <strong>المبلغ المطلوب عند الاستلام:</strong> <span className="font-bold text-lg">{money(total)}</span></p>
            </div>

            <p className="mt-6 text-xs text-[#777873] leading-relaxed">
              📞 سيتصل بك فريق التوصيل لتأكيد الشحنة. يمكنك فحص الحذاء وتجربة المقاس عند وصول المندوب.
            </p>

            <div className="mt-8 flex justify-center">
              <Link
                href="/templates/avero"
                className="rounded-full bg-[#101112] px-8 py-3.5 text-xs font-extrabold uppercase tracking-wider text-[#D6FF3F] hover:brightness-125 transition-all shadow-md"
              >
                العودة إلى المتجر
              </Link>
            </div>
          </div>
        ) : (
          /* Order Form */
          <div>
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#777873] bg-[#E9E7E0] px-3 py-1 rounded-full">
                COD CHECKOUT
              </span>
              <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#171817]">
                إتمام الطلب والشحن (CHECKOUT)
              </h1>
              <p className="mt-2 text-xs text-[#777873]">
                الدفع عند الاستلام مع إمكانية تجربة القياس وفحص الحذاء بحضور المندوب.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-10 lg:grid-cols-12">
              {/* Left Column: Form Fields (7 cols) */}
              <div className="space-y-8 lg:col-span-7">
                {/* 01 — Contact */}
                <div className="rounded-2xl bg-white p-6 border border-[#D8D5CC] shadow-xs">
                  <div className="flex items-center gap-2 mb-4 border-b border-[#D8D5CC] pb-3">
                    <span className="font-mono text-lg font-black text-[#101112]">01</span>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-[#171817]">
                      معلومات الاتصال
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[#171817] mb-1">
                        الاسم واللقب <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="الاسم الكامل"
                        className="w-full rounded-xl border border-[#D8D5CC] bg-[#F4F2ED] px-4 py-3 text-xs text-[#171817] outline-none focus:border-[#101112]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#171817] mb-1">
                        رقم الهاتف للتأكيد <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        dir="ltr"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="05 / 06 / 07 XX XX XX XX"
                        className="w-full rounded-xl border border-[#D8D5CC] bg-[#F4F2ED] px-4 py-3 text-xs text-[#171817] outline-none focus:border-[#101112] font-mono text-left"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#171817] mb-1">
                        البريد الإلكتروني (لتتبع الشحنة)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                        className="w-full rounded-xl border border-[#D8D5CC] bg-[#F4F2ED] px-4 py-3 text-xs text-[#171817] outline-none focus:border-[#101112]"
                      />
                    </div>
                  </div>
                </div>

                {/* 02 — Delivery */}
                <div className="rounded-2xl bg-white p-6 border border-[#D8D5CC] shadow-xs">
                  <div className="flex items-center gap-2 mb-4 border-b border-[#D8D5CC] pb-3">
                    <span className="font-mono text-lg font-black text-[#101112]">02</span>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-[#171817]">
                      عنوان التوصيل
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[#171817] mb-1">
                        الولاية <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={wilaya}
                        onChange={(e) => setWilaya(e.target.value)}
                        className="w-full rounded-xl border border-[#D8D5CC] bg-[#F4F2ED] px-4 py-3 text-xs text-[#171817] outline-none focus:border-[#101112]"
                      >
                        {algerianWilayas.map((w) => (
                          <option key={w} value={w}>
                            {w}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#171817] mb-1">
                        البلدية / المدينة <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="البلدية"
                        className="w-full rounded-xl border border-[#D8D5CC] bg-[#F4F2ED] px-4 py-3 text-xs text-[#171817] outline-none focus:border-[#101112]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#171817] mb-1">
                        العنوان التفصيلي <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="الحي، رقم العمارة، الطابق..."
                        className="w-full rounded-xl border border-[#D8D5CC] bg-[#F4F2ED] px-4 py-3 text-xs text-[#171817] outline-none focus:border-[#101112]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#171817] mb-1">
                        ملاحظات خاصة بالتسليم (اختياري)
                      </label>
                      <input
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="تعليمات للمندوب أو أوقات مفضلة..."
                        className="w-full rounded-xl border border-[#D8D5CC] bg-[#F4F2ED] px-4 py-3 text-xs text-[#171817] outline-none focus:border-[#101112]"
                      />
                    </div>
                  </div>
                </div>

                {/* 03 — Payment */}
                <div className="rounded-2xl bg-white p-6 border border-[#D8D5CC] shadow-xs">
                  <div className="flex items-center gap-2 mb-3 border-b border-[#D8D5CC] pb-3">
                    <span className="font-mono text-lg font-black text-[#101112]">03</span>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-[#171817]">
                      طريقة الدفع
                    </h2>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-[#F4F2ED] p-4 border border-[#D8D5CC]">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">💵</span>
                      <div>
                        <p className="text-xs font-bold text-[#171817]">الدفع نقدًا عند الاستلام (COD)</p>
                        <p className="text-[10px] text-[#777873]">تجربة القياس والمعاينة قبل الدفع للمندوب</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-[#101112] text-[#D6FF3F] px-2.5 py-0.5 text-[9px] font-mono font-bold">
                      مفعّل
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary (5 cols) */}
              <div className="lg:col-span-5">
                <div className="sticky top-28 rounded-2xl bg-white p-6 border border-[#D8D5CC] shadow-xs">
                  <h2 className="text-base font-extrabold uppercase tracking-wider text-[#171817] border-b border-[#D8D5CC] pb-3">
                    ملخص الحقيبة ({count})
                  </h2>

                  {items.length === 0 ? (
                    <div className="py-8 text-center text-xs text-[#777873]">
                      حقيبتك فارغة.
                      <Link
                        href="/templates/avero/collections/all"
                        className="block mt-2 font-bold text-[#101112] underline"
                      >
                        تصفح الأحذية وأضف ما يناسبك
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className="divide-y divide-[#D8D5CC] max-h-60 overflow-y-auto my-4 pr-1">
                        {items.map((item, idx) => (
                          <div key={idx} className="flex gap-3 py-3">
                            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[#E9E7E0]">
                              <Image
                                src={item.img}
                                alt={item.name}
                                fill
                                sizes="60px"
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-bold text-[#171817] truncate">
                                {item.name}
                              </p>
                              <p className="text-[10px] text-[#777873]">
                                {item.color} · مقاس: <strong className="text-[#171817]">{item.size}</strong> · الكمية: {item.qty}
                              </p>
                              <p className="text-xs font-extrabold text-[#171817] mt-1">
                                {money(item.price * item.qty)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Breakdown */}
                      <div className="border-t border-[#D8D5CC] pt-4 space-y-2 text-xs">
                        <div className="flex justify-between text-[#777873]">
                          <span>المجموع الفرعي:</span>
                          <span className="font-bold text-[#171817]">{money(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-[#777873]">
                          <span>الشحن والتوصيل:</span>
                          <span>
                            {deliveryFee === 0 ? (
                              <strong className="text-emerald-600 font-bold">مجاني 🎉</strong>
                            ) : (
                              money(deliveryFee)
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between border-t border-[#D8D5CC] pt-2 text-sm font-extrabold text-[#171817]">
                          <span>المبلغ الإجمالي:</span>
                          <span className="text-lg font-black text-[#101112]">{money(total)}</span>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={items.length === 0}
                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#101112] py-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[#D6FF3F] hover:brightness-125 transition-all disabled:opacity-40 shadow-lg shadow-black/10"
                      >
                        تأكيد طلب الشحن الآن
                        <span aria-hidden>←</span>
                      </button>

                      <p className="mt-3 text-center text-[10px] text-[#777873]">
                        🔒 استبدال مقاس مجاني وسريع خلال 14 يوماً.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </form>
          </div>
        )}
      </main>

      <AveroFooter />
    </div>
  );
}
