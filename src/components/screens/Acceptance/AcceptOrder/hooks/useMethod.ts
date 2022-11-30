import { useEffect, useState } from 'react'

import { SetState } from '../../../../../utils/types'
import { Method } from '../../types'

type UseMethod = {
  method: Method
  setMethod: SetState<Method>
  searchProductByBox: (box: string) => Promise<void>
  searchProductByBarcode: (barcode: string) => Promise<void>
}

const useMethod = ({
  method,
  setMethod,
  searchProductByBox,
  searchProductByBarcode
}: UseMethod) => {
  const [value, setValue] = useState('')

  const search = async () =>
    method === 'barcode' ? await searchProductByBarcode(value) : await searchProductByBox(value)

  useEffect(() => {
    if (!value) return

    const boxMethod = (value.match(new RegExp('^\\d{1,3}-\\d{1,3}-\\d{1,3}$')) || []).length > 0

    if (boxMethod) return setMethod('box')

    return setMethod('barcode')
  }, [value])

  return { search, value, setValue }
}

export default useMethod
