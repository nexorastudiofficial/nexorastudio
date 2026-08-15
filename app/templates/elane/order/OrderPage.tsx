"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ElaneHeader from "../ElaneHeader";
import { useCart } from "../cart/CartContext";
import { orderStore, type SavedOrder } from "../orders/store";

const wilayas = [
  "أدرار", "الشلف", "الأغواط", "أم البواقي", "باتنة", "بجاية", "بسكرة", "بشار",
  "البليدة", "البويرة", "تمنراست", "تبسة", "تلمسان", "تيارت", "تيزي وزو",
  "الجزائر", "الجلفة", "جيجل", "سطيف", "سعيدة", "سكيكدة", "سيدي بلعباس",
  "عنابة", "قالمة", "قسنطينة", "المدية", "مستغانم", "المسيلة", "معسكر",
  "ورقلة", "وهران", "البيض", "إليزي", "برج بوعريريج", "بومرداس", "الطارف",
  "تندوف", "تيسمسيلت", "الوادي", "خنشلة", "سوق أهراس", "تيبازة", "ميلة",
  "عين الدفلى", "النعامة", "عين تموشنت", "غرداية", "غليزان", "تيميمون",
  "برج باجي مختار", "أولاد جلال", "بني عباس", "عين صالح", "عين قزام",
  "تقرت", "جانت", "المغير", "المنيعة",
];

const money = (n: number) => `${n.toLocaleString("en-US")} دج`;

