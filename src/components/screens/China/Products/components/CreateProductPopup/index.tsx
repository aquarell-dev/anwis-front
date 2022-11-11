import React, { FC } from 'react';

import Popup from '../../../../../ui/Popup';
import { AbsoluteCenteredContainer } from '../../../../../ui/Container';
import CategorySelect from '../CategorySelect';

import { ICategory, IProduct } from '../../../../../../features/order/order.types';
import { SetState } from '../../../../../../utils/types';
import FileDragAndDrop from '../../../../../ui/FileDragNDrop';
import CreateProductFields from '../CreateProductFields';
import useMutateProduct from '../../hooks/useMutateProduct';
import { IndigoButton } from '../../../../../ui/Button';


type PopupProps = {
  open: boolean;
  setOpen: SetState<boolean>;
  categories?: ICategory[];
  product?: IProduct | null;
};

const MutateProductPopup: FC<PopupProps> = ({ open, setOpen, categories, product }) => {
  const {
    mutate,
    currentProduct,
    setCurrentProduct,
    categoryLabel,
    defaultPhoto,
    update
  } = useMutateProduct(product ?? undefined, categories);

  return (
    <Popup
      width='w-[80%]'
      height='h-[70%]'
      bgColor='bg-slate-100'
      state={open}
      setState={setOpen}
    >
      <AbsoluteCenteredContainer>
        <div className="w-full m-2 flex space-x-8 items-start">
          <div>
            <p>Прикрепите файл</p>
            <div className='w-[650px]'>
              <FileDragAndDrop
                accept={{ 'image/*': [] }}
                type='photo'
                multiple={false}
                preview
              />
            </div>
          </div>
          {defaultPhoto && (
            <div className='flex flex-col my-2 space-y1-'>
              <p>Текущее фото</p>
              <img
                src={defaultPhoto}
                className='w-16'
                alt={'Текущее фото'}
              />
            </div>
          )}
        </div>
        <CreateProductFields
          product={currentProduct}
          setProduct={setCurrentProduct}
        />
        <CategorySelect
          label={categoryLabel}
          product={currentProduct}
          categories={categories}
          setProduct={setCurrentProduct}
        />
        <div className="flex items-center justify-center">
          <IndigoButton
            type='button'
            text={update ? 'Обновить' : 'Создать'}
            handler={() => {
              mutate();
              setOpen(false);
            }}
          />
        </div>
      </AbsoluteCenteredContainer>
    </Popup>
  );
};

export default MutateProductPopup;