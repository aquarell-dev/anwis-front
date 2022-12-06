import { useEffect } from 'react'

const useCountdown = <T = void>(callbackfn: () => T, timeout: number) => {
  useEffect(() => {
    setTimeout(() => {
      callbackfn()
    }, timeout)
  }, [])

  return {}
}

export default useCountdown
