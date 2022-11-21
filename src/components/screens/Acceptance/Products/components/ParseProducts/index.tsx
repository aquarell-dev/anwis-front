import { FC } from 'react'

import useParseProducts from '../../hooks/useParseProducts'

import { AcceptanceProduct } from '../../../../../../types/acceptance.types'
import { SetState } from '../../../../../../utils/types'
import { GreenButton, IndigoButton } from '../../../../../ui/Button'
import { AbsoluteCenteredContainer } from '../../../../../ui/Container'
import FileDragAndDrop from '../../../../../ui/FileDragNDrop'
import Popup from '../../../../../ui/Popup'

const ParseProducts: FC<{
  open: boolean
  setOpen: SetState<boolean>
  products: AcceptanceProduct[] | undefined
}> = ({ open, setOpen, products }) => {
  const { disabled, setFiles, parseNewProducts, isLoading } = useParseProducts(open, products)

  return (
    <Popup
      state={open}
      setState={setOpen}
      width='w-[600px]'
      height='h-[300px]'
    >
      <AbsoluteCenteredContainer>
        <h1 className='text-center text-lg mb-4'>
          Загрузите файл для <span className='font-medium underline'>парсинга</span>
        </h1>
        <div className='w-[540px]'>
          <FileDragAndDrop
            type={'document'}
            uploadToServer={false}
            customSetFile={setFiles}
          />
        </div>
        <div className='flex items-center justify-center space-x-4 mt-2'>
          <IndigoButton
            type='button'
            handler={() => {
              parseNewProducts()
              setOpen(false)
            }}
            text={'Новые'}
            disabled={disabled.newProducts}
            loading={isLoading}
          />
          <GreenButton
            type='button'
            handler={() => {}}
            text='Китайские'
            disabled={disabled.chinaProducts}
          />
        </div>
      </AbsoluteCenteredContainer>
    </Popup>
  )
}

export default ParseProducts
