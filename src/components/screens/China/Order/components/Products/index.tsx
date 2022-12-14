import { FC, useState } from 'react'

import { IOrder, IProduct, IProductSpecs } from '../../../../../../features/order/order.types'
import { SetState } from '../../../../../../utils/types'
import { IndigoButton } from '../../../../../ui/Button'
import MutateChinaPopup from '../../../Products/components/MutateChinaPopup'
import { TAdditional } from '../../../types'
import AddProductPopup from '../AddProductPopup'
import ProductGrid from '../ProductGrid'
import ProductSearch from '../ProductSearch'

interface IProductsProps {
  products: IProduct[]
  selectedProducts: IProductSpecs[]
  setSelectedProducts: SetState<IProductSpecs[]>
  additional: TAdditional
  setAdditional: SetState<TAdditional>
  order?: IOrder
}

const Products: FC<IProductsProps> = ({
  products,
  selectedProducts,
  setSelectedProducts,
  additional,
  setAdditional,
  order
}) => {
  const handleOnSelect = (item: IProduct) =>
    !selectedProducts.find(product => product.product.id === item.id) &&
    setSelectedProducts(prev => [
      {
        quantity: 0,
        price_cny: 0,
        price_rub: 0,
        cny_to_rub_course: 0,
        additional_expenses: 0,
        product: item
      },
      ...prev
    ])

  const [addProductsFromDictionaryOpen, setAddProductsFromDictionaryOpen] = useState(false)
  const [createProductOpen, setCreateProductOpen] = useState(false)

  return (
    <>
      <MutateChinaPopup
        open={createProductOpen}
        setOpen={setCreateProductOpen}
        categories={undefined}
        product={null}
      />
      <div className='w-full border-2 border-green-400 mt-12' />
      <div className='flex items-center space-x-3'>
        <div style={{ width: '40%', zIndex: '30' }}>
          <ProductSearch
            products={products}
            handleOnSelect={handleOnSelect}
            selectedProducts={selectedProducts}
          />
        </div>
        <IndigoButton
          customWidth='w-64'
          type={'button'}
          text={'Создать новый товар'}
          handler={() => setCreateProductOpen(true)}
        />
        <IndigoButton
          customWidth='w-64'
          type={'button'}
          text={'Добавить из справочника'}
          handler={() => setAddProductsFromDictionaryOpen(true)}
        />
      </div>
      <div className='flex flex-col space-y-4'>
        <ProductGrid
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          setAdditional={setAdditional}
          additional={additional}
          order={order}
        />
      </div>
      <AddProductPopup
        addProductsFromDictionaryOpen={addProductsFromDictionaryOpen}
        setAddProductsFromDictionaryOpen={setAddProductsFromDictionaryOpen}
        products={products}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
      />
      <div className='w-full border border-2 border-green-400 mb-24' />
    </>
  )
}

export default Products
