import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { appStyles, navbarStyles } from '../styles';

import { Header, Navbar, Footer } from './Layout';

import StickyContainer from './Containers/StickyContainer';

import { NavLinks } from './Pages';

import { siteInfoActions, siteInfoTypes } from '../state/initial';

import { windowEventActions, windowEventTypes } from '../state/events/window';

const navbarHeight = 65;

const App = React.createClass({
	componentWillMount() {
		this.props.getSiteInfo();
	},

	componentDidMount() {
		window.addEventListener('scroll', this.props.windowPositionUpdate);
	},

	componentWillUnmount() {
		window.removeEventListener('scroll', this.props.windowPositionUpdate);
	},

	render() {
		return (
			<div className={appStyles}>
				<StickyContainer 
					scrollY={this.props.windowState.scrollY} 
					scrollBegin={0}
					childHeight={navbarHeight}>
					<Navbar 
						links={NavLinks} 
						navStyles={navbarStyles} 
						height={navbarHeight}/>
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
		windowState: store.windowState
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		getSiteInfo: siteInfoActions.getSiteInfo,
		windowPositionUpdate: windowEventActions.windowPositionUpdate
	}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(App);