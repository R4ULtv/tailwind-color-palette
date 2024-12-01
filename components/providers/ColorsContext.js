"use client";

import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";

const ColorsContext = createContext();

export function ColorsProvider({ children }) {
  const [format, setFormat] = useState("className");
  const [localPalette, setLocalPalette] = useState([]);
  const [editPalette, setEditPalette] = useState(null);
  const [isNewPalette, setIsNewPalette] = useState(false);

  const formatList = [
    { name: "className", shortcut: "c", example: "slate-100" },
    { name: "hex", shortcut: "h", example: "#f1f5f9" },
    { name: "rgb", shortcut: "r", example: "rgb(241,245,249)" },
    { name: "hsl", shortcut: "l", example: "hsl(210,40%,96.1%)" },
    { name: "oklch", shortcut: "o", example: "oklch(96.27% 0.0132 238.66)" },
  ];

  useEffect(() => {
    const storedFormat = localStorage.getItem("colors-format");
    if (storedFormat) {
      setFormat(storedFormat);
    } else {
      localStorage.setItem("colors-format", "className");
      setFormat("className");
    }
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (editPalette) return;
      if (!format) return;

      formatList.forEach((item) => {
        if (
          e.key === item.shortcut &&
          !e.altKey &&
          !e.ctrlKey &&
          !e.metaKey &&
          !e.shiftKey
        ) {
          e.preventDefault();
          setFormat(item.name);
          localStorage.setItem("colors-format", item.name);
        }
      });

      if (
        e.key === "e" &&
        !e.altKey &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.shiftKey
      ) {
        // SET THE NEXT COLOR FORMAT
        e.preventDefault();
        const currentIndex = formatList.findIndex(
          (item) => item.name === format
        );
        const nextIndex = (currentIndex + 1) % formatList.length;
        setFormat(formatList[nextIndex].name);
        localStorage.setItem("colors-format", formatList[nextIndex].name);
      } else if (
        e.key === "q" &&
        !e.altKey &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.shiftKey
      ) {
        // SET THE PREVIOUS COLOR FORMAT
        e.preventDefault();
        const currentIndex = formatList.findIndex(
          (item) => item.name === format
        );
        const nextIndex =
          (currentIndex - 1 + formatList.length) % formatList.length;
        setFormat(formatList[nextIndex].name);
        localStorage.setItem("colors-format", formatList[nextIndex].name);
      }
    },
    [format, setFormat, editPalette]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const storedPalette = localStorage.getItem("colors-palette");
    if (storedPalette) {
      setLocalPalette(JSON.parse(storedPalette));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("colors-format", format);
  }, [format]);

  return (
    <ColorsContext.Provider
      value={{
        formatList,
        format,
        setFormat,
        localPalette,
        setLocalPalette,
        editPalette,
        setEditPalette,
        isNewPalette,
        setIsNewPalette,
      }}
    >
      {children}
    </ColorsContext.Provider>
  );
}

export function useColors() {
  return useContext(ColorsContext);
}
