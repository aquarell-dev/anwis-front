import React from 'react';
import { SetState } from '../../../utils/types';
import { ICategory, IProductSpecs } from '../../../features/order/types';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { IProductSearchProps } from '../../screens/China/components/Products/types';

export interface IPopup<T> {
  state: boolean;
  setState: SetState<boolean>;
  width?: string;
  height?: string;
  children?: React.ReactNode;
}

export interface ICreatePopup extends IPopup<boolean> {
  value: string;
  setValue: SetState<string>;
  title: string;
  handler: () => any;
  isLoading?: boolean;
}

export interface IAddProductPopup extends IPopup<boolean>, Omit<IProductSearchProps, 'handleOnSelect'> {
  isLoading?: boolean;
  categories: ICategory[] | undefined;
  error: FetchBaseQueryError | SerializedError | undefined;
  selectedProducts: IProductSpecs[];
  setSelectedProducts: SetState<IProductSpecs[]>
}