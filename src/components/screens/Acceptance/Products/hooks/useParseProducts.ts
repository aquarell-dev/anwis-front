import { useEffect, useState } from 'react'

import useNotifications from '../../../../../hooks/useNotifications'
import useCreateMultipleProducts from './useCreateMultipleProducts'

import readXlsxFile from 'read-excel-file'

import { AcceptanceProduct, CreateAcceptanceProduct } from '../../../../../types/acceptance.types'
import { SetState } from '../../../../../utils/types'
import { DragFile } from '../../../../ui/FileDragNDrop'

const getColor = (article: string): string => (article.includes('-') ? article.split('-')[1] : '-')

const useParseProducts = (
  open: boolean,
  setOpen: SetState<boolean>,
  products: AcceptanceProduct[] | undefined
) => {
  const [files, setFiles] = useState<DragFile[]>([])

  const [disabled, setDisabled] = useState({
    newProducts: true,
    chinaProducts: true
  })

  const { notifyError } = useNotifications()

  const { createMultipleProducts, isLoading } = useCreateMultipleProducts()

  useEffect(() => {
    if (!open) setDisabled({ newProducts: true, chinaProducts: true })
  }, [open])

  useEffect(() => {
    if (files.length > 0) setDisabled({ newProducts: false, chinaProducts: false })
  }, [files])

  const parseNewProducts = () => {
    if (!products) return notifyError('Не указаны товары')

    readXlsxFile(files[0])
      .then(async rows => {
        const specs = products.map(p => ({
          size: p.size.split('/')[0], // using size cause russian size and china size are the same
          article: p.linked_china_product_article // using
        }))

        const newProducts: CreateAcceptanceProduct[] = rows
          .slice(1)
          .filter(row => {
            const rowSpecs = { size: String(row[5]).split('/')[0], article: row[3].toString() }

            let doesRowSuitUs = true

            specs.forEach(spec => {
              if (spec.article === rowSpecs.article && spec.size === rowSpecs.size)
                doesRowSuitUs = false // if at least one is true then the product already exists
            })

            // return specs.includes(rowSpecs)

            return doesRowSuitUs
          })
          .map(row => ({
            article: row[4].toString(),
            size: row[5].toString(),
            title: row[1].toString(),
            barcode: row[6].toString(),
            brand: row[0].toString(),
            color: getColor(row[3].toString()),
            linked_china_product_article: row[3].toString()
          }))

        await createMultipleProducts(newProducts)
      })
      .catch(e => notifyError('Произошла ошибка при парсинге'))
      .finally(() => setOpen(false))
  }

  return {
    disabled,
    setFiles,
    parseNewProducts,
    isLoading
  }
}

export default useParseProducts
