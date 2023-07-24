import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage/HomePage';
import ProductListing from './components/ProductListing/ProductListing';
import AppWrapper from './components/AppWrapper/AppWrapper';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import OrderSuccess from './components/OrderSuccess/OrderSuccess';
import OrderCancel from './components/OrderCancel/OrderCancel';


function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/listing/:id" element={
        <AppWrapper>
          <ProductListing />
        </AppWrapper>
      } />
      <Route path="/product/:productId" element={
        <AppWrapper>
          <ProductDetails />
        </AppWrapper>
      } />
      <Route path="/order-completed" element={
        <AppWrapper>
          <OrderSuccess />
        </AppWrapper>
      } />
      <Route path="/order-cancel" element={
        <AppWrapper>
          <OrderCancel />
        </AppWrapper>
      } />
      {/* <Route path="/cart/:userId" element={
        <AppWrapper>
          <Cart />
        </AppWrapper>
      } /> */}
      <Route element={<div>Not found</div>} />
    </Routes>
  );
}

export default App;
