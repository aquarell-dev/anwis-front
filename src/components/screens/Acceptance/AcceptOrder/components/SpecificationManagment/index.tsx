import { FC, useState } from 'react'

import useAddByBarcode from '../../hooks/useAddByBarcode'

import { AcceptanceProductSpecification } from '../../../../../../types/acceptance.types'
import { IndigoButton } from '../../../../../ui/Button'
import { FancyInput } from '../../../../../ui/Input'
import AddProducts from '../AddProducts'

const SpecificationManagement: FC<{
  specifications: AcceptanceProductSpecification[]
  acceptanceId: number
}> = ({ acceptanceId, specifications }) => {
  const [open, setOpen] = useState(false)

  const {
    barcode,
    setBarcode,
    productByBarcodeFetching,
    productByBarcodeLoading,
    getProductByBarcode,
    isLoading
  } = useAddByBarcode(acceptanceId)

  return (
    <>
      <AddProducts
        acceptanceId={acceptanceId}
        open={open}
        setOpen={setOpen}
        specifications={specifications}
      />
      <div className='w-full h-1 border-b-2 mb-4 border-slate-600' />
      <div className='flex flex-col lg:flex-row items-center space-y-4 lg:items-end lg:space-x-8 lg:space-y-0'>
        <IndigoButton
          type='button'
          handler={() => setOpen(true)}
          text={'Добавить из справочника'}
          customWidth='w-60'
        />
        <FancyInput
          value={barcode}
          handler={e => setBarcode(e.target.value)}
          placeholder='Штрих-Код'
          showLabel
          loading={productByBarcodeLoading || productByBarcodeFetching || isLoading}
          customWidth='w-60'
          onKeyDown={async e => (e.key === 'Enter' ? await getProductByBarcode(barcode) : null)}
        />
      </div>
      <div className='w-full h-4 border-t-2 mt-4 border-slate-600' />
    </>
  )
}

export default SpecificationManagement
