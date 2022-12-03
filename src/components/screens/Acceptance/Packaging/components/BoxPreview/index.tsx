import { FC, ReactNode } from 'react'

import { AcceptanceProductSpecification } from '../../../../../../types/acceptance.types'
import BoxPreviewProperty from '../BoxPreviewProperty'

type BoxPreview = {
  specification: AcceptanceProductSpecification | undefined
  spacing?: string
}

const getBoxProperties = (
  specification: AcceptanceProductSpecification
): { value: string | undefined; label: string }[] => [
  {
    label: 'Номер Коробки',
    value: specification.boxes[0]?.box
  },
  {
    label: 'Номера Коробок',
    value: specification.boxes.map(box => box.box).join(', ')
  },
  {
    label: 'Товар',
    value: specification.product.title
  },
  {
    label: 'Штрихкод',
    value: specification.product.barcode
  },
  {
    label: 'Размер',
    value: specification.product.size
  },
  {
    label: 'Артикул',
    value: specification.product.article
  },
  {
    label: 'Цвет',
    value: specification.product.color
  },
  {
    label: 'Бренд',
    value: specification.product.brand
  }
]

const BoxPreview: FC<BoxPreview> = ({ specification, spacing }) => {
  return (
    <div className='min-h-[250px] min-w-[120px] flex flex-col space-y-2'>
      {specification ? (
        getBoxProperties(specification).map((property, idx) => (
          <BoxPreviewProperty
            {...property}
            addLineBreak
            key={idx}
          />
        ))
      ) : (
        <div className='min-h-[320px] min-w-[120px]' />
      )}
    </div>
  )
}

export default BoxPreview
