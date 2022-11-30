import { useListAcceptancesQuery } from '../../../../../store/api/acceptance.api'
import { getFourDigitId } from '../../../../../utils'
import { Row } from '../../types'

const useAcceptances = () => {
  const { data, isLoading, error } = useListAcceptancesQuery(null)

  const rows: Row[] | undefined = data?.map(acceptance => ({
    id: acceptance.id,
    title: acceptance.title || `Приемка ${getFourDigitId(acceptance.id)}`,
    created_at: acceptance.created_at,
    from_order: acceptance.from_order,
    categories:
      [...new Set(acceptance.specifications.map(s => s.product.category).filter(Boolean))].join(
        ', '
      ) ?? '',
    total:
      acceptance.specifications.reduce(
        (prev, current) => ({
          ...current,
          cost: prev.cost + current.cost
        }),
        { cost: 0 }
      ).cost ?? 0,
    quantity:
      acceptance.specifications.reduce(
        (prev, current) => ({
          ...current,
          quantity: prev.quantity + current.quantity
        }),
        { quantity: 0 }
      ).quantity ?? 0
  }))

  return { acceptances: data, isLoading, error, rows }
}

export default useAcceptances
