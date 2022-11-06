import React, { useEffect } from 'react';

export const useOutside = <T extends HTMLElement = HTMLElement, U = void>(ref: React.RefObject<T>, callback: () => U, exception?: string) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (!exception) return callback();

        const cn = (event?.target as HTMLElement)?.className;

        if (typeof cn === 'string')
          if (!cn.includes(exception))
            callback()
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};