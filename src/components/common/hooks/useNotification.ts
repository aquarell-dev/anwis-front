import { useState } from 'react'

import moment from 'moment'

const useNotification = () => {
  const [notification, setNotification] = useState('')
  const [dateTime, setDateTime] = useState(moment(new Date()))

  const formatDateTime = (d: string) => moment(d, 'HH:mm DD/MM/YYYY').format('YYYY-MM-DDTHH:mm')

  return { notification, setNotification, dateTime, setDateTime, formatDateTime }
}

export default useNotification
