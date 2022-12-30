import { FC } from 'react'

import { cn } from '../../../../../../utils'

const PreviewProperty: FC<{
  label: string
  value: string | undefined
  addLineBreak?: boolean
  notExistsChar?: string
  customFont?: string
  mainProp?: boolean
  mainPropFont?: string
}> = ({ label, value, addLineBreak, notExistsChar = '-', customFont, mainProp, mainPropFont }) => (
  <p
    className={cn(
      'text-black text-ellipsis overflow-x-hidden whitespace-nowrap',
      mainProp ? (mainPropFont ? mainPropFont : 'text-2xl') : customFont ? customFont : 'text-lg'
    )}
  >
    {label}: {addLineBreak && <br />}
    <span className='font-medium text-ellipsis overflow-x-hidden whitespace-nowrap'>
      {value ?? notExistsChar}
    </span>
  </p>
)

export default PreviewProperty
