import React, { FC, useEffect, useState } from 'react'
import Select from 'react-select'

import { CategoryPayment } from '../../hooks/useCategoryPayment'

import { AcceptanceCategory, PaymentOptions } from '../../../../../../types/acceptance.types'
import { SelectValue, SetState } from '../../../../../../utils/types'
import { FancyInput } from '../../../../../ui/Input'
import MutatePopup from '../../../../../ui/MutatePopup'

const CategoryPaymentPopup: FC<{
  open: boolean
  setOpen: SetState<boolean>
  content: string
  category: AcceptanceCategory | null
  onMutate: (category: AcceptanceCategory, onFulfil: () => void) => Promise<void>
}> = ({ open, setOpen, content, onMutate, category }) => {
  const options: SelectValue<PaymentOptions>[] = [
    { value: 'hourly', label: 'Почасовая' },
    { value: 'apiece', label: 'Поштучно' }
  ]

  const [categoryPayment, setCategoryPayment] = useState<CategoryPayment>({} as CategoryPayment)

  useEffect(() => {
    if (category) {
      const { id, category: c, ...payment } = category
      setCategoryPayment(payment)
    }
  }, [category])

  return (
    <MutatePopup
      open={open}
      setOpen={setOpen}
      content={content}
      onMutate={async () => {
        if (!category) return
        await onMutate(
          { ...categoryPayment, id: category.id, category: category.category },
          () => {}
        )
        setOpen(false)
      }}
      width='w-[500px]'
      height='h-[250px]'
    >
      <div className='flex space-y-4 flex-col'>
        <div className='flex flex-col items-center space-y-2'>
          <Select
            className='w-60'
            options={options}
            placeholder='Оплата'
            value={options.find(option => option.value === categoryPayment.payment)}
            onChange={value =>
              value && setCategoryPayment(prev => ({ ...prev, payment: value.value }))
            }
          />
          <div className='flex items-center space-x-4'>
            <FancyInput
              value={categoryPayment.per_hour}
              handler={e =>
                setCategoryPayment(prev => ({
                  ...prev,
                  per_hour: Number(e.target.value) || undefined
                }))
              }
              placeholder='Оплата, р/час'
              showLabel
              customWidth='w-28'
              disabled={categoryPayment.payment === 'apiece'}
            />
            <FancyInput
              value={categoryPayment.per_piece}
              handler={e =>
                setCategoryPayment(prev => ({
                  ...prev,
                  per_piece: Number(e.target.value) || undefined
                }))
              }
              placeholder='Оплата, р/шт'
              customWidth='w-28'
              showLabel
              disabled={categoryPayment.payment === 'hourly'}
            />
          </div>
        </div>
      </div>
    </MutatePopup>
  )
}

export default CategoryPaymentPopup
