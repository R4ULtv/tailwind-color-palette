"use client";

import { useCallback } from "react";
import { useColors } from "@/components/providers/ColorsContext";
import { Button } from "@headlessui/react";
import { SquaresPlusIcon } from "@heroicons/react/16/solid";
import { convertHexColor, generateRandomHexColor } from "@/utils/colors";

export default function NewPaletteButton() {
  const { editPalette, setEditPalette, setIsNewPalette } = useColors();

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
            oklch: convertHexColor(randomColor, "oklch"),
            className: "",
          },
        ],
      });
    }
  }, [editPalette, setIsNewPalette, setEditPalette]);

  return (
    <Button
      onClick={handleNewPalette}
      className="text-zinc-900 bg-zinc-200 px-2.5 py-2 md:px-2 md:py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 justify-center shrink-0 md:flex-none group select-none"
    >
      <SquaresPlusIcon className="size-4 transform group-data-hover:scale-110 group-data-hover:rotate-12 transition duration-150" />
      <span className="hidden md:block">Create Palette</span>
    </Button>
  );
}
