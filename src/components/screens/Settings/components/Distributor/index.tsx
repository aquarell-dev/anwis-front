import React, { FC } from 'react'

import useNotifications from '../../../../../hooks/useNotifications'
import { UseAdditional } from '../../hooks/useAdditional'

import {
  useCreateChinaDistributorMutation,
  useDeleteChinaDistributorMutation,
  useUpdateChinaDistributorMutation
} from '../../../../../store/api/distributor.api'
import CRUDContainer from '../CRUDContainer'
import CRUDContent from '../CRUDContent'

const Distributor: FC<{ additional: UseAdditional }> = ({ additional }) => {
  const { changeValue, createValue, setChangeValue, distributors, setCreateValue } = additional

  const { notifySuccess, notifyError } = useNotifications()

  const [deleteDistributor, deleteDistributorResult] = useDeleteChinaDistributorMutation()
  const [updateDistributor, updateDistributorResult] = useUpdateChinaDistributorMutation()
  const [createDistributor, createDistributorResult] = useCreateChinaDistributorMutation()

  return (
    <CRUDContainer
      loading={createDistributorResult.isLoading}
      title={'Посредник'}
      data={
        distributors &&
        distributors.map(distributor => (
          <CRUDContent
            value={changeValue}
            placeholder='Посредник'
            loading={deleteDistributorResult.isLoading || updateDistributorResult.isLoading}
            setValue={setChangeValue}
            onDelete={() =>
              deleteDistributor({ id: distributor.id })
                .unwrap()
                .then(() => notifySuccess('Успешное удаление'))
                .catch(() => notifyError('Посредник не был удален'))
            }
            onUpdate={() =>
              updateDistributor({ ...distributor, china_distributor: changeValue })
                .unwrap()
                .then(() => notifySuccess('Успешное обновление'))
                .catch(() => notifyError('Посредник обновлен'))
            }
            id={distributor.id}
            key={distributor.id}
            content={distributor.china_distributor}
          />
        ))
      }
      onMutate={() =>
        createDistributor({ china_distributor: createValue })
          .unwrap()
          .then(() => notifySuccess('Успешное удаление'))
          .catch(() => notifyError('Посредник не был удален'))
      }
      setValue={setCreateValue}
      value={createValue}
    />
  )
}

export default Distributor
