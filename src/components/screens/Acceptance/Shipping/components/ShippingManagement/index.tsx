import { FC, useState } from 'react'

import useFbo from '../../../Fbo/hooks/useFbo'

import moment, { Moment } from 'moment'

import useAutoFocus from '../../../../../../hooks/useAutoFocus'
import { FBOShipping } from '../../../../../../types/fbo.types'
import Status from '../../../../../common/Status'
import { IndigoButton } from '../../../../../ui/Button'
import { CustomDatePicker } from '../../../../../ui/DateTime'
import { FancyInput } from '../../../../../ui/Input'

type ShippingInfo = {
  box_quantity: string
  warehouse: string
  shipping_date: Moment
}

const ShippingManagement: FC<FBOShipping> = shipping => {
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    box_quantity: String(shipping.box_quantity) ?? '',
    warehouse: shipping.warehouse ?? '',
    shipping_date: moment(shipping.shipping_date ?? new Date(), 'DD/MM/YYYY')
  })

  const { ref } = useAutoFocus()

  const { patchFbo, isLoading } = useFbo()

  return (
    <div className='border-b border-slate-800 px-4 py-6 flex items-end space-x-4'>
      <Status
        statusOptions={[]}
        onChange={newValue => {}}
        value={undefined}
      />
      <FancyInput
        value={shippingInfo.box_quantity}
        handler={e => setShippingInfo({ ...shippingInfo, box_quantity: e.target.value })}
        customWidth='w-64'
        showLabel
        ref={ref}
        placeholder='Кол-во Коробок'
      />
      <FancyInput
        value={shippingInfo.warehouse}
        handler={e => setShippingInfo({ ...shippingInfo, warehouse: e.target.value })}
        customWidth='w-64'
        showLabel
        placeholder='Склад'
      />
      <CustomDatePicker
        label='Дата Отгрузки'
        value={shippingInfo.shipping_date}
        setValue={value => {
          if (value) setShippingInfo({ ...shippingInfo, shipping_date: value as Moment })
        }}
      />
      <IndigoButton
        type='button'
        handler={async () =>
          await patchFbo({
            id: shipping.id,
            ...{
              ...shippingInfo,
              box_quantity: Number(shippingInfo.box_quantity),
              shipping_date: shippingInfo.shipping_date.format('DD/MM/YYYY')
            }
          })
        }
        text='Сохранить'
        loading={isLoading}
      />
    </div>
  )
}

export default ShippingManagement
