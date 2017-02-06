import React from 'react';

import { NavigationListComponent } from '../../Components';

const MainNavbar = React.createClass({
	render() {
		return (
			<NavigationListComponent
				links={this.props.links}
				navStyles={this.props.navStyles}>
			</NavigationListComponent>
		)
	}
});

export default MainNavbar
