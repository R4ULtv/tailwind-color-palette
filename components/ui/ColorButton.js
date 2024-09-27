"use client";

import { useState, useCallback, useMemo } from "react";
import { Button, Transition } from "@headlessui/react";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/solid";
import { useColors } from "@/components/providers/ColorsContext";

export function ColorButtonTailwind({ item, color }) {
  const { format } = useColors();
  const [copiedText, setCopiedText] = useState("");

  const copyValue = useMemo(
    () => (format === "className" ? `${color}-${item.scale}` : item[format]),
    [format, color, item]
  );

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(copyValue).then(() => {
      setCopiedText(copyValue);
      setTimeout(() => setCopiedText(""), 1500);
    });
  }, [copyValue]);

  const textColor = item.scale > 500 ? "text-zinc-200" : "text-zinc-800";

  return (
    <Button
      onClick={copyToClipboard}
      className="h-full flex-1 transition duration-75 data-[hover]:border-zinc-600 data-[focus]:border-zinc-500 outline-none group"
    >
      <div
        className="rounded-xl aspect-[5/1] sm:aspect-[2/1] w-auto h-auto relative"
        style={{ backgroundColor: item.hex }}
      >
        <Transition show={!!copiedText}>
          <div className="absolute inset-0 flex items-center justify-center transform transition duration-75 ease-in-out data-[closed]:opacity-0 group/icon">
            <ClipboardDocumentCheckIcon
              className={`size-6 group-data-[closed]/icon:scale-50 ${textColor}`}
            />
          </div>
        </Transition>
      </div>
      <div className="text-sm font-medium text-zinc-400 mt-1.5 group-hover:text-zinc-200 truncate max-w-28 mx-auto">
        {copyValue}
      </div>
    </Button>
  );
}

export function ColorButtonPalette({ color }) {
  const { format } = useColors();
  const [copiedText, setCopiedText] = useState("");

  const copyValue = useMemo(
    () => (color[format]),
    [format, color]
  );

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(copyValue).then(() => {
      setCopiedText(copyValue);
      setTimeout(() => setCopiedText(""), 1500);
    });
  }, [copyValue]);

  return (
    <Button
      onClick={copyToClipboard}
      className="h-full flex-1 transition duration-75 data-[hover]:border-zinc-600 data-[focus]:border-zinc-500 outline-none group"
    >
      <div
        className="rounded-xl aspect-[5/1] sm:aspect-[2/1] w-auto h-auto relative"
        style={{ backgroundColor: color.hex }}
      >
        <Transition show={!!copiedText}>
          <div className="absolute inset-0 flex items-center justify-center transform transition duration-75 ease-in-out data-[closed]:opacity-0 group/icon">
            <ClipboardDocumentCheckIcon className="size-9 group-data-[closed]/icon:scale-50 text-zinc-200 p-2 bg-zinc-800 rounded-xl" />
          </div>
        </Transition>
      </div>
      <div className="text-sm font-medium text-zinc-400 mt-1.5 group-hover:text-zinc-200 truncate max-w-28 mx-auto">
        {copyValue}
      </div>
    </Button>
  );
}
