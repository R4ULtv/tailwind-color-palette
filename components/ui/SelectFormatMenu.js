"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/16/solid";

import { useColors } from "@/components/providers/ColorsContext";

export default function SelectFormatMenu() {
  const { formatList, format, setFormat } = useColors();

  return (
    <div className="shrink-0 group select-none text-sm text-zinc-300">
      <Select value={format} onValueChange={setFormat}>
        <SelectTrigger aria-label="Select format">
          <AdjustmentsHorizontalIcon className="size-4" />
          <span className="font-medium text-zinc-200 hidden md:block">
            Format:
          </span>
          <span>{format}</span>
        </SelectTrigger>
        <SelectContent align="end">
          {formatList.map((item) => (
            <SelectItem key={item.name} value={item.name}>
              {item.name}{" "}
              <code className="text-xs font-normal text-zinc-400">
                {item.example}
              </code>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
