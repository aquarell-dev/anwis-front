import { useListMembersQuery } from '../../../../store/api/staff.api'

const useMembers = () => {
  const { data: members, isLoading, isFetching } = useListMembersQuery(1)

  return { members, isLoading, isFetching }
}

export default useMembers
