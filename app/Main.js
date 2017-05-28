import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger'

import App from './App';
import reducer from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleWare = createLogger();

const createStoreWithMiddleware = applyMiddleware(sagaMiddleware, loggerMiddleWare)(createStore);
const store = createStoreWithMiddleware(reducer);

sagaMiddleware.run(sagas);

export default class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}