import { FC } from 'react';
import { ContentContainer } from '../../../ui/Container';
import ProductsGrid from './components/ProductsGrid';

const Products: FC = () => {
  return (
    <ContentContainer>
      <ProductsGrid />
    </ContentContainer>
  );
};

export default Products;
