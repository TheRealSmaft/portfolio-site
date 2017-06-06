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

const Heart = React.createClass({
	componentDidMount() {
		if(this.props.mode.gameMode) {
			
			if(this.checkIfHeartAlreadyCollected()) {
				this.refs.heart.style.display = 'none';
			}
			else
			{
				this.makeHeartCollectable();
			}
			
			this.createDomeAnimations();
		}
	},

	componentWillUnmount() {
		BodyMovin.destroy();
	},

	checkIfHeartAlreadyCollected() {
		for(let item of this.props.items.items) {
			if(item.name === 'Heart') {
				return true;
			}
		}

		return false;
	},

	allowClickThrough() {
		this.refs.domeForeground.style.pointerEvents = 'none';
	},

	makeHeartCollectable() {
		this.refs.heart.addEventListener('click', this.collectHeart);
		this.refs.heart.classList.add(AboutPageStyles.hover);
	},

	collectHeart() {
		this.refs.heart.removeEventListener('click', this.collectHeart);
		this.refs.heart.style.display = 'none';

		var heartItem = {
			name: 'Heart',
			status: 'inventory',
			inventoryImage: require('../../../../../assets/images/interactables/Heart/Heart.svg'),
			width: '100%'
		};

		this.props.addItemToArray(heartItem);
		this.props.updateGameProgress(this.props.mode.progressLevel);
	},

	createDomeAnimations() {
		var foregroundJson = require('../../../../../assets/images/interactables/GlassDome/GlassDomeForeground.json');
		var foregroundAnimation = {
			animationData: foregroundJson,
			path: '../../../../../assets/images/interactables/GlassDome',
			loop: false,
			autoplay: false,
			name: 'domeForeground',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.domeForeground)
		};

		this.domeForegroundAnimation = BodyMovin.loadAnimation(foregroundAnimation);
		this.domeForegroundAnimation.addEventListener('complete', this.allowClickThrough)

		var backgroundJson = require('../../../../../assets/images/interactables/GlassDome/GlassDomeBackground.json');
		var backgroundAnimation = {
			animationData: backgroundJson,
			path: '../../../../../assets/images/interactables/GlassDome',
			loop: false,
			autoplay: false,
			name: 'domeBackground',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.domeBackground)
		};

		this.domeBackgroundAnimation = BodyMovin.loadAnimation(backgroundAnimation);

		if(this.props.mode.progressLevel < 12) {
			this.dome = this.refs.domeForeground.firstChild.childNodes[1].childNodes[2];
			this.dome.addEventListener('click', this.breakGlass);
		}
		else
		{
			this.domeForegroundAnimation.goToAndStop(this.domeForegroundAnimation.totalFrames, true);
			this.domeBackgroundAnimation.goToAndStop(this.domeBackgroundAnimation.totalFrames, true);
			this.refs.domeForeground.style.pointerEvents = 'none';
		}
	},

	playAnimations() {
		this.domeForegroundAnimation.play();
		this.domeBackgroundAnimation.play();
	},

	breakGlass() {
		if(this.props.items.draggable === "Gavel") {
			this.dome.removeEventListener('click', this.breakGlass);
			this.props.addEventToFiredArray('HeartReleased');
			this.playAnimations();	

			if(this.props.interactables.firedEvents.includes('BrainReleased')) {
				this.props.updateGameProgress(12);
				this.props.changeItemStatus('Gavel', 'used');
			}
		}
	},

	render() {
		return (
			<div
				className={AboutPageStyles.sectionImg}
			>
				<div
					ref="domeBackground"
					className={AboutPageStyles.glassDome}
				>
				</div>
				<SVG
					title="Heart Background"
				>
					<Circle
						fill={'lightgreen'}
					/>
				</SVG>
				<img 
					ref="heart"
					className={AboutPageStyles.heart}
					src={require('../../../../../assets/images/interactables/Heart/Heart.svg')}
				/>
				<div
					ref="domeForeground"
					className={AboutPageStyles.glassDome}
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
		updateGameProgress: modeActions.updateGameProgress,
		addItemToArray: itemActions.addItemToArray,
		changeItemStatus: itemActions.changeItemStatus,
		addEventToFiredArray: interactableActions.addEventToFiredArray
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Heart);