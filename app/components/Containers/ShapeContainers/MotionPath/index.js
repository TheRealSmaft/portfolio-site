import React from 'react';

const MotionPath = React.createClass({
	propTypes: {
		pathId: React.PropTypes.string.isRequired,
		draw: React.PropTypes.string.isRequired,
		duration: React.PropTypes.number.isRequired
	},

	getDefaultProps() {
		return {
			duration: 0,
			begin: '0',
			repeatCount: '0',
			origin: '0,0',
			fill: 'transparent',
			stroke: 'transparent',
			strokeWidth: 0
		}
	},

	render() {
		return (
			<animateMotion
				id={this.props.pathId + 'Animation'}
				dur={this.props.duration + 'ms'}
				repeatCount={this.props.repeatCount}
				origin={this.props.origin}
				begin={this.props.begin}
				end={this.props.end}
				rotate={this.props.rotate}
			>
				<path 
					id={this.props.pathId}
					d={this.props.draw}
					fill={this.props.fill}
					stroke={this.props.stroke}
					strokeWidth={this.props.strokeWidth}
				/>

				<mpath href={'#' + this.props.pathId}/>
			</animateMotion>
		);
	}
});

export default MotionPath;