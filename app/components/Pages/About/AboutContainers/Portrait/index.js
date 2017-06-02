import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SVG, Circle } from '../../../../Containers/ShapeContainers';

import { itemTypes, itemActions } from '../../../../../state/game/items';
import { interactableTypes, interactableActions } from '../../../../../state/game/interactables';
import { modeTypes, modeActions } from '../../../../../state/game/mode';

import BodyMovin from '../../../../../plugins/bodymovin.min';

import { AboutPageStyles } from '../../../../../styles/pages';

const Portrait = React.createClass({
	componentDidMount() {
		this.createPortraitAnimations();
	},

	createPortraitAnimations() {
		var portraitJson = require('../../../../../assets/images/interactables/AboutPortrait/PortraitSmiling.json');
		var portraitAnimation = {
			animationData: portraitJson,
			path: '../../../../../assets/images/interactables/AboutPortrait',
			loop: false,
			autoplay: false,
			name: 'portrait',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.portrait)
		};

		this.portraitAnimation = BodyMovin.loadAnimation(portraitAnimation);

		var blinkingJson = require('../../../../../assets/images/interactables/AboutPortrait/PortraitBlinking.json');
		var blinkingAnimation = {
			animationData: blinkingJson,
			path: '../../../../../assets/images/interactables/AboutPortrait',
			loop: false,
			autoplay: false,
			name: 'blinking',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.blinking)
		};

		this.blinkingAnimation = BodyMovin.loadAnimation(blinkingAnimation);
	},

	smile() {
		this.portraitAnimation.playSegments([0, 8]);
	},

	stopSmiling() {
		this.portraitAnimation.playSegments([10, this.portraitAnimation.totalFrames]);
	},

	render() {
		return (
			<div
				className={AboutPageStyles.sectionImg}
			>
				<SVG
					title="Portrait Background"
				>
					<Circle
						fill={'orange'}
					/>
				</SVG>
				<div
					ref="portrait"
					className={AboutPageStyles.portrait}
					onMouseOver={this.smile}
					onMouseLeave={this.stopSmiling}
				>
				</div>
				<div
					ref="blinking"
					className={AboutPageStyles.portrait}
					style={{
						pointerEvents: 'none'
					}}
				>
				</div>
			</div>
		);
	}
});

export default Portrait;