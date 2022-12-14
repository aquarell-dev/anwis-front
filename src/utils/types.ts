import { Dispatch, SetStateAction } from 'react'

import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks'
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition
} from '@reduxjs/toolkit/query'

export type SetState<T> = Dispatch<SetStateAction<T>>

export type AnyObject<T = any> = {
  [k: string]: T
}

export type Mutation<T> = MutationTrigger<
  MutationDefinition<
    T,
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
    any,
    void
  >
>

export type Modify<T extends AnyObject, R extends AnyObject> = Omit<T, keyof R> & R

export type SelectValue<T = number> = { label: string; value: T }

export type CError = { status: number; data: AnyObject }
