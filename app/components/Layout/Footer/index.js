import React from 'react';

export default class Footer extends React.Component {
	constructor() {
		super();
		this.year = new Date().getFullYear();
	}
	render() {
		return (
			<footer>
				&copy;{this.year} {this.props.author}
			</footer>
		)
	}
};
