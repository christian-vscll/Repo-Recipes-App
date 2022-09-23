import React from 'react';
<<<<<<< HEAD
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
=======
import ReactDOM from 'react-dom';
>>>>>>> origin
import './index.css';
import App from './App';

<<<<<<< HEAD
ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
=======
ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
>>>>>>> origin
