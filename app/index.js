import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './state/store';

import { Router, browserHistory } from 'react-router';
import routes from './routes';

import { AppContainer } from 'react-hot-loader';
delete AppContainer.prototype.unstable_handleError;

import App from './components/App';

const app = document.getElementById('app');

const render = (App) => {
	ReactDOM.render(
		<AppContainer>
			<Provider store={store}>
				<Router history={browserHistory} routes={routes}/>
			</Provider>
		</AppContainer>,
	 	app
	);
};

render(App);

// Hot Module Replacement API
if (module.hot) {
	module.hot.accept('./components/App', () => {
		render(App)
	});
}