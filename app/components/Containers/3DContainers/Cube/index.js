import React from 'react';

import { style3D } from '../../../../styles/3DContainer';

const Cube = React.createClass({
	propTypes: {
		faces: React.PropTypes.array,
		dimensions: React.PropTypes.arrayOf(React.PropTypes.number),
		rotation: React.PropTypes.arrayOf(React.PropTypes.number),
		perspective: React.PropTypes.number,
		responsiveDimensions: React.PropTypes.bool
	},

	getDefaultProps() {
		return {
			dimensions: [50, 50, 10],
			rotation: [25, 10, 36],
			responsiveDimensions: true,
			perspective: 800
		}
	},

	componentWillMount() {
		this.z = this.props.dimensions[2];

		if(this.props.responsiveDimensions) {
			this.updateResponsiveDimensions();
		}
		else
		{
			this.x = this.props.dimensions[0];
			this.y = this.props.dimensions[1];
		}
	},

	componentDidUpdate() {
		this.updateResponsiveDimensions();
	},

	updateResponsiveDimensions() {
		this.x = (this.props.dimensions[0] / 100) * window.innerWidth;
		this.y = (this.props.dimensions[1] / 100) * window.innerHeight;
	},

	render() {
		// let faces = this.props.faces.map((face) =>
		// 	{face}
		// );

		return (
			<div 
				className={style3D.world}
				style={{
					...this.props.style,
					width: '400px',
					perspective: this.props.perspective + 'px'
				}}
			>
				<div 
					className={style3D.cube}
					style={{
						width: this.x + 'px',
						height: this.y + 'px',
						transform: this.props.rotation ? 'rotateX(' + this.props.rotation[0] + 'deg) rotateY(' + this.props.rotation[1] + 'deg) rotateZ(' + this.props.rotation[2] + 'deg)' : ''
					}}
				>
					<div
						style={{
							width: this.x + 'px',
							height: this.y + 'px',
							transform: 'translateZ(' + (this.z / 2) + 'px)'
						}}
					>
					</div>
					<div
						style={{
							width: this.x + 'px',
							height: this.y + 'px',
							transform: 'rotateY(180deg) translateZ(' + (this.z / 2) + 'px)'
						}}
					>
					</div>
					<div
						style={{
							width: this.z + 'px',
							height: this.y + 'px',
							transform: 'rotateY(-90deg) translateX(' + (this.z * -.5)+ 'px)'
						}}
					>
					</div>
					<div
						style={{
							width: this.z + 'px',
							height: this.y + 'px',
							transform: 'rotateY(90deg) translateX(' + (this.z * .5) + 'px) translateZ(' + ((this.z - this.x) * -1) + 'px)'
						}}
					>
					</div>
					<div
						style={{
							width: this.x + 'px',
							height: this.z + 'px',
							transform: 'rotateX(-90deg) translateY(' + (this.z / 2 * -1) + 'px)'
						}}
					>
					</div>
					<div
						style={{
							width: this.x + 'px',
							height: this.z + 'px',
							transform: 'rotateX(90deg) translateY(' + (this.z / 2) + 'px) translateZ(' + ((this.y - this.z) * -1) + 'px)'
						}}
					>
					</div>
				</div>
			</div>
		)
	}
});

export default Cube;