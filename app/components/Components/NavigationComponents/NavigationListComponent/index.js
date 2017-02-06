import React from 'react';

export default class Navbar extends React.Component {
	render() {
		var links = this.props.links.map(function(link){
			return (
				<li key={link.name}>
					<a href={link.url}>
						{link.name}
					</a>
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
