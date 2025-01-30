"use client";

import { useState, useCallback, useMemo } from "react";
import { Button } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/16/solid";
import { CssIcon, GithubIcon, TailwindIcon } from "@/utils/icons";

export function TailwindExport({ className, colors }) {
  const [isCopied, setIsCopied] = useState(false);

  const formattedColors = useMemo(() => {
    const formatted = colors.reduce((acc, color) => {
      const trimmedName = color.className.replace(
        new RegExp(`^${className}-`),
        ""
      );
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
      className="p-1.5 rounded-lg border border-zinc-700 text-zinc-200 group flex items-center gap-1 data-hover:border-zinc-600 transition duration-75 ease-in-out"
    >
      {isCopied ? (
        <>
          <CheckIcon className="size-3.5" />
          <span className="text-xs font-medium hidden sm:block">
            Copy Tailwind
          </span>
        </>
      ) : (
        <>
          <TailwindIcon className="size-3.5" />
          <span className="text-xs font-medium hidden sm:block">
            Copy Tailwind
          </span>
        </>
      )}
    </Button>
  );
}

export function GithubExport({ palette }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(palette);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }, [palette]);

  return (
    <Button
      onClick={handleCopy}
      className="p-1.5 rounded-lg border border-zinc-700 text-zinc-200 group flex items-center gap-1 data-hover:border-zinc-600 transition duration-75 ease-in-out"
    >
      {isCopied ? (
        <>
          <CheckIcon className="size-3.5" />
          <span className="text-xs font-medium hidden sm:block">
            Copy Github
          </span>
        </>
      ) : (
        <>
          <GithubIcon className="size-3.5" />
          <span className="text-xs font-medium hidden sm:block">
            Copy Github
          </span>
        </>
      )}
    </Button>
  );
}

export function CssVariablesExport({ className, colors }) {
  const [isCopied, setIsCopied] = useState(false);

  const formattedColors = useMemo(() => {
    return colors.map(color => {
      const variableName = color.className.replace(
        new RegExp(`^${className}-`),
        ""
      );
      return `  --${className}-${variableName}: ${color.hex};`;
    }).join('\n');
  }, [className, colors]);

  const cssVariables = `:root {\n${formattedColors}\n}`;

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(cssVariables);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }, [cssVariables]);

  return (
    <Button
      onClick={handleCopy}
      className="p-1.5 rounded-lg border border-zinc-700 text-zinc-200 group flex items-center gap-1 data-hover:border-zinc-600 transition duration-75 ease-in-out"
    >
      {isCopied ? (
        <>
          <CheckIcon className="size-3.5" />
          <span className="text-xs font-medium hidden sm:block">
            Copy CSS
          </span>
        </>
      ) : (
        <>
          <CssIcon className="size-3.5" />
          <span className="text-xs font-medium hidden sm:block">
            Copy CSS
          </span>
        </>
      )}
    </Button>
  );
}
