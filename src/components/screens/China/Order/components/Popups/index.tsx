import { FC } from 'react'

import useNotifications from '../../../../../../hooks/useNotifications'
import useCreateDataMutations from '../../hooks/useCreateDataMutations'

import { SetState } from '../../../../../../utils/types'
import MutatePopup from '../../../../../ui/MutatePopup'

interface IPopupsProps {
  chinaDistributorOpen: boolean
  setChinaDistributorOpen: SetState<boolean>
  chinaDistributorValue: string
  setChinaDistributorValue: SetState<string>
  orderForProjectOpen: boolean
  setOrderForProjectOpen: SetState<boolean>
  orderForProjectValue: string
  setOrderForProjectValue: SetState<string>
}

const Popups: FC<IPopupsProps> = ({
  chinaDistributorOpen,
  setChinaDistributorOpen,
  chinaDistributorValue,
  setChinaDistributorValue,
  orderForProjectOpen,
  orderForProjectValue,
  setOrderForProjectOpen,
  setOrderForProjectValue
}) => {
  const {
    createChinaDistributor,
    createOrderForProject,
    chinaDistributorLoading,
    orderForProjectLoading
  } = useCreateDataMutations()

  const { notifySuccess, notifyError } = useNotifications()

  return (
    <>
      <MutatePopup
        value={chinaDistributorValue}
        setValue={setChinaDistributorValue}
        open={chinaDistributorOpen}
        setOpen={setChinaDistributorOpen}
        loading={chinaDistributorLoading}
        placeholder='Посредник'
        onMutate={() => {
          createChinaDistributor({ china_distributor: chinaDistributorValue })
            .unwrap()
            .then(() => notifySuccess(`Успешно создан ${chinaDistributorValue}`))
            .catch(() => notifyError(`Ошибка при создании ${chinaDistributorValue}`))
            .finally(() => setChinaDistributorOpen(false))
        }}
        content={'Вы уверены, что хотите создать "Китайский посредник"'}
      />
      <MutatePopup
        value={orderForProjectValue}
        setValue={setOrderForProjectValue}
        open={orderForProjectOpen}
        loading={orderForProjectLoading}
        placeholder='Заказ'
        onMutate={() => {
          createOrderForProject({ project: orderForProjectValue })
            .unwrap()
            .then(() => notifySuccess(`Успешно создан ${orderForProjectValue}`))
            .catch(() => notifyError(`Ошибка при создании ${orderForProjectValue}`))
            .finally(() => setOrderForProjectOpen(false))
        }}
        content={'Вы уверены, что хотите создать "Заказ под проект"'}
        setOpen={setOrderForProjectOpen}
      />
    </>
  )
}

export default Popups
