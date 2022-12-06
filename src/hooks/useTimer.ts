import { useEffect, useState } from 'react'

import { convertDateTimeToUSFormat, convertDateToUSFormat } from '../utils'

const useTimer = (startingTime?: string) => {
  const initialTime = new Date(startingTime ? convertDateToUSFormat(startingTime) : 0)

  const [timer, setTimer] = useState('')

  const formatDigit = (digit: number) => (digit.toString().length < 2 ? `0${digit}` : digit)

  useEffect(() => {
    const interval = setInterval(() => {
      const calculatedTime = new Date(Date.now() - initialTime.getTime())
      setTimer(
        `${formatDigit(60 * calculatedTime.getHours() + calculatedTime.getMinutes())}:${formatDigit(
          calculatedTime.getSeconds()
        )}`
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return timer
}

export default useTimer
