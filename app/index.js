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

// App
import App from './components/App';

const logger = createLogger();
const store = createStore(
	applyMiddleware(thunk, promise, logger)
);

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