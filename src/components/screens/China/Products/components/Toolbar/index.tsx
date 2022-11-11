import React, { FC } from 'react';
import { GridSelectionModel, GridToolbarContainer } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useDeleteProductsMutation } from '../../../../../../store/api/product.api';
import useNotifications from '../../../../../../hooks/useNotifications';
import { SpinnerComponent } from 'react-element-spinner';

const Toolbar: FC<{ selectionModel: GridSelectionModel }> = ({ selectionModel }) => {
  const [deleteProducts, { isLoading }] = useDeleteProductsMutation();
  const { notifySuccess, notifyError } = useNotifications();

  return (
    <GridToolbarContainer>
      <Button
        variant={'contained'}
        sx={{
          m: 1,
          width: '200px'
        }}
        onClick={
          () => deleteProducts(selectionModel as number[])
            .unwrap()
            .then(() => notifySuccess('Товары были удалены'))
            .catch(() => notifyError('Товары не были удалены'))
        }
      >
        <SpinnerComponent loading={isLoading} position={'inline'} />
        {!isLoading && <p>Удалить выбранные</p>}
      </Button>
    </GridToolbarContainer>
  );
};

export default Toolbar;
