import { FC } from 'react'

const BoxPreviewProperty: FC<{
  label: string
  value: string | undefined
  addLineBreak?: boolean
  notExistsChar?: string
}> = ({ label, value, addLineBreak, notExistsChar = '-' }) => (
  <p className='text-black text-lg text-ellipsis overflow-x-hidden whitespace-nowrap'>
    {label}: {addLineBreak && <br />}
    <span className='font-medium text-ellipsis overflow-x-hidden whitespace-nowrap'>
      {value ?? notExistsChar}
    </span>
  </p>
)

export default BoxPreviewProperty
