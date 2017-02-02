import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

import allReducers from './reducers';

const logger = createLogger();

const middleware = applyMiddleware(promise, thunk, logger);

export default createStore(allReducers, middleware);