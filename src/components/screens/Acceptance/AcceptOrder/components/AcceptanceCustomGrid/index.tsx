import { FC } from 'react'
import { SpinnerComponent } from 'react-element-spinner'

import useFocusNext from '../../../../../../hooks/useFocusNext'
import { UpdateSpecification } from '../../../hooks/useUpdateAcceptanceProducts'
import useBoxFocus from '../../hooks/useBoxFocus'
import useBoxes from '../../hooks/useBoxes'

import { AcceptanceProductSpecification } from '../../../../../../types/acceptance.types'
import { SetState } from '../../../../../../utils/types'
import { GreenButton } from '../../../../../ui/Button'
import SlideAlert from '../../../../../ui/SlideAlert'
import CustomGridItem from '../CustomGridItem'

const AcceptanceCustomGrid: FC<{
  specifications: AcceptanceProductSpecification[]
  setSpecifications: SetState<AcceptanceProductSpecification[]>
  loading: boolean
  updateSpecification: UpdateSpecification
  updateSpecifications: (specifications: AcceptanceProductSpecification[]) => Promise<void>
}> = ({
  specifications,
  loading,
  setSpecifications,
  updateSpecification,
  updateSpecifications
}) => {
  const {
    addBox,
    validateBeforeSave,
    loading: boxLoading,
    setAlertOpen,
    alertOpen,
    alertText,
    lastAddedBox
  } = useBoxes()

  const ref = useFocusNext()

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
      <div className='w-full flex flex-col border p-4 shadow-lg mb-4 min-h-[250px]'>
        <SpinnerComponent
          loading={loading}
          position={'centered'}
          backgroundColor='grey'
        />
        <div className='w-full border-b-2 border-slate-800 pb-4'>
          <GreenButton
            type='button'
            handler={async () => await updateSpecifications(specifications)}
            text='Сохранить Все'
            customWidth='w-full'
          />
        </div>
        {specifications
          .slice()
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map(specification => (
            <CustomGridItem
              lastAddedBox={lastAddedBox}
              specification={specification}
              setSpecifications={setSpecifications}
              updateSpecification={updateSpecification}
              addBox={addBox}
              boxesFetching={loading}
              validateBeforeSave={validateBeforeSave}
              boxLoading={boxLoading}
              ref={ref}
              key={specification.id}
            />
          ))}
        <div className='w-full border-t-2 border-slate-800 pt-4'>
          <GreenButton
            type='button'
            handler={async () =>
              await updateSpecifications(
                // сохраняет только те товары, у которых заполнены коробки
                specifications.filter(specification =>
                  specification.boxes.every(box => box.quantity > 0)
                )
              )
            }
            text='Сохранить Все'
            customWidth='w-full'
          />
        </div>
      </div>
    </>
  )
}

export default AcceptanceCustomGrid
