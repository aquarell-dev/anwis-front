import { useActions } from '../../../../../hooks/useActions'
import useMutate, { MutateOptions } from '../../../../../hooks/useMutate'
import useNotifications from '../../../../../hooks/useNotifications'

import moment from 'moment'

import { usePartialUpdateMemberMutation } from '../../../../../store/api/staff.api'
import { StaffMember, TimeSession, WorkSession } from '../../../../../types/acceptance.types'

type TimeSessionMutation = (staff: StaffMember) => Promise<void>

const useSession = () => {
  const [partialUpdate, { isLoading: partialUpdateLoading }] = usePartialUpdateMemberMutation({
    fixedCacheKey: 'shared-update-post'
  })

  const { cacheLastMemberState } = useActions()

  const mutate = useMutate()

  const { notifyError } = useNotifications()

  const formatWorkSession = (session: WorkSession) => {
    const patchedSession = {} as WorkSession

    Object.entries(session).map(entry => {
      const [key, value] = entry

      if (!['start', 'end'].includes(key)) {
        // @ts-ignore somehow it still gives an error
        patchedSession[key as keyof WorkSession] = value
        return
      }

      const d = moment(value as string | number, 'HH:mm DD/MM/YYYY')

      console.log(key, d)

      // @ts-ignore somehow it still gives an error
      patchedSession[key as keyof WorkSession] = d.isValid() ? d.format('YYYY-MM-DDTHH:mm') : value
    })

    return patchedSession
  }

  const formatTimeSession = (session: TimeSession) => {
    const patchedSession = {} as TimeSession

    Object.entries(session).map(entry => {
      const [key, value] = entry

      if (!['start', 'end'].includes(key)) {
        // @ts-ignore somehow it still gives an error
        patchedSession[key as keyof WorkSession] = value
        return
      }
      // @ts-ignore somehow it still gives an error
      patchedSession[key as keyof TimeSession] = value
        ? moment(value).format('YYYY-MM-DDTHH:mm')
        : value
    })

    return patchedSession
  }

  const getCurrentTime = () => moment().format('HH:mm DD/MM/YYYY')

  const patchTimeSession = async (
    staff: StaffMember,
    session?: TimeSession,
    options?: MutateOptions
  ) => {
    cacheLastMemberState({ staff })

    return await mutate(
      async () =>
        await partialUpdate({
          id: staff.id,
          unique_number: staff.unique_number,
          time_session: session ?? {}
        }).unwrap(),
      options
    )
  }

  const startTimeSession = async (
    staff: StaffMember,
    clearSessions: (staff: StaffMember) => Promise<void>
  ) => {
    if (staff.work_session) return notifyError('У вас есть активная сессия по коробка')

    if (staff.done) {
      await clearSessions(staff)
    }

    const updatedStaff = await patchTimeSession(staff, {} as TimeSession, {
      successMessage: 'Сессия по времени начата',
      errorMessage: 'Сессия по времени не начата'
    })

    if (!updatedStaff) return

    await mutate(
      async () => {
        if (updatedStaff.time_session)
          await partialUpdate({
            id: updatedStaff.id,
            unique_number: staff.unique_number,
            time_sessions: [
              ...(updatedStaff.time_sessions as unknown as number[]), // todo create valid typing
              updatedStaff.time_session.id
            ]
          }).unwrap()
      },
      { successMessage: 'Сессия Была Кеширована', errorMessage: 'Сессия не была кеширована' }
    )
  }

  const endTimeSession: TimeSessionMutation = async staff => {
    if (!staff.time_session) return notifyError('У вас нет активной сессии')

    await patchTimeSession(
      staff,
      {
        ...staff.time_session,
        break_end: staff.time_session.break_end ?? getCurrentTime(),
        end: getCurrentTime()
      },
      {
        successMessage: 'Сессия по времени закончена',
        errorMessage: 'Сессия по времени не закончена'
      }
    )

    await mutate(
      async () =>
        await partialUpdate({
          id: staff.id,
          unique_number: staff.unique_number,
          time_session: null
        }),
      {
        errorMessage: 'Сессия не закончена'
      }
    )
  }

  const startTimeBreak: TimeSessionMutation = async staff => {
    if (!staff.time_session) return notifyError('У вас нет активной сессии')

    await patchTimeSession(
      staff,
      {
        ...staff.time_session,
        break_start: getCurrentTime()
      },
      {
        successMessage: 'Переыв начат',
        errorMessage: 'Ошибка'
      }
    )
  }

  const endTimeBreak: TimeSessionMutation = async staff => {
    if (!staff.time_session) return notifyError('У вас нет активной сессии')

    await patchTimeSession(
      staff,
      {
        ...staff.time_session,
        break_end: getCurrentTime()
      },
      {
        successMessage: 'Перерыв закончен',
        errorMessage: 'Ошибка'
      }
    )
  }

  return {
    startTimeBreak,
    endTimeBreak,
    startTimeSession,
    endTimeSession,
    sessionLoading: partialUpdateLoading,
    formatWorkSession,
    formatTimeSession,
    getCurrentTime
  }
}

export default useSession