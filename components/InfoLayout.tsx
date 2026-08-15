import Link from "next/link";
import Image from "next/image";

export default function InfoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-white/10 bg-[#05060b]/80 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="group flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt="NexoraStudio"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
            <span className="text-lg font-semibold tracking-tight text-white">
              NexoraStudio
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm text-zinc-400 transition-colors hover:text-white"
          >
            الرئيسية
          </Link>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16 sm:px-6 sm:py-20">
        {children}
      </main>

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} NexoraStudio, Inc. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-6 text-sm text-zinc-500">
            <Link href="/privacy" className="transition-colors hover:text-white">
              الخصوصية
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              الشروط
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
