import React from 'react';

const TimedComponent = React.createClass({

	render() {
		return (
			<div>
				{this.props.time}
			</div>
		)
	}
});

export default TimedComponent;