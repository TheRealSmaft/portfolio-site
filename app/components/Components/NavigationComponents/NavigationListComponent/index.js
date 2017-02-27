import React from 'react';
import { Link } from 'react-router';

const Navbar = React.createClass({
	propTypes: {
		links: React.PropTypes.array.isRequired,
		navStyles: React.PropTypes.string.isRequired
	},

	render() {
		var links = this.props.links.map(function(link){
			return (
				<li key={link.name}>
					<Link to={link.url}>
						{link.name}
					</Link>
				</li>
			);
		})
		return (
				<ul className={this.props.navStyles}>
					{links}
				</ul>
		)
	}
});

export default Navbar;