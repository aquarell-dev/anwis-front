import useMember from '../../hooks/useMember'
import useSession from './useSession'

import { StaffMember } from '../../../../../types/acceptance.types'

export const allowedQrCodes: QrCode[] = [
  'Начать Работу По Времени',
  'Остановить Работу По Времени',
  'Закончить Перерыв',
  'Начать Перерыв',
  'Завершить Работу',
  'Отменить Последнее Действие',
  'Закрыть'
]

export type QrCode =
  | 'Начать Работу По Времени'
  | 'Остановить Работу По Времени'
  | 'Закончить Перерыв'
  | 'Начать Перерыв'
  | 'Завершить Работу'
  | 'Отменить Последнее Действие'
  | 'Закрыть'

const useQrCode = () => {
  const { startTimeSession, startTimeBreak, endTimeSession, endTimeBreak, sessionLoading } =
    useSession()

  const { memberFetching, memberRollback } = useMember()

  const validateQrCodes = async (input: QrCode, staffMember: StaffMember, onClose: () => void) => {
    if (input === 'Начать Работу По Времени') {
      await startTimeSession(staffMember)
      return true
    }

    if (input === 'Начать Перерыв') {
      await startTimeBreak(staffMember)
      return true
    }

    if (input === 'Закончить Перерыв') {
      await endTimeBreak(staffMember)
      return true
    }

    if (input === 'Остановить Работу По Времени') {
      await endTimeSession(staffMember)
      return true
    }

    if (input === 'Завершить Работу') {
      return true
    }

    if (input === 'Отменить Последнее Действие') {
      await memberRollback(staffMember)
      return true
    }

    if (input === 'Закрыть') {
      onClose()
      return true
    }

    return false
  }

  return { validateQrCodes, sessionLoading, memberFetching }
}

export default useQrCode
