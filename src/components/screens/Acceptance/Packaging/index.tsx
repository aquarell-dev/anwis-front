import { FC, useEffect } from 'react'

import { useListMembersQuery } from '../../../../store/api/staff.api'
import { ContentContainer } from '../../../ui/Container'
import Loader from '../../../ui/Loader'
import PackagingSlider from './components/PackagingSlider'
import Search from './components/Search'
import Staff from './components/Staff/Staff'

const Packaging: FC = () => {
  const { data: members, isLoading, isFetching } = useListMembersQuery(1)

  useEffect(() => {
    if (members) console.log(members.filter(m => m.box))
  }, [members])

  if (isLoading) return <Loader isLoading />

  return (
    <ContentContainer>
      {members ? (
        <>
          <Search />
          <Staff
            members={members}
            loading={isFetching || isLoading}
          />
          <PackagingSlider
            members={members}
            loading={isFetching || isLoading}
          />
        </>
      ) : (
        <p>No Data</p>
      )}
    </ContentContainer>
  )
}

export default Packaging
