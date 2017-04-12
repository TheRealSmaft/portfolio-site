import React from 'react';

import { style3D } from '../../../../styles/3DContainer';
import { scene1Styles } from '../../../../styles/scenes';

const Cube = React.createClass({
	propTypes: {
		faces: React.PropTypes.array,
		dimensions: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
		rotate: React.PropTypes.arrayOf(React.PropTypes.number),
		translate: React.PropTypes.arrayOf(React.PropTypes.number),
		responsive: React.PropTypes.bool
	},

	getDefaultProps() {
		return {
			rotate: [0, 0, 0],
			translate: [0, 0, 0],
			scale: [1, 1, 1],
			responsive: false
		}
	},

	getInitialState() {
		return {
			rotate: this.props.rotate,
			translate: this.props.translate,
			scale: this.props.scale
		}
	},

	componentWillMount(){
		if(this.props.responsive) {
			this.updateResponsiveDimensions();
		}
		else
		{
			this.x = this.props.dimensions[0];
			this.y = this.props.dimensions[1];
			this.z = this.props.dimensions[2];
		}

		this.setTransform();
	},

	componentWillUpdate() {
		if(this.props.responsive) {
			this.updateResponsiveDimensions();
		}

		this.setTransform();	
	},

	updateResponsiveDimensions() {
		this.x = (this.props.dimensions[0] / 100) * window.innerWidth;
		this.y = (this.props.dimensions[1] / 100) * window.innerWidth;
		this.z = (this.props.dimensions[2] / 100) * window.innerWidth;
	},

	setTransform() {
		if(this.props.responsive) {
			var translate = 'translate3d(' + (this.state.translate[0] / 100 * window.innerWidth) + 'px, ' + (this.state.translate[1] / 100 * window.innerWidth) + 'px, ' + (this.state.translate[2] / 100 * window.innerWidth) + 'px) ';
		}
		else
		{
			var translate = 'translate3d(' + this.state.translate[0] + 'px, ' + this.state.translate[1] + 'px, ' + this.state.translate[2] + 'px) ';
		}

		var rotate = 'rotateX(' + this.state.rotate[0] + 'deg) rotateY(' + this.state.rotate[1] + 'deg) rotateZ(' + this.state.rotate[2] + 'deg) ';
		var scale = 'scale3d(' + this.state.scale[0] + ', ' + this.state.scale[1] + ', ' + this.state.scale[2] + ')';

		this.transform = translate + rotate + scale;
	},

	updateTransform(transforms, transitionDuration:number = 1000, transitionTimingFunction:string = 'linear', transformOrigin:string = '50% 50% 0') {
		this.refs.cube.style.transition = 'transform ' + transitionDuration + 'ms ' + transitionTimingFunction;
		this.refs.cube.style.transformOrigin = transformOrigin;
		this.refs.cube.style.WebkitTransformOrigin = transformOrigin;

		var rotate;
		var translate;
		var scale;

		for(var i = 0; i < transforms.length; i++) {
			if(transforms[i].prop === 'rotate') {
				rotate = transforms[i].val;
			}
			else if(transforms[i].prop === 'translate') {
				translate = transforms[i].val;
			}
			else if(transforms[i].prop === 'scale') {
				scale = transforms[i].val;
			}
		}

		this.setState({
			...this.state,
			rotate: rotate === undefined ? this.state.rotate : rotate,
			translate: translate === undefined ? this.state.translate : translate,
			scale: scale === undefined ? this.state.scale : scale
		})

		this.setTransform();
	},

	render() {
		return (
			<div 
				className={style3D.cube}
				ref="cube"
				style={{
					...this.props.style,
					width: this.x + 'px',
					height: this.y + 'px',
					transform: this.transform
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
						{this.props.faces[0]}
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
						{this.props.faces[1]}
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
						{this.props.faces[2]}
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
						{this.props.faces[3]}
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
						{this.props.faces[4]}
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
						{this.props.faces[5]}
					</div>
				</div>
			</div>		
		)
	}
});

export default Cube;