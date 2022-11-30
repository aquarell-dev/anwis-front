import { FC } from 'react'
import Select from 'react-select'

import { AcceptanceStatus } from '../../../../../../types/acceptance.types'
import { SetState } from '../../../../../../utils/types'

const Status: FC<{
  statuses: AcceptanceStatus[] | undefined
  currentStatus: AcceptanceStatus
  setCurrentStatus: SetState<AcceptanceStatus>
}> = ({ statuses, currentStatus, setCurrentStatus }) => {
  const options = statuses?.map(status => ({
    label: status.status,
    value: status.id,
    color: status.color
  }))

  return (
    <div className='w-full my-2 pt-4 pb-2 border-t border-slate-800'>
      <Select
        options={options}
        value={options?.find(option => option.value === currentStatus.id)}
        onChange={newValue =>
          newValue &&
          setCurrentStatus({ id: newValue.value, color: newValue.color, status: newValue.label })
        }
        placeholder={'Статус'}
        formatOptionLabel={({ color, label }) => (
          <div className='flex items-center space-x-2'>
            <div
              className='h-6 w-6 rounded-full'
              style={{ flex: '0 0 auto', backgroundColor: color }}
            />
            <p>{label}</p>
          </div>
        )}
        className='w-96'
      />
    </div>
  )
}
export default Status
