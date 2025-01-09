"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/menu";
import { BoltIcon } from "@heroicons/react/16/solid";
import { useColors } from "@/components/providers/ColorsContext";

export default function ShortCutMenu() {
  const { formatList, setFormat, setIndicator } = useColors();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-0.5 outline-none select-none group border border-transparent px-2 py-1.5 rounded-lg hover:border-zinc-600 transition duration-150">
        <BoltIcon className="size-3 group-hover:fill-amber-400 transform group-hover:scale-110 group-hover:rotate-180 transition duration-150" />
        <span className="text-xs font-bold">ShortCuts</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          Rotate Formats <DropdownMenuShortcut>q/e</DropdownMenuShortcut>
        </DropdownMenuItem>
        {formatList.map((item) => (
          <DropdownMenuItem
            key={item.name}
            onSelect={() => {
              setFormat(item.name);
              setIndicator(true);
            }}
          >
            {item.name}
            <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
