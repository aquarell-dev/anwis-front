import { FC } from 'react';
import { StaffMember } from '../../../../../../types/acceptance.types';
import { SetState } from '../../../../../../utils/types';
import { IndigoButton, RedButton } from '../../../../../ui/Button';
import { AbsoluteCenteredContainer } from '../../../../../ui/Container';
import { Checkbox, FancyInput } from '../../../../../ui/Input';
import Popup from '../../../../../ui/Popup';

const StaffMemberPopup: FC<{
  open: boolean;
  setOpen: SetState<boolean>;
  staffMember: StaffMember;
  setStaffMember: SetState<StaffMember>;
  onSubmit: () => void;
}> = ({ staffMember, setStaffMember, open, setOpen, onSubmit }) => {
  return (
    <Popup
      state={open}
      setState={setOpen}
      bgColor="bg-slate-100"
      height="h-80"
      width="w-[440px]"
    >
      <AbsoluteCenteredContainer>
        <div className="flex flex-col space-y-4 items-center">
          {staffMember.id ? <h3>Сотрудник {staffMember.username}</h3> : <h3>Новый сотрудник</h3>}
          <FancyInput
            value={staffMember?.username}
            handler={(e) => setStaffMember({ ...staffMember, username: e.target.value })}
            placeholder="Логин"
            showLabel
          />
          <FancyInput
            value={staffMember?.password}
            handler={(e) => setStaffMember({ ...staffMember, password: e.target.value })}
            placeholder="Пароль"
            showLabel
          />
          <div className="flex items-center space-x-4">
            <Checkbox
              label={'Временный'}
              checked={staffMember.temporary}
              onChange={(e) => setStaffMember({ ...staffMember, temporary: e.target.checked })}
            />
            <Checkbox
              label={'Неактивен'}
              checked={staffMember.inactive}
              onChange={(e) => setStaffMember({ ...staffMember, inactive: e.target.checked })}
            />
          </div>
          <div className="flex items-center justify-center space-x-4">
            <IndigoButton
              type="button"
              handler={onSubmit}
              text="Продолжить"
              customWidth="w-36"
            />
            <RedButton
              type="button"
              handler={() => setOpen(false)}
              text="Закрыть"
              customWidth="w-36"
            />
          </div>
        </div>
      </AbsoluteCenteredContainer>
    </Popup>
  );
};

export default StaffMemberPopup;
