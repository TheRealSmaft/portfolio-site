import React from 'react';
import { Link } from 'react-router';

export default class Navbar extends React.Component {
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
};
