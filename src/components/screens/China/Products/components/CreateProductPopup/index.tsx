import React, { FC, useState } from 'react';
import { useCreateProductMutation } from '../../../../../../store/api/product.api';

import Popup from '../../../../../ui/Popup';
import { AbsoluteCenteredContainer } from '../../../../../ui/Container';
import { FancyInput } from '../../../../../ui/Input';
import { FileButton, IndigoButton } from '../../../../../ui/Button';
import CategorySelect from '../CategorySelect';

import { ICategory, ICreateProduct } from '../../../../../../features/order/order.types';
import { SetState } from '../../../../../../utils/types';

import axios from 'axios';


type PopupProps = {
  open: boolean;
  setOpen: SetState<boolean>;
  categories?: ICategory[];
};

const CreateProductPopup: FC<PopupProps> = ({ open, setOpen, categories }) => {
  const [product, setProduct] = useState<ICreateProduct>({
    title: '',
    color: '',
    brand: '',
    article: '',
    size: '',
    url: '',
    category: undefined,
    photo: undefined
  });
  const [photo, setPhoto] = useState<FileList | null>(null);

  const [createProduct, _] = useCreateProductMutation();

  const getFormData = (data: ICreateProduct) => {
    const formData = new FormData();
    formData.append('title', product.title);
    formData.append('color', product.color);
    formData.append('brand', product.brand);
    formData.append('size', product.size);
    formData.append('article', product.article.toString());
    formData.append('url', product.url);
    if (photo)
      formData.append('photo', photo[0], photo[0].name);
    return formData;
  };

  return (
    <Popup
      width='w-[80%]'
      height='h-[70%]'
      bgColor='bg-slate-100'
      state={open}
      setState={setOpen}
    >
      <AbsoluteCenteredContainer>
        <div className="grid grid-cols-2 gap-8 mb-2">
          <FancyInput
            value={product.title}
            handler={e => setProduct(prev => ({ ...prev, title: e.target.value }))}
            placeholder='Название'
            showLabel
          />
          <FancyInput
            value={product.color}
            handler={e => setProduct(prev => ({ ...prev, color: e.target.value }))}
            placeholder='Цвет'
            showLabel
          />
          <FancyInput
            value={product.brand}
            handler={e => setProduct(prev => ({ ...prev, brand: e.target.value }))}
            placeholder='Бренд'
            showLabel
          />
          <FancyInput
            value={product.size}
            handler={e => setProduct(prev => ({ ...prev, size: e.target.value }))}
            placeholder='Размер'
            showLabel
          />
          <FancyInput
            value={product.article}
            type='text'
            handler={e => setProduct(prev => ({ ...prev, article: e.target.value }))}
            placeholder='Артикул поставщика'
            showLabel
          />
          <FancyInput
            value={product.url}
            type='text'
            handler={e => setProduct(prev => ({ ...prev, url: e.target.value }))}
            placeholder='Ссылка'
            showLabel
          />
        </div>
        <div className="flex justify-around space-x-4 w-full mb-4">
          <FileButton
            setFiles={setPhoto}
            text='Загрузить картинку'
            customWidth='w-60'
            accept="image/jpeg,image/png,image/gif"
          />
          <CategorySelect
            categories={categories}
            setProduct={setProduct}
          />
        </div>
        <div className="flex items-center justify-center">
          <IndigoButton
            type='button'
            text='Создать'
            handler={async () => {
              await axios
                .post(`http://localhost:8000/api/products/update/`, getFormData(product), {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                }).then((res) => {
                  return res;
                }).catch((error) => {
                  return error.response;
                });
            }}
          />
        </div>
      </AbsoluteCenteredContainer>
    </Popup>
  );
};

export default CreateProductPopup;