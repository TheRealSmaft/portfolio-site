import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from '../common/styles/app.css';

import Layout from './Layout';

const App = React.createClass({
	componentWillMount() {

	},

	render() {
		return (
			<div className={styles.app}>
				<Layout />
			</div>
		)
	}
});

function mapStateToProps(store) {
	return {
		
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({

	}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(App);