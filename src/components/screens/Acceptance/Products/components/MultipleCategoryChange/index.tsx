import { FC, useEffect, useState } from 'react'
import Select from 'react-select'

import { AcceptanceCategory } from '../../../../../../types/acceptance.types'
import { SelectValue, SetState } from '../../../../../../utils/types'
import { IndigoButton, RedButton } from '../../../../../ui/Button'
import { AbsoluteCenteredContainer } from '../../../../../ui/Container'
import Popup from '../../../../../ui/Popup'

type MultipleCategoryChangeProps = {
  categories: AcceptanceCategory[]
  open: boolean
  setOpen: SetState<boolean>
  onUpdate: (data: { products: number[]; category: number }) => Promise<void>
  selectedProducts: number[]
}

const MultipleCategoryChange: FC<MultipleCategoryChangeProps> = ({
  categories,
  open,
  setOpen,
  onUpdate,
  selectedProducts
}) => {
  const options = categories.map(category => ({ label: category.category, value: category.id }))

  const [selectedCategory, setSelectedCategory] = useState<SelectValue | null>(null)

  useEffect(() => {
    if (!open) setSelectedCategory(null)
  }, [open])

  return (
    <Popup
      state={open}
      setState={setOpen}
    >
      <AbsoluteCenteredContainer>
        <div className='flex flex-col space-y-6 items-center'>
          <Select
            className='w-[300px]'
            placeholder='Категории'
            noOptionsMessage={() => 'Не найдено'}
            options={options}
            value={selectedCategory}
            onChange={newValue => setSelectedCategory(newValue)}
          />
          <div className='flex space-x-4 items-center'>
            <IndigoButton
              type='button'
              handler={async () => {
                if (!selectedCategory) return
                setOpen(false)
                await onUpdate({ products: selectedProducts, category: selectedCategory.value })
              }}
              text='Продолжить'
              disabled={!selectedCategory}
            />
            <RedButton
              type='button'
              handler={() => setOpen(false)}
              text='Закрыть'
            />
          </div>
        </div>
      </AbsoluteCenteredContainer>
    </Popup>
  )
}

export default MultipleCategoryChange
