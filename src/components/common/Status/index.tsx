import React from 'react'
import Select, { SingleValue } from 'react-select'

type SelectStatus<T extends string> = { label: T; value: number; color: string }

type StatusProps<U extends string, T extends SelectStatus<U> = SelectStatus<U>> = {
  statusOptions: T[] | undefined
  onChange: (newValue: SingleValue<T>) => void
  value: SingleValue<T> | undefined
}

const Status = <U extends string>(props: StatusProps<U>): JSX.Element => {
  const { statusOptions, onChange, value } = props

  return (
    <Select
      options={statusOptions}
      value={value}
      onChange={onChange}
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
      className='w-64'
    />
  )
}

export default Status
