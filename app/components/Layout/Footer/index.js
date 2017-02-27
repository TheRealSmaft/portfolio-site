import React from 'react';
import { footerStyles } from '../../../styles';

const Footer = React.createClass({
	propTypes: {
		author: React.PropTypes.string
	},

	componentWillMount() {
		this.year = new Date().getFullYear();
	},

	render() {
		return (
			<footer className={footerStyles}>
				<div>
					<p>&copy;{this.year} {this.props.author}</p>
				</div>
			</footer>
		)
	}
});

export default Footer;