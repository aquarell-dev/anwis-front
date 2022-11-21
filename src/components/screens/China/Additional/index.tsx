import { FC } from 'react'

import useNotifications from '../../../../hooks/useNotifications'
import useAdditional from './hooks/useAdditional'

import {
  useCreateChinaDistributorMutation,
  useDeleteChinaDistributorMutation,
  useUpdateChinaDistributorMutation
} from '../../../../store/api/distributor.api'
import {
  useCreateOrderForProjectMutation,
  useDeleteOrderForProjectMutation,
  useUpdateOrderForProjectMutation
} from '../../../../store/api/project.api'
import { ContentContainer } from '../../../ui/Container'
import Loader from '../../../ui/Loader'
import CRUDContainer from './components/CRUDContainer'
import CRUDContent from './components/CRUDContent'

const Additional: FC = () => {
  const {
    error,
    isLoading,
    distributors,
    projects,
    changeValue,
    setChangeValue,
    createValue,
    setCreateValue
  } = useAdditional()

  const { notifySuccess, notifyError } = useNotifications()

  const [deleteDistributor, deleteDistributorResult] = useDeleteChinaDistributorMutation()
  const [updateDistributor, updateDistributorResult] = useUpdateChinaDistributorMutation()
  const [createDistributor, createDistributorResult] = useCreateChinaDistributorMutation()

  const [deleteProject, deleteProjectResult] = useDeleteOrderForProjectMutation()
  const [updateProject, updateProjectResult] = useUpdateOrderForProjectMutation()
  const [createProject, createProjectResult] = useCreateOrderForProjectMutation()

  if (isLoading) return <Loader isLoading={true} />

  if (error) return <p>error...</p>

  return (
    <ContentContainer>
      <div className='w-full flex flex-col items-center md:items-start md:flex-row space-y-2 md:space-y-0 md:space-x-16'>
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
        <CRUDContainer
          title={'Проект'}
          loading={createProjectResult.isLoading}
          data={
            projects &&
            projects.map(project => (
              <CRUDContent
                placeholder='Проект'
                loading={updateProjectResult.isLoading || deleteProjectResult.isLoading}
                value={changeValue}
                setValue={setChangeValue}
                onDelete={() =>
                  deleteProject({ id: project.id })
                    .unwrap()
                    .then(() => notifySuccess('Проект был удален'))
                    .catch(() => notifyError('Проект не был удален'))
                }
                onUpdate={() =>
                  updateProject({ ...project, order_for_project: changeValue })
                    .unwrap()
                    .then(() => notifySuccess('Проект был обновлен'))
                    .catch(() => notifyError('Посредник не был удален'))
                }
                id={project.id}
                key={project.id}
                content={project.order_for_project}
              />
            ))
          }
          onMutate={() =>
            createProject({ order_for_project: createValue })
              .unwrap()
              .then(() => notifySuccess('Успешно создан'))
              .catch(() => notifyError('Проект не был создан'))
          }
          setValue={setCreateValue}
          value={createValue}
        />
      </div>
    </ContentContainer>
  )
}

export default Additional
