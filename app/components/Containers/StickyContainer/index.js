import React from 'react';

import { stickyContainerStyles } from '../../../styles';

export default class StickyContainer extends React.Component {
	render() {
		if(this.props.scrollY > 200) {
			return (
				<div className={stickyContainerStyles.stuck}>
					{this.props.children}
				</div>
			)
		} 
		else if(this.props.scrollY == undefined)
		{
			return null;
		} 
		else 
		{
			return (
				<div className={stickyContainerStyles.unstuck}>
					{this.props.children}
				</div>
			)
		}
	}
};