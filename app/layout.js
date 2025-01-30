import "./globals.css";
import { GeistSans } from "geist/font/sans";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";

import { PaintBrushIcon, SwatchIcon } from "@heroicons/react/16/solid";
import { ColorsProvider } from "@/components/providers/ColorsContext";
import ShortCutMenu from "@/components/ui/ShortcutMenu";
import FormatIndicator from "@/components/ui/FormatIndicator";

export const metadata = {
  metadataBase: process.env.HOST_NAME,
  title: "Tailwind Color Palette",
  description:
    "Explore Tailwind CSS colors in various formats including HSL, RGB, HEX, and the new OKLCH format for better color accuracy.",
  openGraph: {
    url: process.env.HOST_NAME,
    images: [
      {
        url: "/og-image.png",
        width: 843,
        height: 441,
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="antialiased scroll-smooth">
      <body
        className={
          GeistSans.className + " bg-zinc-900 selection:bg-zinc-600/25 relative"
        }
      >
        <Analytics />
        <ColorsProvider>
          <main className="max-w-(--breakpoint-2xl) py-8 md:py-16 px-4 mx-auto">
            <div className="relative">
              <h1 className="text-2xl md:text-3xl text-zinc-100 font-bold z-10 relative">
                Tailwind Color Palette
              </h1>
              <p className="text-sm md:text-base text-zinc-300 font-medium mt-1.5 z-10 relative">
                Tailwind CSS colors in HSL, RGB, HEX and OKLCH formats.
              </p>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 mt-4 z-10 relative">
                <Link
                  href="/"
                  className="bg-zinc-200 text-zinc-900 px-2 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1.5 w-full md:w-auto justify-center md:justify-start group select-none"
                >
                  <PaintBrushIcon className="size-4 transform group-hover:scale-110 group-hover:rotate-12 transition duration-150" />
                  Browse Colors
                </Link>
                <Link
                  href="/palettes"
                  className="text-zinc-200 px-2 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1.5 w-full md:w-auto justify-center md:justify-start border border-transparent hover:border-zinc-600 transition duration-150 group select-none"
                >
                  <SwatchIcon className="size-4 transform group-hover:scale-110 group-hover:rotate-12 transition duration-150" />
                  Browse Palettes
                </Link>
              </div>

              <div className="w-full h-full absolute inset-0 overflow-hidden blur-3xl">
                <div className="absolute rounded-full bg-indigo-500 opacity-50 h-20 w-36 translate-x-full" />
                <div className="absolute rounded-full bg-purple-500 opacity-50 h-20 w-36 translate-x-1/2 translate-y-1/2" />
                <div className="absolute rounded-full bg-pink-500 opacity-50 h-20 w-36" />
              </div>
            </div>
            {children}
          </main>
          <FormatIndicator />
          <footer className="max-w-(--breakpoint-2xl) px-4 mx-auto py-3">
            <div className="flex items-center justify-between text-sm text-zinc-400">
              <p>
                Built by{" "}
                <a
                  href="https://github.com/r4ultv"
                  className="underline underline-offset-2 hover:text-zinc-300"
                >
                  @r4ultv
                </a>
                . The source code is available on{" "}
                <a
                  href="https://github.com/r4ultv/tailwind-color-palette"
                  className="underline underline-offset-2 hover:text-zinc-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                .
              </p>
              <ShortCutMenu />
            </div>
          </footer>
        </ColorsProvider>
      </body>
    </html>
  );
}
