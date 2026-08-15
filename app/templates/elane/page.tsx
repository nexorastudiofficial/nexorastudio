import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ElaneHeader from "./ElaneHeader";
import ProductCard from "./components/ProductCard";
import NewsletterForm from "./components/NewsletterForm";
import { products } from "./data/products";

export const metadata: Metadata = {
  title: "ÉLANÉ — أزياء",
  description: "قالب أزياء فاخر هادئ بطابع تحريري من NexoraStudio.",
};

const featured = [
  {
    slug: "cashmere-sweater",
    name: "كنزة كشمير",
    price: "37,800 دج",
    img: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=900&auto=format&fit=crop",
  },
  {
    slug: "silk-satin-dress",
    name: "فستان ساتان",
    price: "41,850 دج",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=900&auto=format&fit=crop",
  },
  {
    slug: "wool-overcoat",
    name: "معطف صوف",
    price: "56,700 دج",
    img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=900&auto=format&fit=crop",
  },
  {
    slug: "tailored-trousers",
    name: "بنطال بقصّة دقيقة",
    price: "32,400 دج",
    img: "https://images.unsplash.com/photo-1467043237213-65f2da53396f?q=80&w=900&auto=format&fit=crop",
  },
];

const arrivals = products.filter((p) => p.isNew).slice(0, 4);

