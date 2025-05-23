
import Image from "next/image";
import QRGeneratorClientWrapper from "@/components/QRGeneratorClientWrapper";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800 p-4">
      <QRGeneratorClientWrapper />
      <footer className="mt-10 text-center text-xs text-zinc-500 dark:text-zinc-400">
        &copy; {new Date().getFullYear()} QR Generator App &mdash; Powered by Next.js, Tailwind, Shadcn UI
      </footer>
    </div>
  );
}
