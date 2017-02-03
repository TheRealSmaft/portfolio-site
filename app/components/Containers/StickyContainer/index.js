import React from 'react';

export default class StickyContainer extends React.Component {
	render() {
		var windowTopPosition = window.scrollY;

		return (
			<div>
				{this.props.children}
			</div>
		)
	}
};