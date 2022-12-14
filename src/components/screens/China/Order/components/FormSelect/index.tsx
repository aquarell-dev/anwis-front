import { FC } from 'react'
import { Controller } from 'react-hook-form'
import Select from 'react-select'

import { TStatuses } from '../../../../../../features/order/order.types'
import { IFormSelect, IStatusSelect } from '../../../types'

const FormSelect: FC<IFormSelect> = ({ control, defaultValue, name, options, placeholder }) => {
  return (
    <div className='w-64 xl:w-96 z-[41]'>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field: { value, onChange, ref } }) => (
          <Select
            ref={ref}
            options={options}
            value={options.filter(
              option => typeof value === 'string' && value.includes(option.value)
            )}
            onChange={val => onChange(val?.value)}
            placeholder={placeholder}
          />
        )}
      />
    </div>
  )
}

export const StatusSelect: FC<IStatusSelect> = ({
  control,
  defaultValue,
  options,
  setSelectedStatus
}) => {
  return (
    <div className='w-64 xl:w-96 z-[41]'>
      <Controller
        control={control}
        name={'status'}
        defaultValue={defaultValue}
        render={({ field: { value, onChange, ref } }) => (
          <Select
            ref={ref}
            options={options}
            value={options.filter(
              option => typeof value === 'string' && value.includes(option.value)
            )}
            onChange={val => {
              onChange(val?.value)
              setSelectedStatus(val?.label as TStatuses)
            }}
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
          />
        )}
      />
    </div>
  )
}

export default FormSelect
