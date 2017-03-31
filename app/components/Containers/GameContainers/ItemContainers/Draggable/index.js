import React from 'react';

const Draggable = React.createClass({
	render() {
		return (
			<div>
				<h1>DRAG IT</h1>
				{this.props.children}
			</div>
		)
	}
});

export default Draggable;