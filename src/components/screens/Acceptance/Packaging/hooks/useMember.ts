import React, { useEffect, useState } from 'react'

import useNotifications from '../../../../../hooks/useNotifications'

import {
  useCreateMemberMutation,
  useLazyGetMemberQuery,
  useUpdateMemberMutation
} from '../../../../../store/api/staff.api'
import {
  CreateStaffMember,
  StaffMember,
  UpdateStaffMember
} from '../../../../../types/acceptance.types'

export type GetMemberByUniqueId = (uniqueNumber: string) => Promise<StaffMember | null>

const useMember = (member?: StaffMember) => {
  const [open, setOpen] = useState(false)
  const [currentMember, setCurrentMember] = useState(member ?? ({} as StaffMember))

  const [getMember, { data: fetchedMember, isLoading, isFetching: getMemberFetching }] =
    useLazyGetMemberQuery()
  const [create, { isLoading: createLoading }] = useCreateMemberMutation()
  const [update, { isLoading: updateLoading }] = useUpdateMemberMutation()

  const { notifyError, notifySuccess } = useNotifications()

  useEffect(() => {
    setCurrentMember(member ?? ({} as StaffMember))
  }, [member])

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

  return {
    open,
    setOpen,
    fetchedMember,
    getMemberByUniqueNumber,
    memberLoading: isLoading,
    memberFetching: createLoading || updateLoading,
    getMemberFetching,
    currentMember,
    setCurrentMember,
    updateMember,
    createMember
  }
}

export default useMember
