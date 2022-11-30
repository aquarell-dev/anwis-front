import { useState } from 'react'

import useNotifications from '../../../../../hooks/useNotifications'

import {
  useGetSpecificationByBarcodeMutation,
  useGetSpecificationByBoxMutation
} from '../../../../../store/api/acceptance.specification.api'
import { Method } from '../../types'

const useSearchProduct = (acceptanceId: number) => {
  const [searchByBox, { data: specificationByBox, isLoading: specificationByBoxLoading }] =
    useGetSpecificationByBoxMutation()

  const [
    searchByBarcode,
    { data: specificationByBarcode, isLoading: specificationByBarcodeLoading }
  ] = useGetSpecificationByBarcodeMutation()

  const [method, setMethod] = useState<Method>('box')

  const { notifyError, notifySuccess } = useNotifications()

  const searchProductByBox = async (box: string) => {
    try {
      await searchByBox({ box_number: box, acceptance: acceptanceId }).unwrap()
    } catch (e) {
      notifyError('Коробка не была найдена')
    }
  }

  const searchProductByBarcode = async (barcode: string) => {
    try {
      await searchByBarcode({ barcode, acceptance: acceptanceId }).unwrap()
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
    method,
    setMethod
  }
}

export default useSearchProduct
