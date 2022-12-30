import { FC, useState } from 'react'
import { HiDocumentText, HiPlusSm } from 'react-icons/hi'

import useCreateCategory from '../../hooks/useCreateCategory'

import { AcceptanceProduct } from '../../../../../../types/acceptance.types'
import { SetState } from '../../../../../../utils/types'
import CategoryPopup from '../../../../../common/CategoryPopup'
import { GreenButton, IndigoButton } from '../../../../../ui/Button'
import { FancyInput } from '../../../../../ui/Input'
import ParseProducts from '../ParseProducts'

const Navigation: FC<{
  search: string
  setSearch: SetState<string>
  setCreateOpen: SetState<boolean>
  products: AcceptanceProduct[] | undefined
}> = ({ search, setSearch, setCreateOpen, products }) => {
  const category = useCreateCategory()
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className='flex items-center space-x-8'>
        <h1 className='text-2xl font-medium'>Русские Товары</h1>
        <IndigoButton
          type='button'
          handler={() => setCreateOpen(true)}
          text='Товар'
          icon={<HiPlusSm />}
        />
        <IndigoButton
          type='button'
          handler={() => category.setOpen(true)}
          text='Категория'
          icon={<HiPlusSm />}
        />
        <GreenButton
          type='button'
          icon={
            <HiDocumentText
              color='#fafafa'
              size={20}
            />
          }
          handler={() => setOpen(true)}
          text='Спарсить товары'
          customWidth='w-60'
        />
        <FancyInput
          value={search}
          searchIcon
          handler={e => setSearch(e.target.value)}
          placeholder={'Поиск по товарам'}
        />
      </div>
      <CategoryPopup {...category} />
      <ParseProducts
        open={open}
        products={products}
        setOpen={setOpen}
      />
    </>
  )
}

export default Navigation
