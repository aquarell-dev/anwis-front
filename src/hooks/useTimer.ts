import { useEffect, useState } from 'react'

import { convertDateToUSFormat } from '../utils'

const useTimer = (startingTime?: string, showSeconds?: boolean) => {
  const initialTime = new Date(startingTime ? convertDateToUSFormat(startingTime) : 0)

  const [timer, setTimer] = useState('')

  const formatDigit = (digit: number, offset?: number) => {
    // in case to moscow time
    let offsetDigit = digit
    if (offset) offsetDigit = digit + offset < 0 ? 0 : digit + offset
    return offsetDigit.toString().length < 2 ? `0${offsetDigit}` : offsetDigit
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const calculatedTime = new Date(Date.now() - initialTime.getTime())
      setTimer(
        `${formatDigit(calculatedTime.getHours(), -3)}:${formatDigit(calculatedTime.getMinutes())}${
          showSeconds ? ':' + formatDigit(calculatedTime.getSeconds()) : ''
        }`
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return timer
}

export default useTimer
