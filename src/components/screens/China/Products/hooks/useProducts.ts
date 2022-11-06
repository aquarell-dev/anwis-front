import { useEffect, useState } from 'react';
import { useListCategoriesQuery } from '../../../../../store/api/category.api';
import { useListProductsQuery } from '../../../../../store/api/product.api';


const useProducts = () => {
  const { data: products, isLoading: productsLoading, error: productsError } = useListProductsQuery(null);
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useListCategoriesQuery(null);

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [search, setSearch] = useState('');

  let isLoading = false;
  let error = false;

  if (productsLoading || categoriesLoading) isLoading = true;
  if (productsError || categoriesError) error = true;

  useEffect(() => {
    if (!search) return setFilteredProducts(products);
    setFilteredProducts(prev => prev?.filter(product => product.title.includes(search)));
  }, [search]);

  useEffect(() => {
    setFilteredProducts(products);
    if (!selectedCategory) return setFilteredProducts(products);
    setFilteredProducts(products?.filter(product => product.category === selectedCategory));
  }, [selectedCategory]);

  return { products, filteredProducts, setFilteredProducts, selectedCategory, setSelectedCategory, search, setSearch, categories, isLoading, error };
};

export default useProducts;
