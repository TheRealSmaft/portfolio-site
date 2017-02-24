import React from 'react';

const ScrollLoad = React.createClass({
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