import React from 'react';

import { headerStyles } from '../../../styles';

export default class Header extends React.Component {
	render() {
		return (
			<div className={headerStyles}>
				<h1>{this.props.text}</h1>
			</div>
		)
	}
};
