import React, { FC, useEffect } from 'react';
import Popup from '../../../../../ui/Popup';
import { AbsoluteCenteredContainer } from '../../../../../ui/Container';
import { SetState } from '../../../../../../utils/types';
import { FancyInput } from '../../../../../ui/Input';
import { IndigoButton } from '../../../../../ui/Button';

const ChangePopup: FC<{
  open: boolean,
  setOpen: SetState<boolean>,
  content: string;
  onUpdate: () => void;
  value: string,
  setValue: SetState<string>
}> = ({ open, setOpen, content, setValue, value, onUpdate }) => {
  useEffect(() => {
    if (open) return setValue(content);
    setValue('');
  }, [open]);

  return (
    <Popup
      state={open}
      bgColor='bg-slate-100'
      setState={setOpen}
      width='w-[500px]'
    >
      <AbsoluteCenteredContainer>
        <p className='text-center text-xl'>Изменение&nbsp;<span className='font-medium'>{content}</span>?</p>
        <FancyInput
          value={value}
          handler={e => setValue(e.target.value)}
          placeholder={'Введите новое значение...'}
        />
        <div className="flex justify-center m-2 w-full">
          <IndigoButton
            type='button'
            text='Изменить'
            handler={() => {
              onUpdate();
              setOpen(false);
            }}
          />
        </div>
      </AbsoluteCenteredContainer>
    </Popup>
  );
};

export default ChangePopup;
