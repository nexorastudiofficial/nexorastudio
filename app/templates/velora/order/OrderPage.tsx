"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../cart/CartContext";
import { orderStore, type VeloraOrder } from "./store";
import { money } from "../data/money";

const WILAYAS = [
  "01 أدرار", "02 الشلف", "03 الأغواط", "04 أم البواقي", "05 باتنة",
  "06 بجاية", "07 بسكرة", "08 بشار", "09 البليدة", "10 البويرة",
  "11 تمنراست", "12 تبسة", "13 تلمسان", "14 تيارت", "15 تيزي وزو",
  "16 الجزائر", "17 الجلفة", "18 جيجل", "19 سطيف", "20 سعيدة",
  "21 سكيكدة", "22 سيدي بلعباس", "23 عنابة", "24 قالمة", "25 قسنطينة",
  "26 المدية", "27 مستغانم", "28 المسيلة", "29 معسكر", "30 ورقلة",
  "31 وهران", "32 البيض", "33 إليزي", "34 برج بوعريريج", "35 بومرداس",
  "36 الطارف", "37 تندوف", "38 تيسمسيلت", "39 الوادي", "40 خنشلة",
  "41 سوق أهراس", "42 تيبازة", "43 ميلة", "44 عين الدفلى", "45 النعامة",
  "46 عين تموشنت", "47 غرداية", "48 غليزان", "49 تيميمون", "50 برج باجي مختار",
  "51 أولاد جلال", "52 بني عباس", "53 عين صالح", "54 عين قزام", "55 تقرت",
  "56 جانت", "57 المغير", "58 المنيعة",
];

const inputClass =
  "mt-2 w-full border border-[#332F2A] bg-[#11100F] px-4 py-3.5 text-sm text-[#F3EEE6] outline-none transition-colors placeholder:text-[#A9A198]/50 focus:border-[#B99A67]";

