import { useEffect, useRef } from 'react'

const useAutoFocus = <T extends HTMLElement = HTMLInputElement>() => {
  const ref = useRef<T>(null)

  useEffect(() => {
    ref.current?.focus()
  }, [ref.current])

  return { ref }
}

export default useAutoFocus
