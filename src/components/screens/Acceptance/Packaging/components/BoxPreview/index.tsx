import React, { FC } from 'react'

import useCountdown from '../../../../../../hooks/useCountdown'

import { Box } from '../../../../../../types/acceptance.types'
import { AbsoluteCenteredContainer } from '../../../../../ui/Container'
import BoxLog from '../BoxLog'
import BoxProperties from '../BoxProperties'
import ExitInput from '../ExitInput'
import PreviewPopup, { PreviewPopupProps } from '../PreviewPopup'

const BoxPreview: FC<PreviewPopupProps & { box: Box | undefined }> = ({ box, ...popup }) => {
  // useCountdown(() => popup.setOpen(false), 7000)

  return (
    <PreviewPopup {...popup}>
      <ExitInput setOpen={popup.setOpen} />
      <AbsoluteCenteredContainer>
        <div className='flex items-start space-x-4'>
          <BoxLog />
          <BoxProperties
            box={box}
            wrapperClassName='flex space-x-8 items-center'
            propertiesClassName='space-y-2 h-max-[500px] min-w-[500px] max-w-[550px] overflow-y-auto scrollbar-thin'
            propertiesFont='text-2xl'
            imageClassName='h-[500px]'
          />
        </div>
      </AbsoluteCenteredContainer>
    </PreviewPopup>
  )
}

export default BoxPreview
