import React, { FC, useState } from 'react';

import { IndigoButton } from '../../../../../ui/Button';
import { FancyInput } from '../../../../../ui/Input';

import { SetState } from '../../../../../../utils/types';

import { FiPlusCircle } from 'react-icons/fi';
import MutateProductPopup from '../CreateProductPopup';
import { ICategory } from '../../../../../../features/order/order.types';
import CategoryPopup from '../CategoryPopup';

const Navigation: FC<{
  search: string;
  setSearch: SetState<string>;
  categories?: ICategory[];
}> = ({ search, setSearch, categories }) => {
  const [createProductOpen, setCreateProductOpen] = useState(false);
  const [createCategoryOpen, setCreateCategoryOpen] = useState(false);

  return (
    <>
      <div className="my-2 flex items-center space-x-4">
        <IndigoButton
          type={'button'}
          text={'Товар'}
          icon={<FiPlusCircle size='18'/>}
          handler={() => setCreateProductOpen(true)}
        />
        <IndigoButton
          type={'button'}
          text={'Категория'}
          icon={<FiPlusCircle size='18'/>}
          handler={() => setCreateCategoryOpen(true)}
        />
        <FancyInput
          value={search}
          handler={(e) => setSearch(e.target.value)}
          placeholder={'Поиск продуктов'}
        />
      </div>
      <MutateProductPopup
        open={createProductOpen}
        setOpen={setCreateProductOpen}
        categories={categories}
      />
      <CategoryPopup
        open={createCategoryOpen}
        setOpen={setCreateCategoryOpen}
      />
    </>
  );
};

export default Navigation;