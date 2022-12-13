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
  dontShowImage?: boolean
}

const getBoxProperties = (
  box: Box
): { value: string | undefined; label: string; addLineBreak?: boolean; mainProp?: boolean }[] => [
  {
    label: 'Коробка',
    value: box.box,
    mainProp: true
  },
  {
    label: 'Оплата',
    value: box.specification?.product.category?.payment === 'apiece' ? 'Поштучная' : 'Почасовая',
    mainProp: true
  },
  {
    label: 'В Каких Коробках Товар',
    value: box?.specification?.boxes.map(box => box.box).join(', '),
    addLineBreak: true,
    mainProp: true
  },
  {
    label: 'Товар',
    value: box?.specification?.product.title,
    addLineBreak: true
  },
  {
    label: 'Категория',
    value: box.specification?.product.category?.category
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

const BoxProperties: FC<BoxPreview> = ({ box, propertiesFont }) => {
  return (
    <div className={'min-h-[250px] min-w-[120px] w-2/3 flex flex-col space-y-2'}>
      {box ? (
        <>
          <div className={'h-[250px] overflow-y-auto scrollbar-thin'}>
            {getBoxProperties(box)
              .filter(p => p.mainProp)
              .map((property, idx) => (
                <PreviewProperty
                  {...property}
                  customFont={propertiesFont}
                  mainPropFont='text-3xl'
                  key={idx}
                />
              ))}
          </div>
          <div className='flex items-start space-x-2'>
            <img
              className={'w-[300px]'}
              src={box.specification?.product.photo}
              alt={box.specification?.product.photo ?? '-'}
            />
            <div className='max-w-[250px]'>
              {getBoxProperties(box)
                .filter(p => !p.mainProp)
                .map((property, idx) => (
                  <PreviewProperty
                    {...property}
                    customFont={propertiesFont}
                    mainPropFont='text-3xl'
                    key={idx}
                  />
                ))}
            </div>
          </div>
        </>
      ) : (
        <div className='min-h-[320px] min-w-[120px]' />
      )}
    </div>
  )
}

export default BoxProperties
