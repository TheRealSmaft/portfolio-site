// ./src/components/App.js
import React from 'react';
import { connect } from 'react-redux';

import styles from './App.css';

import { fetchUser, setUserName } from '../actions/testActions';

@connect((store) => {
	return {
		user: store.user
	}
})

export default class App extends React.Component {
	componentWillMount() {
		this.props.dispatch(fetchUser())
	}
	render() {
		return (
			<h1>{this.props.user.name}</h1>

			)
	}
};