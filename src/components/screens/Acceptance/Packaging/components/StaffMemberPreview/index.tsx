import { FC } from 'react'

import useMember from '../../../hooks/useMember'

import { StaffMember } from '../../../../../../types/acceptance.types'
import { SetState } from '../../../../../../utils/types'
import { AbsoluteCenteredContainer } from '../../../../../ui/Container'
import Navigation from '../Navigation'
import PreviewPopup from '../PreviewPopup'
import StaffMemberActionLog from '../StaffMemberActionLog'
import StaffMemberWorkInfo from '../StaffMemberWorkInfo'

const StaffMemberPreview: FC<{
  open: boolean
  setOpen: SetState<boolean>
  staffMember: StaffMember | undefined
}> = ({ open, setOpen, staffMember }) => {
  const { memberFetching, ...boxActions } = useMember()

  return (
    <PreviewPopup
      open={open}
      setOpen={setOpen}
      fetching={memberFetching}
    >
      {staffMember ? (
        <div className='m-8 w-[290px] sm:w-[400px] md:w-[800px] lg:w-[1024px] xl:w-[1200px] 2xl:w-full h-[500px] lg:h-full flex flex-col lg:flex-row items-start space-x-0 lg:space-x-4 overflow-y-auto scrollbar-thin'>
          <div className='flex flex-col w-full space-y-6 lg:w-fit'>
            <Navigation
              {...boxActions}
              open={open}
              setOpen={setOpen}
              staffMember={staffMember}
            />
            <StaffMemberWorkInfo {...staffMember} />
          </div>
          <StaffMemberActionLog {...staffMember} />
        </div>
      ) : (
        <AbsoluteCenteredContainer>
          <p className='text-4xl'>Сотрудник не найден!</p>
        </AbsoluteCenteredContainer>
      )}
    </PreviewPopup>
  )
}

export default StaffMemberPreview
