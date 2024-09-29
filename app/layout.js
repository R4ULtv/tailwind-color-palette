import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { Link } from "next-view-transitions";

import { ViewTransitions } from "next-view-transitions";
import { PaintBrushIcon, SwatchIcon } from "@heroicons/react/16/solid";
import { ColorsProvider } from "@/components/providers/ColorsContext";
import ShortCutMenu from "@/components/ui/ShortcutMenu";

export const metadata = {
  metadataBase: process.env.HOST_NAME,
  title: "Tailwind Color Palette",
  description:
    "Browse through the Tailwind CSS colors in HSL, RGB, and HEX formats.",
  openGraph: {
    title: "Tailwind Color Palette",
    description:
      "Browse through the Tailwind CSS colors in HSL, RGB, and HEX formats.",
    url: process.env.HOST_NAME,
    images: [
      {
        url: `${process.env.HOST_NAME}/og-image.png`,
        width: 843,
        height: 441,
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html lang="en" className="antialiased scroll-smooth">
        <body
          className={
            GeistSans.className +
            " bg-zinc-100 dark:bg-zinc-900 selection:bg-zinc-400/25 dark:selection:bg-zinc-600/25 relative"
          }
        >
          <ColorsProvider>
            <main className="max-w-screen-2xl py-8 sm:py-16 px-4 mx-auto">
              <div className="relative">
                <h1 className="text-2xl sm:text-3xl text-zinc-100 font-bold z-10 relative">
                  Tailwind Color Palette
                </h1>
                <p className="text-sm sm:text-base text-zinc-300 font-medium mt-1.5 z-10 relative">
                  Tailwind CSS colors in HSL, RGB, and HEX formats.
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-4 z-10 relative">
                  <Link
                    href="/"
                    className="bg-zinc-200 text-zinc-900 px-2 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 w-full sm:w-auto justify-center sm:justify-start"
                  >
                    <SwatchIcon className="size-4" />
                    Browse Colors
                  </Link>
                  <Link
                    href="/palette"
                    className="text-zinc-200 px-2 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 w-full sm:w-auto justify-center sm:justify-start"
                  >
                    <PaintBrushIcon className="size-4" />
                    Browse Palette
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
            <footer className="max-w-screen-2xl px-4 mx-auto py-3">
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
                    href="https://github.com/r4ultv/tailwind-colors"
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
    </ViewTransitions>
  );
}
