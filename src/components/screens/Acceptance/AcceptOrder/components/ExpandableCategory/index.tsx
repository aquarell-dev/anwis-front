import React, { FC, useState } from 'react'
import Expand from 'react-expand-animated'

import { AcceptanceCategory, AcceptanceProduct } from '../../../../../../types/acceptance.types'
import { SetState } from '../../../../../../utils/types'
import TsdProductCard from '../TsdProductCard'

const ExpandableCategory: FC<{
  products: AcceptanceProduct[] | undefined
  manualSelection: { quantity: number; product: number }[]
  setManualSelection: SetState<{ quantity: number; product: number }[]>
  category: AcceptanceCategory
}> = ({ category, setManualSelection, products, manualSelection }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className='flex flex-col space-y-2'>
      <div className='flex items-center space-x-2'>
        <p className='font-medium text-xl'>{category.category}</p>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6 cursor-pointer hover:text-slate-800 duration-300 transition ease-in-out'
          onClick={() => setExpanded(!expanded)}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M19.5 8.25l-7.5 7.5-7.5-7.5'
          />
        </svg>
      </div>
      <Expand
        open={expanded}
        duration={800}
      >
        {products
          ?.filter(product => product.category?.category === category.category)
          .sort((a, b) => {
            if (a.photo && b.photo) return 0
            if (a.photo && !b.photo) return -1
            if (!a.photo && b.photo) return 1
            return 0
          })
          .map(product => (
            <TsdProductCard
              product={product}
              manualSelection={manualSelection}
              setManualSelection={setManualSelection}
              key={product.id}
            />
          ))}
      </Expand>
    </div>
  )
}

export default ExpandableCategory
