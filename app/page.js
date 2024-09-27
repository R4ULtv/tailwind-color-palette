import Link from "next/link";
import { PaintBrushIcon, SwatchIcon } from "@heroicons/react/16/solid";

import { colors } from "@/lib/colors";

import { ColorsProvider } from "@/components/providers/ColorsContext";
import ColorButton from "@/components/ui/ColorButton";
import SelectFormatMenu from "@/components/ui/SelectFormatMenu";

export default function Home() {
  return (
    <ColorsProvider>
      <main className="max-w-screen-2xl py-16 md:px-4 mx-auto">
        <div className="relative">
          <h1 className="text-3xl text-zinc-100 font-bold z-10 relative">
            Tailwind Color Palette
          </h1>
          <p className="text-zinc-300 font-medium mt-1.5 z-10 relative">
            Tailwind CSS colors in HSL, RGB, and HEX formats.
          </p>

          <div className="flex items-center gap-2 mt-4 z-10 relative">
            <a
              href="#colors"
              className="bg-zinc-200 text-zinc-900 px-2 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1"
            >
              <SwatchIcon className="size-4" />
              Browse Colors
            </a>
            <Link
              href="/create-palette"
              className="text-zinc-200 px-2 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1"
            >
              <PaintBrushIcon className="size-4" />
              Create Palette
            </Link>
          </div>

          <div className="w-full h-full absolute inset-0 overflow-hidden blur-3xl">
            <div className="absolute rounded-full bg-indigo-500 opacity-50 h-20 w-36 translate-x-full" />
            <div className="absolute rounded-full bg-purple-500 opacity-50 h-20 w-36 translate-x-1/2 translate-y-1/2" />
            <div className="absolute rounded-full bg-pink-500 opacity-50 h-20 w-36" />
          </div>
        </div>

        <div className="mt-4 pt-4 space-y-3" id="colors">
          <div className="flex items-center justify-end">
            <SelectFormatMenu />
          </div>
          <div className="grid gap-6 w-full">
            {Object.keys(colors).map((color) => (
              <div
                className="flex flex-row gap-2 overflow-x-auto border border-zinc-800 hover:border-zinc-700 rounded-2xl p-2"
                key={color}
              >
                {colors[color].map((item) => (
                  <ColorButton key={item.scale} item={item} color={color} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </main>
    </ColorsProvider>
  );
}
