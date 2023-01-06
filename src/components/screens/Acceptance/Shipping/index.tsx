import { useRouter } from 'next/router'
import { FC, useState } from 'react'

import { useRetrieveFboShippingQuery } from '../../../../store/api/fbo.api'
import { ContentContainer } from '../../../ui/Container'
import { FancyInput } from '../../../ui/Input'
import Loader from '../../../ui/Loader'
import AssignBoxesPopup from './components/AssignBoxesPopup'
import ShippingManagement from './components/ShippingManagement'
import ShippingNavigation from './components/ShippingNavigation'

const Shipping: FC = () => {
  const router = useRouter()

  const { id } = router.query

  const { data: shipping, isLoading } = useRetrieveFboShippingQuery(Number(id))

  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  if (isLoading || !shipping) return <Loader isLoading />

  return (
    <ContentContainer>
      <ShippingNavigation {...shipping} />
      <ShippingManagement {...shipping} />
      <div className='flex w-full justify-end my-4'>
        <FancyInput
          customWidth='w-96'
          value={search}
          handler={e => setSearch(e.target.value)}
          placeholder='Поиск'
          showLabel
          onKeyDown={e => e.key === 'Enter' && setOpen(true)}
        />
      </div>
      <AssignBoxesPopup
        state={open}
        setState={setOpen}
      />
    </ContentContainer>
  )
}

export default Shipping
