import React from 'react';
import footer from '../_common/styles/footer';

console.log(footer);

export default class Footer extends React.Component {
	constructor() {
		super();
		this.year = new Date().getFullYear();
	}
	render() {
		return (
			<footer className={footer}>
				<p>&copy;{this.year} {this.props.author}</p>
			</footer>
		)
	}
};
