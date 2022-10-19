import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout from './components/layouts/Layout';

import Index from './components/screens/Index';
import Settings from './components/screens/Settings';
import China from './components/screens/China';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Index />} />

            <Route path={'/settings'} element={<Settings />} />

            <Route path={'/china'} element={<China />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
