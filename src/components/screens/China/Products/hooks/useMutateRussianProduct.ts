import { useEffect, useState } from 'react'

import useNotifications from '../../../../../hooks/useNotifications'
import { useTypedSelector } from '../../../../../hooks/useTypedSelector'
import usePartialUpdateRussianProduct from './usePartialUpdateRussianProduct'

import { ICategory } from '../../../../../features/order/order.types'
import { useCreateRussianProductMutation } from '../../../../../store/api/acceptance.product.api'
import { AcceptanceProduct, CreateAcceptanceProduct } from '../../../../../types/acceptance.types'

const initialState: CreateAcceptanceProduct = {
  title: '',
  color: '',
  brand: '',
  article: '',
  size: '',
  category: undefined,
  photo: undefined,
  last_cost: 0,
  barcode: undefined,
  total_left: undefined,
  linked_china_product_article: ''
}

const useMutateRussianProduct = (product?: AcceptanceProduct, categories?: ICategory[]) => {
  const [currentProduct, setCurrentProduct] = useState<CreateAcceptanceProduct>(initialState)

  useEffect(() => {
    if (!product) return

    setCurrentProduct({
      ...product,
      photo: undefined,
      category: categories?.find(category => category.category === product.category)?.id
    })
  }, [product])

  const { notifyError, notifySuccess } = useNotifications()

  const { updateProduct, isLoading: updateLoading } = usePartialUpdateRussianProduct()
  const [createProduct, { isLoading: createLoading }] = useCreateRussianProductMutation()

  const { lastUpdatedDocument } = useTypedSelector(state => state.document)

  const update = !!product

  const mutate = () => {
    if (update) {
      updateProduct({ ...currentProduct, id: product.id, photo: lastUpdatedDocument?.id })
      return
    }

    createProduct({ ...currentProduct, photo: lastUpdatedDocument?.id ?? undefined })
      .unwrap()
      .then(() => notifySuccess('Товар создан'))
      .catch(() => notifyError('Товар не создан'))
  }

  return {
    mutate,
    update,
    currentProduct,
    setCurrentProduct,
    defaultPhoto: product?.photo,
    categoryLabel: product?.category,
    isLoading: updateLoading || createLoading,
    initialState
  }
}

export default useMutateRussianProduct
