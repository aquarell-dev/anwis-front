import React from 'react'

import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { ICategory, IProductSpecs } from '../../../features/order/order.types'
import { SetState } from '../../../utils/types'
import { IProductSearchProps } from '../../screens/China/Order/components/Products/types'

export interface IPopup<T = boolean> {
  state: boolean
  setState: SetState<boolean>
  width?: string
  height?: string
  bgColor?: string
  outside?: boolean
  children?: React.ReactNode
}

export interface ICreatePopup extends IPopup<boolean> {
  value: string
  setValue: SetState<string>
  title: string
  handler: () => any
  isLoading?: boolean
}

export interface IAddProductPopup
  extends IPopup<boolean>,
    Omit<IProductSearchProps, 'handleOnSelect'> {
  isLoading?: boolean
  categories: ICategory[] | undefined
  error: FetchBaseQueryError | SerializedError | undefined
  selectedProducts: IProductSpecs[]
  setSelectedProducts: SetState<IProductSpecs[]>
}
