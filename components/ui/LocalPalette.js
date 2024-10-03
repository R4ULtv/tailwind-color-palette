"use client";

import { useColors } from "@/components/providers/ColorsContext";
import { PaletteItem } from "@/components/ui/EditMode";

export default function LocalPalette() {
  const { localPalette, editPalette, isNewPalette } = useColors();

  return (
    <>
      {isNewPalette && editPalette && (
        <PaletteItem key={editPalette.uuid} item={editPalette} />
      )}
      {localPalette
        .sort((a, b) => b.createdAt - a.createdAt)
        .map((item) => (
          <PaletteItem key={item.name} item={item} />
        ))}
      {localPalette.length > 0 || isNewPalette && (
        <div className="h-px w-full bg-zinc-800"></div>
      )}
    </>
  );
}
