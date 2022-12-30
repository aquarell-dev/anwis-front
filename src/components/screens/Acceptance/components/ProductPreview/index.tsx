import { FC, Fragment, ReactNode } from 'react'
import { SpinnerComponent } from 'react-element-spinner'

import { AcceptanceProductSpecification } from '../../../../../types/acceptance.types'
import { getFourDigitId } from '../../../../../utils'
import { AbsoluteCenteredContainer } from '../../../../ui/Container'
import { Method } from '../../types'

type ProductPreviewProps = {
  loading: boolean
  specification: AcceptanceProductSpecification | undefined
  method: Method
}

const SpecificationProperty: FC<{ title: string; value: string | undefined }> = ({
  title,
  value
}) => (
  <p className='text-lg text-ellipsis whitespace-nowrap overflow-x-hidden'>
    {title}:<br />
    <span className='font-medium'>{value}</span>
  </p>
)

const getProperties = (specification: AcceptanceProductSpecification): ReactNode[] => [
  <SpecificationProperty
    title='Артикул Поставщика'
    value={specification.product.linked_china_product_article}
  />,
  <SpecificationProperty
    title='Приемка'
    value={getFourDigitId(123)}
  />,
  <SpecificationProperty
    title='Размер'
    value={specification.product.size}
  />,
  <SpecificationProperty
    title='Цвет'
    value={specification.product.color}
  />,
  <SpecificationProperty
    title='Бренд'
    value={specification.product.brand}
  />
]

const ProductPreview: FC<ProductPreviewProps> = ({ loading, specification, method }) => {
  return (
    <div className='relative flex space-x-4 items-start border w-full border-slate-800 rounded-sm p-4 h-[80%]'>
      {loading && (
        <SpinnerComponent
          loading
          position='centered'
          backgroundColor='#9ca3af'
        />
      )}
      {specification ? (
        <>
          <div
            className='flex flex-col space-y-2 h-full'
            style={{ flex: '0 0 auto' }}
          >
            <img
              src={specification.product.photo}
              alt={specification.product.title}
              className='h-[70%]'
              style={{ flex: '0 0 auto' }}
            />
            <div className='p-4 border-b border-r border-slate-600 overflow-y-auto scrollbar-thin'>
              <p className='text-2xl font-medium'>{specification.product.title}</p>
              <p className='text-2xl font-medium'>
                {method === 'box' ? (
                  <>Штрих-код: {specification.product.barcode ?? 'Не указан'}</>
                ) : (
                  <>Коробки: {specification.boxes.join(', ')}</>
                )}
              </p>
              <div className='flex flex-col space-y-1 text-ellipsis whitespace-nowrap'>
                {getProperties(specification).map((prop, idx) => (
                  <Fragment key={idx}>{prop}</Fragment>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {!loading && (
            <AbsoluteCenteredContainer>
              <h2 className='text-4xl'>Нет данных</h2>
            </AbsoluteCenteredContainer>
          )}
        </>
      )}
    </div>
  )
}

export default ProductPreview
