import React from 'react';

const ScrollLoad = React.createClass({
	propTypes: {
		timeToLoad: React.PropTypes.bool
	},

	render() {
		if(this.props.timeToLoad) {
			return (
				<div>
					{this.props.children}
				</div>
			)
		}
		else
		{
			return null;
		}
	}
});

export default ScrollLoad;