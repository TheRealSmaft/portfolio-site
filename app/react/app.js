// ./src/components/App.js
import React from 'react';
import { connect } from 'react-redux';

import styles from '../styles/app.css';

import { userActions, userSelectors } from '../redux/test-feature/duck';

const App = React.createClass({
	componentWillMount() {
		this.props.dispatch(userActions.fetchUser());
	},

	handleNameChange(e) {
		var input = e.target.value;

	},

	render() {
		console.log(this.props.user);
		return (
			<div className={styles.app}>
				<h1>Name: {this.props.user.name}</h1>
				<h2>Age: {this.props.user.age}</h2>
				<br />
				<input onChange={this.handleNameChange}/>
			</div>
		)
	}
});

const mapStateToProps = function(store) {
	return {
		user: store.user.user
	};
}

export default connect(mapStateToProps)(App);