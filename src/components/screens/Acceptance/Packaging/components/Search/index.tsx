import React, { FC, useState } from 'react'

import useMember from '../../../hooks/useMember'
import usePreview from '../../hooks/usePreview'
import useSearch from '../../hooks/useSearch'

import { FancyInput } from '../../../../../ui/Input'
import BarcodePreview from '../BarcodePreview'
import BoxPreview from '../BoxPreview'
import StaffMemberPreview from '../StaffMemberPreview'

const Search: FC = () => {
  const { staff, product, box } = usePreview()
  const analyzeInput = useSearch()

  const { staffFetching, staffOpen, setStaffOpen, fetchedMember, getMemberByUniqueNumber } = staff
  const {
    productByBarcode,
    productByBarcodeFetching,
    productByBarcodeLoading,
    getProductByBarcode,
    productOpen,
    setProductOpen
  } = product
  const { searchBoxByNumber, boxByNumber, boxByNumberLoading, boxOpen, setBoxOpen } = box

  const [search, setSearch] = useState('')

  return (
    <>
      <StaffMemberPreview
        open={staffOpen}
        setOpen={setStaffOpen}
        staffMember={fetchedMember}
      />
      <BarcodePreview
        setOpen={setProductOpen}
        open={productOpen}
        product={productByBarcode}
      />
      <BoxPreview
        open={boxOpen}
        setOpen={setBoxOpen}
        box={boxByNumber}
      />
      <div className='mb-4 w-full flex justify-end'>
        <FancyInput
          value={search}
          placeholder='Поиск'
          handler={e => setSearch(e.target.value)}
          searchIcon
          showLabel
          loading={
            staffFetching ||
            boxByNumberLoading ||
            productByBarcodeLoading ||
            productByBarcodeFetching
          }
          onKeyDown={async e => {
            if (e.key !== 'Enter') return

            const searchType = analyzeInput(search)

            if (!searchType) return

            if (searchType === 'staff') {
              await getMemberByUniqueNumber(search)
              setStaffOpen(true)
            }

            if (searchType === 'barcode') {
              await getProductByBarcode(search)
              setProductOpen(true)
            }

            if (searchType === 'box') {
              await searchBoxByNumber(search)
              setBoxOpen(true)
            }
          }}
        />
      </div>
    </>
  )
}

export default Search
