import { FC } from 'react'

import useLoading from '../../../../context/GridLoadingContext/hooks/useLoading'
import useRussianProducts from '../hooks/useRussianProducts'
import useCreateAcceptance, { NavigationAfter } from './hooks/useCreateAcceptance'

import { ContentContainer } from '../../../ui/Container'
import Loader from '../../../ui/Loader'
import ProductsGrid from '../components/ProductsGrid'
import AcceptanceHeader from './components/AcceptanceHeader'
import BottomPanel from './components/BottomPanel'
import CreateAcceptanceFields from './components/CreateAcceptanceFields'

const CreateAcceptance: FC = () => {
  const {
    createAcceptance,
    isLoading: createAcceptanceLoading,
    acceptanceFields,
    setAcceptanceFields
  } = useCreateAcceptance()

  const { isLoading: russianProductsLoading, ...rest } = useRussianProducts()

  const { selection } = rest

  const { russianProducts } = useLoading()

  if (createAcceptanceLoading || russianProductsLoading) return <Loader isLoading />

  return (
    <ContentContainer>
      <AcceptanceHeader />
      <CreateAcceptanceFields
        acceptanceFields={acceptanceFields}
        setAcceptanceFields={setAcceptanceFields}
      />
      <ProductsGrid
        loading={russianProducts.fetching}
        deleteCols={['delete', 'update']}
        customPaginationInitial={10}
        {...rest}
      />
      <BottomPanel
        createAcceptance={async (navigation?: NavigationAfter) =>
          createAcceptance(
            {
              title: undefined,
              ...acceptanceFields,
              custom_id: null,
              tasks: [],
              documents: [],
              specifications: (selection as number[]).map(id => ({
                id: undefined,
                product: id,
                cost: 0,
                quantity: 0,
                boxes: [],
                reasons: []
              }))
            },
            navigation
          )
        }
      />
    </ContentContainer>
  )
}

export default CreateAcceptance
