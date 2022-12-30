import { FC, useEffect, useState } from 'react'

import moment from 'moment'

import { SetState } from '../../../../../../utils/types'
import { CustomDatePicker } from '../../../../../ui/DateTime'
import { FancyInput } from '../../../../../ui/Input'
import { AcceptanceFields } from '../../../types'

const CreateAcceptanceFields: FC<{
  acceptanceFields: AcceptanceFields
  setAcceptanceFields: SetState<AcceptanceFields>
}> = ({ setAcceptanceFields, acceptanceFields }) => {
  const [dates, setDates] = useState({
    inMoscow: moment(new Date()),
    fromChina: moment(new Date())
  })

  useEffect(() => {
    setAcceptanceFields(prev => ({
      ...prev,
      arrived_in_moscow: dates.inMoscow.format('DD/MM/YYYY'),
      shipped_from_china: dates.fromChina.format('DD/MM/YYYY')
    }))
  }, [dates])

  return (
    <div className='flex flex-col space-y-6'>
      <div className='flex space-x-4 items-end'>
        <FancyInput
          value={acceptanceFields.cargo_number}
          handler={e => setAcceptanceFields(prev => ({ ...prev, cargo_number: e.target.value }))}
          placeholder='Номер Карго'
          showLabel
        />
        <FancyInput
          value={acceptanceFields.cargo_volume}
          handler={e => setAcceptanceFields(prev => ({ ...prev, cargo_volume: e.target.value }))}
          placeholder='Объем Карго, м3'
          showLabel
        />
        <FancyInput
          value={acceptanceFields.cargo_weight}
          handler={e => setAcceptanceFields(prev => ({ ...prev, cargo_weight: e.target.value }))}
          placeholder='Вес карго, Н'
          showLabel
        />
        {/* <FancyInput value={} onChange={e => setAcceptanceFields(prev => prev)} placeholder='' />
      <FancyInput value={} onChange={e => setAcceptanceFields(prev => prev)} placeholder='' />
      <FancyInput value={} onChange={e => setAcceptanceFields(prev => prev)} placeholder='' /> */}
      </div>
      <div className='flex space-x-4'>
        <CustomDatePicker
          label={'Отправлен из Китая'}
          value={dates.fromChina}
          customOnChange={value => value && setDates(prev => ({ ...prev, fromChina: value }))}
        />
        <CustomDatePicker
          label={'Доставлен В Москву'}
          value={dates.inMoscow}
          customOnChange={value => value && setDates(prev => ({ ...prev, inMoscow: value }))}
        />
      </div>
    </div>
  )
}

export default CreateAcceptanceFields
