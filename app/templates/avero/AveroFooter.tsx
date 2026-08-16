import Link from "next/link";
import NewsletterForm from "./components/NewsletterForm";

export default function AveroFooter() {
  const shopLinks = [
    { label: "أحذية الجري والماراثون", href: "/templates/avero/collections/running" },
    { label: "أحذية التمارين والكروس فيت", href: "/templates/avero/collections/training" },
    { label: "أحذية الستريت والكاجوال", href: "/templates/avero/collections/lifestyle" },
    { label: "أحذية المسارات الجبلية", href: "/templates/avero/collections/outdoor" },
    { label: "الإكسسوارات والعناية", href: "/templates/avero/collections/accessories" },
  ];

  const careLinks = [
    { label: "دليل المقاسات (Size Guide)", href: "/templates/avero/product/avero-x1-pro" },
    { label: "الشحن والتوصيل السريع", href: "/templates/avero/order" },
    { label: "سياسة الاستبدال السلس", href: "/templates/avero/order" },
    { label: "الأسئلة الشائعة", href: "/templates/avero/order" },
  ];

  const companyLinks = [
    { label: "مختبرات أفيرو (AVERO Labs)", href: "/templates/avero#tech-story" },
    { label: "تقنية اللوح الكربوني", href: "/templates/avero#tech-story" },
    { label: "الاستدامة والمواد المعاد تدويرها", href: "/templates/avero#trust" },
  ];

  return (
    <footer className="border-t border-[#222426] bg-[#101112] text-[#F4F2ED]">
      {/* Newsletter area */}
      <div className="mx-auto max-w-6xl px-6 py-16 text-center border-b border-[#222426]">
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#D6FF3F]">
          AVERO RUNNERS CLUB
        </span>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight uppercase sm:text-4xl text-white">
          تحرك بشكل مختلف. انضم لنادي أفيرو
        </h2>
        <p className="mt-2 text-xs text-zinc-400 max-w-md mx-auto mb-6">
          كن أول من يحصل على إشعارات الإطلاق المحدود (Limited Drops) وتحديثات الأحذية الثورية.
        </p>
        <NewsletterForm />
      </div>

      {/* Links grid */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:gap-12">
          {/* Brand Col */}
          <div className="col-span-2 sm:col-span-1">
            <Link
              href="/templates/avero"
              className="flex items-center gap-1.5 font-extrabold text-2xl tracking-[0.2em] text-white uppercase"
            >
              <span>AVERO</span>
              <span className="text-xs text-[#D6FF3F] bg-white/10 rounded px-1">▲</span>
            </Link>
            <p className="mt-1 text-xs italic text-[#D6FF3F] font-mono">
              Move Different.
            </p>
            <p className="mt-4 text-xs leading-relaxed text-zinc-400">
              علامة أحذية معاصرة تجمع بين هندسة الأداء الرياضي المتطورة، التكنولوجيا الثلاثية الأبعاد، وأناقة أزياء الشارع العالمية.
            </p>
          </div>

          {/* Shop */}
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#D6FF3F]">
              التشكيلات
            </p>
            <ul className="mt-4 space-y-2 text-xs text-zinc-400">
              {shopLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Care */}
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#D6FF3F]">
              خدمة الرياضيين
            </p>
            <ul className="mt-4 space-y-2 text-xs text-zinc-400">
              {careLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#D6FF3F]">
              عن العلامة
            </p>
            <ul className="mt-4 space-y-2 text-xs text-zinc-400">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[#222426] pt-6 sm:flex-row text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} AVERO Footwear Inc. جميع الحقوق محفوظة.</p>
          <div className="flex gap-6">
            <Link href="/templates/avero" className="hover:text-white transition-colors">
              انستغرام
            </Link>
            <Link href="/templates/avero" className="hover:text-white transition-colors">
              تيك توك
            </Link>
            <Link href="/templates/avero" className="hover:text-white transition-colors">
              الشروط والخصوصية
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
