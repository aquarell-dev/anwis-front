import React, { FC } from 'react'

import useCountdown from '../../../../../../hooks/useCountdown'

import { AcceptanceProduct } from '../../../../../../types/acceptance.types'
import { AbsoluteCenteredContainer } from '../../../../../ui/Container'
import ExitInput from '../ExitInput'
import PreviewPopup, { PreviewPopupProps } from '../PreviewPopup'
import PreviewProperty from '../PreviewProperty'

type BarcodePreviewProps = PreviewPopupProps & {
  product: AcceptanceProduct | undefined
}

const BarcodePreview: FC<BarcodePreviewProps> = ({ product, ...popup }) => {
  // useCountdown(() => popup.setOpen(false), 7000)

  const getProperties = (product: AcceptanceProduct) => [
    {
      label: 'Название',
      value: product.title
    },
    {
      label: 'Категория',
      value: product.category?.category
    },
    {
      label: 'Оплата',
      value: product.category?.payment === 'apiece' ? 'Поштучная' : 'Почасовая'
    },
    {
      label: 'Штрихкод',
      value: product.barcode
    },
    {
      label: 'Размер',
      value: product.size
    },
    {
      label: 'Артикул',
      value: product.article
    },
    {
      label: 'Цвет',
      value: product.color
    },
    {
      label: 'Бренд',
      value: product.brand
    }
  ]

  return (
    <PreviewPopup {...popup}>
      <ExitInput setOpen={popup.setOpen} />
      <AbsoluteCenteredContainer>
        {product ? (
          <div className='flex flex-col-reverse mt-24 ml-6 lg:ml-0 lg:mt-0 space-y-4 lg:space-x-8 lg:flex-row max-h-[400px] lg:max-h-[1200px] overflow-y-auto scrollbar-thin space-x-0 items-center w-[1000px]'>
            <div className='text-2xl flex flex-col space-y-3 max-w-[300px] lg:max-w-[1400px] max-h-[500px]'>
              {getProperties(product).map((prop, idx) => (
                <PreviewProperty
                  key={idx}
                  {...prop}
                  customFont='text-lg lg:text-3xl'
                />
              ))}
            </div>
            <img
              src={product.photo}
              alt={product?.photo ?? '-'}
              className='h-[300px] lg:h-[500px]'
            />
          </div>
        ) : (
          <p className='text-4xl'>Товар не найден</p>
        )}
      </AbsoluteCenteredContainer>
    </PreviewPopup>
  )
}

export default BarcodePreview
