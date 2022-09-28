import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
// import Provider from './context/Provider';

ReactDOM.render(
  <BrowserRouter>
    <App />
    {/* <Provider>
    </Provider> */}
  </BrowserRouter>,
  document.getElementById('root'),
);
