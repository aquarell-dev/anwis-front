import { FC } from 'react'

import { Box } from '../../../../../../types/acceptance.types'
import BoxPreviewProperty from '../BoxPreviewProperty'

type BoxPreview = {
  box: Box | undefined
  spacing?: string
}

const getBoxProperties = (
  box: Box
): { value: string | undefined; label: string; addLineBreak?: boolean }[] => [
  {
    label: 'Текущая Коробка',
    value: box.box
  },
  {
    label: 'Оплата',
    value: box.specification?.product.category.payment === 'apiece' ? 'Поштучная' : 'Почасовая'
  },
  {
    label: 'Номера Коробок',
    value: box?.specification?.boxes.map(box => box.box).join(', '),
    addLineBreak: true
  },
  {
    label: 'Товар',
    value: box?.specification?.product.title,
    addLineBreak: true
  },
  {
    label: 'Штрихкод',
    value: box?.specification?.product.barcode
  },
  {
    label: 'Размер',
    value: box?.specification?.product.size
  },
  {
    label: 'Артикул',
    value: box?.specification?.product.article
  },
  {
    label: 'Цвет',
    value: box?.specification?.product.color
  },
  {
    label: 'Бренд',
    value: box?.specification?.product.brand
  }
]

const BoxPreview: FC<BoxPreview> = ({ box, spacing }) => {
  return (
    <div className='min-h-[250px] min-w-[120px] max-w-[350px] mt-4 flex flex-col space-y-2'>
      {box ? (
        <>
          <div className='h-[250px] overflow-y-auto scrollbar-thin'>
            {getBoxProperties(box).map((property, idx) => (
              <BoxPreviewProperty
                {...property}
                key={idx}
              />
            ))}
          </div>
          <img
            className='w-[300px]'
            src={box.specification?.product.photo}
            alt={box.specification?.product.photo ?? '-'}
          />
        </>
      ) : (
        <div className='min-h-[320px] min-w-[120px]' />
      )}
    </div>
  )
}

export default BoxPreview
