import React from 'react';
import ReactDOM from 'react-dom';

const Circle = React.createClass({
	getDefaultProps() {
		return {
			diameter: 100,
			strokeWidth: 0,
			stroke: 'transparent',
			fill: 'black'
		}
	},

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
			<circle 
				id={this.props.id}
				cx={(this.props.diameter - this.props.strokeWidth) / 2}
				cy={(this.props.diameter - this.props.strokeWidth) / 2}
				r={this.props.diameter / 2 - this.props.strokeWidth}
				strokeWidth={this.props.strokeWidth}
				stroke={this.props.stroke}
				fill={this.props.fill}
			>
				{this.props.children}
				{this.state.motionPaths}
			</circle>
		);
	}
});

export default Circle;