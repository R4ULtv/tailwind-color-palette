"use client";

import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";

const ColorsContext = createContext();

const LOCAL_STORAGE_KEYS = {
  FORMAT: "colors-format",
  PALETTE: "colors-palette",
};
const DEFAULT_FORMAT = "className";

export function ColorsProvider({ children }) {
  const [format, setFormat] = useState(DEFAULT_FORMAT);
  const [indicator, setIndicator] = useState(false);
  const [localPalette, setLocalPalette] = useState([]);
  const [editPalette, setEditPalette] = useState(null);
  const [isNewPalette, setIsNewPalette] = useState(false);

  const formatList = useMemo(
    () => [
      { name: "className", shortcut: "c", example: "slate-100" },
      { name: "hex", shortcut: "h", example: "#f1f5f9" },
      { name: "rgb", shortcut: "r", example: "rgb(241,245,249)" },
      { name: "hsl", shortcut: "l", example: "hsl(210,40%,96.1%)" },
      { name: "oklch", shortcut: "o", example: "oklch(96.27% 0.0132 238.66)" },
    ],
    [],
  );

  const updateFormatAndStorage = useCallback((newFormat) => {
    setFormat(newFormat);
    setIndicator(true);
    localStorage.setItem(LOCAL_STORAGE_KEYS.FORMAT, newFormat);
  }, []);

  useEffect(() => {
    const storedFormat = localStorage.getItem(LOCAL_STORAGE_KEYS.FORMAT);
    if (storedFormat) {
      setFormat(storedFormat);
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEYS.FORMAT, DEFAULT_FORMAT);
      setFormat(DEFAULT_FORMAT);
    }
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (editPalette || !format) return;

      if (!e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        const formatItem = formatList.find((item) => item.shortcut === e.key);
        if (formatItem) {
          e.preventDefault();
          updateFormatAndStorage(formatItem.name);
          return;
        }

        const currentIndex = formatList.findIndex(
          (item) => item.name === format,
        );
        if (e.key === "e") {
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % formatList.length;
          updateFormatAndStorage(formatList[nextIndex].name);
        } else if (e.key === "q") {
          e.preventDefault();
          const prevIndex =
            (currentIndex - 1 + formatList.length) % formatList.length;
          updateFormatAndStorage(formatList[prevIndex].name);
        }
      }
    },
    [format, formatList, editPalette, updateFormatAndStorage],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const storedPalette = localStorage.getItem(LOCAL_STORAGE_KEYS.PALETTE);
    if (storedPalette) {
      setLocalPalette(JSON.parse(storedPalette));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.FORMAT, format);
  }, [format]);

  const contextValue = useMemo(
    () => ({
      formatList,
      format,
      setFormat,
      localPalette,
      setLocalPalette,
      editPalette,
      setEditPalette,
      isNewPalette,
      setIsNewPalette,
      indicator,
      setIndicator,
    }),
    [formatList, format, localPalette, editPalette, isNewPalette, indicator],
  );

  return (
    <ColorsContext.Provider value={contextValue}>
      {children}
    </ColorsContext.Provider>
  );
}

export function useColors() {
  return useContext(ColorsContext);
}
