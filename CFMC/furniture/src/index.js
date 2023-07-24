import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51NUWQ1SI566mZ0EEshfDl7NVXy6qmoa6Rua1tFreZvSOoTApn2zAbgsbtrEBpUWJpWZf909QGs0kbDWO9VA0kFbU00C4KPyF20');

ReactDOM.render(
  <BrowserRouter>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
    <ToastContainer />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
