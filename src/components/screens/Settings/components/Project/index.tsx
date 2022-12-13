import React, { FC } from 'react'

import useNotifications from '../../../../../hooks/useNotifications'
import { UseAdditional } from '../../hooks/useAdditional'

import {
  useCreateOrderForProjectMutation,
  useDeleteOrderForProjectMutation,
  useUpdateOrderForProjectMutation
} from '../../../../../store/api/project.api'
import CRUDContainer from '../CRUDContainer'
import CRUDContent from '../CRUDContent'

const Project: FC<{ additional: UseAdditional }> = ({ additional }) => {
  const { projects, setCreateValue, setChangeValue, createValue, changeValue } = additional

  const [deleteProject, deleteProjectResult] = useDeleteOrderForProjectMutation()
  const [updateProject, updateProjectResult] = useUpdateOrderForProjectMutation()
  const [createProject, createProjectResult] = useCreateOrderForProjectMutation()

  const { notifySuccess, notifyError } = useNotifications()

  return (
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
              updateProject({ ...project, project: changeValue })
                .unwrap()
                .then(() => notifySuccess('Проект был обновлен'))
                .catch(() => notifyError('Посредник не был удален'))
            }
            id={project.id}
            key={project.id}
            content={project.project}
          />
        ))
      }
      onMutate={() =>
        createProject({ project: createValue })
          .unwrap()
          .then(() => notifySuccess('Успешно создан'))
          .catch(() => notifyError('Проект не был создан'))
      }
      setValue={setCreateValue}
      value={createValue}
    />
  )
}

export default Project
