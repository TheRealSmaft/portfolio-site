import React from 'react';
import ReactDOM from 'react-dom';

const LightingFilter = React.createClass({
	propTypes: {
		id: React.PropTypes.string.isRequired,
		lightingType: React.PropTypes.string.isRequired,
		sourceType: React.PropTypes.string.isRequired
	},

	getDefaultProps() {
		return {
			lightingColor: 'white',
			in: 'SourceGraphic',
			result: 'light',
			specularExponent: 1,
			specularConstant: 1,
			kernelUnitLength: "1 1",
			position: [0, 0, 5],
			pointsAt: [0, 0, 0],
			limitingConeAngle: null,
			azimuth: 0,
			elevation: 0,
			operator: 'arithmetic',
			k: [1, 1, 0, 0]
		}
	},

	componentWillMount() {
		this.lighting = null;
		this.source = null;
		this.composite = (
			<feComposite 
				in={this.props.in}
				in2={this.props.result}
				operator={this.props.operator}
				k1={this.props.k[0]}
				k2={this.props.k[1]}
				k3={this.props.k[2]}
				k4={this.props.k[3]}
			/>
		);

		if(this.props.sourceType === 'point') {
			this.source = (
				<fePointLight
					x={this.props.position[0]}
					y={this.props.position[1]}
					z={this.props.position[2]}
				>
					{this.props.children}
				</fePointLight>
			);
		}
		else if(this.props.sourceType === 'spot') {
			this.source = (
				<feSpotLight
					x={this.props.position[0]}
					y={this.props.position[1]}
					z={this.props.position[2]}
					pointsAtX={this.props.pointsAt[0]}
					pointsAtY={this.props.pointsAt[1]}
					pointsAtZ={this.props.pointsAt[2]}
					limitingConeAngle={this.props.limitingConeAngle}
				>
					{this.props.children}
				</feSpotLight>
			);
		}
		else if(this.props.sourceType === 'distant') {
			this.source = (
				<feDistantLight
					azimuth={this.props.azimuth}
					elevation={this.props.elevation}
				>
					{this.props.children}
				</feDistantLight>
			);
		}

		if(this.props.lightingType === 'diffuse') {
			this.lighting = (
				<feDiffuseLighting
					in={this.props.in}
					result={this.props.result}
					style={{
						...this.props.style,
						lightingColor: this.props.lightingColor
					}}
				>
					{this.source}
				</feDiffuseLighting>
			);
		}
		else if(this.props.lightingType === 'specular') {
			this.lighting = (
				<feSpecularLighting
					result={this.props.result}
					specularExponent={this.props.specularExponent}
					specularConstant={this.props.specularConstant}
					kernelUnitLength={this.props.kernelUnitLength}
					style={{
						...this.props.style,
						lightingColor: this.props.lightingColor
					}}
				>
					{this.source}
				</feSpecularLighting>
			);
		}

		this.animations = null;
	},

	componentDidUpdate() {
		
		if(this.refs.animations.firstChild != null) {
			console.log(this.refs.animations.firstChild)
		}
		// if(this.animations != null) {
		// 	var animation = this.refs.animations.firstChild;
		// 	this.refs.animations.removeChild(animation);
		// 	this.refs.filter.firstChild.firstChild.appendChild(animation);
		// }
	},

	addAnimations(animations) {
		this.animations = animations;
	},

	render() {
		return (
			<filter
				ref="filter"
				id={this.props.id}
			>
				<div ref="animations">
					{this.animations}
				</div>
				{this.lighting}
				{this.composite}
			</filter>
		);
	}
});

export default LightingFilter;