import React, { useEffect } from 'react'

export const useOutside = <T extends HTMLElement = HTMLElement, U = void>(
  ref: React.RefObject<T>,
  callback: () => U,
  exception?: string
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (!exception) return callback()

        const cn = (event?.target as HTMLElement)?.className

        console.log(cn, !cn.includes(exception), typeof cn === 'string' && !cn.includes(exception))

        if (typeof cn === 'string' && !cn.includes(exception)) callback()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, callback, exception])
}
