import { AcceptanceProduct } from '../../../../../../types/acceptance.types'
import { SetState } from '../../../../../../utils/types'
import ImagePreview from '../../../../../ui/ImagePreview'
import { RussianProductColumn } from '../../../types'

export const columns: RussianProductColumn[] = [
  { field: 'title', width: 180, headerName: 'Название' },
  {
    field: 'photo',
    width: 100,
    headerName: 'Картинка',
    renderCell: params => (
      <ImagePreview
        src={params.value}
        alt={''}
      />
    )
  },
  { field: 'linked_china_product_article', width: 205, headerName: 'Артикул Поставщика' },
  { field: 'barcode', width: 140, headerName: 'Штрих-код' },
  { field: 'color', width: 120, headerName: 'Цвет' },
  { field: 'size', width: 100, headerName: 'Размер' },
  { field: 'brand', width: 80, headerName: 'Бренд' },
  { field: 'article', width: 130, headerName: 'Артикул ВБ' },
  { field: 'last_cost', width: 100, headerName: 'Себестоимость, ₽' },
  { field: 'total_left', width: 80, headerName: 'Остаток' },
  { field: 'id', width: 40, headerName: 'ID', hideable: true }
]

export const getColumns = (
  products: AcceptanceProduct[] | undefined,
  setSelectedProduct: SetState<AcceptanceProduct | null>,
  setDeleteOpen: SetState<boolean>,
  setUpdateOpen: SetState<boolean>
): RussianProductColumn[] => [
  ...columns,
  {
    field: 'update',
    width: 80,
    headerName: 'Обновить',
    renderCell: params => (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='w-6 h-6 hover:text-gray-600 cursor-pointer transition duration-300 ease-in-out'
        onClick={() => {
          const product = products?.find(product => product.id === Number(params.row.id))
          if (!product) return
          setSelectedProduct(product)
          setUpdateOpen(true)
        }}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
        />
      </svg>
    )
  },
  {
    field: 'delete',
    width: 70,
    headerName: 'Удалить',
    renderCell: params => (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='w-6 h-6 hover:text-gray-600 cursor-pointer transition duration-300 ease-in-out'
        onClick={() => {
          const product = products?.find(product => product.id === Number(params.row.id))
          if (!product) return
          setSelectedProduct(product)
          setDeleteOpen(true)
        }}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M6 18L18 6M6 6l12 12'
        />
      </svg>
    )
  }
]
