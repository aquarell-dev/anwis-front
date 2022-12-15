import useNotifications from '../../../../../hooks/useNotifications'
import { useTypedSelector } from '../../../../../hooks/useTypedSelector'

import { useGenerateLabelMutation } from '../../../../../store/api/label.api'
import { CreateLabel } from '../../../../../types/acceptance.types'
import { ValidatedLabel } from '../../types'

const useGenerateLabel = () => {
  const [generate, { data, isLoading }] = useGenerateLabelMutation()
  const { notifyError, notifySuccess } = useNotifications()

  const { currentSelectedIndividual } = useTypedSelector(state => state.individual)

  const generateLabel = async (validatedLabels: ValidatedLabel[]) => {
    const labels: CreateLabel[] = validatedLabels.map(v => ({
      ...v,
      individual: currentSelectedIndividual.individual_entrepreneur,
      composition: 'Xлопок',
      address: 'Москва, ул. Пушкина, д. Колотушкина, 47'
    }))

    try {
      const result = generate({ products: labels }).unwrap()
      return result
    } catch (e) {
      notifyError('Этикета не сгенерирвоана')
    }
  }

  return { generateLabel, data, isLoading }
}

export default useGenerateLabel
