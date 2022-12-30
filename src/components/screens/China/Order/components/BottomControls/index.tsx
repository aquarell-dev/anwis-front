import { FC } from 'react'
import { UseFormSetValue } from 'react-hook-form'

import useDocuments from '../../hooks/useDocuments'

import { IOrder } from '../../../../../../features/order/order.types'
import AttachDocument from '../../../../../common/AttachDocument'
import { IOrderForm } from '../../../types'

const BottomControls: FC<{
  order?: IOrder
  register: any
  setValue: UseFormSetValue<IOrderForm>
}> = ({ order, register, setValue }) => {
  useDocuments(setValue, order)

  return (
    <>
      <div className='flex items-end space-x-8 w-full'>
        <div className='w-1/4'>
          <p>Комментарий к заказу</p>
          <textarea
            className={'bg-gray-100 w-full h-12'}
            defaultValue={order?.commentary}
            {...register('commentary')}
          />
        </div>
        <div className='flex items-center space-x-3 w-1/6'>
          <p className='text-xl'>Черновик</p>
          <input
            type='checkbox'
            multiple={true}
            {...register('draft')}
            className='mx-3'
            defaultChecked={order?.draft}
          />
        </div>
      </div>
      <AttachDocument documents={order?.documents} />
    </>
  )
}

export default BottomControls
