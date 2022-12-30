import { Box, StaffMember, WorkSession } from '../../types/acceptance.types'

export type LastActionInitial = {
  cachedMembers: StaffLastAction[]
}

export type StaffLastAction = {
  staff: StaffMember
  box?: Box
  work_session?: WorkSession
}
