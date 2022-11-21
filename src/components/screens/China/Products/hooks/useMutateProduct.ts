import { useEffect, useState } from 'react'

import useNotifications from '../../../../../hooks/useNotifications'
import { useTypedSelector } from '../../../../../hooks/useTypedSelector'

import { ICategory, ICreateProduct, IProduct } from '../../../../../features/order/order.types'
import {
  useCreateProductMutation,
  useUpdatePartialProductMutation
} from '../../../../../store/api/product.api'

const initialState: ICreateProduct = {
  title: '',
  color: '',
  brand: '',
  article: '',
  size: '',
  url: '',
  category: undefined,
  photo: undefined
}

const useMutateProduct = (product?: IProduct, categories?: ICategory[]) => {
  const [currentProduct, setCurrentProduct] = useState<ICreateProduct>(initialState)

  useEffect(() => {
    if (product)
      setCurrentProduct({
        ...product,
        photo: undefined,
        category: categories?.find(category => category.category === product.category)?.id
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product])

  const { notifyError, notifySuccess } = useNotifications()

  const update = !!product

  const [create, _] = useCreateProductMutation()
  const [updateProduct, updateResult] = useUpdatePartialProductMutation()

  const { lastUpdatedDocument } = useTypedSelector(state => state.document)

  const mutate = () => {
    if (update) {
      updateProduct({ ...currentProduct, photo: lastUpdatedDocument?.id, id: product.id })
        .unwrap()
        .then(() => {
          notifySuccess('Товар был обновлен')
          setCurrentProduct(initialState)
        })
        .catch(() => notifyError('Товар не был обновлен'))
      return
    }

    create({ ...currentProduct, photo: lastUpdatedDocument?.id })
      .unwrap()
      .then(() => {
        notifySuccess('Товар создан')
        setCurrentProduct(initialState)
      })
      .catch(() => notifyError('Товар не создан'))
  }

  return {
    mutate,
    currentProduct,
    setCurrentProduct,
    categoryLabel: product?.category,
    defaultPhoto: product?.photo,
    update
  }
}

export default useMutateProduct
