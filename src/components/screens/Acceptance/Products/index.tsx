import { FC } from 'react';

import useRussianProducts from './hooks/useRussianProducts';

import { ContentContainer } from '../../../ui/Container';
import Loader from '../../../ui/Loader';
import Navigation from './components/Navigation';
import ProductsGrid from './components/ProductsGrid';

const Products: FC = () => {
  const { isLoading, rows } = useRussianProducts();

  if (isLoading) return <Loader isLoading />;

  return (
    <ContentContainer>
      <Navigation />
      <ProductsGrid rows={rows} />
    </ContentContainer>
  );
};

export default Products;
