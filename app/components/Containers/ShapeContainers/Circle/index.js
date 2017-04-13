import React from 'react';
import ReactDOM from 'react-dom';

const Circle = React.createClass({
	getDefaultProps() {
		return {
			diameter: 100,
			strokeWidth: 0,
			stroke: '',
			fill: 'black'
		}
	},

	render() {
		return (
			<svg
				style={{
					...this.props.style
				}}
				viewBox={"0 0 " + this.props.diameter + ' ' + this.props.diameter}
			>
				<circle 
					cx={this.props.diameter / 2}
					cy={this.props.diameter / 2}
					r={this.props.diameter / 2}
					strokeWidth={this.props.strokeWidth}
					stroke={this.props.stroke}
					fill={this.props.fill}
				/>
			</svg>
		);
	}
});

export default Circle;