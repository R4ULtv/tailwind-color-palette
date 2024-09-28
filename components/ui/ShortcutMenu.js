"use client";

import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { BoltIcon } from "@heroicons/react/16/solid";
import { useColors } from "@/components/providers/ColorsContext";

export default function ShortCutMenu() {
  const { formatList } = useColors();

  return (
    <Menu>
      <MenuButton className="flex items-center gap-0.5 outline-none select-none">
        <BoltIcon className="size-3" />
        <span className="text-xs font-bold">ShortCuts</span>
      </MenuButton>
      <MenuItems
        transition
        anchor="top end"
        className="min-w-32 origin-top-right outline-none p-1 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 text-sm transition duration-75 ease-in-out [--anchor-gap:4px] data-[closed]:scale-90 data-[closed]:opacity-0"
      >
        <MenuItem>
          <Button className="group flex w-full items-center gap-4 rounded-md py-1.5 px-3 data-[focus]:bg-zinc-800/5 dark:data-[focus]:bg-zinc-200/5">
            Rotate Formats
            <kbd className="ml-auto font-sans text-xs">q or e</kbd>
          </Button>
        </MenuItem>
        {formatList.map((item) => (
          <MenuItem key={item.name}>
            <Button className="group flex w-full items-center gap-4 rounded-md py-1.5 px-3 data-[focus]:bg-zinc-800/5 dark:data-[focus]:bg-zinc-200/5">
              Set to `{item.name}`
              <kbd className="ml-auto font-sans text-xs">{item.shortcut}</kbd>
            </Button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
