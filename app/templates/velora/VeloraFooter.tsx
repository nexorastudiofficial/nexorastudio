import Link from "next/link";
import NewsletterForm from "./components/NewsletterForm";

export default function VeloraFooter() {
  const shop = [
    ["نساء", "/templates/velora/collections/women"],
    ["رجال", "/templates/velora/collections/men"],
    ["يونيسكس", "/templates/velora/collections/unisex"],
    ["الأكثر مبيعاً", "/templates/velora/collections/all"],
    ["وصل حديثاً", "/templates/velora/collections/all"],
  ] as [string, string][];

  const help = [
    ["تواصل معنا", "/templates/velora/contact"],
    ["الشحن والاسترجاع", "/templates/velora/shipping"],
    ["الأسئلة الشائعة", "/templates/velora/faq"],
    ["عن فيلورا", "/templates/velora/about"],
  ] as [string, string][];

  return (
    <footer className="border-t border-[#332F2A] bg-[#0E0D0C]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-4">
          <div>
            <p className="font-serif-display text-2xl tracking-[0.3em] text-[#F3EEE6]">
              VELORA
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#A9A198]">
              دار عطور فاخرة تُصمَّم لتصبح جزءاً من هويتك. كل عطرٍ قصة، وكل
              إطلالة بصمة.
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#B99A67]">
              المتجر
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-[#A9A198]">
              {shop.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="transition-colors hover:text-[#F3EEE6]">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#B99A67]">
              المساعدة
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-[#A9A198]">
              {help.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="transition-colors hover:text-[#F3EEE6]">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-5 text-xs font-medium uppercase tracking-[0.2em] text-[#A9A198]">
              <span className="transition-colors hover:text-[#F3EEE6]">Instagram</span>
              <span className="transition-colors hover:text-[#F3EEE6]">TikTok</span>
              <span className="transition-colors hover:text-[#F3EEE6]">Facebook</span>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#B99A67]">
              النشرة البريدية
            </p>
            <p className="mt-4 text-sm text-[#A9A198]">ادخلي إلى عالم فيلورا.</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[#332F2A] pt-6 text-xs text-[#A9A198]/60 sm:flex-row">
          <p>© {new Date().getFullYear()} VELORA. جميع الحقوق محفوظة.</p>
          <p className="font-serif-display tracking-[0.3em]">VELORA · PARFUMS</p>
        </div>
      </div>
    </footer>
  );
}
