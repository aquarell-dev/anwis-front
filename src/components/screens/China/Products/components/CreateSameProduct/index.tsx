import React, { FC, useState } from 'react';
import Popup from '../../../../../ui/Popup';
import { AbsoluteCenteredContainer } from '../../../../../ui/Container';
import { FancyInput } from '../../../../../ui/Input';
import { IndigoButton, RedButton } from '../../../../../ui/Button';
import { SetState } from '../../../../../../utils/types';

const CreateSameProduct: FC<{
  onCommit: () => void;
  open: boolean,
  setOpen: SetState<boolean>,
  size: string,
  setSize: SetState<string>
}> = ({ onCommit, open, setOpen, size, setSize }) => {
  return (
    <Popup
      state={open}
      setState={setOpen}
      bgColor={'bg-slate-100'}
      width='w-[450px]'
      height={'h-[300px]'}
    >
      <AbsoluteCenteredContainer>
        <p className='text-center my-2'>Вы точно хотите создать такой же товар?</p>
        <FancyInput
          value={size}
          handler={e => setSize(e.target.value)}
          placeholder={'Размер'}
          showLabel
        />
        <div className="flex mx-auto mt-4 justify-center space-x-4 items-center">
          <IndigoButton
            type='button'
            text={'Да'}
            handler={onCommit}
          />
          <RedButton
            type='button'
            text={'Нет'}
            handler={() => setOpen(false)}
          />
        </div>
      </AbsoluteCenteredContainer>
    </Popup>
  );
};

export default CreateSameProduct;
