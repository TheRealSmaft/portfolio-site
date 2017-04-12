import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';

import { LoadingPage, HomePage, PortfolioPage, ContactPage, AboutPage } from './components/Pages';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={LoadingPage}/>
		<Route path="/home" component={HomePage}/>
		<Route path="/portfolio" component={PortfolioPage}/>
		<Route path="/contact" component={ContactPage}/>
		<Route path="/about" component={AboutPage}/>
	</Route>
);