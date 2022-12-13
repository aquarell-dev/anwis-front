import { useEffect } from 'react'

const useCountdown = <T = void>(callbackfn: () => T, timeout: number, reset?: boolean) => {
  useEffect(() => {
    const t = setTimeout(() => {
      callbackfn()
    }, timeout)
    if (reset) {
      clearTimeout(t)
    }
  }, [reset])

  return {}
}

export default useCountdown
