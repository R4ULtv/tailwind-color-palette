import { memo } from "react";
import { palette } from "@/lib/palette";

import SelectFormatMenu from "@/components/ui/SelectFormatMenu";
import { ColorButtonPalette } from "@/components/ui/ColorButton";
import {
  CssVariablesExport,
  TailwindExport,
} from "@/components/ui/ExportButtons";
import LocalPalette from "@/components/ui/LocalPalette";
import NewPaletteButton from "@/components/ui/NewPaletteButton";
import HelpDialog from "@/components/ui/HelpDialog";
import { TooltipProvider } from "@/components/ui/tooltip";

const PaletteItem = memo(({ item }) => (
  <div className="flex flex-col gap-1.5 border border-zinc-800 hover:border-zinc-700 rounded-xl md:rounded-2xl p-2">
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
        <CssVariablesExport
          className={item.name.toLowerCase()}
          colors={item.colors}
        />
        <TailwindExport
          className={item.name.toLowerCase()}
          colors={item.colors}
        />
      </div>
    </div>

    <div className="flex flex-col md:flex-row gap-2 relative">
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
    <div className="mt-8 md:mt-4 pt-4 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <HelpDialog />
        <div className="flex gap-2">
          <NewPaletteButton />
          <SelectFormatMenu />
        </div>
      </div>
      <TooltipProvider>
        <div className="grid gap-4 md:gap-2">
          <LocalPalette />
          {palette.map((item) => (
            <PaletteItem key={item.name} item={item} />
          ))}
        </div>
      </TooltipProvider>
    </div>
  );
}
