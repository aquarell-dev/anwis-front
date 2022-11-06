import { FC } from 'react';
import Select from 'react-select';
import { ICategory, ICreateProduct } from '../../../../../../features/order/order.types';
import { SetState } from '../../../../../../utils/types';

const CategorySelect: FC<{ categories?: ICategory[]; setProduct: SetState<ICreateProduct> }> = ({ categories, setProduct }) => {
  const options = categories?.map(category => ({ value: category.id.toString(), label: category.category }));

  return (
    <Select
      className="w-60"
      placeholder='Категория'
      name="category"
      onChange={(value) => value && setProduct(prev => ({ ...prev, category: parseInt(value.value) }))}
      options={options}
    />
  );
};

export default CategorySelect;