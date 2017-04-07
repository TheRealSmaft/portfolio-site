import React from 'react';

import { style3D } from '../../../../styles/3DContainer';
import { scene1Styles } from '../../../../styles/scenes';

const Cube = React.createClass({
	propTypes: {
		faces: React.PropTypes.array,
		dimensions: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
		rotation: React.PropTypes.arrayOf(React.PropTypes.number),
		perspective: React.PropTypes.number,
		worldSize: React.PropTypes.number,
		responsive: React.PropTypes.bool
	},

	getDefaultProps() {
		return {
			rotation: [0, 0, 0],
			perspective: 800,
			responsive: false,
			worldSize: 500
		}
	},

	componentWillMount() {
		if(this.props.responsive) {
			this.updateResponsiveDimensions();
		}
		else
		{
			this.x = this.props.dimensions[0];
			this.y = this.props.dimensions[1];
			this.z = this.props.dimensions[2];
		}
	},

	componentDidUpdate() {
		if(this.props.responsive) {
			this.updateResponsiveDimensions();	
		}
	},

	updateResponsiveDimensions() {
		this.x = (this.props.dimensions[0] / 100) * this.props.worldSize;
		this.y = (this.props.dimensions[1] / 100) * this.props.worldSize;
		this.z = (this.props.dimensions[2] / 100) * this.props.worldSize;
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
					width: this.props.worldSize + 'px',
					height: this.props.worldSize + 'px',
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
						<div style={{width: '100%', height: '100%'}}>
							{this.props.faces[0].props.children}
						</div>
					</div>
					<div
						style={{
							width: this.x + 'px',
							height: this.y + 'px',
							transform: 'rotateY(180deg) translateZ(' + (this.z / 2) + 'px)'
						}}
					>
						<div style={{width: '100%', height: '100%'}}>
							{this.props.faces[1].props.children}
						</div>
					</div>
					<div
						style={{
							width: this.z + 'px',
							height: this.y + 'px',
							transform: 'rotateY(-90deg) translateX(' + (this.z * -.5)+ 'px)'
						}}
					>
						<div style={{width: '100%', height: '100%'}}>
							{this.props.faces[2].props.children}
						</div>
					</div>
					<div
						style={{
							width: this.z + 'px',
							height: this.y + 'px',
							transform: 'rotateY(90deg) translateX(' + (this.z * .5) + 'px) translateZ(' + ((this.z - this.x) * -1) + 'px)'
						}}
					>
						<div style={{width: '100%', height: '100%'}}>
							{this.props.faces[3].props.children}
						</div>
					</div>
					<div
						style={{
							width: this.x + 'px',
							height: this.z + 'px',
							transform: 'rotateX(-90deg) translateY(' + (this.z / 2 * -1) + 'px)'
						}}
					>
						<div style={{width: '100%', height: '100%'}}>
							{this.props.faces[4].props.children}
						</div>
					</div>
					<div
						style={{
							width: this.x + 'px',
							height: this.z + 'px',
							transform: 'rotateX(90deg) translateY(' + (this.z / 2) + 'px) translateZ(' + ((this.y - this.z) * -1) + 'px)'
						}}
					>
						<div style={{width: '100%', height: '100%'}}>
							{this.props.faces[5].props.children}
						</div>
					</div>
				</div>
			</div>
		)
	}
});

export default Cube;