import dynamic from 'next/dynamic'
import { FC } from 'react'

import useMemberSearch from '../../hooks/useMemberSearch'

import {
  Acceptance,
  AcceptanceProductSpecification
} from '../../../../../../types/acceptance.types'

import ProductPreview from '../../../components/ProductPreview'
import SearchFields from '../SearchFields'

const LabelsGrid = dynamic(() => import('../../../components/LabelsGrid'), { ssr: false })

type SearchProductProps = {
  specifications: AcceptanceProductSpecification[]
  acceptance: Acceptance
  open: boolean
}

const SearchProduct: FC<SearchProductProps> = ({ specifications, acceptance, open }) => {
  const {
    searchProductByBox,
    specificationByBoxLoading,
    specificationByBox,
    specificationByBarcode,
    specificationByBarcodeLoading,
    searchProductByBarcode,
    method,
    setMethod
  } = useMemberSearch()

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
      <div className='flex h-full w-full my-10'>
        <LabelsGrid
          products={specifications.map(specification => ({
            printQuantity: specification?.actual_quantity ? specification.actual_quantity * 2 : 0,
            actualQuantity: specification.actual_quantity ?? 0,
            ...specification.product
          }))}
        />
      </div>
    </div>
  )
}

export default SearchProduct