export default function ElaneTemplate() {
  return (
    <div className="min-h-full bg-[#F7F3ED] text-[#242321] antialiased">
      <ElaneHeader />

      {/* Hero */}
      <section className="relative h-[72vh] min-h-[480px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200&auto=format&fit=crop"
          alt="تصوير أزياء تحريري"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-10 sm:mx-auto sm:max-w-6xl sm:pb-16">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#F7F3ED]/90 sm:text-xs">
            Élané · خريف وشتاء 2026
          </p>
          <h1 className="mt-3 max-w-xl font-serif-display text-4xl font-light leading-[1.15] text-[#F7F3ED] sm:text-6xl">
            مُعرَّفٌ بالبساطة.
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-[#F7F3ED]/90">
            قطعٌ معاصرة صُمّمت لإطلالةٍ أنيقة بلا مجهود.
          </p>
          <Link
            href="/templates/elane/collections/all"
            className="mt-6 inline-flex w-full items-center justify-center gap-3 border border-[#F7F3ED]/80 py-4 text-xs font-medium uppercase tracking-[0.2em] text-[#F7F3ED] transition-colors hover:bg-[#F7F3ED] hover:text-[#242321] sm:w-auto sm:px-8"
          >
            تسوّق المجموعة
            <span aria-hidden>←</span>
          </Link>
        </div>
      </section>

      {/* Featured collection */}
      <section className="py-14 sm:py-20">
        <div className="flex items-end justify-between px-6">
          <h2 className="font-serif-display text-3xl font-light tracking-tight sm:text-4xl">
            تشكيلة مختارة
          </h2>
          <Link
            href="/templates/elane/collections/all"
            className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#242321]/60 transition-colors hover:text-[#242321] sm:text-xs"
          >
            عرض الكل
          </Link>
        </div>
        <div className="mt-8 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-8 sm:overflow-visible sm:px-0 sm:pb-0 sm:snap-none lg:grid-cols-4">
          {featured.map((item) => (
            <a
              key={item.slug}
              href={`/templates/elane/product/${item.slug}`}
              className="group w-[68%] shrink-0 snap-center sm:w-auto"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-white">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 68vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="text-sm">{item.name}</span>
                <span className="text-sm text-[#242321]/60">{item.price}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Editorial */}
      <section id="editorial" className="border-y border-[#242321]/10">
        <div className="grid lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[560px]">
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop"
              alt="تصميم إطلالة يومية"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="flex items-center px-6 py-14 sm:px-10 lg:px-16 lg:py-16">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#6F735F] sm:text-xs">
                تحرير
              </p>
              <h2 className="mt-4 font-serif-display text-3xl font-light leading-tight tracking-tight sm:text-5xl">
                فنُّ الإطلالة اليومية
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-[#242321]/70 sm:text-base">
                قوامٌ خالد. تفاصيل مدروسة. ثقةٌ بلا مجهود. ملابس صُنعت لتعاش معك
                موسمًا بعد موسم.
              </p>
              <Link
                href="/templates/elane/collections/all"
                className="mt-7 inline-flex items-center gap-3 border-b border-[#242321] pb-1 text-[10px] font-medium uppercase tracking-[0.2em] transition-colors hover:border-[#6F735F] hover:text-[#6F735F] sm:text-xs"
              >
                استكشف المجموعة
                <span aria-hidden>←</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* New arrivals */}
      <section className="py-14 sm:py-20">
        <div className="px-6">
          <h2 className="font-serif-display text-3xl font-light tracking-tight sm:text-4xl">
            وصل حديثًا
          </h2>
        </div>
        <div className="mt-8 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-8 sm:overflow-visible sm:px-0 sm:pb-0 sm:snap-none lg:grid-cols-4">
          {arrivals.map((item) => (
            <div key={item.slug} className="w-[68%] shrink-0 snap-center sm:w-auto">
              <ProductCard product={item} />
            </div>
          ))}
        </div>
      </section>

      {/* Brand statement */}
      <section id="brand" className="border-y border-[#242321]/10 bg-[#F7F3ED] px-6 py-16 text-center sm:py-24">
        <div className="mx-auto max-w-2xl">
          <p className="font-serif-display text-2xl font-light leading-relaxed text-[#242321] sm:text-3xl">
            «تبدأ كل قطعة من القماش — ألياف طبيعية، وخياطة مدروسة، واحترامٌ
            هادئ لكيفية صناعة الأشياء.»
          </p>
          <p className="mt-7 text-[10px] font-medium uppercase tracking-[0.3em] text-[#6F735F] sm:text-xs">
            خامات · حِرفة · عناية
          </p>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="mx-auto max-w-2xl px-6 py-16 text-center sm:py-24">
        <h2 className="font-serif-display text-3xl font-light tracking-tight sm:text-4xl">
          ابقَ على اطلاع.
        </h2>
        <p className="mt-3 text-sm text-[#242321]/60">
          مجموعات جديدة، وقطع حصرية، وإلهام.
        </p>
        <NewsletterForm />
      </section>

      {/* Footer */}
      <footer className="border-t border-[#242321]/10">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-14">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            <div className="col-span-2 sm:col-span-2">
              <p className="font-serif-display text-2xl tracking-[0.2em]">ÉLANÉ</p>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#242321]/60">
                أزياء معاصرة برؤيةٍ هادئة ومدروسة.
              </p>
            </div>
            {[
              [
                "المتجر",
                [
                  ["وصل حديثًا", "/templates/elane/collections/all"],
                  ["نساء", "/templates/elane/collections/women"],
                  ["رجال", "/templates/elane/collections/men"],
                  ["المجموعات", "/templates/elane/collections/all"],
                ],
              ],
              [
                "الشركة",
                [
                  ["قصتنا", "#brand"],
                  ["الاستدامة", "#brand"],
                  ["المجلة", "#editorial"],
                  ["الوظائف", "#newsletter"],
                ],
              ],
              [
                "الدعم",
                [
                  ["تواصل معنا", "#newsletter"],
                  ["الشحن", "/templates/elane/order"],
                  ["الاسترجاع", "/templates/elane/order"],
                  ["دليل المقاسات", "/templates/elane/product/linen-oversized-blazer"],
                ],
              ],
            ].map(([title, items]) => (
              <div key={title as string}>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#242321]/50 sm:text-xs">
                  {title as string}
                </p>
                <ul className="mt-3 space-y-2.5 text-sm text-[#242321]/70">
                  {(items as [string, string][]).map(([item, href]) => (
                    <li key={item}>
                      <a href={href} className="transition-colors hover:text-[#242321]">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#242321]/10 pt-6 sm:flex-row">
            <p className="text-xs text-[#242321]/50">
              © {new Date().getFullYear()} ÉLANÉ. جميع الحقوق محفوظة.
            </p>
            <div className="flex gap-6 text-xs text-[#242321]/50">
              <a href="#" className="transition-colors hover:text-[#242321]">انستغرام</a>
              <a href="#" className="transition-colors hover:text-[#242321]">بينتيريست</a>
              <a href="#" className="transition-colors hover:text-[#242321]">الخصوصية</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
