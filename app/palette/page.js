import { memo } from "react";
import { Link } from "next-view-transitions";
import { palette } from "@/lib/palette";
import { UserIcon } from "@heroicons/react/16/solid";

import SelectFormatMenu from "@/components/ui/SelectFormatMenu";
import { ColorButtonPalette } from "@/components/ui/ColorButton";
import { TailwindExport } from "@/components/ui/ExportButtons";

const PaletteItem = memo(({ item }) => (
  <div className="flex flex-col gap-1.5 border border-zinc-800 hover:border-zinc-700 rounded-xl sm:rounded-2xl p-2">
    <div className="flex items-center justify-between gap-8 my-1">
      <div className="text-sm text-zinc-200 font-medium ml-1.5">
        {item.name} -{" "}
        {item.authors.map((author, index) => (
          <span key={index}>
            <a
              href={`https://github.com/${author}`}
              target="blank"
              rel="noopener noreferrer"
            >
              @{author}
            </a>
            {index < item.authors.length - 1 && ", "}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-1">
        <TailwindExport
          className={item.name.toLowerCase()}
          colors={item.colors}
        />
      </div>
    </div>

    <div className="flex flex-col sm:flex-row gap-2 relative">
      {item.colors.map((color, index) => (
        <ColorButtonPalette
          key={`${item.name}-${index}`}
          color={color}
          palette={item}
        />
      ))}
    </div>
  </div>
));

PaletteItem.displayName = "PaletteItem";

export default function PaletteList() {
  return (
    <div className="mt-8 sm:mt-4 pt-4 space-y-3">
      <div className="flex items-center sm:justify-end justify-center gap-2">
        <Link
          href="/palette/local"
          className="bg-zinc-200 text-zinc-900 px-2 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 justify-center sm:justify-start flex-1 sm:flex-none shrink-0 "
        >
          <UserIcon className="size-4" />
          Local Palette
        </Link>
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
