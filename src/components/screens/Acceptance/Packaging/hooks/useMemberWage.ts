import { useEffect, useState } from 'react'

import usePayment from '../../../Settings/hooks/usePayment'

import moment from 'moment'

import { TimeSession, WorkSessionDetailed } from '../../../../../types/acceptance.types'

const useMemberWage = (workSessions: WorkSessionDetailed[], timeSessions: TimeSession[]) => {
  const { data } = usePayment()

  const [wage, setWage] = useState({
    boxes: {
      time: 0,
      box: 0
    },
    time: 0,
    total: 0
  })

  useEffect(() => {
    if (data) {
      const { timeWage, packageWage, totalWage } = calculateWorkSessions()
      const tp = calculateTimeSessions(data.hour_cost)

      setWage({
        boxes: {
          time: timeWage,
          box: packageWage
        },
        time: tp,
        total: totalWage + tp
      })
    }
  }, [data])

  const calculateTimePayment = (timeSession: TimeSession, hourCost: number) => {
    if (!timeSession.end) return 0

    const start = moment(timeSession.start, 'HH:mm DD/MM/YYYY')

    const end = moment(timeSession.end, 'HH:mm DD/MM/YYYY')

    const duration = end.diff(start, 'minutes')

    return Math.ceil((duration * hourCost) / 60)
  }

  const calculateBoxPayment = (workSession: WorkSessionDetailed) => {
    let time = 0
    let box = 0

    if (
      workSession.box.specification?.actual_quantity &&
      workSession.box.specification.product.category?.payment
    ) {
      if (workSession.box.specification.product.category.payment === 'hourly') {
        time +=
          workSession.end && workSession.box.specification.product.category.per_hour
            ? moment(workSession.end, 'HH:mm DD/MM/YYYY').diff(
                moment(workSession.start, 'HH:mm DD/MM/YYYY'),
                'minutes'
              ) *
              (workSession.box.specification.product.category.per_hour / 60)
            : 0
      } else {
        if (workSession.box.specification?.product.category?.per_piece) {
          box +=
            workSession.box.specification?.actual_quantity *
            workSession.box.specification?.product.category?.per_piece
        }
      }
    }

    return [box, time]
  }

  const calculateTimeSessions = (hourCost: number) => {
    let timeWage = 0

    timeSessions.forEach(s => {
      if (s.end) {
        timeWage += calculateTimePayment(s, hourCost)
      }
    })

    return timeWage
  }

  const calculateWorkSessions = () => {
    let packageWage = 0
    let timeWage = 0

    workSessions
      .filter(s => s.legit)
      .forEach(s => {
        const [box, time] = calculateBoxPayment(s)
        packageWage += box
        timeWage += time
      })

    return { timeWage, packageWage, totalWage: packageWage + timeWage }
  }

  return { wage, calculateBoxPayment, calculateTimePayment }
}

export default useMemberWage
