import useNotifications from '../../../../../hooks/useNotifications'

import { useCreateMultipleSpecificationsMutation } from '../../../../../store/api/acceptance.specification.api'
import { AcceptanceProduct } from '../../../../../types/acceptance.types'

const useManageSpecifications = (acceptanceId: number) => {
  const [create, { isLoading }] = useCreateMultipleSpecificationsMutation()

  const { notifyError, notifySuccess } = useNotifications()

  const createSpecifications = async (products: number[]) => {
    try {
      await create({
        id: acceptanceId,
        products: products.map(product => ({ product }))
      }).unwrap()
      notifySuccess('Приемка обновлена')
    } catch (e) {
      notifyError('Приемка не обновлена')
    }
  }

  const createSpecificationsWithQuantity = async (
    products: { product: number; quantity: number }[]
  ) => {
    try {
      await create({
        id: acceptanceId,
        products
      }).unwrap()
      notifySuccess('Приемка обновлена')
    } catch (e) {
      notifyError('Приемка не обновлена')
    }
  }

  return { createSpecifications, createSpecificationsWithQuantity, isLoading }
}

export default useManageSpecifications
