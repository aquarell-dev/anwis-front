import { FC, useState } from 'react'
import { FiPlusCircle } from 'react-icons/fi'

import useNotifications from '../../../../../../hooks/useNotifications'

import { ICategory } from '../../../../../../features/order/order.types'
import { useCreateCategoryMutation } from '../../../../../../store/api/category.api'
import { SetState } from '../../../../../../utils/types'
import CategoryPopup from '../../../../../common/CategoryPopup'
import { IndigoButton } from '../../../../../ui/Button'
import { FancyInput } from '../../../../../ui/Input'
import MutateChinaPopup from '../MutateChinaPopup'

const Navigation: FC<{
  search: string
  setSearch: SetState<string>
  categories?: ICategory[]
}> = ({ search, setSearch, categories }) => {
  const [createProductOpen, setCreateProductOpen] = useState(false)
  const [createCategoryOpen, setCreateCategoryOpen] = useState(false)

  const [category, setCategory] = useState('')

  const [createCategory, { isLoading }] = useCreateCategoryMutation()
  const { notifySuccess, notifyError } = useNotifications()

  return (
    <>
      <div className='my-2 flex items-center space-x-4'>
        <IndigoButton
          type={'button'}
          text={'Товар'}
          icon={<FiPlusCircle size='18' />}
          handler={() => setCreateProductOpen(true)}
        />
        <IndigoButton
          type={'button'}
          text={'Категория'}
          icon={<FiPlusCircle size='18' />}
          handler={() => setCreateCategoryOpen(true)}
        />
        <FancyInput
          value={search}
          handler={e => setSearch(e.target.value)}
          placeholder={'Поиск продуктов'}
        />
      </div>
      <MutateChinaPopup
        open={createProductOpen}
        setOpen={setCreateProductOpen}
        categories={categories}
        product={null}
      />
      <CategoryPopup
        createCategory={() => {
          createCategory({ category })
            .unwrap()
            .then(() => {
              notifySuccess('Категория создана')
            })
            .catch(() => {
              notifyError('Категория не создана')
            })
            .finally(() => setCreateCategoryOpen(false))
        }}
        category={category}
        setCategory={setCategory}
        isLoading={isLoading}
        open={createCategoryOpen}
        setOpen={setCreateCategoryOpen}
      />
    </>
  )
}

export default Navigation
