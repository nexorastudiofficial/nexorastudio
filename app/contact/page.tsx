import type { Metadata } from "next";
import InfoLayout from "@/components/InfoLayout";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "تواصل معنا — NexoraStudio",
  description: "أخبرني عن مشروعك وسأبني لك موقعاً يليق بعلامتك.",
};

const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61591467674620";

export default function ContactPage() {
  return (
    <InfoLayout>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <p className="text-sm font-semibold text-cyan-400">تواصل معنا</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            لنصنع شيئاً يناسبك
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-zinc-400">
            أرسل لي تفاصيل مشروعك وسأعود إليك خلال 24 ساعة بخطة واضحة لموقعك.
          </p>

          <div className="mt-10 space-y-6">
            <div>
              <p className="text-sm font-semibold text-zinc-300">فيسبوك</p>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-violet-300 transition-colors hover:text-violet-200"
              >
                صفحة NexoraStudio
              </a>
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-300">
                البريد الإلكتروني
              </p>
              <a
                href="mailto:nexorastudiofficial@gmail.com"
                className="mt-1 inline-block text-zinc-400 transition-colors hover:text-cyan-300"
                dir="ltr"
              >
                nexorastudiofficial@gmail.com
              </a>
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-300">واتساب</p>
              <a
                href="https://wa.me/213564086437"
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                className="mt-1 inline-block text-emerald-300 transition-colors hover:text-emerald-200 font-mono"
              >
                +213 564 08 64 37
              </a>
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-300">أين أنا</p>
              <p className="mt-1 text-zinc-400">البليدة، الجزائر · راسلني أينما كنت</p>
            </div>
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </InfoLayout>
  );
}
