import { FC, useEffect, useState } from 'react'

import useNotifications from '../../../../../../hooks/useNotifications'
import useDeleteMultipleProducts from '../../hooks/useDeleteMultipleProducts'

import { GridSelectionModel, GridToolbarContainer } from '@mui/x-data-grid'

import { AcceptanceCategory, AcceptanceProduct } from '../../../../../../types/acceptance.types'
import { GreenButton, IndigoButton, RedButton } from '../../../../../ui/Button'
import SlideAlert from '../../../../../ui/SlideAlert'
import { ValidatedLabel, ValidatedProduct } from '../../../types'
import LabelsPopup from '../LabelsPopup'
import MultipleCategoryChange from '../MultipleCategoryChange'

const Toolbar: FC<{
  selection: GridSelectionModel
  products: AcceptanceProduct[] | undefined
  categories: AcceptanceCategory[]
}> = ({ selection, products, categories }) => {
  const [alerts, setAlerts] = useState({
    parsePhotos: false,
    deleteProducts: false
  })
  const [printOpen, setPrintOpen] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [validatedProducts, setValidatedProducts] = useState<ValidatedLabel[]>([])
  const [multipleCategoryChangeOpen, setMultipleCategoryChangeOpen] = useState(false)

  const { deleteMultipleProducts, isLoading: deleteLoading } = useDeleteMultipleProducts()

  const { notifyError } = useNotifications()

  useEffect(() => {
    setDisabled(!(selection.length > 0))
  }, [selection])

  return (
    <>
      <MultipleCategoryChange
        categories={categories ?? []}
        open={multipleCategoryChangeOpen}
        setOpen={setMultipleCategoryChangeOpen}
      />
      <LabelsPopup
        open={printOpen}
        setOpen={setPrintOpen}
        products={validatedProducts}
        setProducts={setValidatedProducts}
      />
      <SlideAlert
        title={'Удаление товаров'}
        content={`Вы действительно хотите удалить эти товары?(${selection.length})`}
        buttonText={['Да', 'Нет']}
        onClose={() => setAlerts({ ...alerts, deleteProducts: false })}
        onDeny={() => setAlerts({ ...alerts, deleteProducts: false })}
        onAccept={async () => {
          setAlerts({ ...alerts, deleteProducts: false })
          await deleteMultipleProducts(selection as number[])
        }}
        open={alerts.deleteProducts}
      />
      <SlideAlert
        title={'Парсинг фотографий'}
        content={`Вы действительно хотите спарсить фотографии этих товаров?(${selection.length})`}
        buttonText={['Да', 'Нет']}
        onClose={() => setAlerts({ ...alerts, parsePhotos: false })}
        onDeny={() => setAlerts({ ...alerts, parsePhotos: false })}
        onAccept={() => setAlerts({ ...alerts, parsePhotos: false })}
        open={alerts.parsePhotos}
      />
      <GridToolbarContainer className='flex items-center justify-end space-x-4 mx-4 my-1'>
        <IndigoButton
          type='button'
          handler={() => setMultipleCategoryChangeOpen(true)}
          text='Перенести категории'
          customWidth='w-60'
          disabled={disabled}
        />
        <GreenButton
          type='button'
          handler={() => setAlerts({ ...alerts, parsePhotos: true })}
          text='Спарсить фотографии'
          customWidth='w-60'
          disabled={disabled}
        />
        <RedButton
          type='button'
          handler={() => setAlerts({ ...alerts, deleteProducts: true })}
          text='Удалить'
          loading={deleteLoading}
          customWidth='w-60'
          disabled={disabled}
        />
        <IndigoButton
          type='button'
          handler={() => {
            const selectedProducts = selection
              .map(id => products?.find(product => product.id === id))
              .filter(v => !!v) as AcceptanceProduct[]

            const pass = !selectedProducts.some(p => p?.barcode === null)

            if (!pass) return notifyError('Заполните штрих-код у всех выбранных товаров')

            setValidatedProducts(
              (selectedProducts as ValidatedProduct[]).map(p => {
                const { id, title, barcode, article, size, color } = p

                return { id, title, barcode, article, size, color, quantity: 0 }
              })
            )
            setPrintOpen(true)
          }}
          text='Печать этикеток'
          customWidth='w-60'
          disabled={disabled}
        />
      </GridToolbarContainer>
    </>
  )
}

export default Toolbar
