import useNotifications from '../../../../hooks/useNotifications'

import {
  useDeleteMultipleSpecificationsMutation,
  useUpdateMultipleSpecificationsMutation,
  useUpdatePartialSpecificationsMutation
} from '../../../../store/api/acceptance.specification.api'
import {
  AcceptanceProductSpecification,
  PartialUpdateAcceptance
} from '../../../../types/acceptance.types'

type ModifySpecification = (
  specification: AcceptanceProductSpecification
) => PartialUpdateAcceptance

export type UpdateSpecification = (
  specification: AcceptanceProductSpecification,
  modify?: ModifySpecification
) => Promise<void>

export type UpdateSpecifications = (
  specifications: AcceptanceProductSpecification[],
  modify?: ModifySpecification
) => Promise<void>

const useUpdateAcceptanceProducts = () => {
  const [updateSingleSpecification, { isLoading: specificationLoading }] =
    useUpdatePartialSpecificationsMutation()
  const [updateMultipleSpecifications, { isLoading: specificationMultipleLoading }] =
    useUpdateMultipleSpecificationsMutation()
  const [delete_, { isLoading: deleteLoading }] = useDeleteMultipleSpecificationsMutation()

  const { notifyError, notifySuccess } = useNotifications()

  const mutateAcceptance = async (update: () => Promise<void>) => {
    try {
      await update()
      notifySuccess('Приемка была обновлена')
    } catch (e) {
      notifyError('Приемка не была обновлена')
    }
  }

  const updateSpecification: UpdateSpecification = async (
    specification: AcceptanceProductSpecification,
    modify?: ModifySpecification
  ) => {
    await mutateAcceptance(async () => {
      await updateSingleSpecification(
        modify
          ? modify(specification)
          : {
              ...specification,
              product: specification.product.id
            }
      ).unwrap()
    })
  }

  const updateSpecifications: UpdateSpecifications = async (
    specifications: AcceptanceProductSpecification[],
    modify?: ModifySpecification
  ) => {
    await mutateAcceptance(async () => {
      await updateMultipleSpecifications({
        specifications: specifications.map(specification =>
          modify
            ? modify(specification)
            : {
                ...specification,
                actual_quantity: specification.boxes.reduce(
                  (acc, curr) => ({
                    ...curr,
                    quantity: acc.quantity + curr.quantity
                  }),
                  { quantity: 0 }
                ).quantity,
                product: specification.product.id
              }
        )
      }).unwrap()
    })
  }

  const deleteSpecifications = async (ids: number[]) => {
    await mutateAcceptance(async () => {
      await delete_({
        specifications: ids
      })
    })
  }

  return {
    updateSpecification: updateSpecification,
    updateSpecifications,
    deleteSpecifications,
    updateFetching: specificationLoading || specificationMultipleLoading || deleteLoading
  }
}

export default useUpdateAcceptanceProducts
