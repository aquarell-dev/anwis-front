import { FC, useState } from 'react'
import Select from 'react-select'

import { AcceptanceInfo } from '../../hooks/useAcceptance'

import moment from 'moment'

import { IIndividual, IProject } from '../../../../../../features/order/order.types'
import { AcceptanceStatus, AcceptanceStatuses } from '../../../../../../types/acceptance.types'
import { SetState } from '../../../../../../utils/types'
import Status from '../../../../../common/Status'
import { CustomDateTimePicker } from '../../../../../ui/DateTime'

const AcceptanceDropdowns: FC<{
  statuses: AcceptanceStatus[] | undefined
  projects: IProject[] | undefined
  individuals: IIndividual[] | undefined
  acceptanceInfo: AcceptanceInfo
  setAcceptanceInfo: SetState<AcceptanceInfo>
}> = ({ statuses, projects, individuals, acceptanceInfo, setAcceptanceInfo }) => {
  const statusOptions = statuses?.map(status => ({
    label: status.status,
    value: status.id,
    color: status.color
  }))

  const projectOptions = projects?.map(project => ({
    label: project.project,
    value: project.id
  }))

  const individualOptions = individuals?.map(individual => ({
    label: individual.individual_entrepreneur,
    value: individual.id
  }))

  return (
    <div className='w-full flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 items-center my-2 pt-4 pb-2 border-t border-slate-800'>
      <div className='z-[17]'>
        <Status<AcceptanceStatuses>
          statusOptions={statusOptions}
          onChange={newValue =>
            newValue &&
            setAcceptanceInfo({
              ...acceptanceInfo,
              currentStatus: { id: newValue.value, color: newValue.color, status: newValue.label }
            })
          }
          value={statusOptions?.find(option => option.value === acceptanceInfo.currentStatus?.id)}
        />
      </div>
      <div className='z-[16]'>
        <Select
          options={individualOptions}
          value={individualOptions?.find(
            option => option.value === acceptanceInfo.currentIndividual?.id
          )}
          onChange={newValue =>
            newValue &&
            setAcceptanceInfo({
              ...acceptanceInfo,
              currentIndividual: { id: newValue.value, individual_entrepreneur: newValue.label }
            })
          }
          placeholder={'Индивидуальный Предприниматель'}
          className='w-64'
        />
      </div>
      <div className='z-[15]'>
        <Select
          options={projectOptions}
          value={projectOptions?.find(option => option.value === acceptanceInfo.currentProject?.id)}
          onChange={newValue =>
            newValue &&
            setAcceptanceInfo({
              ...acceptanceInfo,
              currentProject: { id: newValue.value, project: newValue.label }
            })
          }
          placeholder={'Проект'}
          className='w-64'
        />
      </div>
      <CustomDateTimePicker
        label='Дата и Время Создания'
        value={acceptanceInfo.createdAt ?? moment()}
        customOnChange={value => {
          console.log(value)
          value && setAcceptanceInfo({ ...acceptanceInfo, createdAt: value }) // todo fix time changing
        }}
      />{' '}
    </div>
  )
}
export default AcceptanceDropdowns
