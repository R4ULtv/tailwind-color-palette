"use client";

import { useState, useCallback, useMemo } from "react";
import { Button } from "@headlessui/react";
import {
  CheckIcon,
  ClipboardIcon,
} from "@heroicons/react/16/solid";

export default function TailwindExport({ className, colors }) {
  const [isCopied, setIsCopied] = useState(false);

  const formattedColors = useMemo(() => {
    const formatted = colors.reduce((acc, color) => {
      const trimmedName = color.className.replace(new RegExp(`^${className}-`), "");
      acc[trimmedName] = color.hex;
      return acc;
    }, {});
    return JSON.stringify({ [className]: formatted }, null, 2).slice(2, -2);
  }, [className, colors]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(formattedColors);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }, [formattedColors]);

  return (
    <Button
      onClick={handleCopy}
      className="p-1.5 rounded-lg border border-zinc-700 text-zinc-200 group"
    >
      {isCopied ? (
        <CheckIcon className="size-3.5 group-hover:scale-110 duration-75 ease-in-out transition" />
      ) : (
        <ClipboardIcon className="size-3.5 group-hover:scale-110 duration-75 ease-in-out transition" />
      )}
    </Button>
  );
}