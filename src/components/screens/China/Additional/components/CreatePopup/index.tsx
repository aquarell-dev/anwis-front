import React, { FC, useEffect } from 'react';
import Popup from '../../../../../ui/Popup';
import { AbsoluteCenteredContainer } from '../../../../../ui/Container';
import { FancyInput } from '../../../../../ui/Input';
import { IndigoButton } from '../../../../../ui/Button';
import { SetState } from '../../../../../../utils/types';

const CreatePopup: FC<{
  open: boolean,
  setOpen: SetState<boolean>,
  title: string;
  onCreate: () => void;
  value: string,
  setValue: SetState<string>
}> = ({ open, setOpen, title, onCreate, value, setValue }) => {
  useEffect(() => {
    if (!open) setValue('');
  }, [open]);

  return (
    <Popup
      state={open}
      bgColor='bg-slate-100'
      setState={setOpen}
      width='w-[500px]'
    >
      <AbsoluteCenteredContainer>
        <p className='text-center text-xl mb-2'>{title}</p>
        <FancyInput
          value={value}
          handler={e => setValue(e.target.value)}
          placeholder={title}
          showLabel
        />
        <div className="flex justify-center m-2 w-full">
          <IndigoButton
            type='button'
            text='Создать'
            handler={() => {
              onCreate();
              setOpen(false);
            }}
          />
        </div>
      </AbsoluteCenteredContainer>
    </Popup>
  );
};

export default CreatePopup;
