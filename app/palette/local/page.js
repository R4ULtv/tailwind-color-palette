"use client";

import { useCallback } from "react";
import { SquaresPlusIcon } from "@heroicons/react/16/solid";
import { Button } from "@headlessui/react";

import SelectFormatMenu from "@/components/ui/SelectFormatMenu";
import { useColors } from "@/components/providers/ColorsContext";
import { convertHexColor, generateRandomHexColor } from "@/utils/colors";
import { PaletteItem } from "@/components/ui/EditMode";

export default function LocalPalette() {
  const {
    localPalette,
    editPalette,
    setEditPalette,
    isNewPalette,
    setIsNewPalette,
  } = useColors();

  const handleNewPalette = useCallback(() => {
    if (!editPalette) {
      const randomColor = generateRandomHexColor();
      setIsNewPalette(true);
      setEditPalette({
        uuid: crypto.randomUUID(),
        name: "",
        authors: [],
        createdAt: new Date(),
        colors: [
          {
            hex: randomColor,
            rgb: convertHexColor(randomColor, "rgb"),
            hsl: convertHexColor(randomColor, "hsl"),
            className: "",
          },
        ],
      });
    }
  }, [editPalette, setIsNewPalette, setEditPalette]);

  return (
    <div className="mt-8 sm:mt-4 pt-4 space-y-3">
      <div className="flex items-center sm:justify-end justify-center gap-2">
        <Button
          onClick={handleNewPalette}
          className="bg-zinc-200 text-zinc-900 px-2 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 justify-center shrink-0 select-none"
        >
          <SquaresPlusIcon className="size-4" />
          Create Palette
        </Button>
        <SelectFormatMenu />
      </div>
      <div className="grid gap-4 sm:gap-6">
        {isNewPalette && editPalette && (
          <PaletteItem key={editPalette.uuid} item={editPalette} />
        )}
        {localPalette
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((item) => (
            <PaletteItem key={item.name} item={item} />
          ))}
      </div>
    </div>
  );
}
