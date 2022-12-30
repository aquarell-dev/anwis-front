import { ReactNode } from 'react'

import { SetState } from '../../../utils/types'
import FileDragAndDrop from '../../ui/FileDragNDrop'
import MutatePopup from '../../ui/MutatePopup'
import CommonCategorySelect from '../CommonCategorySelect'
import CommonProductFields from '../CommonProductFields'
import { CreateCommonProduct } from '../common.types'

type PopupProps<T = CreateCommonProduct> = {
  open: boolean
  setOpen: SetState<boolean>
  onMutate: () => void
  categories?: { id: number; category: string }[]
  additionalFields?: ReactNode
  defaultPhoto?: string
  currentProduct: T
  setCurrentProduct: SetState<T>
  categoryLabel: string | undefined
  children?: ReactNode
  loading?: boolean
}

const CommonProductPopup = <T extends CreateCommonProduct>(props: PopupProps<T>): JSX.Element => {
  const {
    open,
    setOpen,
    categories,
    defaultPhoto,
    onMutate,
    currentProduct,
    setCurrentProduct,
    categoryLabel,
    children,
    loading
  } = props

  return (
    <MutatePopup
      width='w-[80%]'
      height='h-[70%]'
      content=''
      open={open}
      setOpen={setOpen}
      onMutate={onMutate}
      closeOnEnd
      loading={loading}
    >
      <div className='w-full m-2 flex space-x-8 items-start'>
        <div>
          <p>Прикрепите файл</p>
          <div className='w-[650px]'>
            <FileDragAndDrop
              accept={{ 'image/*': [] }}
              type='photo'
              multiple={false}
              preview
            />
          </div>
        </div>
        {defaultPhoto && (
          <div className='flex flex-col my-2 space-y1-'>
            <p>Текущее фото</p>
            <img
              src={defaultPhoto}
              className='w-16'
              alt={'Текущее фото'}
            />
          </div>
        )}
      </div>
      <CommonProductFields<T>
        product={currentProduct}
        setProduct={setCurrentProduct}
      >
        {children}
      </CommonProductFields>
      <CommonCategorySelect<T>
        label={categoryLabel}
        product={currentProduct}
        categories={categories}
        setProduct={setCurrentProduct}
      />
    </MutatePopup>
  )
}

export default CommonProductPopup
