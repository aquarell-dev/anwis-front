import { FC } from 'react'

import useSearchProduct from '../../hooks/useSearchProduct'

import { AcceptanceProductSpecification } from '../../../../../../types/acceptance.types'
import ProductPreview from '../ProductPreview'
import SearchFields from '../SearchFields'

type SearchProductProps = {
  specifications: AcceptanceProductSpecification[]
}

const SearchProduct: FC<SearchProductProps> = ({ specifications }) => {
  const { searchProductByBox, specificationByBoxLoading, getSpecification } =
    useSearchProduct(specifications)

  return (
    <div className='flex w-[96%] space-x-6 m-4 h-[50%]'>
      <SearchFields searchProductByBox={searchProductByBox} />
      <ProductPreview
        specification={getSpecification()}
        loading={specificationByBoxLoading}
      />
    </div>
  )
}

export default SearchProduct
