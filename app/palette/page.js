import { memo } from "react";
import { palette } from "@/lib/palette";
import SelectFormatMenu from "@/components/ui/SelectFormatMenu";
import { ColorButtonPalette } from "@/components/ui/ColorButton";

const PaletteItem = memo(({ item }) => (
  <div className="flex flex-col gap-1.5 overflow-x-auto border border-zinc-800 hover:border-zinc-700 rounded-xl sm:rounded-2xl p-2">
    <div className="text-sm text-zinc-200 font-medium ml-1.5">
      {item.name} -{" "}
      <a href={`https://github.com/${item.author}`}>{item.author}</a>
    </div>
    <div className="flex flex-col sm:flex-row gap-2">
      {item.colors.map((color, index) => (
        <ColorButtonPalette key={`${item.name}-${index}`} color={color} />
      ))}
    </div>
  </div>
));

PaletteItem.displayName = "PaletteItem";

export default function PaletteList() {
  return (
    <div className="mt-8 sm:mt-4 pt-4 space-y-3">
      <div className="flex items-center justify-end">
        <SelectFormatMenu />
      </div>
      <div className="grid gap-4 sm:gap-6">
        {palette.map((item) => (
          <PaletteItem key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
}
