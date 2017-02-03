import React from 'react';

import { Navbar } from '../../Layout';
import { headerStyles, navbarStyles } from '../../../styles';
import { NavLinks } from '../../Pages';

export default class Header extends React.Component {
	render() {
		return (
			<div className={headerStyles}>
				<h1>{this.props.text}</h1>
				<Navbar links={NavLinks} navStyles={navbarStyles}/>
			</div>
		)
	}
};
