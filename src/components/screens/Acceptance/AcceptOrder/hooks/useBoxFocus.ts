import { useEffect } from 'react'

const useBoxFocus = () => {
  useEffect(() => {
    const firstBox = document.getElementById('focusable')
    firstBox?.focus()
  }, [])

  return {}
}

export default useBoxFocus
