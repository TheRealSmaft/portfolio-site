import React from 'react';

const SVG = React.createClass({
	getDefaultProps() {
		return {
			viewBox: "0 0 100 100"
		}
	},

	render() {
		return (
			<svg
				id={this.props.id}
				className={this.props.className}
				style={{
					...this.props.style
				}}
				viewBox={this.props.viewBox}
				xmlns="http://www.w3.org/2000/svg"
			>
				{
					React.Children.map(this.props.children, (shape, i) => {
						return React.cloneElement(shape,
							{
								ref: 'shape' + i
							}
						)
					})
				}
			</svg>
		);
	}
});

export default SVG;