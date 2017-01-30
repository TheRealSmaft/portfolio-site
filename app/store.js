import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

import reducer from './reducers';

const logger = createLogger();

const middleware = applyMiddleware(promise, thunk, logger);

export default createStore(reducer, {
	user: {
		name: "Shutup",
		age: 2487
	}
}, middleware);