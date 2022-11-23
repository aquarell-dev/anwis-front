import { useEffect, useState } from 'react'

import useLoading from '../../../../../context/GridLoadingContext/hooks/useLoading'
import useNotifications from '../../../../../hooks/useNotifications'

import { useListRussianCategoriesQuery } from '../../../../../store/api/acceptance.category.api'
import {
  useDeleteRussianProductMutation,
  useListRussianProductsQuery
} from '../../../../../store/api/acceptance.product.api'
import { AcceptanceProduct } from '../../../../../types/acceptance.types'
import { RussianProductRow } from '../../types'

const useRussianProducts = () => {
  const {
    data: products,
    isLoading: productsLoading,
    isFetching: productsFetching
  } = useListRussianProductsQuery(undefined)
  const {
    data: categories,
    isLoading: categoriesLoading,
    isFetching: categoriesFetching
  } = useListRussianCategoriesQuery(undefined)

  const [selectedProduct, setSelectedProduct] = useState<AcceptanceProduct | null>(null)
  const [updateOpen, setUpdateOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const [selectedCategory, setSelectedCategory] = useState('')

  const [rows, setRows] = useState<RussianProductRow[]>([])
  const [search, setSearch] = useState('')

  const [delete_, { isLoading }] = useDeleteRussianProductMutation()

  const { notifyError, notifySuccess } = useNotifications()

  useLoading('russianProducts', [categoriesFetching, productsFetching])

  // useEffect(() => {
  //   if ([productsFetching])
  // }, [categoriesFetching, productsFetching])

  useEffect(() => {
    if (!deleteOpen && !updateOpen) setSelectedProduct(null)
  }, [deleteOpen, updateOpen])

  useEffect(() => {
    if (search.length > 0)
      setRows(prev =>
        prev.filter(product =>
          Object.values(product).some(value =>
            value?.toString().toLowerCase().includes(search.toLowerCase())
          )
        )
      )

    if (search.length === 0 && products) setRows(products)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  useEffect(() => {
    if (!selectedCategory) return products && setRows(products)
    setRows(prev => prev.filter(product => product?.category === selectedCategory))
  }, [selectedCategory])

  useEffect(() => {
    if (products) setRows(products)
  }, [products])

  const deleteProduct = () => {
    if (!selectedProduct) return notifyError('Не указан товар')
    delete_({ id: selectedProduct.id })
      .unwrap()
      .then(() => notifySuccess('Товар был удален'))
      .catch(() => notifyError('Товар не был удален'))
      .finally(() => setDeleteOpen(false))
  }

  return {
    products,
    isLoading: productsLoading || categoriesLoading,
    isFetching: productsFetching || categoriesFetching,
    rows,
    search,
    setSearch,
    categories,
    selectedCategory,
    setSelectedCategory,
    selectedProduct,
    setSelectedProduct,
    updateOpen,
    setUpdateOpen,
    deleteOpen,
    setDeleteOpen,
    deleteProduct,
    deleteLoading: isLoading
  }
}

export default useRussianProducts
