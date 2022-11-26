import { FC } from 'react'
import { SpinnerComponent } from 'react-element-spinner'

import { Moment } from 'moment'

import { SetState } from '../../../utils/types'
import { IndigoButton } from '../../ui/Button'
import { CustomDateTimePicker } from '../../ui/DateTime'
import { FancyInput } from '../../ui/Input'

const Notification: FC<{
  notification: string
  setNotification: SetState<string>
  dateTime: Moment
  setDateTime: SetState<Moment>
  loading?: boolean
  onTaskCreate: () => void
}> = ({ notification, setNotification, dateTime, setDateTime, loading, onTaskCreate }) => {
  return (
    <div className='z-[40] flex flex-col space-y-4'>
      <div className='flex items-center space-x-4'>
        <div className='w-96'>
          <FancyInput
            value={notification}
            customWidth='w-96'
            handler={e => setNotification(e.target.value)}
            placeholder={'Новая задача...'}
          />
        </div>
        <CustomDateTimePicker
          label={'Дата И Время'}
          value={dateTime}
          setValue={setDateTime}
        />
        <IndigoButton
          type={'button'}
          text={'Создать'}
          customWidth={'w-60'}
          handler={onTaskCreate}
        >
          {loading && (
            <SpinnerComponent
              loading={true}
              position={'centered'}
            />
          )}
        </IndigoButton>
      </div>
    </div>
  )
}

export default Notification
