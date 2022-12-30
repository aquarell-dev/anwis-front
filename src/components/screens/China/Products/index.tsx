import { FC, ReactNode } from 'react'

import useCategories from '../../../common/hooks/useCategories'
import useMutateCategory from './hooks/useMutateCategory'
import useProductMutations from './hooks/useProductMutations'
import useProducts from './hooks/useProducts'

import Categories from '../../../common/Categories'
import ConfirmationPopup from '../../../ui/ConfirmationPopup'
import { ContentContainer } from '../../../ui/Container'
import Loader from '../../../ui/Loader'
import CreateSameProduct from './components/CreateSameProduct'
import DefaultProductGrid from './components/DefaultProductGrid'
import MutateChinaPopup from './components/MutateChinaPopup'
import Navigation from './components/Navigation'

const ProductsPage: FC<{
  customGrid?: ReactNode
}> = ({ customGrid }) => {
  const {
    products,
    filteredProducts,
    selectedCategory,
    setSelectedCategory,
    search,
    setSearch,
    categories,
    isLoading,
    error
  } = useProducts()

  const { popups, values, onDelete, onCommit } = useProductMutations(products, categories)

  const {
    productChangeOpen,
    productDeleteOpen,
    setProductDeleteOpen,
    setProductChangeOpen,
    createSameOpen,
    setCreateSameOpen
  } = popups

  const { productUpToChange, productUpToDeletion, size, setSize } = values

  const [update, _delete] = useMutateCategory()

  const categoriesProps = useCategories(update, _delete)

  if (isLoading) return <Loader isLoading={isLoading} />

  if (error) return <p>Error...</p>

  return (
    <ContentContainer>
      <Navigation
        search={search}
        setSearch={setSearch}
        categories={categories}
      />
      {products && (
        <div className='flex space-x-8'>
          <Categories
            {...categoriesProps}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          {customGrid ? (
            customGrid
          ) : (
            <DefaultProductGrid
              values={values}
              popups={popups}
              products={products}
              filteredProducts={filteredProducts}
            />
          )}
        </div>
      )}
      <MutateChinaPopup
        open={productChangeOpen}
        setOpen={setProductChangeOpen}
        categories={categories}
        product={productUpToChange}
      />
      <ConfirmationPopup
        open={productDeleteOpen}
        setOpen={setProductDeleteOpen}
        deleteQuestion={`Вы уверены, что хотите удалить ${productUpToDeletion?.content ?? ''}`}
        onConfirm={onDelete}
      />
      <CreateSameProduct
        onCommit={onCommit}
        open={createSameOpen}
        setOpen={setCreateSameOpen}
        size={size}
        setSize={setSize}
      />
    </ContentContainer>
  )
}

export default ProductsPage
