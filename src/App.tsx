import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { Layout as AcceptanceLayout } from './components/layouts/Acceptance/Layout'
import { Layout as ChinaLayout } from './components/layouts/China/Layout'
import Layout from './components/layouts/Layout'
import Acceptance from './components/screens/Acceptance'
import AcceptOrder from './components/screens/Acceptance/AcceptOrder'
import Acceptances from './components/screens/Acceptance/Acceptances'
import CreateAcceptance from './components/screens/Acceptance/CreateAcceptance'
import Products from './components/screens/Acceptance/Products'
import Staff from './components/screens/Acceptance/Staff'
import China from './components/screens/China'
import Additional from './components/screens/China/Additional'
import Archive from './components/screens/China/Archive'
import LeftOver from './components/screens/China/Leftover'
import ExistingOrder from './components/screens/China/Order/ExistingOrder'
import NewOrder from './components/screens/China/Order/NewOrder'
import Orders from './components/screens/China/Orders'
import ProductsPage from './components/screens/China/Products'
import Index from './components/screens/Index'
import Settings from './components/screens/Settings'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path='/'
            element={<Layout />}
          >
            <Route
              index
              element={<Index />}
            />

            <Route
              path={'/settings'}
              element={<Settings />}
            />

            <Route
              path={'/china'}
              element={<ChinaLayout />}
            >
              <Route
                index
                element={<China />}
              />

              <Route
                path={'/china/orders/:id'}
                element={<ExistingOrder />}
              />
              <Route
                path={'/china/new-order'}
                element={<NewOrder />}
              />
              <Route
                path={'/china/orders'}
                element={<Orders />}
              />
              <Route
                path={'/china/archive'}
                element={<Archive />}
              />

              <Route
                path={'/china/leftover'}
                element={<LeftOver />}
              />

              <Route
                path={'/china/products'}
                element={<ProductsPage />}
              />

              <Route
                path={'/china/additional'}
                element={<Additional />}
              />
            </Route>

            <Route
              path='/acceptance'
              element={<AcceptanceLayout />}
            >
              <Route
                index
                element={<Acceptance />}
              />
              <Route
                path='/acceptance/acceptances'
                element={<Acceptances />}
              />
              <Route
                path='/acceptance/acceptances/:id'
                element={<AcceptOrder />}
              />
              <Route
                path='/acceptance/staff'
                element={<Staff />}
              />
              <Route
                path='/acceptance/products'
                element={<Products />}
              />
              <Route
                path='/acceptance/new-acceptance'
                element={<CreateAcceptance />}
              />
            </Route>
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
