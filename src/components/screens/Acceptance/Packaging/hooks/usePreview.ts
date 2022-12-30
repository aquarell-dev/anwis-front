import { useState } from 'react'

import useMemberSearch from '../../AcceptOrder/hooks/useMemberSearch'
import useMember from '../../hooks/useMember'
import useProduct from '../../hooks/useProduct'

const usePreview = () => {
  const { open, setOpen, memberFetching, fetchedMember, getMemberByUniqueNumber } = useMember()

  const product = useProduct()

  const { searchBoxByNumber, boxByNumber, boxByNumberLoading } = useMemberSearch()

  const [productOpen, setProductOpen] = useState(false)
  const [boxOpen, setBoxOpen] = useState(false)

  return {
    staff: {
      getMemberByUniqueNumber,
      fetchedMember,
      staffOpen: open,
      setStaffOpen: setOpen,
      staffFetching: memberFetching
    },
    product: {
      ...product,
      productOpen,
      setProductOpen
    },
    box: {
      searchBoxByNumber,
      boxByNumber,
      boxByNumberLoading,
      boxOpen,
      setBoxOpen
    }
  }
}

export default usePreview
