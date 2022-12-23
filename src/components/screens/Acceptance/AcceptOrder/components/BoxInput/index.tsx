import { FC, forwardRef, useRef } from 'react'
import { SpinnerComponent } from 'react-element-spinner'

import useFocusNext from '../../../../../../hooks/useFocusNext'
import useBoxes from '../../hooks/useBoxes'
import useEditBoxes from '../../hooks/useEditBoxes'

import { AcceptanceProductSpecification, Box } from '../../../../../../types/acceptance.types'
import { SetState } from '../../../../../../utils/types'

type BoxInputProps = {
  box: Box
  specification: AcceptanceProductSpecification
  setSpecifications: SetState<AcceptanceProductSpecification[]>
  idx?: number
}

const BoxInput = forwardRef<HTMLInputElement, BoxInputProps>((props, ref) => {
  const { box, specification, setSpecifications, idx } = props

  const { handleChangeQuantity, handleChangeBox } = useEditBoxes(
    specification,
    setSpecifications,
    box
  )

  const { deleteBox, formatBoxes, loading } = useBoxes()

  return (
    <div className='flex flex-col'>
      <div className='flex md:d-none justify-between text-[12px] px-5'>
        <p>Коробка {Number(idx) + 1}</p>
        <p>Кол-во К. {Number(idx) + 1}</p>
      </div>
      <div className='relative flex items-center space-x-2 bg-white h-8 border'>
        <SpinnerComponent
          loading={loading}
          position='centered'
          backgroundColor='grey'
        />
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
        <div className='flex items-center border-r border-slate-800'>
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
            ref={ref}
            id='focusable'
            className='ml-1 w-20 outline-none'
            name={`box${box.id}`}
            value={box.box}
            onChange={handleChangeBox}
            onBlur={() => formatBoxes(specification, setSpecifications)}
          />
        </div>
        <div className='flex items-center'>
          <input
            placeholder='Кол-во'
            id='focusable'
            className='pl-2 w-10 outline-none'
            value={box.quantity}
            onChange={handleChangeQuantity}
            ref={ref}
          />
          <p>шт</p>
        </div>
      </div>
    </div>
  )
})

export default BoxInput
