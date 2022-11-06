import React, { FC, useState } from 'react';
import useNotifications from '../../../../../../hooks/useNotifications';
import { useCreateCategoryMutation } from '../../../../../../store/api/category.api';

import { SetState } from '../../../../../../utils/types';

import { IndigoButton } from '../../../../../ui/Button';
import { AbsoluteCenteredContainer } from '../../../../../ui/Container';
import { FancyInput } from '../../../../../ui/Input';
import Popup from '../../../../../ui/Popup';


type PopupProps = {
  open: boolean;
  setOpen: SetState<boolean>;
};


const CategoryPopup: FC<PopupProps> = ({ open, setOpen }) => {
  const [createCategory, _1] = useCreateCategoryMutation();
  const [category, setCategory] = useState('');
  const { notifySuccess, notifyError } = useNotifications();

  return (
    <Popup
      state={open}
      setState={setOpen}
      width='w-[500px]'
      bgColor='bg-slate-100'
    >
      <AbsoluteCenteredContainer>
        <FancyInput
          value={category}
          handler={e => setCategory(e.target.value)}
          placeholder={'Категория'}
          showLabel
        />
        <div className="h-2"/>
        <div className="flex items-center justify-center">
          <IndigoButton
            type='button'
            text='Создать'
            handler={() => createCategory({ category })
              .unwrap()
              .then(() => { notifySuccess('Категория создана'); setOpen(false) })
              .catch(() => { notifyError('Категория не создана'); setOpen(false) })}
          />
        </div>
      </AbsoluteCenteredContainer>
    </Popup>
  );
};

export default CategoryPopup;