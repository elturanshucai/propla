import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios'
import { Provider } from 'react-redux'
import  store  from './Store/store'

axios.defaults.baseURL = 'http://localhost:5000/'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage?.getItem('token')
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
