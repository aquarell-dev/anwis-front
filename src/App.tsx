import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout from './components/layouts/Layout';
import { Layout as ChinaLayout } from './components/layouts/China/Layout';

import Index from './components/screens/Index';

import Settings from './components/screens/Settings';

import China from './components/screens/China';
import NewOrder from './components/screens/China/Order/NewOrder';
import ExistingOrder from './components/screens/China/Order/ExistingOrder';
import Archive from './components/screens/China/Archive';
import LeftOver from './components/screens/China/Leftover';
import ProductsPage from './components/screens/China/Products';
import { ToastContainer } from 'react-toastify';
import Additional from './components/screens/China/Additional';
import Orders from './components/screens/China/Orders';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Index />} />

            <Route path={'/settings'} element={<Settings />} />

            <Route path={'/china'} element={<ChinaLayout />}>
              <Route index element={<China />} />

              <Route path={'/china/orders/:id'} element={<ExistingOrder />} />
              <Route path={'/china/new-order'} element={<NewOrder />} />
              <Route path={'/china/orders'} element={<Orders />} />
              <Route path={'/china/archive'} element={<Archive />} />

              <Route path={'/china/leftover'} element={<LeftOver />} />

              <Route path={'/china/products'} element={<ProductsPage />} />

              <Route path={'/china/additional'} element={<Additional />} />
            </Route>
          </Route>
        </Routes>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;
