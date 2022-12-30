import { FC } from 'react'
import { SpinnerComponent } from 'react-element-spinner'

import {
  UpdateSpecification,
  UpdateSpecifications
} from '../../../hooks/useUpdateAcceptanceProducts'
import useReasons from '../../hooks/useReasons'

import { AcceptanceProductSpecification } from '../../../../../../types/acceptance.types'
import { SetState } from '../../../../../../utils/types'
import { GreenButton, IndigoButton } from '../../../../../ui/Button'
import ProductHeaders from '../ProductHeaders'
import ProductItem from '../ProductItem'
import ReasonEdit from '../ReasonEdit'

const Reasons: FC<{
  specifications: AcceptanceProductSpecification[]
  setSpecifications: SetState<AcceptanceProductSpecification[]>
  updateSpecifications: UpdateSpecifications
  updateSpecification: UpdateSpecification
  loading: boolean
}> = ({
  specifications,
  updateSpecification,
  setSpecifications,
  updateSpecifications,
  loading
}) => {
  const { addReason, deleteReason, isLoading } = useReasons()

  const differentSpecifications = specifications.filter(
    s => s.actual_quantity && s.actual_quantity < s.quantity
  )

  return (
    <>
      <div className='my-6 rounded-md p-4 h-[98%] border border-slate-500 w-2/3 overflow-auto scrollbar-thin'>
        <SpinnerComponent
          position='centered'
          loading={isLoading || loading}
        />
        <GreenButton
          type='button'
          handler={async () => await updateSpecifications(differentSpecifications)}
          text='Сохранить Причины'
          customWidth='w-full'
        />
        <div className='h-2 w-full' />
        <div className='overflow-auto scrollbar-thin'>
          <ProductHeaders>
            <p className='pr-4 border-r border-slate-800 w-24 text-ellipsis whitespace-nowrap overflow-x-hidden'>
              Расхождение
            </p>
            <p>Причины</p>
          </ProductHeaders>
          {differentSpecifications.map(specification => (
            <ProductItem
              {...specification}
              key={specification.id}
            >
              <p className='pr-4 border-r border-slate-800 w-24'>
                {specification.actual_quantity &&
                  specification.quantity - specification.actual_quantity}
              </p>
              {specification.reasons.map(reason => (
                <ReasonEdit
                  reason={reason}
                  specification={specification}
                  setSpecifications={setSpecifications}
                  deleteReason={deleteReason}
                />
              ))}
              <IndigoButton
                type='button'
                handler={async () => await addReason(specification.id)}
                text='Добавить Причну'
              />
              <IndigoButton
                type='button'
                handler={async () =>
                  await updateSpecification(specification, specification => ({
                    ...specification,
                    boxes: undefined,
                    product: specification.product.id
                  }))
                }
                text='Сохранить'
              />
            </ProductItem>
          ))}
        </div>
      </div>
    </>
  )
}

export default Reasons
