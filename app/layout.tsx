import type { Metadata } from "next";
import { Amiri, Noto_Sans_Arabic } from "next/font/google";
import MetaPixel from "@/components/MetaPixel";
import "./globals.css";

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-noto-sans-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "NexoraStudio — نصنع تجارب رقمية تصنع الفرق",
  description: "مواقع عصرية، هويات رقمية، وحلول مصممة لتنمية أعمالك.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${notoSansArabic.variable} ${amiri.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <MetaPixel />
      </body>
    </html>
  );
}
