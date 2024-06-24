import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';
import Profile from './components/profile';
import Order from './components/Order';
import OrderDetails from './components/OrderDetails';
import UpdatePrice from './components/UpdatePrice';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path='profile' element={<Profile/>}/>
              <Route path='/add-order' element={<Order/>}/>
              <Route path="/order-details/:orderId" element={<OrderDetails />} />
              <Route path="/update-price" element={<UpdatePrice />} />
            </Routes>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
