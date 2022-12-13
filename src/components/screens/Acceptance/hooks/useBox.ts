import useMutate from '../../../../hooks/useMutate'

import { usePartialUpdateBoxMutation } from '../../../../store/api/acceptance.box.api'
import { PartialUpdateBox } from '../../../../types/acceptance.types'

const useBox = () => {
  const [update, { isLoading: updateLoading }] = usePartialUpdateBoxMutation()

  const mutate = useMutate()

  const updateBox = async (box: PartialUpdateBox) => {
    await mutate(async () => await update(box), {
      errorMessage: 'Коробка не была обновлена',
      successMessage: 'Коробка была обновлена'
    })
  }

  const finishBox = async (box: PartialUpdateBox) => {
    await mutate(async () => await update(box), {
      successMessage: 'Коробка закончена',
      errorMessage: 'Ошибка в упаковке'
    })
  }

  return { updateBox, finishBox, isLoading: updateLoading }
}

export default useBox
