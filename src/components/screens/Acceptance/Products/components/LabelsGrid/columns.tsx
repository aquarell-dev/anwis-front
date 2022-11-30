import { GridColDef } from '@mui/x-data-grid'

import ImagePreview from '../../../../../ui/ImagePreview'
import { ValidatedLabel } from '../../../types'

export const columns: GridColDef[] = [
  { field: 'title', width: 180, headerName: 'Название' },
  {
    field: 'photo',
    width: 100,
    headerName: 'Картинка',
    renderCell: params => (
      <ImagePreview
        src={params.row.photo}
        alt={''}
      />
    )
  },
  { field: 'barcode', width: 140, headerName: 'Штрих-код' },
  { field: 'color', width: 120, headerName: 'Цвет' },
  { field: 'size', width: 95, headerName: 'Размер' },
  { field: 'quantity', width: 80, headerName: 'Кол-во', editable: true },
  { field: 'id', width: 80, headerName: 'ID' }
]

export const getColumns = (
  onPrint: (label: ValidatedLabel) => void,
  onDownload: () => void,
  labels: ValidatedLabel[]
): GridColDef[] => [
  ...columns,
  {
    field: 'print',
    width: 40,
    headerName: 'П',
    renderCell: params => (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='w-6 h-6 cursor-pointer hover:text-gray-600 transition duration-300 ease-in-out'
        onClick={() => {
          const label = labels.find(l => l.id === Number(params.row.id))

          if (!label) return

          onPrint(label)
        }}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z'
        />
      </svg>
    )
  },
  {
    field: 'download',
    width: 40,
    headerName: 'С',
    renderCell: () => (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='w-6 h-6 cursor-pointer hover:text-gray-600 transition duration-300 ease-in-out'
        onClick={onDownload}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3'
        />
      </svg>
    )
  }
]
