import { FC } from 'react'

import useSearchProduct from '../../hooks/useSearchProduct'

import {
  Acceptance,
  AcceptanceProductSpecification
} from '../../../../../../types/acceptance.types'
import LabelsGrid from '../../../components/LabelsGrid'
import ProductPreview from '../ProductPreview'
import SearchFields from '../SearchFields'

type SearchProductProps = {
  specifications: AcceptanceProductSpecification[]
  acceptance: Acceptance
}

const SearchProduct: FC<SearchProductProps> = ({ specifications, acceptance }) => {
  const {
    searchProductByBox,
    specificationByBoxLoading,
    specificationByBox,
    specificationByBarcode,
    specificationByBarcodeLoading,
    searchProductByBarcode,
    method,
    setMethod
  } = useSearchProduct(acceptance.id)

  return (
    <div className='flex space-x-4 w-full h-full'>
      <div className='flex flex-col w-[35%] space-y-6 h-full m-4 overflow-x-hidden'>
        <SearchFields
          method={method}
          setMethod={setMethod}
          searchProductByBox={searchProductByBox}
          searchProductByBarcode={searchProductByBarcode}
        />
        <ProductPreview
          method={method}
          specification={method === 'barcode' ? specificationByBarcode : specificationByBox}
          loading={specificationByBoxLoading || specificationByBarcodeLoading}
        />
      </div>
      <LabelsGrid
        products={specifications.map(specification => ({
          printQuantity: specification?.actual_quantity ? specification.actual_quantity * 2 : 0,
          ...specification.product
        }))}
      />
    </div>
  )
}

export default SearchProduct
