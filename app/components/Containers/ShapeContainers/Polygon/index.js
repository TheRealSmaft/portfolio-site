import React from 'react';

const Polygon = React.createClass({
	propTypes: {
		points: React.PropTypes.string.isRequired
	},

	getDefaultProps() {
		return {
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
			<polygon 
				id={this.props.id}
				points={this.props.points}
				strokeWidth={this.props.strokeWidth}
				stroke={this.props.stroke}
				fill={this.props.fill}
				filter={this.props.filter}
			>
				{this.props.children}
				{this.state.animations}
			</polygon>
		);
	}
});

export default Polygon;