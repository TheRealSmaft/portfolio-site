// ./src/components/App.js
import React from 'react';
import { connect } from 'react-redux';

import styles from '../styles/app.css';

import { userActions, userSelectors } from '../redux/test-feature/duck';

@connect((store) => {
	return {
		user: store.user
	}
})

export default class App extends React.Component {
	componentWillMount() {
		this.props.dispatch(userActions.fetchUser());
	}
	render() {
		const { user } = this.props.user;

		return (
			<div className={styles.app}>
				<h1>Name: {user.name}</h1>
				<h2>Age: {user.age}</h2>
			</div>
		)
	}
};