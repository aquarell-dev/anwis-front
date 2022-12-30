import React, { FC } from 'react'
import { SpinnerComponent } from 'react-element-spinner'

import { SetState } from '../../../../../../utils/types'
import Popup from '../../../../../ui/Popup'

export type PreviewPopupProps = {
  open: boolean
  setOpen: SetState<boolean>
  fetching?: boolean
  width?: string
  height?: string
}

const PreviewPopup: FC<PreviewPopupProps> = ({
  open,
  setOpen,
  children,
  fetching,
  width = 'w-fit',
  height = 'h-fit'
}) => {
  return (
    <Popup
      state={open}
      setState={setOpen}
      width={width}
      height={height}
    >
      <SpinnerComponent
        loading={fetching ?? false}
        position='centered'
        backgroundColor='grey'
      />
      {children}
    </Popup>
  )
}

export default PreviewPopup
