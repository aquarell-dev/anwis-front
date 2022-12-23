import { useState } from 'react'

import useMutate from '../../../../../hooks/useMutate'
import useNotifications from '../../../../../hooks/useNotifications'

import {
  useAddBoxMutation,
  useDeleteBoxMutation,
  usePartialUpdateBoxMutation
} from '../../../../../store/api/acceptance.box.api'
import {
  AcceptanceProductSpecification,
  Box,
  PartialUpdateBox
} from '../../../../../types/acceptance.types'
import { SetState } from '../../../../../utils/types'

const useBoxes = () => {
  const [add, { isLoading: addBoxLoading, data: lastAddedBox }] = useAddBoxMutation()
  const [delete_, { isLoading: deleteBoxLoading }] = useDeleteBoxMutation()
  const [update, { isLoading: updateLoading }] = usePartialUpdateBoxMutation()

  const [alertText, setAlertText] = useState('')
  const [alertOpen, setAlertOpen] = useState(false)

  const { notifyError } = useNotifications()

  const alertError = (v: string, productErrorText?: string) => {
    setAlertText(`${productErrorText}${v}`)
    setAlertOpen(true)
    return false
  }

  const mutate = useMutate()

  const addBox = async (id: number) => {
    try {
      return await add({ id }).unwrap()
    } catch {
      notifyError('Коробка не была добавелена')
    }
  }

  const deleteBox = async (id: number) => {
    try {
      await delete_({ id }).unwrap()
    } catch {
      notifyError('Коробка не была удалена')
    }
  }

  const patchBox = async (box: PartialUpdateBox) => {
    await mutate(async () => await update(box), {
      successMessage: 'Коробка Обновлена',
      errorMessage: 'Коробка не обновлена'
    })
  }

  const formatBoxes = (
    specification: AcceptanceProductSpecification,
    setSpecifications: SetState<AcceptanceProductSpecification[]>
  ) => {
    const justThreeDigits = new RegExp('\\d{3}')

    specification.boxes.forEach(box => {
      const needFormatting = (box.box.match(justThreeDigits) || []).length > 0

      if (!needFormatting) return

      const validatedBox = box.box.split('').join('-')

      setSpecifications(prev =>
        prev.map(s =>
          s.id === specification.id
            ? {
                ...s,
                boxes: s.boxes.map(b => (b.id === box.id ? { ...b, box: validatedBox } : b))
              }
            : s
        )
      )
    })
  }

  const getProductForError = (specification: AcceptanceProductSpecification) =>
    `Товар: ${specification.product.title}(${
      specification.product.linked_china_product_article ?? specification.product.article
    }, ${specification.product.size}). `

  const validateBeforeSave = (specification: AcceptanceProductSpecification) => {
    const complexBoxNumber = new RegExp('^\\d{1,3}-\\d{1,3}-\\d{1,3}$')

    let total = 0

    let pass = true

    const errorProduct = getProductForError(specification)

    specification.boxes.forEach(box => {
      total += box.quantity

      if (!box.quantity || box.quantity === 0) {
        pass = alertError('Не указано кол-во у коробки', errorProduct)
        return
      }

      if ((box.box.match(complexBoxNumber) || []).length === 0) {
        pass = alertError(`Невалидное значение: ${box.box}. Пример: 1-1-1.`, errorProduct)
        return
      }
    })

    if (!specification.actual_quantity)
      return alertError('Не указано фактическое кол-во', errorProduct)

    if (total !== specification.actual_quantity)
      return alertError(
        `Фактическое количество не равно количеству в коробках. Указано: ${total}. Факт. Кол-во: ${specification.actual_quantity}`,
        errorProduct
      )

    return pass
  }

  return {
    lastAddedBox,
    addBox,
    deleteBox,
    patchBox,
    loading: addBoxLoading || deleteBoxLoading,
    setAlertOpen,
    alertOpen,
    alertText,
    validateBeforeSave,
    formatBoxes
  }
}

export default useBoxes
