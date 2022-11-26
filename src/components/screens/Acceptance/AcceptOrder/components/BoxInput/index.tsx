import { FC } from 'react'

import useBoxes from '../../hooks/useBoxes'
import useEditBoxes from '../../hooks/useEditBoxes'

import { AcceptanceProductSpecification, Box } from '../../../../../../types/acceptance.types'
import { SetState } from '../../../../../../utils/types'

const BoxInput: FC<{
  box: Box
  specification: AcceptanceProductSpecification
  setSpecifications: SetState<AcceptanceProductSpecification[]>
}> = ({ box, specification, setSpecifications }) => {
  const { handleChangeQuantity, handleChangeBox } = useEditBoxes(
    specification,
    setSpecifications,
    box
  )

  const { deleteBox, formatBoxes } = useBoxes()

  return (
    <div className='relative flex items-center space-x-2 bg-white h-8'>
      <div className='absolute -top-1 -right-1 rounded-full w-4 h-4 bg-rose-700 hover:bg-rose-500 transition duration-300 ease-in-out cursor-pointer'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-4 h-4 text-white'
          onClick={async () => {
            await deleteBox(box.id)
          }}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M6 18L18 6M6 6l12 12'
          />
        </svg>
      </div>
      <div className='flex items-center border-r pr-2 border-slate-800'>
        <input
          className='pl-2 w-10 outline-none'
          value={box.quantity}
          onChange={handleChangeQuantity}
        />
        <p>шт</p>
      </div>
      <div className='flex items-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z'
          />
        </svg>
        <input
          className='ml-1 w-28 outline-none'
          value={box.box}
          onChange={handleChangeBox}
          onBlur={() => formatBoxes(specification, setSpecifications)}
        />
      </div>
    </div>
  )
}

export default BoxInput
