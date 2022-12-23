import { useEffect, useState } from 'react'

import useNotifications from '../../../../../hooks/useNotifications'
import useProduct from '../../hooks/useProduct'
import useManageSpecifications from './useManageSpecifications'
import useSound from 'use-sound'

import boopSound from '../../../../../assets/sounds/AddProductByBarcode/barcode-add.mp3'

const useAddByBarcode = (acceptanceId: number) => {
  const [barcode, setBarcode] = useState('')

  const { createSpecifications, isLoading } = useManageSpecifications(acceptanceId)

  const { productByBarcode, ...rest } = useProduct()

  const { notifyError, notifySuccess } = useNotifications()

  const [play] = useSound(boopSound)

  useEffect(() => {
    if (productByBarcode) {
      const addSpecs = async () => await createSpecifications([productByBarcode.id])

      addSpecs()
        .then(() => {
          notifySuccess('Товар был успешно добавлен')
          play()
        })
        .catch(e => notifyError('Произошла ошибка при добавлении товара'))
    }
  }, [productByBarcode])

  return { ...rest, barcode, setBarcode, isLoading }
}

export default useAddByBarcode
