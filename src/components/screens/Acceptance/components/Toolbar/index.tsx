import { FC, useEffect, useState } from 'react'

import useNotifications from '../../../../../hooks/useNotifications'
import useUpdatePhotos from '../../../China/Products/hooks/useUpdatePhotos'
import useChangeMultipleCategory from '../../Products/hooks/useChangeMultipleCategory'
import useDeleteMultipleProducts from '../../Products/hooks/useDeleteMultipleProducts'

import { GridSelectionModel, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid'

import { AcceptanceCategory, AcceptanceProduct } from '../../../../../types/acceptance.types'
import { GreenButton, IndigoButton, RedButton } from '../../../../ui/Button'
import SlideAlert from '../../../../ui/SlideAlert'
import LabelsPopup from '../../Products/components/LabelsPopup'
import MultipleCategoryChange from '../../Products/components/MultipleCategoryChange'
import { ValidatedLabel, ValidatedProduct } from '../../types'

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
  const { updateMultipleCategories, updateMultipleLoading } = useChangeMultipleCategory()
  const { fetchSelectedPhotos, photosLoading } = useUpdatePhotos()

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
        onUpdate={async (data: { products: number[]; category: number }) =>
          await updateMultipleCategories(data)
        }
        selectedProducts={selection as number[]}
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
        onAccept={async () => {
          setAlerts({ ...alerts, parsePhotos: false })
          await fetchSelectedPhotos(
            selection
              .map(id => {
                const product = products?.find(p => p.id === id)
                return product ? product.article : ''
              })
              .filter(Boolean)
          )
        }}
        open={alerts.parsePhotos}
      />
      <GridToolbarContainer className='flex w-full items-center justify-between my-1'>
        <GridToolbarQuickFilter className='w-fit ml-2' />
        <div className='flex items-center justify-end space-x-4 mr-2'>
          <IndigoButton
            type='button'
            handler={() => setMultipleCategoryChangeOpen(true)}
            text='Перенести категории'
            customWidth='w-60'
            disabled={disabled}
            loading={updateMultipleLoading}
          />
          <GreenButton
            type='button'
            handler={() => setAlerts({ ...alerts, parsePhotos: true })}
            text='Спарсить фотографии'
            customWidth='w-60'
            disabled={disabled}
            loading={photosLoading}
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

              const barcodePass = !selectedProducts.some(p => p?.barcode === null)

              const categoryPass = !selectedProducts.some(p => p?.category === null)

              if (!barcodePass) return notifyError('Заполните штрих-код у всех выбранных товаров')

              if (!categoryPass) return notifyError('Заполните категории у всех выбранных товаров')

              setValidatedProducts(
                (selectedProducts as ValidatedProduct[]).map(p => {
                  const {
                    id,
                    title,
                    barcode,
                    linked_china_product_article,
                    size,
                    color,
                    category,
                    photo
                  } = p

                  return {
                    id,
                    title,
                    barcode,
                    linked_china_product_article,
                    size,
                    color,
                    quantity: 0,
                    category,
                    photo
                  }
                })
              )
              setPrintOpen(true)
            }}
            text='Печать этикеток'
            customWidth='w-60'
            disabled={disabled}
          />
        </div>
      </GridToolbarContainer>
    </>
  )
}

export default Toolbar
