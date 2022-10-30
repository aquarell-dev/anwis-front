import { Dispatch, SetStateAction } from 'react';

import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';

import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition
} from '@reduxjs/toolkit/query';

export type SetState<T> = Dispatch<SetStateAction<T>>;

export type AnyObject = {
  [k: string]: any;
};

export type Mutation<T> = MutationTrigger<MutationDefinition<
  T,
  BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
  any,
  void>>;