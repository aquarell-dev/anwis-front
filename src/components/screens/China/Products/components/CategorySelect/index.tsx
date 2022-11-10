import { FC } from 'react';
import Select from 'react-select';
import { ICategory, ICreateProduct } from '../../../../../../features/order/order.types';
import { SetState } from '../../../../../../utils/types';

const CategorySelect: FC<{
  categories?: ICategory[];
  label?: string,
  product: ICreateProduct,
  setProduct: SetState<ICreateProduct>
}> = ({ categories, label, product, setProduct }) => {
  const options = categories?.map(category => ({ value: category.id.toString(), label: category.category }));

  return (
    <Select
      className="w-full m-2"
      placeholder='Категория'
      name="category"
      value={product?.category && label && { value: product.category.toString(), label: label }}
      onChange={(value) => value && setProduct(prev => ({ ...prev, category: parseInt(value.value) }))}
      options={options}
    />
  );
};

export default CategorySelect;