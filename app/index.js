import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store';

import { AppContainer } from 'react-hot-loader';
import App from './components/App';

const app = document.getElementById('root');

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
	module.hot.accept('./components/App', () => {
		render(App)
	});
}