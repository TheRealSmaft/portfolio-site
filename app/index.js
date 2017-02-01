import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './features/store';

import { AppContainer } from 'react-hot-loader';
import App from './components/app';

const app = document.getElementById('app');

delete AppContainer.prototype.unstable_handleError;

const render = (Component) => {
	ReactDOM.render(
		<AppContainer>
			<Provider store={store}>	
				<Component/>
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