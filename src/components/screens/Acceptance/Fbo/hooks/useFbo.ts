import useMutate from '../../../../../hooks/useMutate'
import useNotifications from '../../../../../hooks/useNotifications'
import useUpdateAcceptanceProducts from '../../hooks/useUpdateAcceptanceProducts'

import { useCreateFboShippingMutation, usePatchFboMutation } from '../../../../../store/api/fbo.api'
import { ListAcceptance } from '../../../../../types/acceptance.types'
import { PatchFboShipping } from '../../../../../types/fbo.types'

const useFbo = () => {
  const [create, { isLoading: createLoading }] = useCreateFboShippingMutation()
  const [patch, { isLoading: patchLoading }] = usePatchFboMutation()

  const { updatePartialSpecifications, updateFetching } = useUpdateAcceptanceProducts()

  const mutate = useMutate()

  const { notifyError } = useNotifications()

  const createFbo = async (acceptances: ListAcceptance[]) => {
    if (acceptances.length === 0) return notifyError('Укажите Приемки')

    await mutate(
      async () => {
        const specifications = acceptances
          .reduce((acc, curr) => ({
            ...curr,
            specifications: [...acc.specifications, ...curr.specifications]
          }))
          .specifications.filter(
            s => s.actual_quantity && s.boxes.every(box => box.quantity !== 0) && s.boxes.length > 0
          )

        await updatePartialSpecifications(
          specifications.map(s => ({ id: s.id, fbo_quantity: s.fbo_quantity }))
        )

        await create({ acceptances: acceptances.map(a => a.id) }).unwrap()
      },
      {
        successMessage: 'Отгрузка создана',
        errorMessage: 'Отгрузка не создана'
      }
    )
  }

  const patchFbo = async (fbo: PatchFboShipping) => {
    await mutate(async () => await patch(fbo).unwrap(), {
      successMessage: 'Отгрузка обновлена',
      errorMessage: 'Отгрузка не обновлена'
    })
  }

  return { createFbo, patchFbo, isLoading: createLoading || updateFetching || patchLoading }
}

export default useFbo
