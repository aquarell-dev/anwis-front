import useNotifications from '../../../../../hooks/useNotifications'

import { useUpdateRussianProductMutation } from '../../../../../store/api/acceptance.product.api'
import { UpdateAcceptanceProduct } from '../../../../../types/acceptance.types'

const usePartialUpdateRussianProduct = () => {
  const [update, { isLoading, data }] = useUpdateRussianProductMutation()

  const { notifyError, notifySuccess } = useNotifications()

  const updateProduct = (russianProduct: UpdateAcceptanceProduct, onFulfil?: () => void) => {
    update(russianProduct)
      .unwrap()
      .then(() => notifySuccess('Товар успешно обновлен'))
      .catch(() => notifyError('Товар не обновлен'))
      .finally(onFulfil)
  }

  return { updateProduct, isLoading, product: data }
}

export default usePartialUpdateRussianProduct
