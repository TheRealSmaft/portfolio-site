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
				<div>
					<p>&copy;{this.year} {this.props.author}</p>
				</div>
			</footer>
		)
	}
};
