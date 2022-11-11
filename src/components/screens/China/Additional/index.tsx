import React, { FC } from 'react';

import useAdditional from './hooks/useAdditional';
import {
  useCreateChinaDistributorMutation,
  useDeleteChinaDistributorMutation,
  useUpdateChinaDistributorMutation
} from '../../../../store/api/distributor.api';
import useNotifications from '../../../../hooks/useNotifications';
import {
  useCreateOrderForProjectMutation,
  useDeleteOrderForProjectMutation,
  useUpdateOrderForProjectMutation
} from '../../../../store/api/project.api';

import Loader from '../../../ui/Loader';
import { ContentContainer } from '../../../ui/Container';
import CRUDContainer from './components/CRUDContainer';
import CRUDContent from './components/CRUDContent';


const Additional: FC = () => {
  const { error, isLoading, distributors, projects, value, setValue, createValue, setCreateValue } = useAdditional();

  const { notifySuccess, notifyError } = useNotifications();

  const [deleteDistributor, deleteDistributorResult] = useDeleteChinaDistributorMutation();
  const [updateDistributor, updateDistributorResult] = useUpdateChinaDistributorMutation();
  const [createDistributor, createDistributorResult] = useCreateChinaDistributorMutation();

  const [deleteProject, deleteProjectResult] = useDeleteOrderForProjectMutation();
  const [updateProject, updateProjectResult] = useUpdateOrderForProjectMutation();
  const [createProject, createProjectResult] = useCreateOrderForProjectMutation();

  if (isLoading) return <Loader isLoading={true}/>;

  if (error) return <p>error...</p>;

  return (
    <ContentContainer>
      <div className="w-full flex flex-col items-center md:items-start md:flex-row space-y-2 md:space-y-0 md:space-x-16">
        <CRUDContainer
          title={'Посредники'}
          data={
            distributors && distributors.map(distributor => <CRUDContent
              value={value}
              setValue={setValue}
              onDelete={() => deleteDistributor({ id: distributor.id })
                .unwrap()
                .then(() => notifySuccess('Успешное удаление'))
                .catch(() => notifyError('Посредник не был удален'))
              }
              onUpdate={() => updateDistributor({ ...distributor, china_distributor: value })
                .unwrap()
                .then(() => notifySuccess('Успешное обновление'))
                .catch(() => notifyError('Посредник обновлен'))}
              id={distributor.id}
              key={distributor.id}
              content={distributor.china_distributor}
            />)
          }
          onCreate={() => createDistributor({ china_distributor: createValue })
            .unwrap()
            .then(() => notifySuccess('Успешное удаление'))
            .catch(() => notifyError('Посредник не был удален'))}
          setValue={setCreateValue}
          value={createValue}
        />
        <CRUDContainer
          title={'Проекты'}
          data={
            projects && projects.map(project => <CRUDContent
              value={value}
              setValue={setValue}
              onDelete={() => deleteProject({ id: project.id })
                .unwrap()
                .then(() => notifySuccess('Проект был удален'))
                .catch(() => notifyError('Проект не был удален'))
              }
              onUpdate={() => updateProject({ ...project, order_for_project: value })
                .unwrap()
                .then(() => notifySuccess('Проект был обновлен'))
                .catch(() => notifyError('Посредник не был удален'))}
              id={project.id}
              key={project.id}
              content={project.order_for_project}
            />)
          }
          onCreate={() => createProject({ order_for_project: createValue })
            .unwrap()
            .then(() => notifySuccess('Успешно создан'))
            .catch(() => notifyError('Проект не был создан'))}
          setValue={setCreateValue}
          value={createValue}
        />
      </div>
    </ContentContainer>
  );
};

export default Additional;
