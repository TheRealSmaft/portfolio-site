import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from '../common/css/app.css';

import { userActions, userSelectors } from '../features/test-feature/duck';

const App = React.createClass({
	componentWillMount() {
		this.props.fetchUser();
	},

	handleNameChange(e) {
		var input = e.target.value;
		this.props.setUserName(input);
	},

	handleAgeChange(e) {
		var input = e.target.value;
		this.props.setUserAge(input);
	},

	render() {
		console.log(this.props);
		return (
			<div className={styles.app}>
				<h1>Name: {this.props.user.name}</h1>
				<h2>Age: {this.props.user.age}</h2>
				<br />
				<label for="changeName">Change Name: </label>
				<input id="changeName" onChange={this.handleNameChange}/>
				<br />
				<label for="changeAge">Change Age: </label>
				<input id="changeAge" onChange={this.handleAgeChange} type="number"/>
			</div>
		)
	}
});

function mapStateToProps(store) {
	return {
		user: store.user
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		fetchUser: userActions.fetchUser,
		setUserName: userActions.setUserName,
		setUserAge: userActions.setUserAge
	}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(App);