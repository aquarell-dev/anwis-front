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
  width = 'w-[320px] sm:w-[450px] md:w-[800px] lg:w-[1024px] xl:w-[1200px] 2xl:w-[1800px]',
  height = 'h-[560px] md:h-[800px]'
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
