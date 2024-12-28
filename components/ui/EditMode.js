"use client";

import { memo, useCallback } from "react";
import {
  BackspaceIcon,
  BookmarkIcon,
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import {
  Button,
  Field,
  Input,
  Label,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { HexColorPicker } from "react-colorful";

import { ColorButtonPalette } from "@/components/ui/ColorButton";
import {
  TailwindExport,
  GithubExport,
  CssVariablesExport,
} from "@/components/ui/ExportButtons";
import { useColors } from "@/components/providers/ColorsContext";
import {
  convertHexColor,
  generateRandomHexColor,
  isValidColorFormat,
} from "@/utils/colors";

export const PaletteItem = memo(({ item }) => {
  const {
    editPalette,
    setEditPalette,
    localPalette,
    setLocalPalette,
    setIsNewPalette,
  } = useColors();

  const isEditing = editPalette?.uuid === item.uuid;

  const handleSave = useCallback(() => {
    if (isEditing) {
      if (
        !editPalette.name ||
        !editPalette.authors.length ||
        !editPalette.colors.length
      ) {
        return;
      }

      const updatedPalette = localPalette.map((palette) =>
        palette.uuid === item.uuid ? editPalette : palette
      );

      if (!updatedPalette.some((palette) => palette.uuid === item.uuid)) {
        updatedPalette.push(editPalette);
      }

      localStorage.setItem("colors-palette", JSON.stringify(updatedPalette));
      setEditPalette(null);
      setIsNewPalette(false);
      setLocalPalette(updatedPalette);
    } else {
      setEditPalette(item);
    }
  }, [
    isEditing,
    editPalette,
    item,
    localPalette,
    setEditPalette,
    setIsNewPalette,
    setLocalPalette,
  ]);

  const handleEditName = useCallback(
    (e) => {
      setEditPalette((prev) => ({ ...prev, name: e.target.value }));
    },
    [setEditPalette]
  );

  const handleEditAuthors = useCallback(
    (e) => {
      setEditPalette((prev) => ({
        ...prev,
        authors: e.target.value.split(","),
      }));
    },
    [setEditPalette]
  );

  const handleAddColor = useCallback(() => {
    const randomColor = generateRandomHexColor();
    setEditPalette((prev) => ({
      ...prev,
      colors: [
        ...prev.colors,
        {
          hex: randomColor,
          rgb: convertHexColor(randomColor, "rgb"),
          hsl: convertHexColor(randomColor, "hsl"),
          oklch: convertHexColor(randomColor, "oklch"),
          className: "",
        },
      ],
    }));
  }, [setEditPalette]);

  const handleRemoveColor = useCallback(() => {
    setEditPalette((prev) => ({
      ...prev,
      colors: prev.colors.slice(0, -1),
    }));
  }, [setEditPalette]);

  const handleDelete = useCallback(() => {
    setIsNewPalette(false);
    setEditPalette(null);
    setLocalPalette((prev) =>
      prev.filter((palette) => palette.uuid !== item.uuid)
    );
    localStorage.setItem(
      "colors-palette",
      JSON.stringify(
        localPalette.filter((palette) => palette.uuid !== item.uuid)
      )
    );
  }, [item.uuid, setEditPalette, setLocalPalette, localPalette]);

  const renderEditFields = () => (
    <div className="flex gap-2">
      <Field className="max-w-60">
        <Label>Palette Name</Label>
        <Input
          required
          type="text"
          placeholder="Sunset..."
          className="mt-2 py-1 px-2 text-start font-medium bg-transparent placeholder:text-zinc-500 text-zinc-300 border border-zinc-700 rounded-lg w-full outline-none"
          value={editPalette.name}
          onChange={handleEditName}
        />
      </Field>
      <Field className="max-w-60">
        <Label>Authors (Github Username)</Label>
        <Input
          required
          type="text"
          placeholder="r4ultv, ..."
          className="mt-2 py-1 px-2 text-start font-medium bg-transparent placeholder:text-zinc-500 text-zinc-300 border border-zinc-700 rounded-lg w-full outline-none"
          value={editPalette.authors.join(", ")}
          onChange={handleEditAuthors}
        />
      </Field>
    </div>
  );

  const renderColorPicker = (color, index) => (
    <Popover key={index} className="relative w-auto h-auto flex-1">
      <div className="w-full h-full flex flex-col gap-1.5">
        <PopoverButton
          className="rounded-xl flex-1 aspect-[5/1] md:aspect-[2/1] w-full h-auto max-h-40"
          style={{ backgroundColor: color.hex }}
        />
        <Input
          required
          type="text"
          placeholder="Color Name"
          value={color.className}
          onChange={(e) =>
            setEditPalette((prev) => ({
              ...prev,
              colors: prev.colors.map((c, i) =>
                i === index ? { ...c, className: e.target.value } : c
              ),
            }))
          }
          className="text-sm mt-2 py-1 text-center font-medium bg-transparent placeholder:text-zinc-500 text-zinc-300 border border-zinc-700 rounded-lg w-full outline-none"
        />
      </div>
      <PopoverPanel
        transition
        anchor="top"
        className="z-50 transition duration-150 ease-in-out translate-y-2 data-[closed]:opacity-0 data-[closed]:scale-50 overflow-hidden bg-zinc-900 border border-zinc-700 rounded-xl pt-4 px-4 pb-2"
      >
        <HexColorPicker
          color={color.hex}
          onChange={(newColor) =>
            setEditPalette((prev) => ({
              ...prev,
              colors: prev.colors.map((c, i) =>
                i === index
                  ? {
                      ...c,
                      hex: newColor,
                      rgb: convertHexColor(newColor, "rgb"),
                      hsl: convertHexColor(newColor, "hsl"),
                      oklch: convertHexColor(newColor, "oklch"),
                    }
                  : c
              ),
            }))
          }
        />
        <Input
          required
          type="text"
          className="text-sm mt-2 py-1 text-center font-medium bg-transparent text-zinc-300 border border-zinc-700 rounded-lg w-full outline-none"
          value={color.hex}
          onChange={(e) => {
            if (isValidColorFormat(e.target.value)) {
              setEditPalette((prev) => ({
                ...prev,
                colors: prev.colors.map((c, i) =>
                  i === index ? { ...c, hex: e.target.value } : c
                ),
              }));
            }
          }}
        />
      </PopoverPanel>
    </Popover>
  );

  console.log(editPalette)

  return (
    <div className="flex flex-col gap-1.5 border border-zinc-800 hover:border-zinc-700 duration-75 transition rounded-xl md:rounded-2xl p-2">
      <div className="flex flex-row items-center justify-between gap-4 my-1">
        <div className="text-sm text-zinc-200 font-medium ml-1.5">
          {isEditing ? (
            renderEditFields()
          ) : (
            <>
              {item.name} -{" "}
              {item.authors.map((author, index) => (
                <span key={index}>
                  <a
                    href={`https://github.com/${author}`}
                    target="blank"
                    rel="noopener noreferrer"
                  >
                    @{author}
                  </a>
                  {index < item.authors.length - 1 && ", "}
                </span>
              ))}
            </>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button
            onClick={handleSave}
            className="p-1.5 rounded-lg border border-zinc-700 text-zinc-200 group flex items-center gap-1 data-[hover]:border-zinc-600 transition duration-75 ease-in-out select-none"
          >
            {isEditing ? (
              <>
                <BookmarkIcon className="size-3.5" />
                <span className="text-xs font-medium hidden sm:block">
                  Save
                </span>
              </>
            ) : (
              <>
                <PencilIcon className="size-3.5" />
                <span className="text-xs font-medium hidden sm:block">
                  Edit
                </span>
              </>
            )}
          </Button>
          {isEditing && (
            <>
              <Button
                onClick={handleAddColor}
                className="p-1.5 rounded-lg border border-zinc-700 text-zinc-200 group flex items-center gap-1 data-[hover]:border-zinc-600 transition duration-75 ease-in-out select-none"
              >
                <PlusCircleIcon className="size-3.5" />
                <span className="text-xs font-medium hidden sm:block">
                  Add Color
                </span>
              </Button>
              <Button
                onClick={handleRemoveColor}
                className="p-1.5 rounded-lg border border-zinc-700 text-zinc-200 group flex items-center gap-1 data-[hover]:border-zinc-600 transition duration-75 ease-in-out select-none"
              >
                <BackspaceIcon className="size-3.5" />
                <span className="text-xs font-medium hidden sm:block">
                  Remove Color
                </span>
              </Button>
              <Button
                onClick={handleDelete}
                className="p-1.5 rounded-lg border border-zinc-700 text-zinc-200 group flex items-center gap-1 data-[hover]:border-zinc-600 transition duration-75 ease-in-out select-none"
              >
                <TrashIcon className="size-3.5" />
                <span className="text-xs font-medium hidden sm:block">
                  Delete
                </span>
              </Button>
            </>
          )}
          {!isEditing && (
            <>
              <GithubExport palette={JSON.stringify(item)} />
              <CssVariablesExport
                className={item.name.toLowerCase()}
                colors={item.colors}
              />
              <TailwindExport
                className={item.name.toLowerCase()}
                colors={item.colors}
              />
            </>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-2 relative last:mr-auto">
        {isEditing
          ? editPalette.colors.map((color, index) =>
              renderColorPicker(color, index)
            )
          : item.colors.map((color, index) => (
              <ColorButtonPalette
                key={`${item.name}-${index}`}
                color={color}
                palette={item}
              />
            ))}
      </div>
    </div>
  );
});
