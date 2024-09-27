import { palette } from "@/lib/palette";

import SelectFormatMenu from "@/components/ui/SelectFormatMenu";
import { ColorButtonPalette } from "@/components/ui/ColorButton";

export default function PaletteList() {
  return (
    <div className="mt-8 sm:mt-4 pt-4 space-y-3">
      <div className="flex items-center justify-end">
        <SelectFormatMenu />
      </div>
      <div className="grid gap-4 sm:gap-6 w-full">
        {palette.map((i) => (
          <div
            key={i.name}
            className="flex flex-col gap-1.5 overflow-x-auto border border-zinc-800 hover:border-zinc-700 rounded-xl sm:rounded-2xl p-2"
          >
            <div className="text-sm text-zinc-200 font-medium ml-1.5">
              {i.name} - <a href="https://github.com/r4ultv">{i.author}</a>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full">
              {i.colors.map((item, index) => (
                <ColorButtonPalette key={index} color={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
