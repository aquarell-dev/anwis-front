import { useTypedSelector } from '../../../../../hooks/useTypedSelector'
import useBox from '../../hooks/useBox'
import useSession from './useSession'

import { StaffMember } from '../../../../../types/acceptance.types'

const useMemberRollback = () => {
  const { cachedMembers } = useTypedSelector(state => state.lastAction)
  //
  // const { use }

  const { formatWorkSession, formatTimeSession, getCurrentTime } = useSession()
  const { finishBox } = useBox()

  // const memberRollback = async (staff: StaffMember) => {
  //   const cachedMember = cachedMembers.find(
  //     member => member.staff.unique_number === staff.unique_number
  //   )
  //
  //   if (!cachedMember) {
  //     notifyError(`Сотрудник ${staff.username}(${staff.unique_number}) не найден`)
  //     return
  //   }
  //
  //   await mutate(
  //     async () => {
  //       const { staff, box, work_session } = cachedMember
  //
  //       await partialUpdate({
  //         ...staff,
  //         box: staff.box?.id,
  //         work_session: staff.work_session
  //           ? formatWorkSession({
  //               ...staff.work_session,
  //               box: staff.work_session?.box.id
  //             })
  //           : null,
  //         work_sessions: staff.work_sessions.map(s => formatWorkSession({ ...s, box: s.box.id })),
  //         time_session: staff.time_session ? formatTimeSession(staff.time_session) : null,
  //         time_sessions: staff.time_sessions.map(s => formatTimeSession(s))
  //       }).unwrap()
  //
  //       if (box) await finishBox(box)
  //       if (work_session) await updateWorkSession(formatWorkSession(work_session))
  //     },
  //     {
  //       successMessage: `Сотрудник ${staff.username}(${staff.unique_number}) был обновлен`,
  //       errorMessage: `Сотрудник ${staff.username}(${staff.unique_number}) не был обновлен`
  //     }
  //   )
  // }

  return {}
}

export default useMemberRollback
