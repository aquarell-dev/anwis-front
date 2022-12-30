import { useState } from 'react'

import { useActions } from '../../../../hooks/useActions'
import useMutate from '../../../../hooks/useMutate'
import useNotifications from '../../../../hooks/useNotifications'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import useSession from '../Packaging/hooks/useSession'
import useBox from './useBox'

import moment from 'moment'

import { useUpdateWorkSessionMutation } from '../../../../store/api/session.api'
import {
  useCreateMemberMutation,
  useLazyGetMemberQuery,
  usePartialUpdateMemberMutation,
  useUpdateMemberMutation
} from '../../../../store/api/staff.api'
import {
  Box,
  CreateStaffMember,
  PartialUpdateStaffMember,
  StaffMember,
  UpdateStaffMember,
  WorkSession
} from '../../../../types/acceptance.types'

export type GetMemberByUniqueId = (uniqueNumber: string) => Promise<StaffMember | null>

const useMember = () => {
  const [open, setOpen] = useState(false)

  const [getMember, { data: fetchedMember, isLoading, isFetching: getMemberFetching }] =
    useLazyGetMemberQuery()
  const [create, { isLoading: createLoading }] = useCreateMemberMutation()
  const [update, { isLoading: updateLoading }] = useUpdateMemberMutation()
  const [partialUpdate, { isLoading: partialUpdateLoading }] = usePartialUpdateMemberMutation({
    fixedCacheKey: 'shared-update-post'
  })
  const [updateWorkSession, { isLoading: workSessionLoading }] = useUpdateWorkSessionMutation()

  const { finishBox, isLoading: boxLoading } = useBox()
  const { formatWorkSession, formatTimeSession, getCurrentTime } = useSession()

  const { notifyError, notifySuccess } = useNotifications()

  const { cachedMembers } = useTypedSelector(state => state.lastAction)
  const { cacheLastMemberState } = useActions()

  const mutate = useMutate()

  const getMemberByUniqueNumber: GetMemberByUniqueId = async uniqueNumber => {
    try {
      const result = await getMember(uniqueNumber)
      return result.data ?? null
    } catch (e) {
      notifyError('Сотрудник не найден')
      return null
    }
  }

  const createMember = async (member: CreateStaffMember) => {
    await mutate(async () => await create(member), {
      successMessage: 'Сотрудник создан',
      errorMessage: 'Сотрудник не создан'
    })
  }

  const updateMember = async (member: UpdateStaffMember) => {
    await mutate(async () => await update(member), {
      successMessage: 'Сотрудник обновлен',
      errorMessage: 'Сотрудник не обновлен'
    })
  }

  const partialUpdateMember = async (member: PartialUpdateStaffMember) => {
    await mutate(async () => await partialUpdate(member), {
      successMessage: 'Сотрудник обновлен',
      errorMessage: 'Сотрудник не обновлен'
    })
  }

  const clearSessions = async (staff: StaffMember) => {
    await mutate(
      async () =>
        await partialUpdate({
          id: staff.id,
          unique_number: staff.unique_number,
          time_session: null,
          work_session: null,
          time_sessions: [],
          work_sessions: [],
          done: false
        }),
      {
        errorMessage: 'Сессии не сброшены'
      }
    )
  }

  const endWork = async (staff: StaffMember, onClose: () => void) => {
    await mutate(
      async () => {
        await partialUpdate({
          id: staff.id,
          unique_number: staff.unique_number,
          done: true,
          time_session: null,
          work_session: null
        })
        onClose()
      },
      {
        successMessage: 'Работа Завершена',
        errorMessage: 'Работа не завершена'
      }
    )
  }

  const boundBox = async (staff: StaffMember, box: Box | undefined, onSuccess?: () => void) => {
    if (!box) {
      notifyError('Коробка не найдена')
      return
    }

    cacheLastMemberState({ staff, box: staff.box })

    if (staff.done) {
      await clearSessions(staff)
    }

    if (staff.box?.box === box.box) {
      await mutate(
        async () => {
          await partialUpdate({
            id: staff.id,
            unique_number: staff.unique_number,
            box: null,
            work_session: null
          }).unwrap()
        },
        {
          onSuccess,
          successMessage: 'Супер! Коробка Упакована'
        }
      )

      if (staff.work_session)
        await updateWorkSession({
          ...staff.work_session,
          box: staff.work_session.box.id,
          end: getCurrentTime()
        })

      await finishBox({ id: box.id, finished: true })
      return
    }

    if (staff.box) {
      notifyError('У вас уже есть активная коробка')
      return
    }

    if (!box.specification?.actual_quantity) {
      notifyError('У товара этой коробки не указано факт. кол-во')
      return
    }

    const updatedStaff = await mutate(
      async () =>
        await partialUpdate({
          id: staff.id,
          unique_number: staff.unique_number,
          box: box.id,
          work_session: { box: box.id, legit: true }
        }).unwrap(),
      {
        successMessage: 'Начата упаковка',
        errorMessage: 'Коробка не привязана'
      }
    )

    if (!updatedStaff) return

    await mutate(
      async () => {
        if (updatedStaff.work_session)
          await partialUpdate({
            id: staff.id,
            unique_number: staff.unique_number,
            work_sessions: [
              ...updatedStaff.work_sessions.map(s => ({ ...s, box: s.box.id })),
              {
                ...updatedStaff.work_session,
                box: updatedStaff.work_session.box.id
              }
            ]
          }).unwrap()
      },
      { successMessage: 'Сессия была кеширована', errorMessage: 'Сессия не была кеширована' }
    )
  }

  const unboundBox = async (staff: StaffMember, onSuccess?: () => void) => {
    if (!staff.box) {
      notifyError('К вам не была привязана коробка')
      return
    }

    cacheLastMemberState({
      staff,
      work_session: staff.work_session
        ? { ...staff.work_session, box: staff.work_session?.box.id }
        : undefined
    })

    await mutate(
      async () => {
        if (staff.work_session)
          await updateWorkSession({
            ...staff.work_session,
            box: staff.work_session.box.id,
            end: getCurrentTime(),
            legit: false
          })
        await partialUpdate({
          id: staff.id,
          unique_number: staff.unique_number,
          box: null,
          work_session: null
        }).unwrap()
      },
      {
        errorMessage: 'Коробка не отвязана',
        successMessage: 'Коробка отвязана',
        onSuccess
      }
    )
  }

  const boundAnotherMemberToBox = async (staff: StaffMember, memberUniqueNumber: string) => {
    if (!staff.box) return notifyError('У вас нет активной коробки')

    if (staff.box?.specification?.product.category?.payment !== 'hourly')
      return notifyError('Ваша коробка не по времени')

    const anotherStaff = await getMemberByUniqueNumber(memberUniqueNumber)

    if (!anotherStaff) return notifyError('Сотрудник не найден')

    if (anotherStaff.box) return notifyError('У сотрудника уже есть активная коробка')

    cacheLastMemberState({ staff })
    cacheLastMemberState({ staff: anotherStaff })

    await mutate(async () => await boundBox(anotherStaff, staff.box), {
      successMessage: `Коробка привязана к сотруднику ${anotherStaff.unique_number}`,
      errorMessage: 'Коробка не привязана'
    })
  }

  const memberRollback = async (staff: StaffMember) => {
    const cachedMember = cachedMembers.find(
      member => member.staff.unique_number === staff.unique_number
    )

    if (!cachedMember) {
      notifyError(`Сотрудник ${staff.username}(${staff.unique_number}) не найден`)
      return
    }

    await mutate(
      async () => {
        const { staff, box, work_session } = cachedMember

        await partialUpdate({
          ...staff,
          box: staff.box?.id,
          work_session: staff.work_session
            ? formatWorkSession({
                ...staff.work_session,
                box: staff.work_session?.box.id
              })
            : null,
          work_sessions: staff.work_sessions.map(s => formatWorkSession({ ...s, box: s.box.id })),
          time_session: staff.time_session ?? null,
          time_sessions: staff.time_sessions.map(s => s.id)
        }).unwrap()

        if (box) await finishBox(box)
        if (work_session) await updateWorkSession(formatWorkSession(work_session))
      },
      {
        successMessage: `Сотрудник ${staff.username}(${staff.unique_number}) был обновлен`,
        errorMessage: `Сотрудник ${staff.username}(${staff.unique_number}) не был обновлен`
      }
    )
  }

  return {
    open,
    setOpen,
    fetchedMember,

    getMemberByUniqueNumber,

    memberLoading: isLoading,
    memberFetching: createLoading || updateLoading || partialUpdateLoading || getMemberFetching,

    updateMember,
    createMember,
    partialUpdateMember,

    memberRollback,

    unboundBox,
    boundBox,
    boundAnotherMemberToBox,
    endWork,
    clearSessions
  }
}

export default useMember
