import React from 'react';

import { stickyContainerStyles } from '../../../styles';

var stickyStart = {
	top: 0
};

var childHeight = {
	width: '100%',
	height: 0
};

const StickyContainer = React.createClass({
	componentWillMount() {
		stickyStart.top += this.props.scrollBegin;

		if(this.props.childHeight != undefined) {
			childHeight.height += this.props.childHeight;
		}
	},
	render() {
		if(this.props.scrollY > this.props.scrollBegin) {
			return (
				<div style={childHeight}>
					<div className={stickyContainerStyles.stuck} style={stickyStart}>
						{this.props.children}
					</div>
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
				<div style={childHeight}>
					<div className={stickyContainerStyles.unstuck}>
						{this.props.children}
					</div>
				</div>
			)
		}
	}
});

export default StickyContainer;