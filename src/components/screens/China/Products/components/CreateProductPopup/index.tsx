import React, { FC } from 'react';

import Popup from '../../../../../ui/Popup';
import { AbsoluteCenteredContainer } from '../../../../../ui/Container';
import CategorySelect from '../CategorySelect';

import { ICategory } from '../../../../../../features/order/order.types';
import { SetState } from '../../../../../../utils/types';
import FileDragAndDrop from '../../../../../ui/FileDragNDrop';
import CreateProductFields from '../CreateProductFields';
import useCreateProduct from '../../hooks/useCreateProduct';
import { IndigoButton } from '../../../../../ui/Button';


type PopupProps = {
  open: boolean;
  setOpen: SetState<boolean>;
  categories?: ICategory[];
};

const CreateProductPopup: FC<PopupProps> = ({ open, setOpen, categories }) => {
  const { createProduct, product, setProduct } = useCreateProduct();

  return (
    <Popup
      width='w-[80%]'
      height='h-[70%]'
      bgColor='bg-slate-100'
      state={open}
      setState={setOpen}
    >
      <AbsoluteCenteredContainer>
        <CreateProductFields
          product={product}
          setProduct={setProduct}
        />
        <CategorySelect
          categories={categories}
          setProduct={setProduct}
        />
        <div className="w-full m-2">
          <FileDragAndDrop accept={{ 'image/*': [] }} type='photo' />
        </div>
        <div className="flex items-center justify-center">
          <IndigoButton
            type='button'
            text='Создать'
            handler={() => { createProduct(); setOpen(false); }}

          />
        </div>
      </AbsoluteCenteredContainer>
    </Popup>
  );
};

export default CreateProductPopup;