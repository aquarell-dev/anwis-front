import useNotifications from '../../../../../hooks/useNotifications'

import { useCreateMultipleSpecificationsMutation } from '../../../../../store/api/acceptance.specification.api'
import { AcceptanceProduct } from '../../../../../types/acceptance.types'

const useManageSpecifications = (acceptaneId: number) => {
  const [create, { isLoading }] = useCreateMultipleSpecificationsMutation()

  const { notifyError, notifySuccess } = useNotifications()

  const createSpecifications = async (products: AcceptanceProduct[]) => {
    try {
      await create({
        id: acceptaneId,
        products: products.map(p => p.id)
      }).unwrap()
      notifySuccess('Приемка обновлена')
    } catch (e) {
      notifyError('Приемка не обновлена')
    }
  }

  return { createSpecifications, isLoading }
}

export default useManageSpecifications
