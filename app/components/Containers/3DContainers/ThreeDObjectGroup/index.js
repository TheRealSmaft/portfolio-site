import React from 'react';
import ReactDOM from 'react-dom';

import { style3D } from '../../../../styles/3DContainer';

const ThreeDObjectGroup = React.createClass({
	propTypes: {
		rotate: React.PropTypes.arrayOf(React.PropTypes.number),
		translate: React.PropTypes.arrayOf(React.PropTypes.number)
	},

	getDefaultProps() {
		return {
			rotate: [0, 0, 0],
			translate: [0, 0, 0],
			scale: [1, 1, 1],
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
		this.setTransform();
	},

	componentDidUpdate() {
		this.setTransform();	
	},

	setTransform() {
		this.transformObject = {
			translate: 'translate3d(' + this.state.translate[0] + 'px, ' + this.state.translate[1] + 'px, ' + this.state.translate[2] + 'px) ',
			rotate: 'rotateX(' + this.state.rotate[0] + 'deg) rotateY(' + this.state.rotate[1] + 'deg) rotateZ(' + this.state.rotate[2] + 'deg) ',
			scale: 'scale3d(' + this.state.scale[0] + ', ' + this.state.scale[1] + ', ' + this.state.scale[2] + ') '
		}
		this.transform = this.transformObject.translate + this.transformObject.rotate + this.transformObject.scale;
	},

	updateTransform(props, transitionDuration:number = 1000, transitionTimingFunction:string = 'linear', transformOrigin:string = '50% 50% 0') {
		this.refs.group.style.transition = 'transform ' + transitionDuration + 'ms ' + transitionTimingFunction;
		this.refs.group.transformOrigin = transformOrigin;
		this.refs.group.WebkitTransformOrigin = transformOrigin;

		var rotate;
		var translate;
		var scale;

		for(var i = 0; i < props.length; i++) {
			if(props[i].prop === 'rotate') {
				rotate = props[i].val;
			}
			else if(props[i].prop === 'translate') {
				translate = props[i].val;
			}
			else if(props[i].prop === 'scale') {
				scale = props[i].val;
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
				className={style3D.objectGroup}
				ref="group"
				style={{
					...this.props.style,
					transform: this.transform
				}}
			>
				{this.props.children}
			</div>
		);
	}
});

export default ThreeDObjectGroup;