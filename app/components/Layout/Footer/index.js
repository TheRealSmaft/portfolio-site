import React from 'react';
import { footerStyles } from '../../../styles';

export default class Footer extends React.Component {
	constructor() {
		super();
		this.year = new Date().getFullYear();
	}
	render() {
		return (
			<footer className={footerStyles}>
				<p>&copy;{this.year} {this.props.author}</p>
			</footer>
		)
	}
};
