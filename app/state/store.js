import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

import { composeWithDevTools } from 'redux-devtools-extension';

import allReducers from './reducers';

const logger = createLogger();

const middleware = composeWithDevTools(applyMiddleware(promise, thunk));

const store = createStore(allReducers, middleware);


export default store;