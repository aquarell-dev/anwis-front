import { FC } from 'react'

import { Box } from '../../../../../../types/acceptance.types'
import PreviewProperty from '../PreviewProperty'

type BoxPreview = {
  box: Box | undefined
  spacing?: string
  wrapperClassName?: string
  imageClassName?: string
  propertiesClassName?: string
  propertiesFont?: string
}

const getBoxProperties = (
  box: Box
): { value: string | undefined; label: string; addLineBreak?: boolean }[] => [
  {
    label: 'Коробка',
    value: box.box
  },
  {
    label: 'Категория',
    value: box.specification?.product.category?.category
  },
  {
    label: 'Оплата',
    value: box.specification?.product.category?.payment === 'apiece' ? 'Поштучная' : 'Почасовая'
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

const BoxProperties: FC<BoxPreview> = ({
  box,
  spacing,
  wrapperClassName,
  propertiesClassName,
  imageClassName,
  propertiesFont
}) => {
  return (
    <div
      className={
        wrapperClassName
          ? wrapperClassName
          : 'min-h-[250px] min-w-[120px] max-w-[350px] mt-4 flex flex-col space-y-2'
      }
    >
      {box ? (
        <>
          <div
            className={
              propertiesClassName ? propertiesClassName : 'h-[250px] overflow-y-auto scrollbar-thin'
            }
          >
            {getBoxProperties(box).map((property, idx) => (
              <PreviewProperty
                {...property}
                customFont={propertiesFont}
                key={idx}
              />
            ))}
          </div>
          <img
            className={imageClassName ? imageClassName : 'w-[300px]'}
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

export default BoxProperties
