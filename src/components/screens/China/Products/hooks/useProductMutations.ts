import { useCreateProductMutation, useDeleteProductMutation } from '../../../../../store/api/product.api';
import useNotifications from '../../../../../hooks/useNotifications';
import { useState } from 'react';
import { ICategory, IProduct } from '../../../../../features/order/order.types';
import { Popups, Values } from '../../types';

const useProductMutations = (products?: IProduct[], categories?: ICategory[]) => {
  const [deleteProduct, _] = useDeleteProductMutation();
  const [copyProduct, copyResult] = useCreateProductMutation();
  const { notifyError, notifySuccess } = useNotifications();

  const [productChangeOpen, setProductChangeOpen] = useState(false);
  const [productDeleteOpen, setProductDeleteOpen] = useState(false);
  const [createSameOpen, setCreateSameOpen] = useState(false);
  const [size, setSize] = useState('');

  const [productUpToChange, setProductUpToChange] = useState<IProduct | null>(null);
  const [productUpToDeletion, setProductUpToDeletion] = useState<{ content: string; id: number } | null>(null);
  const [copyProductId, setCopyProductId] = useState<number | null>(null);

  const onDelete = () => {
    productUpToDeletion && deleteProduct(productUpToDeletion.id)
      .unwrap()
      .then(() => notifySuccess('Товар был удален'))
      .catch(() => notifyError('Товар не был удален'))
      .finally(() => setProductDeleteOpen(false));
  };

  const onCommit = () => {
    const product = products?.find(p => p.id === copyProductId);

    if (!product) return;

    copyProduct({
      ...product,
      category: categories?.find(category => category.category === product.category)?.id,
      size: size,
      photo: product.photo_id
    }).unwrap()
      .then(() => notifySuccess('Товар был скопирован'))
      .catch(() => notifyError('Товар не был скопирован'))
      .finally(() => setCreateSameOpen(false));
  };

  const popups: Popups = {
    createSameOpen, setCreateSameOpen,
    productDeleteOpen, setProductDeleteOpen,
    productChangeOpen, setProductChangeOpen,
  };

  const values: Values = {
    productUpToDeletion, setProductUpToDeletion,
    copyProductId, setCopyProductId,
    productUpToChange, setProductUpToChange,
    size, setSize,
  };

  return {
    values,
    popups,
    onDelete, onCommit
  };
};

export default useProductMutations;
