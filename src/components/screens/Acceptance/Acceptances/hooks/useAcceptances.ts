import { useListAcceptancesQuery } from '../../../../../store/api/acceptance.api'
import { ListAcceptance } from '../../../../../types/acceptance.types'
import { getFourDigitId } from '../../../../../utils'
import { Row } from '../../types'

const useAcceptances = () => {
  const { data, isLoading, isFetching, error } = useListAcceptancesQuery(null)

  const getQuantity = (acceptance: ListAcceptance): number =>
    acceptance.specifications.reduce(
      (prev, current) => ({
        ...current,
        quantity: prev.quantity + current.quantity
      }),
      { quantity: 0 }
    ).quantity ?? 0

  const getTotal = (acceptance: ListAcceptance): number =>
    acceptance.specifications.reduce(
      (prev, current) => ({
        ...current,
        cost: prev.cost + current.cost
      }),
      { cost: 0 }
    ).cost ?? 0

  const rows: Row[] | undefined = data?.map(acceptance => ({
    id: acceptance.id,
    title: acceptance.title || `Приемка ${getFourDigitId(acceptance.id)}`,
    created_at: acceptance.created_at,
    from_order: acceptance.from_order,
    categories:
      [
        ...new Set(acceptance.specifications.map(s => s.product.category?.category).filter(Boolean))
      ].join(', ') ?? '',
    total: getTotal(acceptance),
    quantity: getQuantity(acceptance)
  }))

  return { acceptances: data, isLoading, isFetching, error, rows, getTotal, getQuantity }
}

export default useAcceptances
