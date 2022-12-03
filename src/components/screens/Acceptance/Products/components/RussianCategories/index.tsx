import { FC, useEffect, useState } from 'react'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'

import { AcceptanceCategory } from '../../../../../../types/acceptance.types'
import { SetState } from '../../../../../../utils/types'
import Categories, { CategoriesProps } from '../../../../../common/Categories'
import CategoryPaymentPopup from '../CategoryPaymentPopup'

const RussianCategories: FC<
  CategoriesProps & {
    categories: AcceptanceCategory[] | undefined
    currentCategory: AcceptanceCategory | null
    paymentOpen: boolean
    setPaymentOpen: SetState<boolean>
    update: (category: AcceptanceCategory, onFulfil: () => void) => Promise<void>
  }
> = props => {
  const {
    currentCategory,
    selectedCategory,
    categories,
    setCurrentCategory,
    paymentOpen,
    setPaymentOpen,
    update
  } = props

  const [category, setCategory] = useState<AcceptanceCategory | null>(null)

  useEffect(() => {
    if (!!selectedCategory)
      setCategory(categories?.find(category => category.category === selectedCategory) ?? null)
  }, [selectedCategory])

  return (
    <Categories
      {...props}
      additionalIcons={[
        {
          icon: <RiMoneyDollarCircleFill size='22' />,
          handler: (e, category) => {
            e.stopPropagation()
            setCurrentCategory(category)
            setPaymentOpen(true)
          }
        }
      ]}
      additionalPopups={[
        <CategoryPaymentPopup
          open={paymentOpen}
          setOpen={setPaymentOpen}
          category={currentCategory}
          content='Изменение Оплаты'
          onMutate={update}
        />
      ]}
      headerInfo={
        <div className='h-20'>
          <p className='text-lg'>Категория: {category?.category ?? '-'}</p>
          <p className='text-lg'>
            Оплата:{' '}
            {category?.payment ? (category.payment === 'apiece' ? 'Поштучная' : 'Почасовая') : '-'}
          </p>
          <p className='text-lg'>
            Денег:{' '}
            {category?.payment
              ? category.payment === 'apiece'
                ? category.per_piece
                : category.per_hour
              : '-'}
          </p>
        </div>
      }
    />
  )
}

export default RussianCategories
