import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { appStyles, navbarStyles } from '../styles';

import { Header, MainNavbar, Footer } from './Layout';
import { ScrollEventContainer } from './Containers';
import { StickyEventComponent } from './Components';

import { NavLinks } from './Pages';

import { siteInfoActions, siteInfoTypes } from '../state/initial';

const App = React.createClass({
	componentWillMount() {
		this.props.getSiteInfo();
	},

	componentDidMount() {
		window.addEventListener('scroll', this.props.getWindowPosition);
	},

	componentWillUnmount() {
		window.removeEventListener('scroll', this.props.getWindowPosition);
	},

	render() {
		return (
			<div className={appStyles}>
				<ScrollEventContainer>
					<StickyEventComponent 
						stickyStart={0}
						stickyPosY={0}
						stickyStyles={navbarStyles.sticky}>
						<MainNavbar 
							links={NavLinks}
							navStyles={navbarStyles.navbar}/>
					</StickyEventComponent>
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
		site: store.initialState.site
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		getSiteInfo: siteInfoActions.getSiteInfo
	}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(App);