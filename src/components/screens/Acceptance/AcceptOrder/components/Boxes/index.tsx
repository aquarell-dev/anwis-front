import { FC } from 'react'
import { SpinnerComponent } from 'react-element-spinner'

import useBoxes from '../../hooks/useBoxes'

import { AcceptanceProductSpecification } from '../../../../../../types/acceptance.types'
import { SetState } from '../../../../../../utils/types'
import { GreenButton } from '../../../../../ui/Button'
import Popup from '../../../../../ui/Popup'
import SlideAlert from '../../../../../ui/SlideAlert'
import BoxItem from '../BoxItem'
import BoxesHeader from '../BoxesHeader'

type BoxesProps = {
  open: boolean
  setOpen: SetState<boolean>
  specifications: AcceptanceProductSpecification[]
  setSpecifications: SetState<AcceptanceProductSpecification[]>
  loading: boolean
  onDetailedUpdate: (specification: AcceptanceProductSpecification) => Promise<void>
  onUpdateAll: (specifications: AcceptanceProductSpecification[]) => Promise<void>
}

const Boxes: FC<BoxesProps> = props => {
  const {
    open,
    setOpen,
    specifications,
    loading,
    setSpecifications,
    onDetailedUpdate,
    onUpdateAll
  } = props

  const {
    addBox,
    loading: boxesLoading,
    setAlertOpen,
    alertOpen,
    alertText,
    formatBoxes,
    validateBeforeSave
  } = useBoxes()

  return (
    <>
      <SlideAlert
        title={'Ошибка'}
        content={alertText}
        buttonText={['Xорошо', 'Закрыть']}
        onClose={() => setAlertOpen(false)}
        onDeny={() => setAlertOpen(false)}
        onAccept={() => setAlertOpen(false)}
        open={alertOpen}
      />
      <Popup
        state={open}
        setState={setOpen}
        width='w-[90%]'
        height='h-[900px]'
        outside={!alertOpen}
      >
        <div className='flex flex-col h-[90%] space-y-2 m-8 overflow-auto scrollbar-thin'>
          <SpinnerComponent
            loading={boxesLoading || loading}
            position='centered'
          />
          <div className='absolute right-2 bottom-2'>
            <GreenButton
              type='button'
              handler={async () => {
                const pass = !specifications
                  .map(specification => validateBeforeSave(specification))
                  .some(s => !s)

                if (pass) await onUpdateAll(specifications)
              }}
              customWidth='w-48'
              text='Сохранить Все'
            />
          </div>
          <div className='overflow-auto scrollbar-thin'>
            <BoxesHeader />
            {specifications.map(specification => (
              <BoxItem
                formatBoxes={formatBoxes}
                validateBeforeSave={validateBeforeSave}
                addBox={addBox}
                onDetailedUpdate={onDetailedUpdate}
                {...specification}
                setSpecifications={setSpecifications}
                key={specification.id}
              />
            ))}
          </div>
        </div>
      </Popup>
    </>
  )
}

export default Boxes
