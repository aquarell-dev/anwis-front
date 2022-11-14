import { useEffect, useState } from 'react';
import useNotifications from '../../../../../hooks/useNotifications';
import {
  useCreateMemberMutation,
  useUpdateMemberMutation
} from '../../../../../store/api/staff.api';
import { StaffMember } from '../../../../../types/acceptance.types';

const useMutateStaff = () => {
  const [memberOpen, setMemberOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState({} as StaffMember);

  const [create, createResult] = useCreateMemberMutation();
  const [update, updateResult] = useUpdateMemberMutation();

  const { notifyError, notifySuccess } = useNotifications();

  useEffect(() => {
    if (!memberOpen) setSelectedMember({} as StaffMember);
  }, [memberOpen]);

  const mutate = () => {
    if (selectedMember.id)
      return update(selectedMember)
        .unwrap()
        .then(() => notifySuccess('Сотрудник изменен'))
        .catch(() => notifyError('Сотрудник не изменен'))
        .finally(() => setMemberOpen(false));

    create(selectedMember)
      .unwrap()
      .then(() => notifySuccess('Сотрудник создан'))
      .catch(() => notifyError('Сотрудник не создан'))
      .finally(() => setMemberOpen(false));
  };

  return { mutate, memberOpen, setMemberOpen, selectedMember, setSelectedMember };
};

export default useMutateStaff;
