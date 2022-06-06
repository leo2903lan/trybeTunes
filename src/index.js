import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Router/Routes';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
      <Routes />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root'),
);
