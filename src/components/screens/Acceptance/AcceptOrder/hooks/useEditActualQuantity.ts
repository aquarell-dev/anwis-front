import { GridCellEditCommitParams } from '@mui/x-data-grid'

import { AcceptanceProductSpecification } from '../../../../../types/acceptance.types'
import { SetState } from '../../../../../utils/types'

const useEditActualQuantity = (setSpecifications: SetState<AcceptanceProductSpecification[]>) => {
  const editSpecifications = (
    id: number,
    patchSpecification: (
      specification: AcceptanceProductSpecification
    ) => AcceptanceProductSpecification
  ) => {
    setSpecifications(prev =>
      prev.map(specification =>
        specification.product.id === id ? patchSpecification(specification) : specification
      )
    )
  }

  const editCellCommit = (params: GridCellEditCommitParams) => {
    const { field, id, value } = params

    if (field === 'actual_quantity') {
      editSpecifications(id as number, specification => ({
        ...specification,
        actual_quantity: Number(value) || undefined
      }))
    }

    if (field === 'cost') {
      editSpecifications(id as number, specification => ({
        ...specification,
        cost: Number(value) || specification.cost
      }))
    }

    if (field === 'quantity') {
      editSpecifications(id as number, specification => ({
        ...specification,
        quantity: Number(value) || specification.quantity,
        actual_quantity: !specification.actual_quantity ? Number(value) || undefined : undefined
      }))
    }
  }
  return { editCellCommit }
}

export default useEditActualQuantity
