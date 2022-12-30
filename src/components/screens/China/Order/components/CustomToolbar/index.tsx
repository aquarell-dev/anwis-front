import { FC } from 'react';

import { GridSelectionModel, GridToolbarContainer } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import { IProductSpecs } from '../../../../../../features/order/order.types';
import { SetState } from '../../../../../../utils/types';

const CustomToolbar: FC<{
  selectionModel: GridSelectionModel,
  selectedProducts: IProductSpecs[],
  setSelectedProducts: SetState<IProductSpecs[]>
}> = ({ selectionModel, selectedProducts, setSelectedProducts }) => {
  return (
    <GridToolbarContainer>
      <Button
        variant={'contained'}
        sx={{
          m: 1
        }}
        onClick={() => setSelectedProducts(
          selectedProducts.filter(
            selectedProduct => !selectionModel.includes(selectedProduct.product.id)
          )
        )}
      >
        Удалить выбранные
      </Button>
    </GridToolbarContainer>
  );
};

export default CustomToolbar;