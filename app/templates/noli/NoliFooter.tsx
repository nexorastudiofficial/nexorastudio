import Link from "next/link";
import NewsletterForm from "./components/NewsletterForm";

export default function NoliFooter() {
  const shopLinks = [
    { label: "وصل حديثاً", href: "/templates/noli/collections/all" },
    { label: "ملابس الأطفال", href: "/templates/noli/collections/clothing" },
    { label: "ألعاب خشبية وحسية", href: "/templates/noli/collections/toys" },
    { label: "حزم وصناديق الهدايا", href: "/templates/noli/collections/gifts" },
    { label: "الأكثر طلباً", href: "/templates/noli/collections/all" },
  ];

  const helpLinks = [
    { label: "تواصل معنا", href: "/templates/noli/order" },
    { label: "الأسئلة الشائعة", href: "/templates/noli/order" },
    { label: "الشحن والتوصيل", href: "/templates/noli/order" },
    { label: "الإرجاع والاستبدال", href: "/templates/noli/order" },
    { label: "دليل المقاسات", href: "/templates/noli/product/organic-ribbed-romper" },
  ];

  const aboutLinks = [
    { label: "قصتنا وفلسفتنا", href: "/templates/noli#why-noli" },
    { label: "معايير السلامة والجودة", href: "/templates/noli#why-noli" },
    { label: "الاستدامة والبيئة", href: "/templates/noli#why-noli" },
  ];

  return (
    <footer className="border-t border-[#30312D]/10 bg-[#F2E9DC] text-[#30312D]">
      {/* Newsletter signup area */}
      <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16 text-center border-b border-[#30312D]/10">
        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#8A725F]">
          نادي العائلة الصغير
        </span>
        <h2 className="mt-2 font-serif-display text-3xl font-light tracking-tight sm:text-4xl text-[#30312D]">
          انضم إلى نادي نولي & كو
        </h2>
        <p className="mt-2 text-xs text-[#30312D]/70 max-w-md mx-auto mb-6">
          اكتشف التشكيلات الحصرية الجديدة، وأفكار الهدايا الملهمة، واستمتع بعروض شهرية مخصصة.
        </p>
        <NewsletterForm />
      </div>

      {/* 4 Column links grid */}
      <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:gap-12">
          {/* Brand Info */}
          <div className="col-span-2 sm:col-span-1">
            <Link
              href="/templates/noli"
              className="flex items-center gap-1.5 font-serif-display text-2xl tracking-[0.12em] text-[#30312D]"
            >
              <span>NOLI & CO.</span>
              <span className="text-sm text-[#A8B5A0]">✦</span>
            </Link>
            <p className="mt-1 text-xs italic text-[#8A725F] font-serif-display">
              Little things. Big moments.
            </p>
            <p className="mt-4 text-xs leading-relaxed text-[#30312D]/70">
              بوتيك عصري للأطفال يجمع بين دفء الطفولة، نقاء الخامات الطبيعية، وأناقة التصاميم التي تدوم.
            </p>
          </div>

          {/* Shop */}
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#8A725F]">
              المتجر
            </p>
            <ul className="mt-4 space-y-2 text-xs text-[#30312D]/75">
              {shopLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition-colors hover:text-[#30312D]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#8A725F]">
              المساعدة
            </p>
            <ul className="mt-4 space-y-2 text-xs text-[#30312D]/75">
              {helpLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition-colors hover:text-[#30312D]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#8A725F]">
              عن نولي
            </p>
            <ul className="mt-4 space-y-2 text-xs text-[#30312D]/75">
              {aboutLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition-colors hover:text-[#30312D]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#30312D]/10 pt-6 sm:flex-row text-xs text-[#30312D]/50">
          <p>© {new Date().getFullYear()} NOLI & CO. Boutique. جميع الحقوق محفوظة.</p>
          <div className="flex gap-6">
            <Link href="/templates/noli" className="hover:text-[#30312D] transition-colors">
              انستغرام
            </Link>
            <Link href="/templates/noli" className="hover:text-[#30312D] transition-colors">
              تيك توك
            </Link>
            <Link href="/templates/noli" className="hover:text-[#30312D] transition-colors">
              سياسة الخصوصية
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
