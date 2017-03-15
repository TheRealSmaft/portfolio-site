import React from 'react';

import { NavigationListComponent } from '../../Components';
import { navbarStyles } from '../../../styles';

const MainNavbar = React.createClass({
	render() {
		return (
			<NavigationListComponent 
				links={this.props.links}
				navStyles={navbarStyles.navbar}>
			</NavigationListComponent>
		)
	}
});

export default MainNavbar;