import { useState } from 'react'

import { CommonCategory, MutateCategory } from '../common.types'

const useCategories = <T extends CommonCategory = CommonCategory>(
  update: MutateCategory,
  _delete: MutateCategory
) => {
  const [currentCategory, setCurrentCategory] = useState<T | null>(null)
  const [changeOpen, setChangeOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const [changeCategoryValue, setChangeCategoryValue] = useState<string>('')

  const updateCategory = () => {
    currentCategory &&
      update(
        {
          ...currentCategory,
          category: changeCategoryValue
        },
        () => setChangeOpen(false)
      )
  }

  const deleteCategory = () => {
    currentCategory &&
      _delete(currentCategory, () => {
        setCurrentCategory(null)
        setChangeCategoryValue('')
        setDeleteOpen(false)
      })
  }

  return {
    currentCategory,
    setCurrentCategory,
    changeOpen,
    setChangeOpen,
    deleteOpen,
    setDeleteOpen,
    deleteCategory,
    updateCategory,
    changeCategoryValue,
    setChangeCategoryValue
  }
}

export default useCategories
