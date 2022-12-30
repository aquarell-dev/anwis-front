import React, { FC, useEffect, useRef } from 'react'

import useAutoFocus from '../../../../../../hooks/useAutoFocus'
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

  const { ref } = useAutoFocus()

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
        width='min-w-[310px] sm:min-w-[420px] md:min-w-[620px] lg:min-w-[800px] xl:min-w-[1200px] 2xl:min-w-[1600px]'
        height='min-h-[500px] sm:min-h-[620px] md:min-h-[720px] lg:min-h-[900px]'
      />
      <BoxPreview
        open={boxOpen}
        setOpen={setBoxOpen}
        box={boxByNumber}
        width='min-w-[310px] sm:min-w-[420px] md:min-w-[620px] lg:min-w-[800px] xl:min-w-[1200px] 2xl:min-w-[1600px]'
        height='min-h-[540px] sm:min-h-[620px] md:min-h-[720px] lg:min-h-[900px]'
      />
      <div className='mb-4 w-full flex justify-end'>
        <FancyInput
          ref={ref}
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
          customWidth='w-full sm:w-80'
          onKeyDown={async e => (e.key === 'Enter' ? await performSearch() : null)}
        />
      </div>
    </>
  )
}

export default Search
