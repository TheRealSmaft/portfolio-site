import React from 'react';

const SVG = React.createClass({
	propTypes: {
		title: React.PropTypes.string.isRequired
	},

	getDefaultProps() {
		return {
			viewBox: "0 0 100 100",
			preserveAspectRatio: "xMidYMid"
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
				preserveAspectRatio={this.props.preserveAspectRatio}
				xmlns="http://www.w3.org/2000/svg"
				width={this.props.width}
				height={this.props.height}
			>
				<title> 
					{this.props.title}
				</title>

				{
					React.Children.map(this.props.children, (svgElement, i) => {
						var ref = svgElement.type.displayName ? svgElement.type.displayName : svgElement.type;
						return React.cloneElement(svgElement,
							{
								ref: ref + i
							}
						)
					})
				}
			</svg>
		);
	}
});

export default SVG;