import { useState } from 'react'

import useNotifications from '../../../../../hooks/useNotifications'
import usePreview from './usePreview'
import { QrCode, allowedQrCodes } from './useQrCode'

type SearchInputResult = 'barcode' | 'box' | 'staff'

const useSearch = () => {
  const preview = usePreview()

  const [search, setSearch] = useState('')

  const { notifyError } = useNotifications()

  const analyzeInput = (input: string): SearchInputResult | null => {
    if (input.match(/^\d{1,4}$/)) return 'staff'

    if (input.match(/^\d{5,}$/)) return 'barcode'

    if (input.match(/^\d{1,3}-\d{1,3}-\d{1,3}$/)) return 'box'

    if (allowedQrCodes.includes(search as QrCode)) {
      notifyError('Сначала Введите Цифру')
      return null
    }

    notifyError('Значение не распознано')

    return null
  }

  const performSearch = async () => {
    const searchType = analyzeInput(search)

    if (!searchType) return

    if (searchType === 'staff') {
      await preview.staff.getMemberByUniqueNumber(search)
      preview.staff.setStaffOpen(true)
    }

    if (searchType === 'barcode') {
      await preview.product.getProductByBarcode(search)
      preview.product.setProductOpen(true)
    }

    if (searchType === 'box') {
      await preview.box.searchBoxByNumber(search)
      preview.box.setBoxOpen(true)
    }
  }

  return { performSearch, search, setSearch, ...preview }
}

export default useSearch
