import Link from "next/link";
import NewsletterForm from "./components/NewsletterForm";

export default function ChronovaFooter() {
  const shopLinks = [
    { label: "الساعات الذكية", href: "/templates/chronova/collections/smart" },
    { label: "الساعات الكلاسيكية", href: "/templates/chronova/collections/classic" },
    { label: "الأحزمة والإكسسوارات", href: "/templates/chronova/collections/accessories" },
    { label: "الأكثر طلباً", href: "/templates/chronova/collections/all" },
    { label: "الإصدارات الجديدة", href: "/templates/chronova/collections/all" },
  ];

  const careLinks = [
    { label: "الضمان والصيانة", href: "/templates/chronova#warranty" },
    { label: "الشحن والتوصيل", href: "/templates/chronova/order" },
    { label: "تتبع طلبك", href: "/templates/chronova/order" },
    { label: "الأسئلة الشائعة", href: "/templates/chronova/order" },
    { label: "دليل مقاسات المعصم", href: "/templates/chronova/product/chronova-arc-01" },
  ];

  const companyLinks = [
    { label: "قصة كرونوفا", href: "/templates/chronova#why-chronova" },
    { label: "دقة التصنيع والحرفية", href: "/templates/chronova#why-chronova" },
    { label: "معايير الجودة والأصالة", href: "/templates/chronova#warranty" },
  ];

  return (
    <footer className="border-t border-[#292C30] bg-[#0C0D0F] text-[#F1F1EE]">
      {/* Newsletter Section */}
      <div className="mx-auto max-w-6xl px-6 py-16 text-center border-b border-[#292C30]">
        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#B7A27A]">
          نادي النخبة
        </span>
        <h2 className="mt-2 font-serif-display text-3xl font-light tracking-tight sm:text-4xl text-[#F1F1EE]">
          انضم إلى مجتمع كرونوفا
        </h2>
        <p className="mt-2 text-xs text-[#8E9298] max-w-md mx-auto mb-6">
          كن أول من يكتشف الإصدارات الحصرية المحدودة وأحدث التقنيات القابلة للارتداء.
        </p>
        <NewsletterForm />
      </div>

      {/* 4 Column links grid */}
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 sm:col-span-1">
            <Link
              href="/templates/chronova"
              className="flex items-center gap-2 font-serif-display text-2xl tracking-[0.2em] text-[#F1F1EE]"
            >
              <span>CHRONOVA</span>
              <span className="text-xs text-[#B7A27A]">✦</span>
            </Link>
            <p className="mt-1 text-xs italic text-[#B7A27A] font-serif-display">
              Time, Reimagined.
            </p>
            <p className="mt-4 text-xs leading-relaxed text-[#8E9298]">
              دار ساعات معاصرة تجمع بين دقة وحرفية الساعات الميكانيكية الكلاسيكية وأحدث ابتكارات التقنية الذكية القابلة للارتداء.
            </p>
          </div>

          {/* Shop Column */}
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#B7A27A]">
              المتجر
            </p>
            <ul className="mt-4 space-y-2 text-xs text-[#8E9298]">
              {shopLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition-colors hover:text-[#B7A27A]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#B7A27A]">
              خدمة العملاء والضمان
            </p>
            <ul className="mt-4 space-y-2 text-xs text-[#8E9298]">
              {careLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition-colors hover:text-[#B7A27A]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#B7A27A]">
              عن كرونوفا
            </p>
            <ul className="mt-4 space-y-2 text-xs text-[#8E9298]">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition-colors hover:text-[#B7A27A]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[#292C30] pt-6 sm:flex-row text-xs text-[#8E9298]/60">
          <p>© {new Date().getFullYear()} CHRONOVA Timepieces Inc. جميع الحقوق محفوظة.</p>
          <div className="flex gap-6">
            <Link href="/templates/chronova" className="hover:text-[#B7A27A] transition-colors">
              انستغرام
            </Link>
            <Link href="/templates/chronova" className="hover:text-[#B7A27A] transition-colors">
              تويتر / X
            </Link>
            <Link href="/templates/chronova" className="hover:text-[#B7A27A] transition-colors">
              سياسة الضمان والخصوصية
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
