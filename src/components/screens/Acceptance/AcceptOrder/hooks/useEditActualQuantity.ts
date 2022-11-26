import { GridCellEditCommitParams } from '@mui/x-data-grid'

import { AcceptanceProductSpecification } from '../../../../../types/acceptance.types'
import { SetState } from '../../../../../utils/types'

const useEditActualQuantity = (
  setSpecifications: SetState<AcceptanceProductSpecification[]>,
  setOpen: SetState<boolean>,
  setInvalidValue: SetState<string>
) => {
  const setValueAndOpenAlert = (v: string) => {
    setInvalidValue(`Некорректное значение: ${v}. Введите правильное значение.`)
    setOpen(true)
  }

  const editCellCommit = (params: GridCellEditCommitParams) => {
    const { field, id, value } = params

    if (field === 'actual_quantity') {
      if (isNaN(Number(value))) {
        setSpecifications(prev =>
          prev.map(specification =>
            specification.product.id === id
              ? { ...specification, actual_quantity: undefined }
              : specification
          )
        )
        return setValueAndOpenAlert(value.toString())
      }

      setSpecifications(prev =>
        prev.map(specification =>
          specification.product.id === id
            ? { ...specification, actual_quantity: Number(value) }
            : specification
        )
      )
    }
  }
  return { editCellCommit }
}

export default useEditActualQuantity
