"use client";

import { useEffect } from "react";

import { useColors } from "@/components/providers/ColorsContext";

export default function FormatIndicator() {
  const { format, indicator, setIndicator } = useColors();
  
  useEffect(() => {
    let timer;
    if (format) {
      timer = setTimeout(() => {
        setIndicator(false);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [format, setIndicator]);

  return (
    <div
      data-visible={indicator}
      className="fixed bottom-5 right-5 flex items-center gap-1 text-xs text-zinc-200 px-2 py-1 bg-zinc-900 border border-zinc-700 rounded-full select-none opacity-0 scale-95 data-[visible=true]:opacity-100 data-[visible=true]:scale-100 transition duration-200 ease-out"
    >
      {format}
    </div>
  );
}
