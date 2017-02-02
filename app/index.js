import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './state/store';

import { Router, Route } from 'react-router';

import { AppContainer } from 'react-hot-loader';
delete AppContainer.prototype.unstable_handleError;

import App from './components/app';

import { AboutPage } from './components/Pages';

const app = document.getElementById('app');

const render = (App) => {
	ReactDOM.render(
		<AppContainer>
			<Provider store={store}>
				<App/>
			</Provider>
		</AppContainer>,
	 	app
	);
};

render(App);

// Hot Module Replacement API
if (module.hot) {
	module.hot.accept('./components/app', () => {
		render(App)
	});
}