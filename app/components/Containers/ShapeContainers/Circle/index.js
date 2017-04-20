import React from 'react';

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
			<circle 
				id={this.props.id}
				cx={this.props.position ? this.props.position[0] : ((this.props.diameter - this.props.strokeWidth) / 2)}
				cy={this.props.position ? this.props.position[1] : ((this.props.diameter - this.props.strokeWidth) / 2)}
				r={this.props.diameter / 2 - this.props.strokeWidth}
				strokeWidth={this.props.strokeWidth}
				stroke={this.props.stroke}
				fill={this.props.fill}
				filter={this.props.filter}
			>
				{this.props.children}
				{this.state.animations}
			</circle>
		);
	}
});

export default Circle;