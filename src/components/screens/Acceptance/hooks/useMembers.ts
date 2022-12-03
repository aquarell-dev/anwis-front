import { useListMembersQuery } from '../../../../store/api/staff.api'

const useMembers = () => {
  const { data: members, isLoading, isFetching } = useListMembersQuery(undefined)

  return { members, isLoading, isFetching }
}

export default useMembers
