import { FC } from 'react'

import useEditReasons from '../../hooks/useEditReasons'

import { AcceptanceProductSpecification, Reason } from '../../../../../../types/acceptance.types'
import { SetState } from '../../../../../../utils/types'
import { FancyInput } from '../../../../../ui/Input'

const ReasonEdit: FC<{
  reason: Reason
  specification: AcceptanceProductSpecification
  setSpecifications: SetState<AcceptanceProductSpecification[]>
  deleteReason: (id: number) => Promise<void>
}> = ({ reason, setSpecifications, specification, deleteReason }) => {
  const { handleChangeReason, handleChangeQuantity } = useEditReasons(
    specification,
    setSpecifications,
    reason
  )

  return (
    <div className='flex items-center space-x-4 border-r pr-2 border-slate-800'>
      <div className='relative flex items-center space-x-4 bg-gray-100 p-1 rounded-sm'>
        <div className='absolute -top-1 -right-1 rounded-full w-4 h-4 bg-rose-700 hover:bg-rose-500 transition duration-300 ease-in-out cursor-pointer'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-4 h-4 text-white'
            onClick={async () => {
              await deleteReason(reason.id)
            }}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </div>
        <FancyInput
          type='text'
          value={reason.quantity}
          placeholder='Кол-во'
          customWidth='w-20'
          handler={handleChangeQuantity}
        />
        <FancyInput
          type='text'
          value={reason.reason}
          handler={handleChangeReason}
          placeholder='Причина'
          customWidth='w-36'
        />
      </div>
    </div>
  )
}

export default ReasonEdit
