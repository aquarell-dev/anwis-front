import ProductsPage from '../../../Products';
import { IndigoButton } from '../../../../../ui/Button';
import Popup from '../../../../../ui/Popup';
import React, { FC, useState } from 'react';
import { DataGrid, GridSelectionModel } from '@mui/x-data-grid';
import { AddProductProps, Buffer, CustomGridProps } from '../../../types';
import { fields } from './fields';


const CustomGrid: FC<CustomGridProps> = ({ products, selectionModel, setSelectionModel, buffer, setBuffer }) => {
  return (
    <DataGrid
      autoHeight
      checkboxSelection
      density={'comfortable'}
      columns={fields}
      disableSelectionOnClick
      rows={buffer}
      onSelectionModelChange={selectionModel => setSelectionModel(selectionModel)}
      selectionModel={selectionModel}
      initialState={{
        sorting: {
          sortModel: [{ field: 'id', sort: 'asc' }],
        },
      }}
      onCellEditCommit={params => {
        const { id, field, value } = params;

        const intId = parseInt(id.toString());

        if (field !== 'quantity') return;

        const product = products.find(product => product.id === intId);

        if (!product) return;

        let intValue = parseInt(value);

        setBuffer(prev => prev.map(buff => buff.id === id ? {
          ...product,
          quantity: !isNaN(intValue) ? intValue : 0
        } : buff));
      }}
    />
  );
};


const AddProductPopup: FC<AddProductProps> = props => {
  const {
    addProductsFromDictionaryOpen,
    setAddProductsFromDictionaryOpen,
    products,
    setSelectedProducts
  } = props;

  const [buffer, setBuffer] = useState<Buffer[]>(products.map(product => ({
    ...product,
    quantity: 0,
  })));
  const [selected, setSelected] = useState<GridSelectionModel>([]);

  return (
    <Popup
      state={addProductsFromDictionaryOpen}
      setState={setAddProductsFromDictionaryOpen}
      width='w-[95%]'
      height='h-[90%]'
      bgColor='bg-slate-100'
    >
      <div className="mx-4">
        <ProductsPage
          customGrid={<CustomGrid
            buffer={buffer}
            setBuffer={setBuffer}
            selectionModel={selected}
            setSelectionModel={setSelected}
            products={products}
          />}
        />
        <div className="absolute left-0 bottom-0 m-4">
          <IndigoButton
            type={'button'}
            text={'Выбрать'}
            handler={() => {
              selected.forEach(selectedProduct => setSelectedProducts(prev => {
                const product = products.find(product => product.id === selectedProduct);
                const bufferProduct = buffer.find(product => product.id === selectedProduct);

                if (!product && !bufferProduct) return prev;

                if (bufferProduct) {
                  const { quantity, ...buffer } = bufferProduct;
                  return [...prev, {
                    quantity,
                    price_cny: 0,
                    price_rub: 0,
                    cny_to_rub_course: 0,
                    additional_expenses: 0,
                    product: buffer
                  }];
                }

                if (product)
                  return [...prev, {
                    quantity: 0,
                    price_cny: 0,
                    price_rub: 0,
                    cny_to_rub_course: 0,
                    additional_expenses: 0,
                    product
                  }];

                return prev
              }));

              setAddProductsFromDictionaryOpen(false);
            }}
          />
        </div>
      </div>
    </Popup>
  );
};

export default AddProductPopup;
