import { useCallback, useSyncExternalStore } from "react";

/**
 * Custom hook to check if a media query matches the current viewport
 * @param {string} query - The media query to check
 * @returns {boolean} - True if the media query matches, false otherwise
 */
export function useMediaQuery(query) {
    const subscribe = useCallback(
      (callback) => {
        const matchMedia = window.matchMedia(query);
  
        matchMedia.addEventListener("change", callback);
        return () => {
          matchMedia.removeEventListener("change", callback);
        };
      },
      [query]
    );
  
    const getSnapshot = () => {
      return window.matchMedia(query).matches;
    };
  
    const getServerSnapshot = () => {
      return;
    };
  
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  }
  