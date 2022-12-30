import { FC, useRef } from 'react'

import useGenerateLabel from '../../hooks/useGenerateLabel'

import { DataGrid } from '@mui/x-data-grid'

import { SetState } from '../../../../../../utils/types'
import { ValidatedLabel } from '../../../types'
import { getColumns } from './columns'

const LabelsGrid: FC<{ products: ValidatedLabel[]; setProducts: SetState<ValidatedLabel[]> }> = ({
  products,
  setProducts
}) => {
  const { generateLabel, isLoading, data } = useGenerateLabel()

  const ref = useRef<HTMLAnchorElement | null>(null)

  // const columns = getColumns(
  //   (label: ValidatedLabel) => generateLabel(label),
  //   () => {
  //     ref?.current?.click()
  //   },
  //   products
  // )

  return (
    <div className='h-[500px]'>
      {/*<a*/}
      {/*  href={data ? data.url : ''}*/}
      {/*  ref={ref}*/}
      {/*  download*/}
      {/*  target='_blank'*/}
      {/*  className='invisible h-1 w-1'*/}
      {/*  rel='noreferrer'*/}
      {/*>*/}
      {/*  Скачать*/}
      {/*</a>*/}
      <DataGrid
        className='w-[1000px]'
        columns={[]}
        rows={products}
        columnVisibilityModel={{
          id: false
        }}
        onCellEditCommit={params => {
          const { id, value } = params

          setProducts(prev =>
            prev.map(product =>
              product.id === id
                ? { ...product, quantity: isNaN(Number(value)) ? 0 : Number(value) }
                : product
            )
          )
        }}
        loading={isLoading}
      />
    </div>
  )
}

export default LabelsGrid
