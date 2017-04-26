import React from 'react';

const Rect = React.createClass({
	getDefaultProps() {
		return {
			position: [0, 0],
			dimensions: [100, 100],
			strokeWidth: 0,
			stroke: 'transparent',
			fill: 'black'
		}
	},

	getInitialState() {
		return {
			animations: null
		}
	},

	addAnimations(animations) {
		this.setState({
			...this.state,
			animations: animations
		});
	},

	render() {
		return (
			<rect 
				id={this.props.id}
				x={this.props.position[0] + this.props.strokeWidth}
				y={this.props.position[1] + this.props.strokeWidth}
				width={this.props.width ? this.props.width : this.props.dimensions[0] - (this.props.strokeWidth * 2)}
				height={this.props.height ? this.props.height : this.props.dimensions[1] - (this.props.strokeWidth * 2)}
				strokeWidth={this.props.strokeWidth}
				stroke={this.props.stroke}
				fill={this.props.fill}
				filter={this.props.filter}
				style={this.props.style}
			>
				{this.props.children}
				{this.state.animations}
			</rect>
		);
	}
});

export default Rect;