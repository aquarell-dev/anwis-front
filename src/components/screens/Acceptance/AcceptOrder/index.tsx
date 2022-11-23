import { FC } from 'react'
import { useParams } from 'react-router-dom'

import useUpdateAcceptanceProducts from '../hooks/useUpdateAcceptanceProducts'
import useProducts from './hooks/useProducts'

import { ContentContainer } from '../../../ui/Container'
import Loader from '../../../ui/Loader'
import AcceptanceNavigation from './components/AcceptanceNavigation'
import AcceptanceProductGrid from './components/AcceptanceProductGrid'
import Management from './components/Management'

const AcceptOrder: FC = () => {
  const { id } = useParams()

  const {
    selection,
    setSelection,
    acceptance,
    isLoading,
    isFetching,
    rows,
    products,
    setProducts,
    boxesCount,
    setBoxesCount
  } = useProducts(id)

  const { updateAcceptanceProducts, updateAcceptanceProduct, updateFetching } =
    useUpdateAcceptanceProducts({
      acceptance,
      products,
      selection
    })

  if (isLoading) return <Loader isLoading />

  if (!acceptance) return <p>error</p>

  return (
    <ContentContainer>
      <AcceptanceNavigation
        acceptance={acceptance}
        selection={selection}
      />
      <Management acceptance={acceptance} />
      <AcceptanceProductGrid
        boxesCount={boxesCount}
        setBoxesCount={setBoxesCount}
        rows={rows}
        onUpdate={async () => await updateAcceptanceProducts()}
        onDetailedUpdate={async id => await updateAcceptanceProduct(id)}
        setProducts={setProducts}
        selection={selection}
        setSelection={setSelection}
        loading={isFetching || updateFetching}
      />
    </ContentContainer>
  )
}

export default AcceptOrder
