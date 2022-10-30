import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout from './components/layouts/Layout';
import { Layout as ChinaLayout } from './components/layouts/China/Layout';

import Index from './components/screens/Index';

import Settings from './components/screens/Settings';

import China from './components/screens/China';
import NewOrder from './components/screens/China/NewOrder';
import ExistingOrder from './components/screens/China/ExistingOrder';
import Archive from './components/screens/China/Archive';


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
              <Route path={'/china/archive'} element={<Archive />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
