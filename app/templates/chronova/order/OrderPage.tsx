"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ChronovaHeader from "../ChronovaHeader";
import ChronovaFooter from "../ChronovaFooter";
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

  const deliveryFee = subtotal >= 20000 ? 0 : 600;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !city || !address) return;

    const fakeOrderNum = "CHR-" + Math.floor(100000 + Math.random() * 900000);
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
    <div className="min-h-full bg-[#0C0D0F] text-[#F1F1EE] antialiased">
      <ChronovaHeader />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        {submitted ? (
          /* Order Confirmation Screen */
          <div className="rounded-2xl bg-[#15171A] p-8 sm:p-12 text-center border border-[#B7A27A]/30 max-w-2xl mx-auto shadow-2xl animate-in zoom-in-95">
            <span className="text-5xl text-[#B7A27A]">⌚</span>
            <span className="mt-4 block text-xs font-semibold uppercase tracking-widest text-[#B7A27A]">
              تم تأكيد تسجيل طلبك بنجاح!
            </span>
            <h1 className="mt-2 font-serif-display text-3xl sm:text-4xl text-[#F1F1EE]">
              شكراً لاختيارك CHRONOVA
            </h1>
            <p className="mt-2 text-xs text-[#8E9298] font-mono">
              رقم تتبع الشحنة: <span className="font-bold text-[#B7A27A]">{orderNumber}</span>
            </p>

            <div className="mt-6 rounded-xl bg-[#0C0D0F] p-5 text-xs text-[#8E9298] text-right space-y-2.5 border border-[#292C30]">
              <p>👤 <strong>الاسم:</strong> <span className="text-[#F1F1EE]">{fullName}</span></p>
              <p>📞 <strong>الهاتف:</strong> <span className="text-[#F1F1EE] font-mono">{phone}</span></p>
              <p>📍 <strong>العنوان:</strong> <span className="text-[#F1F1EE]">{wilaya} — {city} ({address})</span></p>
              <p>💵 <strong>المبلغ المطلوب عند الاستلام:</strong> <span className="text-[#B7A27A] font-semibold">{money(total)}</span></p>
            </div>

            <p className="mt-6 text-xs text-[#8E9298] leading-relaxed">
              📞 سيتصل بك مستشار خدمة عملاء كرونوفا هاتفياً لتأكيد تفاصيل العنوان وترتيب موعد تسليم الشحنة المفحوصة والمغلفة بعناية.
            </p>

            <div className="mt-8 flex justify-center">
              <Link
                href="/templates/chronova"
                className="rounded-full bg-[#B7A27A] px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#0C0D0F] hover:brightness-110 transition-all shadow-lg shadow-[#B7A27A]/20"
              >
                العودة إلى المتجر
              </Link>
            </div>
          </div>
        ) : (
          /* Order Form */
          <div>
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#B7A27A]">
                طلب مؤمن مع الضمان
              </span>
              <h1 className="mt-2 font-serif-display text-3xl sm:text-4xl text-[#F1F1EE]">
                إتمام الطلب والشحن
              </h1>
              <p className="mt-2 text-xs text-[#8E9298]">
                الدفع عند الاستلام مع إمكانية فحص الساعة ومعاينتها قبل السداد.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-10 lg:grid-cols-12">
              {/* Left Column (7 cols) */}
              <div className="space-y-8 lg:col-span-7">
                {/* 01 — Contact */}
                <div className="rounded-xl bg-[#15171A] p-6 border border-[#292C30]">
                  <div className="flex items-center gap-2 mb-4 border-b border-[#292C30] pb-3">
                    <span className="font-serif-display text-lg text-[#B7A27A] font-bold">01</span>
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-[#F1F1EE]">
                      بيانات العميل
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-[#F1F1EE] mb-1">
                        الاسم واللقب <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="الاسم الكامل"
                        className="w-full rounded-lg border border-[#292C30] bg-[#0C0D0F] px-4 py-2.5 text-xs text-[#F1F1EE] outline-none focus:border-[#B7A27A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#F1F1EE] mb-1">
                        رقم الهاتف للتأكيد <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="tel"
                        dir="ltr"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="05 / 06 / 07 XX XX XX XX"
                        className="w-full rounded-lg border border-[#292C30] bg-[#0C0D0F] px-4 py-2.5 text-xs text-[#F1F1EE] outline-none focus:border-[#B7A27A] font-mono text-left"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#F1F1EE] mb-1">
                        البريد الإلكتروني (لتلقي تفاصيل الضمان)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                        className="w-full rounded-lg border border-[#292C30] bg-[#0C0D0F] px-4 py-2.5 text-xs text-[#F1F1EE] outline-none focus:border-[#B7A27A]"
                      />
                    </div>
                  </div>
                </div>

                {/* 02 — Delivery */}
                <div className="rounded-xl bg-[#15171A] p-6 border border-[#292C30]">
                  <div className="flex items-center gap-2 mb-4 border-b border-[#292C30] pb-3">
                    <span className="font-serif-display text-lg text-[#B7A27A] font-bold">02</span>
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-[#F1F1EE]">
                      عنوان التوصيل
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-[#F1F1EE] mb-1">
                        الولاية <span className="text-rose-400">*</span>
                      </label>
                      <select
                        value={wilaya}
                        onChange={(e) => setWilaya(e.target.value)}
                        className="w-full rounded-lg border border-[#292C30] bg-[#0C0D0F] px-4 py-2.5 text-xs text-[#F1F1EE] outline-none focus:border-[#B7A27A]"
                      >
                        {algerianWilayas.map((w) => (
                          <option key={w} value={w}>
                            {w}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#F1F1EE] mb-1">
                        البلدية / المدينة <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="البلدية"
                        className="w-full rounded-lg border border-[#292C30] bg-[#0C0D0F] px-4 py-2.5 text-xs text-[#F1F1EE] outline-none focus:border-[#B7A27A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#F1F1EE] mb-1">
                        العنوان التفصيلي <span className="text-rose-400">*</span>
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="الشارع، رقم العمارة، الطابق..."
                        className="w-full rounded-lg border border-[#292C30] bg-[#0C0D0F] px-4 py-2.5 text-xs text-[#F1F1EE] outline-none focus:border-[#B7A27A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#F1F1EE] mb-1">
                        ملاحظات خاصة بالتسليم (اختياري)
                      </label>
                      <input
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="تعليمات للمندوب أو أوقات مفضلة..."
                        className="w-full rounded-lg border border-[#292C30] bg-[#0C0D0F] px-4 py-2.5 text-xs text-[#F1F1EE] outline-none focus:border-[#B7A27A]"
                      />
                    </div>
                  </div>
                </div>

                {/* 03 — Payment */}
                <div className="rounded-xl bg-[#15171A] p-6 border border-[#292C30]">
                  <div className="flex items-center gap-2 mb-3 border-b border-[#292C30] pb-3">
                    <span className="font-serif-display text-lg text-[#B7A27A] font-bold">03</span>
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-[#F1F1EE]">
                      طريقة الدفع
                    </h2>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-[#0C0D0F] p-4 border border-[#292C30]">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">💵</span>
                      <div>
                        <p className="text-xs font-semibold text-[#F1F1EE]">الدفع نقدًا عند الاستلام (COD)</p>
                        <p className="text-[10px] text-[#8E9298]">فحص ومعاينة الساعة بحضور المندوب قبل السداد</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-[#B7A27A] px-2.5 py-0.5 text-[9px] font-bold text-[#0C0D0F]">
                      مفعّل
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column / Order Summary (5 cols) */}
              <div className="lg:col-span-5">
                <div className="sticky top-28 rounded-xl bg-[#15171A] p-6 border border-[#292C30]">
                  <h2 className="font-serif-display text-lg font-medium text-[#F1F1EE] border-b border-[#292C30] pb-3">
                    ملخص المقتنيات ({count})
                  </h2>

                  {items.length === 0 ? (
                    <div className="py-8 text-center text-xs text-[#8E9298]">
                      حقيبتك فارغة حالياً.
                      <Link
                        href="/templates/chronova/collections/all"
                        className="block mt-2 font-medium text-[#B7A27A] underline"
                      >
                        تصفح الساعات وأضف ما يناسبك
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className="divide-y divide-[#292C30] max-h-60 overflow-y-auto my-4 pr-1">
                        {items.map((item, idx) => (
                          <div key={idx} className="flex gap-3 py-3">
                            <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded bg-[#0C0D0F]">
                              <Image
                                src={item.img}
                                alt={item.name}
                                fill
                                sizes="50px"
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-medium text-[#F1F1EE] truncate">
                                {item.name}
                              </p>
                              <p className="text-[10px] text-[#8E9298]">
                                {item.color ? `اللون: ${item.color}` : ""} · الكمية: {item.qty}
                              </p>
                              <p className="text-xs font-semibold text-[#B7A27A] mt-1">
                                {money(item.price * item.qty)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Breakdown */}
                      <div className="border-t border-[#292C30] pt-4 space-y-2 text-xs">
                        <div className="flex justify-between text-[#8E9298]">
                          <span>المجموع الفرعي:</span>
                          <span className="text-[#F1F1EE]">{money(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-[#8E9298]">
                          <span>الشحن والتأمين:</span>
                          <span>
                            {deliveryFee === 0 ? (
                              <strong className="text-[#B7A27A]">مجاني 🎉</strong>
                            ) : (
                              money(deliveryFee)
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between border-t border-[#292C30] pt-2 text-sm font-semibold text-[#F1F1EE]">
                          <span>المبلغ الإجمالي:</span>
                          <span className="font-serif-display text-lg text-[#B7A27A]">{money(total)}</span>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={items.length === 0}
                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#B7A27A] py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#0C0D0F] hover:brightness-110 transition-all disabled:opacity-40 shadow-lg shadow-[#B7A27A]/20"
                      >
                        تأكيد طلب الشحن الآن
                        <span aria-hidden>←</span>
                      </button>

                      <p className="mt-3 text-center text-[10px] text-[#8E9298]">
                        🔒 مشمولة بضمان الوكيل الرسمي وشهادة الجودة الأصلية.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </form>
          </div>
        )}
      </main>

      <ChronovaFooter />
    </div>
  );
}
