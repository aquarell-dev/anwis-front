import { FC, useState } from 'react'

import { AcceptanceProductSpecification } from '../../../../../../types/acceptance.types'
import { IndigoButton } from '../../../../../ui/Button'
import AddProducts from '../AddProducts'

const SpecificationManagement: FC<{
  specifications: AcceptanceProductSpecification[]
  acceptanceId: number
}> = ({ acceptanceId, specifications }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <AddProducts
        acceptanceId={acceptanceId}
        open={open}
        setOpen={setOpen}
        specifications={specifications}
      />
      <div className='w-full h-1 border-b-2 mb-4 border-slate-600' />
      <IndigoButton
        type='button'
        handler={() => setOpen(true)}
        text={'Добавить из справочника'}
        customWidth='w-60'
      />
      <div className='w-full h-4 border-t-2 mt-4 border-slate-600' />
    </>
  )
}

export default SpecificationManagement
