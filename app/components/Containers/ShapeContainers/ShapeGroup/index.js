import React from 'react';

const ShapeGroup = React.createClass({
	getInitialState() {
		return {
			motionPaths: null
		}
	},

	addMotionPaths(paths) {
		this.setState({
			...this.state,
			motionPaths: paths
		});
	},

	render() {
		return (
			<g
				id={this.props.id}
				fill={this.props.fill}
				stroke={this.props.stroke}
				strokeWidth={this.props.strokeWidth}
			>
				{this.props.children}
				{this.state.motionPaths}
			</g>
		);
	}
});

export default ShapeGroup;