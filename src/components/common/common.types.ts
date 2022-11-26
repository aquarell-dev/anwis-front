import { Modify } from '../../utils/types'

export type CommonProduct = {
  id: number
  title: string
  article: string
  photo?: string
  category?: string
  size: string
  color: string
  brand: string
  photo_id?: number
}

export type CreateCommonProduct = Modify<
  Omit<CommonProduct, 'id' | 'photo_id'>,
  { category?: number; photo?: number }
>

export type MutateCategory = (
  category: { id: number; category: string },
  onFulfil: () => void
) => Promise<void>

export type Task = {
  id: number
  task: string
  datetime: string
}

export type CreateTask = Omit<Task, 'id'>
