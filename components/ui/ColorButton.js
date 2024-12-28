"use client";

import { useState, useCallback, useMemo } from "react";
import { CheckIcon } from "@heroicons/react/16/solid";
import { useColors } from "@/components/providers/ColorsContext";

const CopyButton = ({ value, copyValue, backgroundColor }) => {
  const [copiedText, setCopiedText] = useState("");

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(copyValue).then(() => {
      setCopiedText(copyValue);
      setTimeout(() => setCopiedText(""), 1500);
    });
  }, [copyValue]);

  return (
    <button
      onClick={copyToClipboard}
      className="w-auto h-auto flex-1 flex flex-col gap-1.5 outline-none group"
    >
      <div
        className="rounded-xl flex-1 aspect-[3/1] md:aspect-[2/1] w-full h-auto relative max-h-40 overflow-hidden"
        style={{ backgroundColor }}
      >
        {copiedText && (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <CheckIcon className="size-5 rounded-xl text-black" />
          </div>
        )}
      </div>
      <div className="text-sm font-medium text-zinc-400 group-hover:text-zinc-200 truncate w-full px-2">
        {value}
      </div>
    </button>
  );
};

export function ColorButtonTailwind({ item, color }) {
  const { format } = useColors();
  const copyValue = useMemo(
    () => (format === "className" ? `${color}-${item.scale}` : item[format]),
    [format, color, item]
  );

  return (
    <CopyButton
      value={`${color}-${item.scale}`}
      copyValue={copyValue}
      backgroundColor={item.hex}
    />
  );
}

export function ColorButtonPalette({ color }) {
  const { format } = useColors();
  const copyValue = useMemo(() => color[format], [format, color]);

  return (
    <CopyButton
      value={copyValue}
      copyValue={copyValue}
      backgroundColor={color.hex}
      textColor="text-zinc-200 bg-zinc-800"
    />
  );
}
