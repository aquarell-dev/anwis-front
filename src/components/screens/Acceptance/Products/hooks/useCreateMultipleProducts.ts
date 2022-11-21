import useNotifications from '../../../../../hooks/useNotifications'

import {
  useCreateRussianProductWithoutRefetchingMutation,
  useUpdateColorsMutation,
  useUpdateLefoversMutation
} from '../../../../../store/api/acceptance.product.api'
import { CreateAcceptanceProduct } from '../../../../../types/acceptance.types'

const useCreateMultipleProducts = () => {
  const { notifyError, notifySuccess } = useNotifications()

  const [createProduct, { isLoading: createLoading }] =
    useCreateRussianProductWithoutRefetchingMutation()
  const [updateColors, { isLoading: colorsLoading }] = useUpdateColorsMutation()
  const [updateLeftovers, { isLoading: leftoversLoading }] = useUpdateLefoversMutation()

  const createMultipleProducts = async (products: CreateAcceptanceProduct[]) => {
    try {
      let promises = products.map(product => createProduct(product).unwrap())
      await Promise.all(promises)
      notifySuccess(`Товары(${products.length}) были успешно созданы`)
    } catch (e) {
      notifyError('Товары не были созданы')
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
