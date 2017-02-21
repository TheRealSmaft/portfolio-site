import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { appStyles, navbarStyles } from '../styles';

import { Header, MainNavbar, Footer } from './Layout';
import { ScrollEventContainer, StickyEventContainer } from './Containers';

import { NavLinks } from './Pages';

import { siteInfoActions, siteInfoTypes } from '../state/initial';
import { windowEventActions, windowEventTypes } from '../state/events/window';


const App = React.createClass({
	componentWillMount() {
		this.props.getSiteInfo();
		this.props.getWindowSize();
	},

	componentDidMount() {
		window.addEventListener('scroll', this.props.getWindowPosition);
		window.addEventListener('resize', this.handleWindowResize);
	},

	componentWillUnmount() {
		window.removeEventListener('scroll', this.props.getWindowPosition);
		window.removeEventListener('resize', this.handleWindowResize);
	},

	handleWindowResize() {
		this.props.getWindowSize();
	},

	render() {
		return (
			<div className={appStyles}>

				<ScrollEventContainer>

					<StickyEventContainer 
						stickyStartY={0}
						stickyPosY={0}
						childStyles={navbarStyles.sticky}>

						<MainNavbar 
							links={NavLinks}
							navStyles={navbarStyles.navbar}/>

					</StickyEventContainer>

				</ScrollEventContainer>

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
		getWindowSize: windowEventActions.getWindowSize
	}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(App);