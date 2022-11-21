import { FC } from 'react'

import useCategories from '../../../common/hooks/useCategories'
import useMutateRussianProduct from '../../China/Products/hooks/useMutateRussianProduct'
import useMutateRussianCategories from './hooks/useMutateRussianCategories'
import useRussianProducts from './hooks/useRussianProducts'

import Categories from '../../../common/Categories'
import ConfirmationPopup from '../../../ui/ConfirmationPopup'
import { ContentContainer } from '../../../ui/Container'
import Loader from '../../../ui/Loader'
import MutateRussianProduct from './components/MutateRussianProduct'
import Navigation from './components/Navigation'
import ProductsGrid from './components/ProductsGrid'

const Products: FC = () => {
  const {
    isLoading,
    rows,
    search,
    setSearch,
    selectedProduct,
    setSelectedProduct,
    updateOpen,
    setUpdateOpen,
    deleteOpen,
    setDeleteOpen,
    deleteProduct,
    deleteLoading,
    ...rest
  } = useRussianProducts()

  const { categories, products } = rest

  const [update, _delete] = useMutateRussianCategories()

  const russianProduct = useMutateRussianProduct(selectedProduct ?? undefined, categories)

  const { isLoading: mutateLoading } = russianProduct

  const categoriesProps = useCategories(update, _delete)

  if (isLoading) return <Loader isLoading />

  return (
    <ContentContainer>
      <Navigation
        products={products}
        search={search}
        setSearch={setSearch}
        setCreateOpen={setUpdateOpen}
      />
      <div className='flex items-start'>
        <Categories
          {...rest}
          {...categoriesProps}
        />
        <ProductsGrid
          loading={deleteLoading || mutateLoading}
          rows={rows}
          setSelectedProduct={setSelectedProduct}
          setUpdateOpen={setUpdateOpen}
          setDeleteOpen={setDeleteOpen}
          products={products}
          categories={categories}
        />
      </div>
      <MutateRussianProduct
        open={updateOpen}
        categories={categories}
        setOpen={setUpdateOpen}
        russianProduct={russianProduct}
      />
      <ConfirmationPopup
        open={deleteOpen}
        setOpen={setDeleteOpen}
        deleteQuestion={`Вы уверены, что хотите удалить "${
          selectedProduct ? selectedProduct.title : ''
        }"`}
        onConfirm={deleteProduct}
        closeOnStart
      />
    </ContentContainer>
  )
}

export default Products
