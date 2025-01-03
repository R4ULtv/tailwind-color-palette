"use client";

import { useState, useCallback, useMemo } from "react";
import { CheckIcon } from "@heroicons/react/16/solid";
import { useColors } from "@/components/providers/ColorsContext";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CopyButton = ({ item, color, copyValue, backgroundColor }) => {
  const [copiedText, setCopiedText] = useState("");

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(copyValue).then(() => {
      setCopiedText(copyValue);
      setTimeout(() => setCopiedText(""), 1500);
    });
  }, [copyValue]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
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
            {item.className ? item.className : `${color}-${item.scale}`}
          </div>
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <div className="space-y-0.5">
          <div
            className={
              `text-sm truncate w-full px-1.5 py-0.5 font-medium rounded-lg ` +
              (copyValue === `${color}-${item.scale}`
                ? "bg-zinc-800 text-zinc-100"
                : "text-zinc-400")
            }
          >
            <code>{`${color}-${item.scale}`}</code>
          </div>
          <div
            className={
              `text-sm truncate w-full px-1.5 py-0.5 font-medium rounded-lg ` +
              (copyValue === item.hex
                ? "bg-zinc-800 text-zinc-100"
                : "text-zinc-400")
            }
          >
            <code>{item.hex}</code>
          </div>
          <div
            className={
              `text-sm truncate w-full px-1.5 py-0.5 font-medium rounded-lg ` +
              (copyValue === item.rgb
                ? "bg-zinc-800 text-zinc-100"
                : "text-zinc-400")
            }
          >
            <code>{item.rgb}</code>
          </div>
          <div
            className={
              `text-sm truncate w-full px-1.5 py-0.5 font-medium rounded-lg ` +
              (copyValue === item.hsl
                ? "bg-zinc-800 text-zinc-100"
                : "text-zinc-400")
            }
          >
            <code>{item.hsl}</code>
          </div>
          <div
            className={
              `text-sm truncate w-full px-1.5 py-0.5 font-medium rounded-lg ` +
              (copyValue === item.oklch
                ? "bg-zinc-800 text-zinc-100"
                : "text-zinc-400")
            }
          >
            <code>{item.oklch}</code>
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
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
      item={item}
      color={color}
      copyValue={copyValue}
      backgroundColor={item.oklch}
    />
  );
}

export function ColorButtonPalette({ color }) {
  const { format } = useColors();
  const copyValue = useMemo(() => color[format], [format, color]);

  return (
    <CopyButton
      item={color}
      copyValue={copyValue}
      backgroundColor={color.hex}
      textColor="text-zinc-200 bg-zinc-800"
    />
  );
}
