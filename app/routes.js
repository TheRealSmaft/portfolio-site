import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';

import { HomePage, AboutPage, PortfolioPage } from './components/Pages';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={HomePage}/>
		<Route path="/about" component={AboutPage}/>
		<Route path="/portfolio" component={PortfolioPage}/>
	</Route>
);