import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './redux/store';

import { AppContainer } from 'react-hot-loader';
import App from './react/app';

const app = document.getElementById('app');

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
	module.hot.accept('./react/app', () => {
		render(App)
	});
}