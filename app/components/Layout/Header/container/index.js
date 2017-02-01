import React from 'react';
import { connect } from 'react-redux';

import styles from '../resources/styles/styles';

const HeaderContainer = React.createClass({
	getInitialState() {
		return {
			text: '',
			style: ''
		}
	},

	render() {
		return (
			<Header className={styles[this.state.styles]} text={this.state.text} />
		)
	}
});

module.exports = HeaderContainer;