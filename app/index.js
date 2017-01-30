// React
import React from 'react';
import ReactDOM from 'react-dom';

// Hot Loader
import { AppContainer } from 'react-hot-loader';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

import axios from "axios";

import testReducer from './reducers/reducer-test'

// App
import App from './components/App';

const logger = createLogger();

const store = createStore(
	testReducer,
	applyMiddleware(thunk, promise, logger)
);

// Async Test
store.dispatch((dispatch) => {
	dispatch({type: "FETCH_SHIT"})
	axios.get("http://rest.learncode.academy/api/wstern/users")
		.then((response) => {
			dispatch({type: "RECEIVE_SHIT", payload: response.data})
		})
		.catch((err) => {
			dispatch({type: "FETCH_SHIT_ERROR", payload: err})
		})
});

const render = (Component) => {
  ReactDOM.render(

		<AppContainer>
			<Component/>
		</AppContainer>,

    	document.getElementById('root')
  );
};

render(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App)
  });
}