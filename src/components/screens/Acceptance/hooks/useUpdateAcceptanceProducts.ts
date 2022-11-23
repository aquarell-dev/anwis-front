import useNotifications from '../../../../hooks/useNotifications'

import { GridSelectionModel } from '@mui/x-data-grid'

import {
  useUpdateDetailedProductsAcceptanceMutation,
  useUpdatePartialSpecificationsMutation
} from '../../../../store/api/acceptance.api'
import {
  Acceptance,
  AcceptanceProductSpecification,
  UpdateDetailedProductsAcceptance
} from '../../../../types/acceptance.types'

type UseUpdateAcceptanceProducts = {
  acceptance: Acceptance | undefined
  products: AcceptanceProductSpecification[]
  selection: GridSelectionModel
}

const useUpdateAcceptanceProducts = (data: UseUpdateAcceptanceProducts) => {
  const { acceptance, products, selection } = data

  const [updateSpecifications, { isLoading: speicficationsLoading }] =
    useUpdateDetailedProductsAcceptanceMutation()
  const [updateSpecification, { isLoading: speicficationLoading }] =
    useUpdatePartialSpecificationsMutation()

  const { notifyError, notifySuccess } = useNotifications()

  const transformAcceptance = (
    acceptance: Acceptance | undefined
  ): UpdateDetailedProductsAcceptance => {
    if (!acceptance) return {} as UpdateDetailedProductsAcceptance

    const { id } = acceptance

    let updatableProducts = products
    let rest: AcceptanceProductSpecification[] = []

    if (selection.length > 0) {
      updatableProducts = products.filter(p => selection.includes(p.product.id))
      rest = products.filter(p => !selection.includes(p.product.id))
    }

    return {
      id,
      products: [
        ...updatableProducts.map(s => ({ ...s, product: s.product.id })),
        ...rest.map(s => ({ ...s, product: s.product.id }))
      ]
    }
  }

  const updateAcceptanceProducts = async () => {
    try {
      await updateSpecifications(transformAcceptance(acceptance)).unwrap()
      notifySuccess('Приемка была обновлена')
    } catch (e) {
      notifyError('Приемка не была обновлена')
    }
  }

  const updateAcceptanceProduct = async (id: number) => {
    try {
      const specification = products.find(specification => specification.product.id === id)

      if (!specification) return notifyError('Товар не найден')

      await updateSpecification({
        id: specification.id,
        product: specification.product.id,
        actual_quantity: specification.actual_quantity
      }).unwrap()

      notifySuccess('Приемка была обновлена')
    } catch (e) {
      notifyError('Приемка не была обновлена')
    }
  }

  return {
    updateAcceptanceProducts,
    updateAcceptanceProduct,
    updateFetching: speicficationsLoading || speicficationLoading
  }
}

export default useUpdateAcceptanceProducts
