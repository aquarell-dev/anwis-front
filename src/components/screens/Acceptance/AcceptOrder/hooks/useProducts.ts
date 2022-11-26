import { useEffect, useState } from 'react'

import { GridSelectionModel } from '@mui/x-data-grid'

import { useGetAcceptanceByIdQuery } from '../../../../../store/api/acceptance.api'
import { AcceptanceProductSpecification } from '../../../../../types/acceptance.types'
import { AcceptanceProductRow } from '../../types'

const useProducts = (id: string | undefined) => {
  const {
    data: acceptance,
    isLoading,
    isFetching
  } = useGetAcceptanceByIdQuery(parseInt(id ? id : '0'))

  const [specifications, setSpecifications] = useState<AcceptanceProductSpecification[]>([])
  const [rows, setRows] = useState<AcceptanceProductRow[]>([])
  const [selection, setSelection] = useState<GridSelectionModel>([])

  useEffect(() => {
    if (acceptance) setSpecifications(acceptance.specifications)
  }, [acceptance])

  useEffect(() => {
    if (specifications)
      setRows(
        specifications.map(specification => ({
          id: specification.product.id,
          title: specification.product.title,
          article: specification.product.article,
          linked_china_product_article: specification.product.linked_china_product_article,
          brand: specification.product.brand,
          size: specification.product.size,
          quantity: specification.quantity,
          color: specification.product.color,
          photo: specification.product.photo,
          cost: specification.cost,
          actual_quantity: specification?.actual_quantity,
          difference: specification.cost === specification?.actual_quantity
        }))
      )
  }, [specifications])

  return {
    selection,
    setSelection,
    isLoading,
    isFetching,
    acceptance,
    rows,
    specifications,
    setSpecifications
  }
}

export default useProducts
