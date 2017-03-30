import React from 'react';

const Item = React.createClass({
	render() {
		return (
			<div>
				{this.props.item.node}
			</div>
		)
	}
});

export default Item;