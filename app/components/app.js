import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { appStyles, navbarStyles } from '../styles';

import { Header, MainNavbar, Footer } from './Layout';
import { ResponsiveContainer, StickyContainer } from './Containers';

import { NavLinks } from './Pages';

import { siteInfoActions, siteInfoTypes } from '../state/initial';
import { windowEventActions, windowEventTypes } from '../state/events/window';
import { scrollEventActions, scrollEventTypes } from '../state/events/scroll';


const App = React.createClass({
	componentWillMount() {
		this.props.getSiteInfo();
		this.props.getWindowSize();
	},

	componentDidMount() {
		window.addEventListener('scroll', this.props.getScrollPosition);
		window.addEventListener('resize', this.props.getWindowSize);
	},

	componentWillUnmount() {
		window.removeEventListener('scroll', this.props.getScrollPosition);
		window.removeEventListener('resize', this.props.getWindowSize);
	},

	render() {
		return (
			<div className={appStyles}>
				<StickyContainer 
					stickyStartY={0}
					stickyPosY={0}
					childStyles={navbarStyles.sticky}>
					
					<MainNavbar 
						links={NavLinks}
						navStyles={navbarStyles.navbar}/>
					
				</StickyContainer>

				<Header text={this.props.site.title}/>

				{this.props.children}

				<Footer author={this.props.site.author}/>

			</div>
		)
	}
});

function mapStateToProps(store) {
	return {
		site: store.initialState.site,
		windowState: store.windowState,
		scrollState: store.scrollState
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		getSiteInfo: siteInfoActions.getSiteInfo,
		getWindowSize: windowEventActions.getWindowSize,
		getScrollPosition: scrollEventActions.getScrollPosition
	}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(App);