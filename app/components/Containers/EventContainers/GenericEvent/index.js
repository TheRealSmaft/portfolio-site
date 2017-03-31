import React from 'react';

const GenericEvent = React.createClass({
	componentWillMount() {
		this.style = {
			backgroundColor: 'pink'
		};
	},

	render() {
		return (
			<div>
				{React.cloneElement(this.props.children, {
					style: {...this.style}
				})}
			</div>
		)
	}
});

export default GenericEvent;