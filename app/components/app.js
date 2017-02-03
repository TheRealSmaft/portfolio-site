import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { appStyles } from '../styles';

import StickyContainer from './Containers/StickyContainer';
import { Header, Footer } from './Layout';

import { siteInfoActions, siteInfoTypes } from '../state/initial';

const App = React.createClass({
	componentWillMount() {
		this.props.getSiteInfo();
	},

	render() {
		return (
			<div className={appStyles}>
				<StickyContainer>
					<Header text={this.props.site.title}/>
				</StickyContainer>
				{this.props.children}
				<Footer author={this.props.site.author}/>
			</div>
		)
	}
});

function mapStateToProps(store) {
	console.log(store);
	return {
		site: store.initialReducer.site
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		getSiteInfo: siteInfoActions.getSiteInfo,
	}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(App);