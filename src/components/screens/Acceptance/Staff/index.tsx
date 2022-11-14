import { FC } from 'react';
import { useListMembersQuery } from '../../../../store/api/staff.api';
import { ContentContainer } from '../../../ui/Container';
import Loader from '../../../ui/Loader';
import MembersGrid from './components/MembersGrid';
import Navigation from './components/Navigation';
import StaffMemberPopup from './components/StaffMemberPopup';
import useMutateStaff from './hooks/useMutateStaff';

const Staff: FC = () => {
  const { mutate, setMemberOpen, memberOpen, setSelectedMember, selectedMember } = useMutateStaff();

  const { data: members, isLoading, error } = useListMembersQuery(undefined);

  if (isLoading) return <Loader isLoading />;

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
        onSubmit={mutate}
      />
    </>
  );
};

export default Staff;
