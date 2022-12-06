import { useState } from 'react'

import useNotifications from '../../../../../hooks/useNotifications'

import { useLazyGetBoxByBoxNumberQuery } from '../../../../../store/api/acceptance.box.api'
import {
  useGetSpecificationByBarcodeMutation,
  useGetSpecificationByBoxMutation
} from '../../../../../store/api/acceptance.specification.api'
import { Method } from '../../types'

const useMemberSearch = () => {
  const [searchByBox, { data: specificationByBox, isLoading: specificationByBoxLoading }] =
    useGetSpecificationByBoxMutation()

  const [
    searchByBarcode,
    { data: specificationByBarcode, isLoading: specificationByBarcodeLoading }
  ] = useGetSpecificationByBarcodeMutation()

  const [getBoxByNumber, { data: boxByNumber, isLoading: boxByNumberLoading }] =
    useLazyGetBoxByBoxNumberQuery()

  const [method, setMethod] = useState<Method>('box')

  const { notifyError, notifySuccess } = useNotifications()

  const searchProductByBox = async (box: string) => {
    try {
      await searchByBox({ box_number: box }).unwrap()
    } catch (e) {
      notifyError('Коробка не была найдена')
    }
  }

  const searchProductByBarcode = async (barcode: string) => {
    try {
      await searchByBarcode({ barcode }).unwrap()
    } catch (e) {
      notifyError('Коробка не была найдена')
    }
  }

  const searchBoxByNumber = async (box: string) => {
    try {
      const result = await getBoxByNumber(box)
      return result.data
    } catch (e) {
      notifyError('Коробка не была найдена')
    }
  }

  return {
    searchProductByBox,
    specificationByBox,
    specificationByBoxLoading,
    searchProductByBarcode,
    specificationByBarcode,
    specificationByBarcodeLoading,
    searchBoxByNumber,
    boxByNumber,
    boxByNumberLoading,
    method,
    setMethod
  }
}

export default useMemberSearch
