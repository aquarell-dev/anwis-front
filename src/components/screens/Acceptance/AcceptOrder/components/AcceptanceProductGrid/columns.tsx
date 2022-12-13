import { GridColDef } from '@mui/x-data-grid'

import { AcceptanceProductSpecification } from '../../../../../../types/acceptance.types'
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
  { field: 'linked_china_product_article', width: 220, headerName: 'Артикул Поставщика' },
  { field: 'brand', width: 90, headerName: 'Бренд' },
  { field: 'size', width: 80, headerName: 'Размер' },
  { field: 'color', width: 80, headerName: 'Цвет' },
  { field: 'cost', width: 100, headerName: 'Себестоимость', editable: true },
  { field: 'quantity', width: 120, headerName: 'Отправл. Кол-Во', editable: true },
  { field: 'actual_quantity', width: 105, headerName: 'Факт. Кол-во', editable: true },
  { field: 'id', width: 100, headerName: 'ID' }
]

const generateBoxesField = (specifications: AcceptanceProductSpecification[]): GridColDef[] => {
  const boxes = Math.max(...specifications.map(s => s.boxes.length))

  const fields: GridColDef[] = []

  for (let i = 0; i < boxes; i++) {
    fields.push({
      field: `box_${i + 1}`,
      width: 130,
      headerName: `Коробка ${i + 1}`,
      editable: false,
      valueGetter: params => {
        const specification = specifications.find(s => s.product.id === params.row.id)

        if (!specification) return ''

        const box = specification.boxes[i]

        if (!box) return ''

        return `${box.box} / ${box.quantity} шт ${box.finished ? '(У)' : ''}`
      }
    })
  }

  return fields
}

export const getColumns = (
  onUpdate: (specification: AcceptanceProductSpecification) => Promise<void>,
  onQuantityMismatch: (value: string) => void,
  specifications: AcceptanceProductSpecification[]
): GridColDef[] => [
  ...fields,
  ...generateBoxesField(specifications),
  {
    field: 'save',
    width: 140,
    headerName: 'Сохранить',
    renderCell: params => (
      <IndigoButton
        type='button'
        customWidth='w-48'
        handler={async () => {
          const { id } = params

          const specification = specifications?.find(
            specification => specification.product.id === id
          )

          if (!specification) return onQuantityMismatch('Не найден товар')

          if (!specification.actual_quantity)
            return onQuantityMismatch('Не указано фактическое количество')

          await onUpdate(specification)
        }}
        text='Сохранить'
      />
    )
  }
]
