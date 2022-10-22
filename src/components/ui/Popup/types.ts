import { PropsWithChildren } from 'react';
import { SetState } from '../../../utils/types';

export interface IPopup<T> extends PropsWithChildren {
  state: boolean;
  setState: SetState<boolean>;
}

export interface ICreatePopup extends IPopup<boolean> {
  value: string;
  setValue: SetState<string>;
  title: string;
  handler: () => any;
  isLoading?: boolean;
}