"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  FunnelIcon,
} from "@heroicons/react/16/solid";

import { useColors } from "@/components/providers/ColorsContext";

export default function SelectFormatMenu() {
  const { formatList, format, setFormat } = useColors();

  return (
    <Listbox value={format} onChange={setFormat}>
      <ListboxButton className="flex items-center justify-between gap-3 rounded-lg py-1.5 px-2 text-left text-sm text-zinc-300 border border-zinc-700 shrink-0 flex-1 sm:flex-none group select-none">
        <div className="flex items-center gap-1 justify-center">
          <FunnelIcon
            className="size-4 transform group-data-[hover]:scale-110 group-data-[hover]:rotate-12 transition duration-150"
            aria-hidden="true"
          />
          <span className="font-medium text-zinc-200">Format:</span>
          <span>{format}</span>
        </div>
        <ChevronUpDownIcon className="size-4" aria-hidden="true" />
      </ListboxButton>
      <ListboxOptions
        anchor="bottom end"
        transition
        className="min-w-40 rounded-lg bg-zinc-900 border border-zinc-700 p-1 outline-none z-20 transition transform duration-75 ease-in-out [--anchor-gap:4px] data-[closed]:-translate-y-1/3 data-[closed]:scale-50 data-[closed]:opacity-0"
      >
        {formatList.map((item) => (
          <ListboxOption
            key={item.name}
            value={item.name}
            className="group flex items-center justify-between gap-8 rounded-md py-1.5 px-3 select-none data-[focus]:bg-zinc-800 text-zinc-200"
          >
            <div className="flex cursor-default items-center gap-2">
              <div className="text-sm group-data-[selected]:font-semibold">
                {item.name}{" "}
                <span className="text-xs font-normal text-zinc-300">
                  {item.example}
                </span>
              </div>
            </div>
            <CheckIcon className="invisible size-4 group-data-[selected]:visible" />
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}
