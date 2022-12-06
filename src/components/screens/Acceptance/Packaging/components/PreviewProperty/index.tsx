import { FC } from 'react'

import { cn } from '../../../../../../utils'

const PreviewProperty: FC<{
  label: string
  value: string | undefined
  addLineBreak?: boolean
  notExistsChar?: string
  customFont?: string
}> = ({ label, value, addLineBreak, notExistsChar = '-', customFont }) => (
  <p
    className={cn(
      'text-black text-ellipsis overflow-x-hidden whitespace-nowrap',
      customFont ?? 'text-lg'
    )}
  >
    {label}: {addLineBreak && <br />}
    <span className='font-medium text-ellipsis overflow-x-hidden whitespace-nowrap'>
      {value ?? notExistsChar}
    </span>
  </p>
)

export default PreviewProperty
