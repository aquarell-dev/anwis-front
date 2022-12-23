import { FC } from 'react'

import useMember from '../hooks/useMember'
import useMutateStaff from './hooks/useMutateStaff'

import { useListMembersQuery } from '../../../../store/api/staff.api'
import { ContentContainer } from '../../../ui/Container'
import Loader from '../../../ui/Loader'
import StaffMemberPopup from '../components/StaffMemberPopup'
import MembersGrid from './components/MembersGrid'
import Navigation from './components/Navigation'

const Staff: FC = () => {
  const { setMemberOpen, memberOpen, setSelectedMember, selectedMember } = useMutateStaff()
  const { createMember, partialUpdateMember, memberLoading } = useMember()

  const { data: members, isLoading } = useListMembersQuery(1)

  if (isLoading) return <Loader isLoading />

  return (
    <>
      <ContentContainer>
        <Navigation setMemberOpen={setMemberOpen} />
        <MembersGrid
          members={members}
          setOpen={setMemberOpen}
          setSelectedMember={setSelectedMember}
        />
      </ContentContainer>
      <StaffMemberPopup
        open={memberOpen}
        setOpen={setMemberOpen}
        staffMember={selectedMember}
        setStaffMember={setSelectedMember}
        loading={memberLoading}
        onSubmit={async () => {
          const { work_session, time_session, box, work_sessions, time_sessions, ...updatable } =
            selectedMember

          if (selectedMember.id) {
            await partialUpdateMember(updatable)
            setMemberOpen(false)
            return
          }

          await createMember({
            ...updatable
          })
          setMemberOpen(false)
        }}
      />
    </>
  )
}

export default Staff
