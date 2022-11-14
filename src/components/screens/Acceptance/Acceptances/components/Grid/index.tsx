import { DataGrid } from '@mui/x-data-grid';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { IndigoButton } from '../../../../../ui/Button';
import { Columns, Row } from '../../../types';
import { columns } from './columns';

const Grid: FC<{
  rows: Row[] | undefined;
}> = ({ rows }) => {
  const navigate = useNavigate();

  const actualColumns: Columns[] = [
    ...columns,
    {
      field: 'redirect',
      headerName: 'Перейти',
      width: 200,
      renderCell: (params) => (
        <IndigoButton
          type="button"
          text="Перейти"
          handler={() => navigate(`${params.row.id}/`)}
        />
      )
    }
  ];

  return (
    <div className="my-5">
      <DataGrid
        columns={actualColumns}
        autoHeight
        rows={rows ?? []}
      />
    </div>
  );
};

export default Grid;
