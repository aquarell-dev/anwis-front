import { FC } from 'react'

import { SetState } from '../../../../../../utils/types'
import ConfirmationPopup from '../../../../../ui/ConfirmationPopup'
import { FancyInput } from '../../../../../ui/Input'

const CreateSameProduct: FC<{
  onCommit: () => void
  open: boolean
  setOpen: SetState<boolean>
  size: string
  setSize: SetState<string>
}> = ({ onCommit, open, setOpen, size, setSize }) => {
  return (
    <ConfirmationPopup
      height='h-[300px]'
      width='w-[450px]'
      open={open}
      setOpen={setOpen}
      deleteQuestion='Вы точно хотите создать такой же товар?'
      onConfirm={onCommit}
      closeOnEnd
    >
      <FancyInput
        value={size}
        handler={e => setSize(e.target.value)}
        placeholder={'Размер'}
        showLabel
      />
    </ConfirmationPopup>
  )
}

export default CreateSameProduct
