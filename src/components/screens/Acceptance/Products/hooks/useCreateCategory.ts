import { useState } from 'react'

import useNotifications from '../../../../../hooks/useNotifications'

import { useCreateRussianCategoryMutation } from '../../../../../store/api/acceptance.category.api'

const useCreateCategory = () => {
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState('')

  const [create, { isLoading }] = useCreateRussianCategoryMutation()
  const { notifyError, notifySuccess } = useNotifications()

  const createCategory = () => {
    create({ category })
      .unwrap()
      .then(() => notifySuccess('Категория создана'))
      .catch(() => notifyError('Категория не создана'))
  }

  return {
    open,
    setOpen,
    category,
    setCategory,
    isLoading,
    createCategory
  }
}

export default useCreateCategory
