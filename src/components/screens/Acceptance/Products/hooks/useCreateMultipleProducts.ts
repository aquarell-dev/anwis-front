import useNotifications from '../../../../../hooks/useNotifications'

import {
  useCreateMultipleRussianProductsMutation,
  useUpdateColorsMutation,
  useUpdateLefoversMutation
} from '../../../../../store/api/acceptance.product.api'
import { CreateAcceptanceProduct } from '../../../../../types/acceptance.types'

const useCreateMultipleProducts = () => {
  const { notifyError, notifySuccess } = useNotifications()

  const [createProducts, { isLoading: createLoading }] = useCreateMultipleRussianProductsMutation()
  const [updateColors, { isLoading: colorsLoading }] = useUpdateColorsMutation()
  const [updateLeftovers, { isLoading: leftoversLoading }] = useUpdateLefoversMutation()

  const createMultipleProducts = async (products: CreateAcceptanceProduct[]) => {
    try {
      await createProducts({ products })
      notifySuccess(`Товары(${products.length}) были успешно созданы`)
    } catch (e) {
      notifyError('Товары не были созданы')
      return
    }

    try {
      await Promise.allSettled([
        updateColors(undefined).unwrap(),
        await updateLeftovers(undefined).unwrap()
      ])
      notifySuccess('Цвета и остаки обновлены')
    } catch (e) {
      notifyError('Цвета и остатки не обновлены')
    }
  }

  return { createMultipleProducts, isLoading: createLoading || colorsLoading || leftoversLoading }
}

export default useCreateMultipleProducts
