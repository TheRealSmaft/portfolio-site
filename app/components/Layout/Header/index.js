import React from 'react';

import { Navbar } from '../../Layout';
import { navbar } from '../_common/styles/styles.css';
import { NavLinks } from '../../Pages';

export default class Header extends React.Component {
	render() {
		return (
			<div>
				<h1>{this.props.text}</h1>
				<Navbar links={NavLinks} navStyles={navbar}/>
			</div>
		)
	}
};
