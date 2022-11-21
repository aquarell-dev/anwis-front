import useNotifications from '../../../../../hooks/useNotifications'
import { useTypedSelector } from '../../../../../hooks/useTypedSelector'

import { useGenerateLabelMutation } from '../../../../../store/api/label.api'
import { CreateLabel } from '../../../../../types/acceptance.types'
import { ValidatedLabel } from '../../types'

const useGenerateLabel = () => {
  const [generate, { data, isLoading }] = useGenerateLabelMutation()
  const { notifyError, notifySuccess } = useNotifications()

  const { currentSelectedIndividual } = useTypedSelector(state => state.individual)

  const generateLabel = (validatedLabel: ValidatedLabel) => {
    const label: CreateLabel = {
      ...validatedLabel,
      individual: currentSelectedIndividual.individual_entrepreneur,
      composition: 'Xлопок',
      address: 'Москва, ул. Пушкина, д. Колотушкина, 47'
    }

    generate(label)
      .unwrap()
      .then(() => notifySuccess('Этикета сгенерирована'))
      .catch(() => notifyError('Этикета не сгенерирвоана'))
  }

  return { generateLabel, data, isLoading }
}

export default useGenerateLabel
