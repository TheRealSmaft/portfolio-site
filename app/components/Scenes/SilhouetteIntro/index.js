import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ResponsiveContainer, DeferredEventExecutor } from '../../Containers';
import { Collectable, TriggerZone } from '../../Containers/GameContainers';

import { interactableActions, interactableTypes } from '../../../state/game/interactables';
import { itemActions, itemTypes } from '../../../state/game/items';
import { scrollEventActions, scrollEventTypes } from '../../../state/events/scroll';
import { sceneActions, sceneTypes } from '../../../state/game/scenes';

import { SilhouetteStyles } from '../../../styles/interactables';
import { navbarStyles } from '../../../styles';

import BodyMovin from '../../../plugins/bodymovin.min';

const SilhouetteIntroScene = React.createClass({
	componentWillMount() {
		this.navEvents = [
			function(target) {
				target.style.transition = "800ms ease-out";
				target.style.transformOrigin = "top right";
				target.style.transform = "rotate(-1deg)";
			},
			function(target) {
				target.style.transition = "100ms linear";
				target.style.transform = "rotate(-4deg) translate(-40px, 64px)";
			},
			function(target) {
				target.style.transition = "300ms linear";
				target.style.transform = "rotate(11deg) translate(-5%, 300%)";
			},
			function(target) {
				target.style.transition = "500ms ease-in";
				target.style.transform = "rotate(-4deg) translate(-5%, -1000%)";
			},
			function(target) {
				target.style.display = "none";
			}
		];

		this.props.lockScrollPosition();
		this.props.toggleSceneStart();

		this.knife = {
			name: 'Artist\'s Knife',
			collectableImage: require('../../../assets/images/items/Knife/KnifeCollectable.svg'),
			inventoryImage: require('../../../assets/images/items/Knife/KnifeInventory.svg'),
			width: '100px'
		}
	},

	componentDidMount() {
		if(this.props.mode.gameMode) {
			var introPart1Json = require('../../../assets/images/interactables/SinisterSilhouette/SilhouetteIntro.json');
			var introPart1 = {
				animationData: introPart1Json,
				path: '../../../assets/images/interactables/SinisterSilhouette',
				loop: 1,
				autoplay: true,
				name: 'logo',
				renderer: 'svg' ,
				container: ReactDOM.findDOMNode(this.refs.silhouette)
			}

			this.introPart1 = BodyMovin.loadAnimation(introPart1);
			this.introPart1.addEventListener('complete', this.runIntroPart2);
		}
	},

	runIntroPart2() {
		this.props.addEventToFiredArray('navStolen');
		var introPart2Json = require('../../../assets/images/interactables/SinisterSilhouette/SilhouetteIntro2.json');
		var introPart2 = {
			animationData: introPart2Json,
			path: '../../../assets/images/interactables/SinisterSilhouette',
			loop: 1,
			autoplay: true,
			name: 'logo',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.silhouette)
		};

		this.introPart1.removeEventListener('complete', this.runIntroPart2);
		this.introPart1.destroy();

		this.introPart2 = BodyMovin.loadAnimation(introPart2);
		this.introPart2.addEventListener('complete', this.runIntroPart3);
	},

	runIntroPart3() {
		var introPart3Json = require('../../../assets/images/interactables/SinisterSilhouette/SilhouetteIntro3.json');
		var introPart3 = {
			animationData: introPart3Json,
			path: '../../../assets/images/interactables/SinisterSilhouette',
			loop: 1,
			autoplay: true,
			name: 'logo',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.silhouette)
		};

		this.introPart2.removeEventListener('complete', this.runIntroPart3);
		this.introPart2.destroy();

		this.introPart3 = BodyMovin.loadAnimation(introPart3);
		this.introPart3.addEventListener('complete', this.makeTearInteractable);
	},

	makeTearInteractable() {
		var tearJson = require('../../../assets/images/interactables/Tear/Tear.json');
		var tearAnimation = {
			animationData: tearJson,
			path: '../../../assets/images/interactables/Tear',
			loop: false,
			autoplay: true,
			name: 'logo',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.silhouette)
		};

		this.introPart3.removeEventListener('complete', this.makeTearInteractable);
		this.introPart3.destroy();

		this.tearAnimation = BodyMovin.loadAnimation(tearAnimation);
		this.tearAnimation.goToAndStop(1);
		this.tearAnimation.addEventListener('complete', this.linkHoleToPortfolio)

		this.props.unlockScrollPosition();
		this.props.toggleSceneStop();

		this.tear = this.refs.silhouette.firstChild.childNodes[1].firstChild;
		this.tear.style.pointerEvents = 'auto';
		this.tear.addEventListener('click', this.tearClicked);
	},

	tearClicked() {
		if(this.props.items.draggable === "Artist's Knife") {
			this.tear.removeEventListener('click', this.tearClicked);
			this.props.addEventToFiredArray('knifeUsed');
			this.tearAnimation.play();	
		}
	},	

	linkHoleToPortfolio() {
		this.hole = this.refs.silhouette.firstChild.childNodes[1];
		this.hole.style.pointerEvents = 'auto';
		this.hole.classList.add(SilhouetteStyles.hole);
		this.hole.addEventListener('click', this.goToPortfolio);
	},

	goToPortfolio() {
		this.props.lockScrollPosition();
		this.hole.removeEventListener('click', this.goToPortfolio);
		this.refs.silhouette.style.transform = 'scale(10)';
		setTimeout(() => {
			this.props.unlockScrollPosition();
			browserHistory.push('/portfolio');
		},600)
	},

	emergencyPanelSubmit() {
		var panel = this.refs.emergencyPanel;
		if(panel.childNodes[1].value === this.props.mode.password) {
			panel.classList.add(SilhouetteStyles.panelOpen);
			var itemIndex = _.findIndex(this.props.items.items, function(obj) {
				return obj.name === 'Paper';
			});
			this.props.changeItemStatus(itemIndex, 'allocated');
		}
	},

	render() {
		if(this.props.mode.gameMode) {
			return (
				<div
					style={{
						position: 'relative'
					}}
				>
					<div
						className={SilhouetteStyles.emergencyPanelContainer}
					>
						<div
							className={SilhouetteStyles.emergencyPanel}
							ref="emergencyPanel"
						>
							<label for="emergencyInput">
								Emergency Panel:&nbsp;
							</label>
							<input 
								name="emergencyInput"
								type="text"
								placeholder="ENTER PASSWORD"
							/>
							&nbsp;
							<button
								onClick={this.emergencyPanelSubmit}
							>
								Submit
							</button>
						</div>
						<div
							className={SilhouetteStyles.knifeCubby}
						>
							<Collectable
								item={this.knife}
							/>
						</div>
					</div>
					<div
						className={SilhouetteStyles.placeholderNav}
					>
					</div>
					<div
						className={SilhouetteStyles.scene}
					>
						
							<DeferredEventExecutor
								moments={[0, 9, 10, 13, 20]}
								events={this.navEvents}
								fireCondition={'navStolen'}
								increment={100}
							>
								<div
									ref="dummyNav"
									className={SilhouetteStyles.dummyNav}
								>
									<div> 
										<h4>
											Home
										</h4>
									</div>
									<div> 
										<h4>
											Portfolio
										</h4>
									</div>
									<div> 
										<h4>
											Contact
										</h4>
									</div>
									<div> 
										<h4>
											About
										</h4>
									</div>
									<img 
										className={SilhouetteStyles.navbarShadow}
										src={require('../../../assets/images/interactables/Navbar/NavbarShadow.svg')}
									/>
								</div>
							</DeferredEventExecutor>
						<div
							ref="silhouette"
							className={SilhouetteStyles.silhouette}
						>
						</div>
					</div>
				</div>
			)
		}
		else
		{
			return null;
		}
	}
});

function mapStateToProps(store) {
	return {
		items: store.itemState,
		mode: store.modeState
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		changeItemStatus: itemActions.changeItemStatus,
		addEventToFiredArray: interactableActions.addEventToFiredArray,
		lockScrollPosition: scrollEventActions.lockScrollPosition,
		unlockScrollPosition: scrollEventActions.unlockScrollPosition,
		toggleSceneStart: sceneActions.toggleSceneStart,
		toggleSceneStop: sceneActions.toggleSceneStop
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SilhouetteIntroScene);