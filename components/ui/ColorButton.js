"use client";

import { useState, useCallback, useMemo } from "react";
import { Button, Transition } from "@headlessui/react";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/solid";
import { useColors } from "@/components/providers/ColorsContext";

const CopyButton = ({ copyValue, backgroundColor, textColor }) => {
  const [copiedText, setCopiedText] = useState("");

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(copyValue).then(() => {
      setCopiedText(copyValue);
      setTimeout(() => setCopiedText(""), 1500);
    });
  }, [copyValue]);

  return (
    <Button
      onClick={copyToClipboard}
      className="w-auto h-auto flex-1 flex flex-col gap-1.5 transition duration-75 data-[hover]:border-zinc-600 data-[focus]:border-zinc-500 outline-none group"
    >
      <div
        className="rounded-xl flex-1 aspect-[5/1] sm:aspect-[2/1] w-full h-auto relative max-h-40"
        style={{ backgroundColor }}
      >
        <Transition show={!!copiedText}>
          <div className="absolute inset-0 flex items-center justify-center transform transition duration-75 ease-in-out data-[closed]:opacity-0 group/icon">
            <ClipboardDocumentCheckIcon
              className={`size-9 group-data-[closed]/icon:scale-50 p-2 rounded-xl ${textColor}`}
            />
          </div>
        </Transition>
      </div>
      <div className="text-sm font-medium text-zinc-400 group-hover:text-zinc-200 truncate w-full px-2">
        {copyValue}
      </div>
    </Button>
  );
};

export function ColorButtonTailwind({ item, color }) {
  const { format } = useColors();
  const copyValue = useMemo(
    () => (format === "className" ? `${color}-${item.scale}` : item[format]),
    [format, color, item]
  );
  const textColor =
    item.scale < 500
      ? "text-zinc-200 bg-zinc-800"
      : "text-zinc-800 bg-zinc-200";

  return (
    <CopyButton
      copyValue={copyValue}
      backgroundColor={item.hex}
      textColor={textColor}
    />
  );
}

export function ColorButtonPalette({ color }) {
  const { format } = useColors();
  const copyValue = useMemo(() => color[format], [format, color]);

  return (
    <CopyButton
      copyValue={copyValue}
      backgroundColor={color.hex}
      textColor="text-zinc-200 bg-zinc-800"
    />
  );
}
