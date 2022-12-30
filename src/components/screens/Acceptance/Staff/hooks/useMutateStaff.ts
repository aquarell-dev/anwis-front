import { useEffect, useState } from 'react'

import useNotifications from '../../../../../hooks/useNotifications'
import useMember from '../../hooks/useMember'

import {
  useCreateMemberMutation,
  useUpdateMemberMutation
} from '../../../../../store/api/staff.api'
import { StaffMember } from '../../../../../types/acceptance.types'

const useMutateStaff = () => {
  const [memberOpen, setMemberOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState({} as StaffMember)

  useEffect(() => {
    if (!memberOpen) setSelectedMember({} as StaffMember)
  }, [memberOpen])

  return { memberOpen, setMemberOpen, selectedMember, setSelectedMember }
}

export default useMutateStaff
