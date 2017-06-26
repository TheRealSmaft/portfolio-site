import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ResponsiveContainer, DeferredEventExecutor } from '../../Containers';
import { Collectable } from '../../Containers/GameContainers';

import { modeActions, modeTypes } from '../../../state/game/mode';
import { interactableActions, interactableTypes } from '../../../state/game/interactables';
import { itemActions, itemTypes } from '../../../state/game/items';
import { scrollEventActions, scrollEventTypes } from '../../../state/events/scroll';
import { sceneActions, sceneTypes } from '../../../state/game/scenes';

import { SilhouetteStyles } from '../../../styles/interactables';
import { navbarStyles } from '../../../styles';

import BodyMovin from '../../../plugins/bodymovin.min';

const SilhouetteIntroScene = React.createClass({
	componentWillMount() {
		if(this.props.mode.gameMode) {
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

			this.mobileNavEvents = [
				function(target) {
					target.style.transition = "800ms ease-out";
					target.style.transformOrigin = "top right";
					target.style.transform = "rotate(-1deg)";
				},
				function(target) {
					target.style.transition = "100ms linear";
					target.style.transform = "rotate(-2deg) translate(-20px, 32px)";
				},
				function(target) {
					target.style.transition = "300ms linear";
					target.style.transform = "rotate(6deg) translate(-5%, 100%)";
				},
				function(target) {
					target.style.transition = "500ms ease-in";
					target.style.transform = "rotate(-4deg) translate(-5%, -500%)";
				},
				function(target) {
					target.style.display = "none";
				}
			];

			this.panelEvents = [
				function(target) {
					target.style.top = '5px';
				}
			];

			this.knife = {
				name: 'Artist\'s Knife',
				collectPoint: 5,
				usePoint: 6,
				collectableImage: require('../../../assets/images/items/Knife/KnifeCollectable.svg'),
				inventoryImage: require('../../../assets/images/items/Knife/KnifeInventory.svg'),
				width: '100px'
			}
		}
	},

	componentWillUnmount() {
		BodyMovin.destroy();
	},

	componentDidMount() {
		if(this.props.mode.gameMode) {
			if(this.props.mode.progressLevel === 1) {
				this.props.lockScrollPosition();
				this.props.toggleSceneStart();
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
			
		if(this.props.mode.progressLevel > 1 &&
			this.props.mode.progressLevel < 6)
			{
				this.makeTearInteractable();
			}

		if(this.props.mode.progressLevel > 3.5) 
			{
				this.emergencyPanelOpen();
			}

		if(this.props.mode.progressLevel > 5) 
			{
				this.skipScene();
			}

		// if(this.props.mode.progressLevel > 1) 
		// 	{
		// 		this.props.addEventToFiredArray('panelAppear');
		// 	}
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
		this.props.addEventToFiredArray('panelAppear');
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
		if(this.props.mode.progressLevel === 1) {
			this.props.updateGameProgress(2);
			this.introPart3.removeEventListener('complete', this.makeTearInteractable);
			this.introPart3.destroy();
		}
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

		this.tearAnimation = BodyMovin.loadAnimation(tearAnimation);
		this.tearAnimation.goToAndStop(0, true);
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
			this.props.addEventToFiredArray('Artist\'s KnifeUsed');
			this.tearAnimation.play();	

			this.props.changeItemStatus('Artist\'s Knife', 'used');
			this.props.updateGameProgress(6);
		}
	},	

	linkHoleToPortfolio() {
		this.hole = this.refs.silhouette.firstChild.childNodes[1];
		this.hole.style.pointerEvents = 'auto';
		this.hole.classList.add(SilhouetteStyles.hole);
		this.hole.addEventListener('click', this.goToPortfolio);
	},

	goToPortfolio() {
		browserHistory.push('/portfolio');
	},

	skipScene() {
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

		this.tearAnimation = BodyMovin.loadAnimation(tearAnimation);
		this.tearAnimation.goToAndStop(47, true);

		this.linkHoleToPortfolio();
	},

	emergencyPanelOpen() {
		var panel = ReactDOM.findDOMNode(this.refs.emergencyPanel).firstChild.firstChild;
		panel.classList.add(SilhouetteStyles.panelAlreadyOpen);
		panel.childNodes[1].value = this.props.mode.password;
		panel.style.pointerEvents = "none";
	},

	handleKeyDown(e) {
		if(e.keyCode === 13) {
			this.emergencyPanelSubmit();
		}
		if(this.wrongPassword &&
			e.keyCode != 8 &&
			e.keyCode != 13) {
			this.wrongPassword = false;
			this.refs.emergencyInput.style.color = 'black';
			this.refs.emergencyInput.style.fontWeight = 'normal';
		}
	},

	handleFocus: function(e) {
		e.target.setSelectionRange(0, e.target.value.length);
	},

	emergencyPanelSubmit() {
		var panel = ReactDOM.findDOMNode(this.refs.emergencyPanel).firstChild.firstChild;
		if(panel.childNodes[1].value === this.props.mode.password) {
			panel.classList.add(SilhouetteStyles.panelOpen);
			
			this.props.changeItemStatus('Paper', 'used');
			this.props.changeItemStatus('Pencil', 'used');

			this.props.updateGameProgress(4);
		}
		else
		{	
			this.wrongPassword = true;
			this.refs.emergencyInput.style.color = 'red';
			this.refs.emergencyInput.style.fontWeight = 'bold';
			this.refs.emergencyInput.value = 'WRONG!!!'
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
					<DeferredEventExecutor
						moments={[1]}
						events={this.panelEvents}
						fireCondition={'panelAppear'}
						ref="emergencyPanel"
					>
						<div
							className={SilhouetteStyles.emergencyPanelContainer}
							style={{
								top: this.props.mode.progressLevel > 1 ? '5px' : '-150px'
							}}
						>
							<div
								className={SilhouetteStyles.emergencyPanel}
							>
								<label for="emergencyInput">
									Emergency?&nbsp;
								</label>
								<input 
									ref="emergencyInput"
									name="emergencyInput"
									type="text"
									placeholder="PASSWORD"
									onKeyDown={this.handleKeyDown}
									onFocus={this.handleFocus}
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
					</DeferredEventExecutor>
					<div
						className={SilhouetteStyles.scene}
					>
						
							<DeferredEventExecutor
								moments={[0, 9, 10, 13, 20]}
								events={this.navEvents}
								fireCondition={'navStolen'}
								increment={100}
								style={{
									display: this.props.mode.progressLevel > 1 ? 'none' : 'block'
								}}
							>
								<div
									id="nav"
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
								</div>
							</DeferredEventExecutor>
							<DeferredEventExecutor
								moments={[0, 9, 10, 13, 20]}
								events={this.mobileNavEvents}
								fireCondition={'navStolen'}
								increment={100}
								style={{
									display: this.props.mode.progressLevel > 1 ? 'none' : 'block'
								}}
							>
								<div
									className={SilhouetteStyles.dummyMobile}
								>
									<div>
										&#9776;
									</div>
									<div>
										<span> 
											<h4>
												Home
											</h4>
										</span>
										<span> 
											<h4>
												Portfolio
											</h4>
										</span>
										<span> 
											<h4>
												Contact
											</h4>
										</span>
										<span> 
											<h4>
												About
											</h4>
										</span>
									</div>
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
		updateGameProgress: modeActions.updateGameProgress,
		changeItemStatus: itemActions.changeItemStatus,
		addEventToFiredArray: interactableActions.addEventToFiredArray,
		lockScrollPosition: scrollEventActions.lockScrollPosition,
		unlockScrollPosition: scrollEventActions.unlockScrollPosition,
		toggleSceneStart: sceneActions.toggleSceneStart,
		toggleSceneStop: sceneActions.toggleSceneStop
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SilhouetteIntroScene);