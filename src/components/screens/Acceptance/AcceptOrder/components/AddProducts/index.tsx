import React, { FC, useEffect, useState } from 'react'
import { SpinnerComponent } from 'react-element-spinner'
import Expand from 'react-expand-animated'

import useLoading from '../../../../../../context/GridLoadingContext/hooks/useLoading'
import useRussianProducts from '../../../hooks/useRussianProducts'
import useManageSpecifications from '../../hooks/useManageSpecifications'
import useTsdProducts from '../../hooks/useTsdProducts'

import {
  AcceptanceProduct,
  AcceptanceProductSpecification
} from '../../../../../../types/acceptance.types'
import { SetState } from '../../../../../../utils/types'
import { GreenButton, IndigoButton, RedButton } from '../../../../../ui/Button'
import { AbsoluteCenteredContainer } from '../../../../../ui/Container'
import Popup from '../../../../../ui/Popup'
import ProductsGrid from '../../../components/ProductsGrid'
import ExpandableCategory from '../ExpandableCategory'
import TsdProductCard from '../TsdProductCard'

const AddProducts: FC<{
  open: boolean
  setOpen: SetState<boolean>
  specifications: AcceptanceProductSpecification[]
  acceptanceId: number
}> = ({ open, setOpen, specifications, acceptanceId }) => {
  const { isLoading: russianProductsLoading, rows, ...rest } = useRussianProducts()

  const { selection, products, categories } = rest

  const excludes = specifications.map(s => s.product.id)

  const [manualSelection, setManualSelection] = useState<{ quantity: number; product: number }[]>(
    []
  )

  const { russianProducts } = useLoading()

  const { createSpecificationsWithQuantity, createSpecifications, isLoading } =
    useManageSpecifications(acceptanceId)

  return (
    <Popup
      state={open}
      setState={setOpen}
      width='w-[58vh]'
      height='h-[100vh]'
    >
      <SpinnerComponent
        position='centered'
        loading={isLoading}
      />
      <AbsoluteCenteredContainer>
        <div className='d-none lg:block w-full'>
          <ProductsGrid
            loading={russianProducts.fetching}
            deleteCols={['delete', 'update']}
            customPaginationInitial={10}
            styles={{ height: '750px' }}
            rows={rows.filter(row => !excludes.includes(row.id))}
            {...rest}
          />
        </div>
        <div className='flex flex-col space-y-2 my-2 mx-4 w-[280px] min-h-[400px] max-h-[400px] overflow-y-auto scrollbar-thin overflow-x-hidden'>
          {categories?.map(category => (
            <ExpandableCategory
              key={category.id}
              products={products}
              manualSelection={manualSelection}
              setManualSelection={setManualSelection}
              category={category}
            />
          ))}
        </div>
        <div className='d-none lg:flex items-center justify-center'>
          <IndigoButton
            type='button'
            handler={async () => {
              await createSpecifications(
                products?.filter(p => selection.includes(p.id)).map(p => p.id) ?? []
              )
              setOpen(false)
            }}
            disabled={selection.length === 0}
            text='Добавить'
          />
        </div>
        <div className='flex lg:d-none mt-4 items-center justify-center'>
          <GreenButton
            type='button'
            handler={async () => {
              await createSpecificationsWithQuantity(manualSelection)
              setOpen(false)
            }}
            disabled={manualSelection.length === 0}
            text={`Добавить(${manualSelection.length})`}
          />
        </div>
      </AbsoluteCenteredContainer>
    </Popup>
  )
}

export default AddProducts
