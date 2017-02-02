import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from '../common/styles/app.css';

import { Header, Footer } from './Layout';

import { siteInfoActions, siteInfoTypes } from '../state/initial';

const App = React.createClass({
	componentWillMount() {
		this.props.getSiteInfo();
	},

	render() {
		return (
			<div className={styles.app}>
				<Header text={this.props.site.title}/>
				<p>{this.props.site.description}</p>

				<Footer author={this.props.site.author}/>
			</div>
		)
	}
});

function mapStateToProps(store) {
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