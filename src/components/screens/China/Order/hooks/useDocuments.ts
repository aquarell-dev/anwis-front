import { useEffect, useState } from 'react'
import { UseFormSetValue } from 'react-hook-form'

import { useTypedSelector } from '../../../../../hooks/useTypedSelector'

import { IOrder } from '../../../../../features/order/order.types'
import { IOrderForm } from '../../types'

const useDocuments = (setValue: UseFormSetValue<IOrderForm>, order?: IOrder) => {
  const [documents, setDocuments] = useState<number[]>(
    order?.documents ? order.documents.map(document => document.id) : []
  )

  const { lastUpdatedDocument } = useTypedSelector(state => state.document)

  useEffect(() => {
    if (lastUpdatedDocument) setDocuments(prev => [...prev, lastUpdatedDocument.id])
  }, [lastUpdatedDocument])

  useEffect(() => setValue('documents', documents), [documents])
}

export default useDocuments
