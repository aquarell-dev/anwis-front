import React, { FC, useEffect } from 'react'

import useSearch from '../../hooks/useSearch'

import { FancyInput } from '../../../../../ui/Input'
import BarcodePreview from '../BarcodePreview'
import BoxPreview from '../BoxPreview'
import StaffMemberPreview from '../StaffMemberPreview'

const Search: FC = () => {
  const { performSearch, search, setSearch, box, staff, product } = useSearch()

  const { staffFetching, staffOpen, setStaffOpen, fetchedMember } = staff
  const {
    productByBarcode,
    productByBarcodeFetching,
    productByBarcodeLoading,
    productOpen,
    setProductOpen
  } = product
  const { boxByNumber, boxByNumberLoading, boxOpen, setBoxOpen } = box

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
          customWidth='w-40 sm:w-80'
          onKeyDown={async e => (e.key === 'Enter' ? await performSearch() : null)}
        />
      </div>
    </>
  )
}

export default Search
