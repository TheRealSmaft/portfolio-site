import React from 'react';

const Path = React.createClass({
	propTypes: {
		d: React.PropTypes.string.isRequired
	},

	getDefaultProps() {
		return {
			strokeWidth: 1,
			stroke: 'black',
			fill: 'transparent'
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
			<path 
				id={this.props.id}
				d={this.props.d}
				strokeWidth={this.props.strokeWidth}
				stroke={this.props.stroke}
				fill={this.props.fill}
				fillOpacity={this.props.fillOpacity}
				pathLength={this.props.pathLength}
				filter={this.props.filter}
			>
				{this.props.children}
				{this.state.animations}
			</path>
		);
	}
});

export default Path;