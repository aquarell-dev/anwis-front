import React, { useEffect } from 'react';

export const useOutside = <T extends HTMLElement = HTMLElement, U = void>(ref: React.RefObject<T>, callback: () => U) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) callback();
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};