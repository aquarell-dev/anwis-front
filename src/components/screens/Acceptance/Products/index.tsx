import { FC } from 'react'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'

import useLoading from '../../../../context/GridLoadingContext/hooks/useLoading'
import useCategories from '../../../common/hooks/useCategories'
import useMutateRussianProduct from '../../China/Products/hooks/useMutateRussianProduct'
import useRussianProducts from '../hooks/useRussianProducts'
import useMutateRussianCategories from './hooks/useMutateRussianCategories'

import { AcceptanceCategory } from '../../../../types/acceptance.types'
import Categories from '../../../common/Categories'
import ConfirmationPopup from '../../../ui/ConfirmationPopup'
import { ContentContainer } from '../../../ui/Container'
import Loader from '../../../ui/Loader'
import ProductsGrid from '../components/ProductsGrid'
import CategoryPaymentPopup from './components/CategoryPaymentPopup'
import MutateRussianProduct from './components/MutateRussianProduct'
import Navigation from './components/Navigation'
import RussianCategories from './components/RussianCategories'

const Products: FC = () => {
  const {
    isLoading,
    isFetching,
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
    paymentOpen,
    setPaymentOpen,
    ...rest
  } = useRussianProducts()

  const { categories, products } = rest

  const [update, _delete] = useMutateRussianCategories()

  const russianProduct = useMutateRussianProduct(selectedProduct ?? undefined, categories)

  const { russianProducts } = useLoading()

  const categoriesProps = useCategories<AcceptanceCategory>(update, _delete)

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
        <RussianCategories
          {...rest}
          {...categoriesProps}
          paymentOpen={paymentOpen}
          setPaymentOpen={setPaymentOpen}
          update={update}
        />
        <ProductsGrid
          loading={russianProducts.fetching}
          rows={rows}
          setSelectedProduct={setSelectedProduct}
          setUpdateOpen={setUpdateOpen}
          setDeleteOpen={setDeleteOpen}
          {...rest}
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
        deleteQuestion={`???? ??????????????, ?????? ???????????? ?????????????? "${
          selectedProduct ? selectedProduct.title : ''
        }"`}
        onConfirm={deleteProduct}
        closeOnStart
      />
    </ContentContainer>
  )
}

export default Products
