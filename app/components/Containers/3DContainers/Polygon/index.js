import React from 'react';

import { style3D } from '../../../../styles/3DContainer';

const Polygon = React.createClass({
	getDefaultProps() {
		return {
			coords: [[100, 0], [200, 150], [0, 200], [10, 40]],
			zWidth: 100,
		}
	},

	componentWillMount() {

		var points = this.getPoints();

		this.frontFace = (
			<svg 
				height={210} 
				width={500}
			>
			  	<polygon 
			  		points={points}
			  		style={{
			  			fill:'lime', 
			  			stroke:'purple', 
			  			strokeWidth: 1
			  		}} 
			  	/>
			</svg>
		);
		this.backFace = (
			<svg 
				style={{
					transform: 'rotateY(180deg) rotateZ(180deg) translateZ(' + this.props.zWidth + 'px) scale(1, -1)'
				}}
				height={210} 
				width={500}
			>
			  	<polygon 
			  		points={points} 
			  		style={{
			  			fill:'orange', 
			  			stroke:'blue', 
			  			strokeWidth: 1
			  		}} 
			  	/>
			</svg>
		);

		this.sides = [];

		for(var i = 0; i < this.props.coords.length; i++) {
			var last = false;
			if(i + 1 >= this.props.coords.length) {
				last = true;
			}

			// console.log('Hypotenuse:' + this.getHypotenuse(this.props.coords[i], this.props.coords[(last ? 0 : i + 1)]));
			// console.log('Angle:' + this.getAngle(this.props.coords[i], this.props.coords[(last ? 0 : i + 1)]));
			var hypotenuse = this.getHypotenuse(this.props.coords[i], this.props.coords[(last ? 0 : i + 1)]);
			var angle = this.getAngle(this.props.coords[i], this.props.coords[(last ? 0 : i + 1)]);

			this.sides.push(
				<div
					key={i}
					style={{
						position: 'absolute',
						transform: 'translate3d(' + (this.props.coords[i][0]) + 'px, ' + (this.props.coords[i][1] / 4) + 'px, 0px)'
					}}
				>
					<div
						style={{
						width: this.props.zWidth + 'px',
						height: hypotenuse + 'px',
						backgroundColor: 'pink',
						transform: 
							'rotateY(-90deg) rotateX(' + angle + 'deg) ' +
							'translateX(' + (this.props.zWidth / -2) + 'px)'
						}}
					>
					</div>
				</div>
			)
		}

		// 1st: 35px, 35px
		// 2nd: -202px, -45px
		// Hypot: -90px, 157px
	},

	getPoints() {
		var points = '';
		for(var i = 0; i < this.props.coords.length; i++) {
			points = points + this.props.coords[i][0] + ',' + this.props.coords[i][1] + ' '
		}
		return points;
	},

	getHypotenuse(pointA, pointB) {
		return Math.hypot(pointB[0] - pointA[0], pointB[1] - pointA[1]);
	},

	getAngle(pointA, pointB) {
		return Math.atan2(pointB[1] - pointA[1], pointB[0] - pointA[0]) * 360 / Math.PI;
	},

	render() {
		return (
			<div 
				className={style3D.polygon}
			>
				{React.cloneElement(this.frontFace, 
					{
						ref: "frontFace"
					}
				)}
				{this.backFace}
				{this.sides}
			</div>
		);
	}
});

export default Polygon;