function StepTitle({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-4 border-b border-[#332F2A] pb-4">
      <span className="font-serif-display text-lg text-[#B99A67]">{num}</span>
      <h2 className="font-serif-display text-2xl font-light text-[#F3EEE6]">{title}</h2>
    </div>
  );
}

export default function OrderPage() {
  const router = useRouter();
  const { items: cartItems, subtotal, updateQty, clear, hydrated } = useCart();
  const items = hydrated ? cartItems : [];

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fee = subtotal >= 13500 ? 0 : 675;
  const total = subtotal + fee;

  const nameError = touched && name.trim().length < 2;
  const phoneError = touched && phone.replace(/\D/g, "").length < 8;
  const emailError =
    touched && email.trim() !== "" && !/^\S+@\S+\.\S+$/.test(email);
  const wilayaError = touched && !wilaya;
  const cityError = touched && city.trim() === "";
  const addressError = touched && address.trim() === "";

  const valid =
    name.trim().length >= 2 &&
    phone.replace(/\D/g, "").length >= 8 &&
    (email.trim() === "" || /^\S+@\S+\.\S+$/.test(email)) &&
    !!wilaya &&
    city.trim() !== "" &&
    address.trim() !== "" &&
    items.length > 0;

  const submit = () => {
    setTouched(true);
    if (!valid || submitting) return;
    setSubmitting(true);

    const order: VeloraOrder = {
      ref: `VL-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString(),
      customer: { name, phone, email, wilaya, city, address },
      items: items.map((item) => ({
        no: item.no,
        nameEn: item.nameEn,
        type: item.type,
        size: item.size,
        price: item.price,
        qty: item.qty,
        img: item.img,
      })),
      subtotal,
      fee,
      total,
    };

    try {
      window.localStorage.setItem(
        "velora-orders",
        JSON.stringify([...orderStore.load(), order])
      );
    } catch {
      /* ignore */
    }
    orderStore.refresh();
    clear();
    router.push("/templates/velora/confirmation");
  };

  return (
    <div className="mx-auto max-w-2xl px-4 pb-24 pt-12 sm:px-6">
      <header className="text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#B99A67] sm:text-xs">
          VELORA
        </p>
        <h1 className="mt-4 font-serif-display text-4xl font-light tracking-tight text-[#F3EEE6] sm:text-5xl">
          أكملي طلبك
        </h1>
        <p className="mt-4 text-sm text-[#A9A198]">
          ثلاث خطوات تفصلك عن عطرك الجديد.
        </p>
      </header>

      <div className="mt-12 space-y-12">
        {/* 01 — Contact */}
        <section className="space-y-5">
          <StepTitle num="01" title="التواصل" />
          <div>
            <label htmlFor="name" className="text-sm text-[#F3EEE6]">
              الاسم الكامل <span className="text-[#B99A67]">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="الاسم واللقب"
              className={`${inputClass} ${nameError ? "border-[#a8503f]" : ""}`}
            />
          </div>
          <div>
            <label htmlFor="phone" className="text-sm text-[#F3EEE6]">
              رقم الهاتف <span className="text-[#B99A67]">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              dir="ltr"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="05 XX XX XX XX"
              className={`${inputClass} ${phoneError ? "border-[#a8503f]" : ""}`}
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm text-[#F3EEE6]">
              البريد الإلكتروني <span className="text-[#A9A198]">(اختياري)</span>
            </label>
            <input
              id="email"
              type="email"
              dir="ltr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@email.com"
              className={`${inputClass} ${emailError ? "border-[#a8503f]" : ""}`}
            />
          </div>
        </section>

        {/* 02 — Delivery */}
        <section className="space-y-5">
          <StepTitle num="02" title="التوصيل" />
          <div>
            <label htmlFor="wilaya" className="text-sm text-[#F3EEE6]">
              الولاية <span className="text-[#B99A67]">*</span>
            </label>
            <select
              id="wilaya"
              value={wilaya}
              onChange={(e) => setWilaya(e.target.value)}
              className={`appearance-none ${inputClass} ${
                wilayaError ? "border-[#a8503f]" : ""
              } ${wilaya ? "text-[#F3EEE6]" : "text-[#A9A198]/50"}`}
            >
              <option value="" disabled>
                اختاري الولاية
              </option>
              {WILAYAS.map((w) => (
                <option key={w} value={w} className="text-[#F3EEE6]">
                  {w}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="city" className="text-sm text-[#F3EEE6]">
              المدينة / البلدية <span className="text-[#B99A67]">*</span>
            </label>
            <input
              id="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="مثال: الجزائر الوسطى"
              className={`${inputClass} ${cityError ? "border-[#a8503f]" : ""}`}
            />
          </div>
          <div>
            <label htmlFor="address" className="text-sm text-[#F3EEE6]">
              العنوان الكامل <span className="text-[#B99A67]">*</span>
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              placeholder="رقم، اسم الشارع، البلدية…"
              className={`mt-2 w-full resize-none border border-[#332F2A] bg-[#11100F] px-4 py-3.5 text-sm text-[#F3EEE6] outline-none transition-colors placeholder:text-[#A9A198]/50 focus:border-[#B99A67] ${
                addressError ? "border-[#a8503f]" : ""
              }`}
            />
          </div>
        </section>

        {/* 03 — Your fragrance */}
        <section className="space-y-5">
          <StepTitle num="03" title="عطرك" />
          {items.length === 0 ? (
            <div className="flex flex-col items-center gap-4 border border-dashed border-[#332F2A] py-14 text-center">
              <p className="text-sm text-[#A9A198]">
                حقيبتك فارغة. اختاري عطرك أولاً.
              </p>
              <Link
                href="/templates/velora/collections/all"
                className="border border-[#B99A67] px-8 py-3 text-xs font-medium uppercase tracking-[0.25em] text-[#B99A67] transition-colors hover:bg-[#B99A67] hover:text-[#11100F]"
              >
                تسوّقي الآن
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-[#332F2A] border border-[#332F2A]">
              {items.map((item, i) => (
                <div key={`${item.slug}-${item.size}`} className="flex gap-4 p-4">
                  <a
                    href={`/templates/velora/product/${item.slug}`}
                    className="relative h-20 w-16 shrink-0 overflow-hidden bg-[#0E0D0C]"
                  >
                    <Image
                      src={item.img}
                      alt={item.no}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </a>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <a
                      href={`/templates/velora/product/${item.slug}`}
                      className="truncate text-sm font-medium text-[#F3EEE6]"
                    >
                      {item.no} · {item.nameEn}
                    </a>
                    <p className="mt-0.5 text-xs text-[#A9A198]">
                      {item.type} · {item.size}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#332F2A]">
                        <button
                          onClick={() => updateQty(i, item.qty - 1)}
                          aria-label="إنقاص الكمية"
                          className="flex h-8 w-8 items-center justify-center text-sm text-[#A9A198] transition-colors hover:text-[#F3EEE6]"
                        >
                          −
                        </button>
                        <span className="w-7 text-center text-xs">{item.qty}</span>
                        <button
                          onClick={() => updateQty(i, item.qty + 1)}
                          aria-label="زيادة الكمية"
                          className="flex h-8 w-8 items-center justify-center text-sm text-[#A9A198] transition-colors hover:text-[#F3EEE6]"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm font-medium text-[#B99A67]">
                        {money(item.price * item.qty)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 04 — Payment */}
        <section className="space-y-5">
          <StepTitle num="04" title="الدفع" />
          <div className="border border-[#B99A67]/50 bg-[#1A1816] p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-[#F3EEE6]">الدفع عند الاستلام</p>
                <p className="mt-1 text-xs text-[#A9A198]">
                  ادفعي نقداً عند وصول طلبك إلى باب منزلك.
                </p>
              </div>
              <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-[#B99A67]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 7h12l-1 13a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 7Z" />
                <path d="M8 7V5a4 4 0 0 1 8 0v2" />
              </svg>
            </div>
          </div>
        </section>
      </div>

      {/* Summary */}
      <div className="mt-12 border-t border-[#332F2A] pt-8">
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between text-[#A9A198]">
            <span>العطر</span>
            <span>{money(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between text-[#A9A198]">
            <span>التوصيل</span>
            <span>{fee === 0 ? "مجاني" : money(fee)}</span>
          </div>
          <div className="flex items-center justify-between border-t border-[#332F2A] pt-3 text-[#F3EEE6]">
            <span className="font-medium">الإجمالي</span>
            <span className="font-serif-display text-2xl text-[#B99A67]">
              {money(total)}
            </span>
          </div>
        </div>
        {fee === 0 && subtotal > 0 && (
          <p className="mt-3 text-xs text-[#B99A67]">
            مبروك، توصيلك مجاني لهذا الطلب.
          </p>
        )}

        <button
          onClick={submit}
          disabled={items.length === 0}
          className="mt-7 w-full bg-[#B99A67] py-4 text-xs font-medium uppercase tracking-[0.3em] text-[#11100F] transition-colors hover:bg-[#C9AA76] disabled:cursor-not-allowed disabled:opacity-40"
        >
          تأكيد طلبي
        </button>
        <p className="mt-4 text-center text-xs text-[#A9A198]">
          سنتصل بك لتأكيد طلبك.
        </p>
      </div>
    </div>
  );
}
