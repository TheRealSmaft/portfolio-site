import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';

import { HomePage, AboutPage, PortfolioPage } from './components/Pages';
import { IntroScene, Scene1, TestScene } from './components/Scenes';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={HomePage}/>
		<Route path="/about" component={AboutPage}/>
		<Route path="/portfolio" component={PortfolioPage}/>
		<Route path="/bestPRotfoiloPage" component={IntroScene}/>
		<Route path="/whereAmI" component={Scene1}/>
		<Route path="/testScene" component={TestScene}/>
	</Route>
);