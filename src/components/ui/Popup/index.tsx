import { FC, useRef } from 'react'

import { useOutside } from '../../../hooks/useOutside'

import { cn } from '../../../utils'
import { IPopup } from './types'

const Popup: FC<IPopup<boolean>> = ({
  children,
  state,
  setState,
  width,
  height,
  bgColor,
  outside = true
}) => {
  const ref = useRef(null)

  useOutside(ref, () => outside && setState(false))

  return (
    <>
      {state && (
        <div
          className={cn(
            'fixed z-[100] rounded-md shadow-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            width ?? 'w-96',
            height ?? 'h-52',
            bgColor ?? 'bg-slate-100'
          )}
          ref={ref}
        >
          {children}
          <div
            className='absolute m-2 cursor-pointer hover:bg-gray-100 right-0 top-0 h-6 w-6'
            onClick={() => setState(prev => !prev)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 hover:text-slate-700 duration-300 transition ease-in-out'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </div>
        </div>
      )}
    </>
  )
}

export default Popup
