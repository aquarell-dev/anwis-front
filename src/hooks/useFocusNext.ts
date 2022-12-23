import { KeyboardEventHandler, useCallback, useRef } from 'react'

const useFocusNext = () => {
  const controls = useRef<HTMLInputElement[]>([])

  const handler: KeyboardEventHandler<HTMLElement> = event => {
    if (event.key === 'Enter') {
      // Required if the controls can be reordered
      controls.current = controls.current
        .filter(control => document.body.contains(control))
        .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))

      const index = controls.current.indexOf(event.target as HTMLInputElement)
      const next = controls.current[index + 1]
      next && next.focus()

      // IE 9, 10
      event.preventDefault()
    }
  }

  return useCallback(element => {
    if (element && !controls.current.includes(element)) {
      controls.current.push(element)
      element.addEventListener('keydown', handler)
    }
  }, [])
}

export default useFocusNext
