import React, { FC } from 'react';
import Popup from '../../../../ui/Popup';
import { SetState } from '../../../../../utils/types';
import { AbsoluteCenteredContainer } from '../../../../ui/Container';
import { IndigoButton, RedButton } from '../../../../ui/Button';

const DeletePopup: FC<{
  open: boolean,
  setOpen: SetState<boolean>,
  content: string;
  onDelete: () => void;
}> = ({ open, setOpen, content, onDelete }) => {
  return (
    <Popup
      state={open}
      bgColor='bg-slate-100'
      setState={setOpen}
      width='w-[500px]'
    >
      <AbsoluteCenteredContainer>
        <p className='text-center text-xl'>Вы уверены, что хотите удалить&nbsp;<span className='font-medium'>"{content}"</span>?</p>
        <div className="flex m-2 items-center space-x-4">
          <IndigoButton
            type='button'
            text='Да'
            handler={onDelete}
          />
          <RedButton
            type='button'
            text='Нет'
            handler={() => setOpen(false)}
          />
        </div>
      </AbsoluteCenteredContainer>
    </Popup>
  );
};

export default DeletePopup;
