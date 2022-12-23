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
        <div className='flex flex-col-reverse w-full lg:flex-row space-y-6 lg:space-y-0 mt-24 overflow-y-auto scrollbar-thin h-[440px] lg:h-full items-start space-x-4'>
          <BoxLog />
          <div className='w-full h-fit'>
            <BoxProperties
              box={box}
              wrapperClassName='flex space-x-8 items-center'
              propertiesClassName='space-y-2 h-max-[500px] min-w-[500px] max-w-[550px] overflow-y-auto scrollbar-thin'
              propertiesFont='text-lg lg:text-2xl'
              imageClassName='h-[500px]'
            />
          </div>
        </div>
      </AbsoluteCenteredContainer>
    </PreviewPopup>
  )
}

export default BoxPreview
