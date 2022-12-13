import React, { FC } from 'react'
import Select from 'react-select'

const Project: FC = () => {
  return (
    <Select
      // options={options}
      // value={options.filter(option => typeof value === 'string' && value.includes(option.value))}
      // onChange={val => onChange(val?.value)}
      placeholder={'Проект'}
    />
  )
}

export default Project
