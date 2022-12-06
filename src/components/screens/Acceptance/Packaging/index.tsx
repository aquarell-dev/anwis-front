import { FC } from 'react'

import useMembers from '../hooks/useMembers'

import { ContentContainer } from '../../../ui/Container'
import Loader from '../../../ui/Loader'
import PackagingSlider from './components/PackagingSlider'
import Search from './components/Search'
import Staff from './components/Staff/Staff'

const Packaging: FC = () => {
  const { members, isLoading, isFetching } = useMembers()

  if (isLoading || !members) return <Loader isLoading />

  return (
    <ContentContainer>
      <Search />
      <Staff
        members={members}
        loading={isFetching}
      />
      <PackagingSlider members={members} />
    </ContentContainer>
  )
}

export default Packaging
