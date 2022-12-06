import { FC } from 'react'

import { Box } from '../../../../../../types/acceptance.types'
import { AbsoluteCenteredContainer } from '../../../../../ui/Container'
import BoxProperties from '../BoxProperties'
import PreviewPopup, { PreviewPopupProps } from '../PreviewPopup'

const BoxPreview: FC<PreviewPopupProps & { box: Box | undefined }> = ({ box, ...popup }) => {
  return (
    <PreviewPopup {...popup}>
      <AbsoluteCenteredContainer>
        <BoxProperties
          box={box}
          wrapperClassName='flex space-x-8 items-center'
          propertiesClassName='space-y-2 h-max-[500px] max-w-[450px] overflow-auto scrollbar-thin'
          propertiesFont='text-2xl'
          imageClassName='h-[500px]'
        />
      </AbsoluteCenteredContainer>
    </PreviewPopup>
  )
}

export default BoxPreview
