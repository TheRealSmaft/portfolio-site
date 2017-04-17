import React from 'react';

const ShapeGroup = React.createClass({
	getInitialState() {
		return {
			animations: null
		}
	},

	getDefaultProps() {
		return {
			width: '100%',
			height: '100%'
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
			<g
				id={this.props.id}
				fill={this.props.fill}
				stroke={this.props.stroke}
				strokeWidth={this.props.strokeWidth}
				filter={this.props.filter}
				width={this.props.width}
				height={this.props.height}
			>
				{
					React.Children.map(this.props.children, (shape, i) => {
						return React.cloneElement(shape,
							{
								ref: 'groupShape' + i
							}
						)
					})
				}
				{this.state.animations}
			</g>
		);
	}
});

export default ShapeGroup;