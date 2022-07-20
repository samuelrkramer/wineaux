import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';

import * as sessionActions from './store/session';
import * as reviewActions from './store/reviews';
import * as wineActions from './store/wines';
import * as userActions from './store/users';
import { ModalProvider } from './context/Modal';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.sessionActions = sessionActions;
  window.reviewActions = reviewActions;
  window.wineActions = wineActions;
  window.userActions = userActions;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <App />
      </ModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
