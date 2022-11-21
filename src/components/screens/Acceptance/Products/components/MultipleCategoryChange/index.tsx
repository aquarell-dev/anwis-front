import { FC, useState } from 'react'
import Select from 'react-select/'
import { AcceptanceCategory } from '../../../../../../types/acceptance.types'
import { SelectValue, SetState } from '../../../../../../utils/types'
import { IndigoButton, RedButton } from '../../../../../ui/Button'
import { AbsoluteCenteredContainer } from '../../../../../ui/Container'
import Popup from '../../../../../ui/Popup'

type MultipleCategoryChangeProps = {
  categories: AcceptanceCategory[]
  open: boolean
  setOpen: SetState<boolean>
}

const MultipleCategoryChange: FC<MultipleCategoryChangeProps> = ({ categories, open, setOpen }) => {
  const options = categories.map(category => ({ label: category.category, value: category.id }))

  const [selectedCategory, setSelectedCategory] = useState<SelectValue | null>(null)

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
              handler={() => {}}
              text='Продолжить'
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
