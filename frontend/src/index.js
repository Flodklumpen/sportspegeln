import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './app/store';
//import { fetchProfileData } from './components/login/features/registerUser/registerUserSlice';
import { fetchUserData } from "./components/profile/features/userData/getUserDataSlice";

import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

/* Get CSS from bootstrap */
import 'bootstrap/dist/css/bootstrap.min.css';

store.dispatch(fetchUserData);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
