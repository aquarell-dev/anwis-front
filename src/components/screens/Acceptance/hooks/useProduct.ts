import useMutate from '../../../../hooks/useMutate'

import { useLazyGetRussianProductByBarcodeQuery } from '../../../../store/api/acceptance.product.api'

const useProduct = () => {
  const [
    _getProductByBarcode,
    {
      isLoading: productByBarcodeLoading,
      isFetching: productByBarcodeFetching,
      data: productByBarcode
    }
  ] = useLazyGetRussianProductByBarcodeQuery()

  const mutate = useMutate()

  const getProductByBarcode = async (barcode: string) => {
    await mutate(async () => await _getProductByBarcode(barcode).unwrap(), {
      errorMessage: 'Товар не найден'
    })
  }

  return {
    getProductByBarcode,
    productByBarcodeLoading,
    productByBarcodeFetching,
    productByBarcode
  }
}

export default useProduct
