import useNotifications from '../../../../hooks/useNotifications'

import { GridSelectionModel } from '@mui/x-data-grid'

import { useUpdateDetailedProductsAcceptanceMutation } from '../../../../store/api/acceptance.api'
import {
  useDeleteMultipleSpecificationsMutation,
  useUpdateMultipleSpecificationsMutation,
  useUpdatePartialSpecificationsMutation
} from '../../../../store/api/acceptance.specification.api'
import {
  Acceptance,
  AcceptanceProductSpecification,
  UpdateDetailedProductsAcceptance
} from '../../../../types/acceptance.types'

type UseUpdateAcceptanceProducts = {
  acceptance: Acceptance | undefined
  specifications: AcceptanceProductSpecification[]
  selection: GridSelectionModel
}

const useUpdateAcceptanceProducts = (data: UseUpdateAcceptanceProducts) => {
  const { acceptance, specifications, selection } = data

  const [updateSpecifications, { isLoading: speicficationsLoading }] =
    useUpdateDetailedProductsAcceptanceMutation()
  const [updateSpecification, { isLoading: speicficationLoading }] =
    useUpdatePartialSpecificationsMutation()
  const [updateMultipleSpecifications, { isLoading: speicficationMultipleLoading }] =
    useUpdateMultipleSpecificationsMutation()
  const [delete_, { isLoading: deleteLoading }] = useDeleteMultipleSpecificationsMutation()

  const { notifyError, notifySuccess } = useNotifications()

  const transformAcceptance = (
    acceptance: Acceptance | undefined
  ): UpdateDetailedProductsAcceptance => {
    if (!acceptance) return {} as UpdateDetailedProductsAcceptance

    const { id } = acceptance

    let updatableSpecifications = specifications
    let rest: AcceptanceProductSpecification[] = []

    if (selection.length > 0) {
      updatableSpecifications = specifications.filter(s => selection.includes(s.product.id))
      rest = specifications.filter(s => !selection.includes(s.product.id))
    }

    return {
      id,
      specifications: [
        ...updatableSpecifications.map(s => ({ ...s, boxes: undefined, product: s.product.id })),
        ...rest.map(s => ({ ...s, boxes: undefined, product: s.product.id }))
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

  const updateAcceptanceProduct = async (productId: number) => {
    try {
      const specification = specifications.find(
        specification => specification.product.id === productId
      )

      if (!specification) return notifyError('Товар не найден')

      await updateSpecification({
        id: specification.id,
        product: specification.product.id,
        actual_quantity: specification.actual_quantity,
        boxes: specification.boxes
      }).unwrap()

      notifySuccess('Приемка была обновлена')
    } catch (e) {
      notifyError('Приемка не была обновлена')
    }
  }

  const updateAllSpecifications = async (specifications: AcceptanceProductSpecification[]) => {
    try {
      await updateMultipleSpecifications({
        specifications: specifications.map(s => ({
          id: s.id,
          actual_quantity: s.actual_quantity,
          boxes: s.boxes
        }))
      })
      notifySuccess('Приемка была обновлена')
    } catch {
      notifyError('Приемка не была обновлена')
    }
  }

  const deleteSpecifications = async (ids: number[]) => {
    try {
      await delete_({
        specifications: ids
      })
      notifySuccess('Приемка была обновлена')
    } catch {
      notifyError('Приемка не была обновлена')
    }
  }

  return {
    updateAcceptanceProducts,
    updateAcceptanceProduct,
    updateAllSpecifications,
    deleteSpecifications,
    updateFetching:
      speicficationsLoading || speicficationLoading || speicficationMultipleLoading || deleteLoading
  }
}

export default useUpdateAcceptanceProducts
