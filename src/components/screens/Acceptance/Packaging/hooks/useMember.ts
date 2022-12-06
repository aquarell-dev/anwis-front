import React, { useEffect, useState } from 'react'

import useMutate from '../../../../../hooks/useMutate'
import useNotifications from '../../../../../hooks/useNotifications'

import {
  useCreateMemberMutation,
  useLazyGetMemberQuery,
  usePartialUpdateMemberMutation,
  useUpdateMemberMutation
} from '../../../../../store/api/staff.api'
import {
  CreateStaffMember,
  PartialUpdateStaffMember,
  StaffMember,
  UpdateStaffMember
} from '../../../../../types/acceptance.types'

export type GetMemberByUniqueId = (uniqueNumber: string) => Promise<StaffMember | null>

const useMember = () => {
  const [open, setOpen] = useState(false)

  const [getMember, { data: fetchedMember, isLoading, isFetching: getMemberFetching }] =
    useLazyGetMemberQuery()
  const [create, { isLoading: createLoading }] = useCreateMemberMutation()
  const [update, { isLoading: updateLoading }] = useUpdateMemberMutation()
  const [partialUpdate, { isLoading: partialUpdateLoading }] = usePartialUpdateMemberMutation()

  const { notifyError, notifySuccess } = useNotifications()

  const mutate = useMutate()

  const getMemberByUniqueNumber: GetMemberByUniqueId = async uniqueNumber => {
    try {
      await getMember(uniqueNumber).unwrap()
      return fetchedMember ?? null
    } catch (e) {
      notifyError('Сотрудник не найден')
      return null
    }
  }

  const createMember = async (member: CreateStaffMember) => {
    try {
      await create(member)
      notifySuccess('Сотрудник создан')
    } catch (e) {
      notifyError('Сотрудник не создан')
    }
  }

  const updateMember = async (member: UpdateStaffMember) => {
    try {
      await update(member)
      notifySuccess('Сотрудник обновлен')
    } catch (e) {
      notifyError('Сотрудник не обновлен')
    }
  }

  const boundBoxAndMember = async (
    memberId: number,
    boxId: number,
    onSuccess?: () => Promise<void>
  ) => {
    try {
      await partialUpdate({ id: memberId, box: boxId, session: { quantity: 20 } })
      if (onSuccess) await onSuccess()
      notifySuccess('Коробка привязана')
    } catch (e) {
      notifyError('Коробка не привязана')
    }
  }

  const unBoundBoxAndMember = async (
    memberId: number,
    boxId: number,
    onSuccess?: () => Promise<void>
  ) => {
    await mutate(
      async () => {
        await partialUpdate({ id: memberId, box: null })
      },
      {
        errorMessage: 'Коробка не отвязана',
        successMessage: 'Коробка отвязана',
        onSuccess
      }
    )
  }

  return {
    open,
    setOpen,
    fetchedMember,
    getMemberByUniqueNumber,
    memberLoading: isLoading,
    memberFetching: createLoading || updateLoading || partialUpdateLoading,
    getMemberFetching,
    updateMember,
    createMember,
    boundBoxAndMember,
    unBoundBoxAndMember
  }
}

export default useMember
