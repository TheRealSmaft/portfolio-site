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
		if(!this.props.mode.gameMode) {
			this.createPortraitAnimations();
		}
		else
		{
			this.refs.portrait.classList.add(AboutPageStyles.hover);
			this.createSilhouettePortraitAnimation();
		}
	},

	componentWillUnmount() {
		BodyMovin.destroy();
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
			renderer: 'svg',
			container: ReactDOM.findDOMNode(this.refs.blinking)
		};

		this.blinkingAnimation = BodyMovin.loadAnimation(blinkingAnimation);

		this.refs.portrait.addEventListener('mouseover', this.smile);
		this.refs.portrait.addEventListener('mouseleave', this.stopSmiling);

		this.blink();
	},

	smile() {
		this.portraitAnimation.setDirection(1);
		this.portraitAnimation.play();
	},

	stopSmiling() {
		this.portraitAnimation.setDirection(-1);
		this.portraitAnimation.play();
	},

	blink() {
		let delay = Math.floor(Math.random() * (6000 - 3000) + 3000);
		setTimeout(() => {
			this.blinkingAnimation.goToAndPlay(0, true);
			this.blink();
		}, delay);
	},

	createSilhouettePortraitAnimation() {
		if(this.silhouetteAgony) {
			this.silhouetteAgony.destroy();
		}

		var silhouettePortraitJson = require('../../../../../assets/images/interactables/AboutPortrait/SilhouetteHiding.json');
		var silhouettePortrait = {
			animationData: silhouettePortraitJson,
			path: '../../../../../assets/images/interactables/AboutPortrait',
			loop: false,
			autoplay: false,
			name: 'silhouettePortrait',
			renderer: 'svg',
			container: ReactDOM.findDOMNode(this.refs.portrait)
		};

		this.silhouettePortrait = BodyMovin.loadAnimation(silhouettePortrait);

		this.refs.portrait.addEventListener('mouseover', this.hide);
		this.refs.portrait.addEventListener('mouseleave', this.stopHiding);
		this.refs.portrait.addEventListener('click', this.agonize);
	},

	hide() {
		this.silhouettePortrait.setDirection(1);
		this.silhouettePortrait.play();
	},

	stopHiding() {
		this.silhouettePortrait.setDirection(-1);
		this.silhouettePortrait.play();
	},

	agonize() {
		if(this.props.items.draggable === 'Brain' ||
			this.props.items.draggable === 'Heart') {

			this.props.changeItemStatus(this.props.items.draggable, 'used');
			this.props.addEventToFiredArray(this.props.items.draggable + 'Used');

			this.refs.portrait.removeEventListener('mouseover', this.hide);
			this.refs.portrait.removeEventListener('mouseleave', this.stopHiding);
			this.refs.portrait.removeEventListener('click', this.agonize);

			this.silhouettePortrait.destroy();

			var silhouetteAgonyJson = require('../../../../../assets/images/interactables/AboutPortrait/SilhouetteAgony.json');
			var silhouetteAgony = {
				animationData: silhouetteAgonyJson,
				path: '../../../../../assets/images/interactables/AboutPortrait',
				loop: false,
				autoplay: false,
				name: 'silhouetteAgony',
				renderer: 'svg',
				container: ReactDOM.findDOMNode(this.refs.portrait)
			};

			this.silhouetteAgony = BodyMovin.loadAnimation(silhouetteAgony);
			
			if(this.props.interactables.firedEvents.includes('HeartUsed') &&
				this.props.interactables.firedEvents.includes('BrainUsed')) {
				this.silhouetteAgony.loop = true;
				this.silhouetteAgony.playSegments([[0, 15], [16, 23]], true);
			}
			else
			{
				this.silhouetteAgony.addEventListener('complete', this.createSilhouettePortraitAnimation);
				this.silhouetteAgony.play();
			}
		}
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

function mapStateToProps(store) {
	return {
		mode: store.modeState,
		items: store.itemState,
		interactables: store.interactableState
	}
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		changeItemStatus: itemActions.changeItemStatus,
		updateGameProgress: modeActions.updateGameProgress,
		addEventToFiredArray: interactableActions.addEventToFiredArray
	}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Portrait);