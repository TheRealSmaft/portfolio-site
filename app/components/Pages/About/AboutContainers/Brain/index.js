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

const Brain = React.createClass({
	componentDidMount() {
		if(this.props.mode.gameMode) {

			if(this.checkIfBrainAlreadyCollected()) {
				this.refs.brain.style.display = 'none';
			}
			else
			{
				this.makeBrainCollectable();
			}
			
			this.createDomeAnimations();
		}
	},

	componentWillUnmount() {
		BodyMovin.destroy();
	},

	checkIfBrainAlreadyCollected() {
		for(let item of this.props.items.items) {
			if(item.name === 'Brain') {
				return true;
			}
		}

		return false;
	},

	allowClickThrough() {
		this.refs.domeForeground.style.pointerEvents = 'none';
		this.refs.domeBackground.style.pointerEvents = 'none';
	},

	makeBrainCollectable() {
		this.refs.brain.addEventListener('click', this.collectBrain);
		this.refs.brain.classList.add(AboutPageStyles.hover);
	},

	collectBrain() {
		this.refs.brain.removeEventListener('click', this.collectBrain);
		this.refs.brain.style.display = 'none';

		var brainItem = {
			name: 'Brain',
			status: 'inventory',
			inventoryImage: require('../../../../../assets/images/interactables/Brain/BrainInventory.svg'),
			width: '100%'
		};

		this.props.addItemToArray(brainItem);
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
			renderer: 'svg',
			container: ReactDOM.findDOMNode(this.refs.domeForeground)
		};

		this.domeForegroundAnimation = BodyMovin.loadAnimation(foregroundAnimation);
		this.domeForegroundAnimation.addEventListener('complete', this.allowClickThrough);

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
			this.props.addEventToFiredArray('BrainReleased');
			this.playAnimations();	

			if(this.props.interactables.firedEvents.includes('HeartReleased')) {
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
					title="Brain Background"
				>
					<Circle
						fill={'yellow'}
					/>
				</SVG>
				<img 
					ref="brain"
					className={AboutPageStyles.brain}
					src={require('../../../../../assets/images/interactables/Brain/Brain.svg')}
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

export default connect(mapStateToProps, mapDispatchToProps)(Brain);