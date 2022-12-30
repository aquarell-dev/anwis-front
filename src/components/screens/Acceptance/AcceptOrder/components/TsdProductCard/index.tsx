import React, { FC, useState } from 'react'

import { AcceptanceProduct } from '../../../../../../types/acceptance.types'
import { SetState } from '../../../../../../utils/types'
import { FancyInput } from '../../../../../ui/Input'

const TsdProductCard: FC<{
  product: AcceptanceProduct
  manualSelection: { quantity: number; product: number }[]
  setManualSelection: SetState<{ quantity: number; product: number }[]>
}> = ({ product, manualSelection, setManualSelection }) => {
  const [value, setValue] = useState('')

  return (
    <div className='border-b-2 pb-4 border-slate-800'>
      <p className='font-medium text-lg'>{product.title}</p>
      <div className='flex space-x-1 items-center my-2'>
        <img
          src={product.photo}
          alt='Нет Фото'
          className='w-24'
        />
        <div className='flex flex-col space-y-1 max-w-[175px]'>
          <p>{product.size}</p>
          <p className='break-words'>{product.linked_china_product_article}</p>
          <p>{product.article}</p>
        </div>
      </div>
      <div className='flex flex-col my-2 space-y-1 w-full'>
        <p>Штрих-код: {product.barcode ?? '-'}</p>
        <p>Артикул ВБ: {product.article}</p>
        <p>Категория: {product.category?.category ?? '-'}</p>
      </div>
      <FancyInput
        value={value}
        handler={e => setValue(e.target.value)}
        placeholder='Кол-во'
        showLabel
        customWidth='w-full'
        onBlur={() =>
          !isNaN(Number(value)) && Number(value) > 0
            ? setManualSelection(prev => [
                ...prev,
                { product: product.id, quantity: Number(value) }
              ])
            : setManualSelection(prev => prev.filter(p => p.product !== product.id))
        }
      />
      {/*{manualSelection.includes(product.id) ? (*/}
      {/*  <RedButton*/}
      {/*    type='button'*/}
      {/*    handler={() => setManualSelection(prev => prev.filter(p => p !== product.id))}*/}
      {/*    text='Убрать'*/}
      {/*    customWidth='w-full'*/}
      {/*  />*/}
      {/*) : (*/}
      {/*  <IndigoButton*/}
      {/*    type='button'*/}
      {/*    handler={() => setManualSelection(prev => [...prev, product.id])}*/}
      {/*    text='Выбрать'*/}
      {/*    customWidth='w-full'*/}
      {/*  />*/}
      {/*)}*/}
    </div>
  )
}

export default TsdProductCard
