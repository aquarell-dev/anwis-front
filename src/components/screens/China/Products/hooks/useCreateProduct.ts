import { useCreateProductMutation } from '../../../../../store/api/product.api';
import { useState } from 'react';
import { ICreateProduct } from '../../../../../features/order/order.types';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import useNotifications from '../../../../../hooks/useNotifications';

const useCreateProduct = () => {
  const productInitial = {
    title: '',
    color: '',
    brand: '',
    article: '',
    size: '',
    url: '',
    category: undefined,
    photo: undefined
  };

  const [product, setProduct] = useState<ICreateProduct>(productInitial);

  const { notifyError, notifySuccess } = useNotifications();

  const [create, _] = useCreateProductMutation();

  const { lastUpdatedDocument } = useTypedSelector(state => state.document);

  const createProduct = () => {
    create({ ...product, photo: lastUpdatedDocument?.id })
      .unwrap()
      .then(() => { notifySuccess('Товар создан'); setProduct(productInitial); })
      .catch(() => notifyError('Товар не создан'))
  };

  return { createProduct, product, setProduct };
};

export default useCreateProduct;