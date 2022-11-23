import { GridColDef } from '@mui/x-data-grid'
import { AnyObject, SetState } from '../../../../../../utils/types'

import { IndigoButton } from '../../../../../ui/Button'
import ImagePreview from '../../../../../ui/ImagePreview'
import { AcceptanceProductColumn } from '../../../types'

export const fields: AcceptanceProductColumn[] = [
  { field: 'title', width: 180, headerName: 'Название' },
  {
    field: 'photo',
    width: 85,
    headerName: 'Картинка',
    renderCell: params => (
      <ImagePreview
        src={params.value}
        alt=''
      />
    )
  },
  { field: 'article', width: 220, headerName: 'Артикул ВБ' },
  { field: 'linked_china_product_article', width: 220, headerName: 'Артикул Поставщика' },
  { field: 'brand', width: 90, headerName: 'Бренд' },
  { field: 'size', width: 80, headerName: 'Размер' },
  { field: 'color', width: 80, headerName: 'Цвет' },
  { field: 'cost', width: 100, headerName: 'Себестоимость' },
  { field: 'quantity', width: 80, headerName: 'Кол-во' },
  { field: 'actual_quantity', width: 105, headerName: 'Реал. Кол-во', editable: true },
  { field: 'id', width: 100, headerName: 'ID' }
]

const generateBoxesField = (boxes: number): GridColDef[] => {
  const fields: GridColDef[] = []

  for (let i = 0; i < boxes; i++) {
    fields.push({
      field: `box_${i + 1}`,
      width: 90,
      headerName: `Коробка ${i + 1}`,
      editable: true
    })
    // fields.push({
    //   field: `quantity_${i + 1}`,
    //   width: 90,
    //   headerName: `Кол-во ${i + 1}`,
    //   editable: true
    // })
  }

  return fields
}

export const getColumnVisibilityModel = (boxes: number) => {
  const model: AnyObject<boolean> = {
    id: false
  }

  for (let i = 0; i < boxes; i++) {
    model[`box_${i + 1}` as keyof AnyObject<boolean>] = true
    // model[`quantity_${i + 1}` as keyof AnyObject<boolean>] = true
  }

  return model
}

export const getColumns = (
  onUpdate: (id: number) => Promise<void>,
  boxesCount: number,
  setBoxes: SetState<number>
): GridColDef[] => [
  ...fields,
  ...generateBoxesField(boxesCount),
  {
    field: 'save',
    width: 140,
    headerName: 'Сохранить',
    renderCell: params => (
      <IndigoButton
        type='button'
        customWidth='w-48'
        handler={async () => {
          await onUpdate(Number(params.row.id))
        }}
        text='Сохранить'
      />
    )
  },
  {
    field: 'new_box',
    width: 140,
    headerName: 'Коробки',
    renderCell: params => (
      <IndigoButton
        type='button'
        customWidth='w-48'
        handler={() =>
          setBoxes(prev => {
            if (prev < 3) return prev + 1
            return prev
          })
        }
        text='Добавить'
        disabled={boxesCount >= 3}
      />
    )
  }
]
