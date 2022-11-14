import { DataGrid } from '@mui/x-data-grid';
import { FC } from 'react';
import { Acceptance } from '../../../../../../types/acceptance.types';
import { AcceptanceProductRow } from '../../../types';
import { fields } from './columns';

const AcceptanceProductGrid: FC<{ acceptance: Acceptance }> = ({ acceptance }) => {
  const rows: AcceptanceProductRow[] = acceptance.products.map((product) => ({
    id: product.product.id,
    title: product.product.title,
    article: product.product.article,
    brand: product.product.brand,
    size: product.product.size,
    quantity: product.quantity,
    additional_expenses: product.additional_expenses,
    price_cny: product.price_cny,
    price_rub: product.price_rub,
    photo: product.product.photo
  }));

  return (
    <DataGrid
      columns={fields}
      rows={rows}
      autoHeight
    />
  );
};

export default AcceptanceProductGrid;