function SectionTitle({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-[#242321]/10 pb-4">
      <span className="font-serif-display text-lg text-[#6F735F]">{num}</span>
      <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-[#242321]">
        {title}
      </h2>
    </div>
  );
}

function FieldLabel({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[#242321]/60">
      {children}
      {required && <span className="mr-1 text-[#6F735F]">*</span>}
    </label>
  );
}

const inputClass =
  "w-full border border-[#242321]/20 bg-white/60 px-4 py-3 text-sm text-[#242321] placeholder:text-[#242321]/35 focus:border-[#242321] focus:outline-none transition-colors";

function Chevron() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#242321]/50"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function Lock() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="11" width="16" height="10" rx="1.5" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

export default function OrderPage() {
  const { items: cartItems, subtotal, updateQty, removeAt, clear, hydrated } = useCart();
  const items = hydrated ? cartItems : [];
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [delivery, setDelivery] = useState<"home" | "pickup">("home");
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [orderRef, setOrderRef] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);

  const deliveryFee = delivery === "pickup" || subtotal >= 13500 ? 0 : 675;
  const total = subtotal + deliveryFee;

  const nameError = touched && name.trim().length < 2;
  const phoneError = touched && phone.replace(/\D/g, "").length < 8;
  const emailError =
    touched && email.trim() !== "" && !/^\S+@\S+\.\S+$/.test(email);
  const wilayaError = touched && !wilaya;
  const cityError = touched && city.trim() === "";
  const addressError = touched && delivery === "home" && address.trim() === "";

  const isValid =
    items.length > 0 &&
    name.trim().length >= 2 &&
    phone.replace(/\D/g, "").length >= 8 &&
    (email.trim() === "" || /^\S+@\S+\.\S+$/.test(email)) &&
    wilaya !== "" &&
    city.trim() !== "" &&
    (delivery === "pickup" || address.trim() !== "");

  const submit = () => {
    setTouched(true);
    if (!isValid) {
      nameRef.current?.focus();
      return;
    }
    const order: SavedOrder = {
      ref: `#ELN-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      customer: { name, phone, email, wilaya, city, address },
      delivery,
      items,
      subtotal,
      fee: deliveryFee,
      total,
    };
    const orders = orderStore.load();
    orders.unshift(order);
    try {
      window.localStorage.setItem("elane-orders", JSON.stringify(orders));
    } catch {
      /* ignore */
    }
    orderStore.refresh();
    clear();
    setOrderRef(order.ref);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    const firstName = name.trim().split(/\s+/)[0];
    return (
      <div className="min-h-full bg-[#F7F3ED] text-[#242321] antialiased">
        <ElaneHeader />
        <main className="mx-auto flex max-w-xl flex-col items-center px-4 pb-24 pt-16 text-center sm:px-6">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[#6F735F]/40 text-[#6F735F]">
            <svg
              viewBox="0 0 24 24"
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <p className="mt-8 text-[11px] font-medium uppercase tracking-[0.25em] text-[#6F735F]">
            تم استلام طلبك
          </p>
          <h1 className="mt-3 font-serif-display text-3xl font-light tracking-tight sm:text-4xl">
            شكراً، {firstName}
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-[#242321]/70">
            تم استلام طلبك رقم{" "}
            <span className="font-medium text-[#242321]">{orderRef}</span> بنجاح.
            سنتواصل معك قريباً لتأكيد تفاصيل التوصيل.
          </p>

          <button
            onClick={() => setShowDetails((v) => !v)}
            className="mt-9 w-full border border-[#242321] py-3.5 text-xs font-medium uppercase tracking-[0.25em] transition-colors hover:bg-[#242321] hover:text-[#F7F3ED] sm:w-80"
          >
            عرض تفاصيل الطلب
          </button>

          {showDetails && (
            <div className="mt-6 w-full border border-[#242321]/15 bg-white/50 p-6 text-right">
              <div className="flex items-center justify-between border-b border-[#242321]/10 pb-4">
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#242321]/60">
                  رقم الطلب
                </span>
                <span className="font-serif-display text-lg">{orderRef}</span>
              </div>
              <div className="mt-4 space-y-3 text-sm">
                {items.map((item) => (
                  <div key={`${item.slug}-${item.size}-${item.color}`}>
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-[#242321]/80">{item.name}</span>
                      <span className="shrink-0 font-medium">
                        {money(item.price * item.qty)}
                      </span>
                    </div>
                    <p className="text-xs text-[#242321]/50">
                      {item.size} · {item.color} · الكمية {item.qty}
                    </p>
                  </div>
                ))}
                <div className="flex items-center justify-between border-t border-[#242321]/10 pt-3">
                  <span className="text-[#242321]/70">
                    {delivery === "pickup" ? "استلام من المتجر" : "التوصيل إلى المنزل"}
                  </span>
                  <span className="text-[#242321]/70">
                    {deliveryFee === 0 ? "مجاني" : money(deliveryFee)}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="font-serif-display text-xl">الإجمالي</span>
                  <span className="font-serif-display text-xl">{money(total)}</span>
                </div>
              </div>
            </div>
          )}

          <a
            href="/templates/elane/orders"
            className="mt-8 text-xs font-medium uppercase tracking-[0.2em] text-[#242321]/60 underline underline-offset-4 transition-colors hover:text-[#242321]"
          >
            عرض طلباتي
          </a>
          <a
            href="/templates/elane"
            className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-[#242321]/60 underline underline-offset-4 transition-colors hover:text-[#242321]"
          >
            العودة إلى المتجر
          </a>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#F7F3ED] text-[#242321] antialiased">
      <ElaneHeader />

      <main className="mx-auto max-w-2xl px-4 pb-28 pt-8 sm:px-6 lg:pb-16">
        <nav className="flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-[#242321]/50">
          <a href="/templates/elane" className="hover:text-[#242321]">
            المتجر
          </a>
          <span>/</span>
          <span className="text-[#242321]/80">إرسال طلب</span>
        </nav>

        <header className="mt-6 text-center">
          <h1 className="font-serif-display text-3xl font-light tracking-tight sm:text-4xl">
            سجّل طلبك
          </h1>
          <p className="mt-3 text-sm text-[#242321]/60">
            ثلاث خطوات بسيطة، أقل من دقيقتين
          </p>
        </header>

        <form
          className="mt-10 space-y-10"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          noValidate
        >
          {/* 01 — Your Information */}
          <section className="space-y-5">
            <SectionTitle num="01" title="معلوماتك" />
            <div>
              <FieldLabel required>الاسم الكامل</FieldLabel>
              <input
                ref={nameRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="الاسم واللقب"
                className={`mt-2 ${inputClass} ${nameError ? "border-[#a8503f]" : ""}`}
              />
              {nameError && (
                <p className="mt-1.5 text-xs text-[#a8503f]">يرجى إدخال الاسم الكامل</p>
              )}
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <FieldLabel required>رقم الهاتف</FieldLabel>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  dir="ltr"
                  placeholder="05 XX XX XX XX"
                  className={`mt-2 text-left ${inputClass} ${phoneError ? "border-[#a8503f]" : ""}`}
                />
                {phoneError && (
                  <p className="mt-1.5 text-xs text-[#a8503f]">
                    يرجى إدخال رقم هاتف صحيح
                  </p>
                )}
              </div>
              <div>
                <FieldLabel>البريد الإلكتروني</FieldLabel>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  dir="ltr"
                  placeholder="name@email.com (اختياري)"
                  className={`mt-2 text-left ${inputClass} ${emailError ? "border-[#a8503f]" : ""}`}
                />
                {emailError && (
                  <p className="mt-1.5 text-xs text-[#a8503f]">
                    يرجى إدخال بريد إلكتروني صحيح
                  </p>
                )}
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <FieldLabel required>الولاية</FieldLabel>
                <div className="relative mt-2">
                  <select
                    value={wilaya}
                    onChange={(e) => setWilaya(e.target.value)}
                    className={`appearance-none ${inputClass} ${wilayaError ? "border-[#a8503f]" : ""}`}
                  >
                    <option value="">اختر الولاية</option>
                    {wilayas.map((w) => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                  </select>
                  <Chevron />
                </div>
                {wilayaError && (
                  <p className="mt-1.5 text-xs text-[#a8503f]">يرجى اختيار الولاية</p>
                )}
              </div>
              <div>
                <FieldLabel required>المدينة</FieldLabel>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="المدينة / البلدية"
                  className={`mt-2 ${inputClass} ${cityError ? "border-[#a8503f]" : ""}`}
                />
                {cityError && (
                  <p className="mt-1.5 text-xs text-[#a8503f]">يرجى إدخال المدينة</p>
                )}
              </div>
            </div>
            {delivery === "home" && (
              <div>
                <FieldLabel required>العنوان الكامل</FieldLabel>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  placeholder="الحي، الشارع، رقم العمارة، الطابق…"
                  className={`mt-2 resize-none ${inputClass} ${addressError ? "border-[#a8503f]" : ""}`}
                />
                {addressError && (
                  <p className="mt-1.5 text-xs text-[#a8503f]">يرجى إدخال العنوان الكامل</p>
                )}
              </div>
            )}
          </section>

          {/* 02 — Your Order */}
          <section className="space-y-5">
            <SectionTitle num="02" title="طلبك" />
            {items.length === 0 ? (
              <div className="flex flex-col items-center gap-4 border border-dashed border-[#242321]/20 py-12 text-center">
                <p className="text-sm text-[#242321]/60">
                  حقيبتك فارغة. أضيفي بعض القطع أولاً.
                </p>
                <Link
                  href="/templates/elane/collections/all"
                  className="border border-[#242321] px-8 py-3 text-xs font-medium uppercase tracking-[0.2em] transition-colors hover:bg-[#242321] hover:text-[#F7F3ED]"
                >
                  تسوّقي الآن
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-[#242321]/10 border border-[#242321]/10 bg-white/40">
                {items.map((item, i) => (
                  <div key={`${item.slug}-${item.size}-${item.color}`} className="flex gap-4 p-4">
                    <a
                      href={`/templates/elane/product/${item.slug}`}
                      className="relative h-24 w-20 shrink-0 overflow-hidden bg-white"
                    >
                      <Image
                        src={item.img}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </a>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <a
                          href={`/templates/elane/product/${item.slug}`}
                          className="truncate text-sm hover:underline"
                        >
                          {item.name}
                        </a>
                        <button
                          onClick={() => removeAt(i)}
                          aria-label="إزالة المنتج"
                          className="shrink-0 text-[#242321]/40 transition-colors hover:text-[#a8503f]"
                        >
                          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                            <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
                          </svg>
                        </button>
                      </div>
                      <p className="mt-0.5 text-xs text-[#242321]/50">
                        {item.size} · {item.color}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center border border-[#242321]/20">
                          <button
                            onClick={() => updateQty(i, item.qty - 1)}
                            aria-label="إنقاص الكمية"
                            className="flex h-8 w-8 items-center justify-center text-sm transition-colors hover:bg-[#242321]/5"
                          >
                            −
                          </button>
                          <span className="w-7 text-center text-xs">{item.qty}</span>
                          <button
                            onClick={() => updateQty(i, item.qty + 1)}
                            aria-label="زيادة الكمية"
                            className="flex h-8 w-8 items-center justify-center text-sm transition-colors hover:bg-[#242321]/5"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-sm font-medium">
                          {money(item.price * item.qty)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 03 — Delivery */}
          <section className="space-y-5">
            <SectionTitle num="03" title="التوصيل" />
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setDelivery("home")}
                className={`border p-5 text-right transition-colors ${
                  delivery === "home"
                    ? "border-[#242321] bg-white/60"
                    : "border-[#242321]/20 hover:border-[#242321]/60"
                }`}
              >
                <p className="text-sm font-medium">التوصيل إلى المنزل</p>
                <p className="mt-1 text-xs text-[#242321]/60">3–5 أيام عمل</p>
                <p className="mt-3 text-sm text-[#6F735F]">
                  {subtotal >= 13500 ? "مجاني" : money(675)}
                </p>
              </button>
              <button
                type="button"
                onClick={() => setDelivery("pickup")}
                className={`border p-5 text-right transition-colors ${
                  delivery === "pickup"
                    ? "border-[#242321] bg-white/60"
                    : "border-[#242321]/20 hover:border-[#242321]/60"
                }`}
              >
                <p className="text-sm font-medium">استلام من المتجر</p>
                <p className="mt-1 text-xs text-[#242321]/60">خلال 24 ساعة</p>
                <p className="mt-3 text-sm text-[#6F735F]">مجاني</p>
              </button>
            </div>

            {delivery === "pickup" && (
              <div className="border border-[#6F735F]/30 bg-[#6F735F]/5 p-5 text-sm text-[#242321]/80">
                الاستلام من متجرنا الرئيسي — حيّ الأمم، الجزائر العاصمة. سنتصل بك
                عندما يصبح طلبك جاهزاً.
              </div>
            )}

            <div className="border-t border-[#242321]/10 pt-4">
              <div className="flex items-center justify-between text-sm text-[#242321]/70">
                <span>المجموع الفرعي</span>
                <span>{money(subtotal)}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm text-[#242321]/70">
                <span>رسوم التوصيل</span>
                <span>{deliveryFee === 0 ? "مجاني" : money(deliveryFee)}</span>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-[#242321]/10 pt-4">
                <span className="font-serif-display text-xl">الإجمالي</span>
                <span className="font-serif-display text-xl">{money(total)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={items.length === 0}
              className="flex h-14 w-full items-center justify-center bg-[#242321] text-xs font-medium uppercase tracking-[0.25em] text-[#F7F3ED] transition-colors hover:bg-[#242321]/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              إرسال الطلب
            </button>
            <div className="flex items-center justify-center gap-2 text-xs text-[#242321]/55">
              <Lock />
              <span>معلوماتك آمنة. سنتصل بك لتأكيد طلبك.</span>
            </div>
          </section>
        </form>
      </main>
    </div>
  );
}
