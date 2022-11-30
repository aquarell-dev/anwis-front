import { FC } from 'react'
import { SpinnerComponent } from 'react-element-spinner'

import useLoading from '../../../../../../context/GridLoadingContext/hooks/useLoading'
import useRussianProducts from '../../../hooks/useRussianProducts'
import useManageSpecifications from '../../hooks/useManageSpecifications'

import { AcceptanceProductSpecification } from '../../../../../../types/acceptance.types'
import { SetState } from '../../../../../../utils/types'
import { IndigoButton } from '../../../../../ui/Button'
import { AbsoluteCenteredContainer } from '../../../../../ui/Container'
import Popup from '../../../../../ui/Popup'
import ProductsGrid from '../../../components/ProductsGrid'

const AddProducts: FC<{
  open: boolean
  setOpen: SetState<boolean>
  specifications: AcceptanceProductSpecification[]
  acceptanceId: number
}> = ({ open, setOpen, specifications, acceptanceId }) => {
  const { isLoading: russianProductsLoading, rows, ...rest } = useRussianProducts()

  const { selection, products } = rest

  const excludes = specifications.map(s => s.product.id)

  const { russianProducts } = useLoading()

  const { createSpecifications, isLoading } = useManageSpecifications(acceptanceId)

  return (
    <Popup
      state={open}
      setState={setOpen}
      width='w-[70%]'
      height='h-[95%]'
    >
      <SpinnerComponent
        position='centered'
        loading={isLoading}
      />
      <AbsoluteCenteredContainer>
        <div className='w-full'>
          <ProductsGrid
            loading={russianProducts.fetching}
            deleteCols={['delete', 'update']}
            customPaginationInitial={10}
            styles={{ height: '750px' }}
            rows={rows.filter(row => !excludes.includes(row.id))}
            {...rest}
          />
        </div>
        <div className='flex items-center justify-center'>
          <IndigoButton
            type='button'
            handler={async () => {
              await createSpecifications(products?.filter(p => selection.includes(p.id)) ?? [])
              setOpen(false)
            }}
            disabled={selection.length === 0}
            text='Добавить'
          />
        </div>
      </AbsoluteCenteredContainer>
    </Popup>
  )
}

export default AddProducts
