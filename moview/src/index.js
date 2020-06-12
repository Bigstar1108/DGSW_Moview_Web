import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './Root';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import MoviewReducer from './modules/reducers/index';

const store = createStore(MoviewReducer);

ReactDOM.render(
  <Provider store = {store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
