import { FC } from 'react'

import { SetState } from '../../../utils/types'
import MutatePopup from '../../ui/MutatePopup'

type PopupProps = {
  open: boolean
  setOpen: SetState<boolean>
  createCategory: () => void
  isLoading?: boolean
  category: string
  setCategory: SetState<string>
}

const CategoryPopup: FC<PopupProps> = ({
  open,
  setOpen,
  createCategory,
  isLoading,
  category,
  setCategory
}) => {
  return (
    <MutatePopup
      open={open}
      setOpen={setOpen}
      value={category}
      setValue={setCategory}
      width='w-[500px]'
      content={'Новая категория'}
      onMutate={createCategory}
      loading={isLoading}
      closeOnEnd
      clearOnClose
    />
  )
}

export default CategoryPopup
