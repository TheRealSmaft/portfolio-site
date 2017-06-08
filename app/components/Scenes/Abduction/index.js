import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import { itemActions, itemTypes } from '../../../state/game/items';
import { modeActions, modeTypes } from '../../../state/game/mode';

import { ContactPageStyles } from '../../../styles/pages';

import BodyMovin from '../../../plugins/bodymovin.min';

const Abduction = React.createClass({
	componentDidMount() {
		if(this.props.mode.gameMode) {
			if(this.props.mode.progressLevel > 7.5) {
				this.ufoArrives();

				var silhouetteChewing = {
					animationData: require('../../../assets/images/interactables/UFO/SilhouetteChewing.json'),
					path: '../../../assets/images/interactables/UFO',
					loop: true,
					autoplay: true,
					name: 'silhouetteChewing',
					renderer: 'svg' ,
					container: ReactDOM.findDOMNode(this.refs.silhouette)
				};

				if(this.props.mode.progressLevel < 9) {
					this.silhouetteChewing = BodyMovin.loadAnimation(silhouetteChewing);
				}

				this.brokenLinkItem = {
					name: 'Broken Link',
					collectableImage: require('../../../assets/images/items/AboutLink/BrokenAboutLink.svg'),
					inventoryImage: require('../../../assets/images/items/AboutLink/BrokenAboutLink.svg'),
					width: '100px',
					status: 'inventory',
					examinable: true,
					examineImage: require('../../../assets/images/items/AboutLink/AboutLinkBrokenExamine.svg'),
					deferredEvents: {
						events: [],
						moments: []
					},
					triggerItem: "Glue",
					fireCondition: "GlueUsed",
					eventToFire: "GlueUsed",
					animationToTrigger: {
						animationData: require('../../../assets/images/items/AboutLink/AboutLinkFixed.json'),
						path: '../../../assets/images/items/AboutLink',
						loop: false,
						autoplay: false,
						name: 'aboutLinkFixed',
						renderer: 'svg'
					},
					animationReplacesImage: true,
					initialFrame: 0,
					changeAfterAnimation: true,
					nextItemState: {
						name: 'About Link',
						collectableImage: require('../../../assets/images/items/AboutLink/AboutLinkFixed.svg'),
						inventoryImage: require('../../../assets/images/items/AboutLink/AboutLinkFixed.svg'),
						width: '100px',
						status: 'inventory',
						examinable: true,
						examineImage: require('../../../assets/images/items/AboutLink/AboutLinkFixed.svg'),
						animationReplacesImage: true,
						initialFrame: -1,
						animationToTrigger: {
							animationData: require('../../../assets/images/items/AboutLink/AboutLinkFixed.json'),
							path: '../../../assets/images/items/AboutLink',
							loop: false,
							autoplay: false,
							name: 'aboutLink',
							renderer: 'svg'
						},
						clickEvent: function() {
							browserHistory.push('/about');
							return true;
						},
						deferredEvents: {
							events: [],
							moments: []
						},
					}
				}
			}
		}
		else
		{
			this.ufoHover();
		}
	},

	componentWillUnmount() {
		BodyMovin.destroy();
	},

	ufoArrives() {
		var ufoArrival = {
			animationData: require('../../../assets/images/interactables/UFO/UFOArrival.json'),
			path: '../../../assets/images/interactables/UFO',
			loop: false,
			autoplay: false,
			name: 'ufoArrival',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.alienContact)
		};

		this.ufoArrival = BodyMovin.loadAnimation(ufoArrival);
		this.ufoArrival.addEventListener('complete', this.ufoHover);
		setTimeout(() => {
			this.ufoArrival.play();
		}, 500);
	},

	ufoHover() {
		if(this.ufoArrival) {
			this.ufoArrival.removeEventListener('complete', this.ufoHover);
			this.ufoArrival.destroy();
		}

		var animationData = {
			animationData: require('../../../assets/images/interactables/UFO/UFOHovering.json'),
			path: '../../../assets/images/interactables/UFO',
			loop: true,
			autoplay: true,
			name: 'ufoHover',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.alienContact)
		};

		this.ufoHover = BodyMovin.loadAnimation(animationData);
		this.ufoHover.setSpeed(.25);

		var carrotAnimationData = {
			animationData: require('../../../assets/images/interactables/UFO/Carrot.json'),
			path: '../../../assets/images/interactables/UFO',
			loop: true,
			autoplay: true,
			name: 'ufoHover',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.carrot)
		};

		this.carrot = BodyMovin.loadAnimation(carrotAnimationData);

		if(this.props.mode.gameMode &&
			this.props.mode.progressLevel < 9) {
			this.silhouetteAbduction();
			setTimeout(() => {
				this.useTractorBeam();
			}, 3000);
		}
	},

	useTractorBeam() {
		var tractorBeam = {
			animationData: require('../../../assets/images/interactables/UFO/TractorBeam.json'),
			path: '../../../assets/images/interactables/UFO',
			loop: false,
			autoplay: true,
			name: 'tractorBeam',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.tractorBeam)
		};

		this.tractorBeam = BodyMovin.loadAnimation(tractorBeam);		
	},

	silhouetteAbduction() {
		var silhouetteAbduction = {
			animationData: require('../../../assets/images/interactables/UFO/SilhouetteAbduction.json'),
			path: '../../../assets/images/interactables/UFO',
			loop: false,
			autoplay: true,
			name: 'silhouetteAbduction',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.silhouette)
		};

		this.silhouetteChewing.destroy();
		this.silhouetteAbduction = BodyMovin.loadAnimation(silhouetteAbduction);
		this.silhouetteAbduction.addEventListener('complete', this.makeBrokenLinkClickable);
	},

	makeBrokenLinkClickable() {
		this.silhouetteAbduction.removeEventListener('complete', this.makeBrokenLinkClickable);
		this.refs.silhouette.style.pointerEvents = 'none';
		this.refs.carrot.style.pointerEvents = 'none';
		this.refs.alienContact.style.pointerEvents = 'none';
		this.refs.tractorBeam.style.pointerEvents = 'none';
		this.brokenLink = this.refs.silhouette.firstChild.childNodes[1].childNodes[3];
		this.brokenLink.style.pointerEvents = 'auto';
		this.brokenLink.classList.add(ContactPageStyles.itemHover);
		this.brokenLink.addEventListener('click', this.getBrokenLink);
	},

	getBrokenLink() {
		this.brokenLink.style.display = 'none';
		this.props.addItemToArray(this.brokenLinkItem);
		if(Number.isInteger(this.props.mode.progressLevel)){
			this.props.updateGameProgress(9);
		}
		else
		{
			this.props.updateGameProgress(9.5);
		}
	},

	render() {
		return (
			<div>
				<div
					style={{
						position: 'relative'
					}}
				>
					<div
						ref="carrot"
						style={{
							position: 'absolute',
							top: '0px',
							left: '0px',
							zIndex: 9
						}}
					>
					</div>
					<div
						ref="alienContact"
						style={{
							position: 'relative',
							zIndex: 10
						}}
					>
					</div>
					<div
						ref="silhouette"
						style={{
							position: 'absolute',
							top: '0px',
							left: '0px'
						}}
					>
					</div>
					<div
						ref="tractorBeam"
						style={{
							position: 'absolute',
							top: '0px',
							left: '0px',
							zIndex: 11
						}}
					>
					</div>
				</div>
			</div>
		);
	}
});

function mapStateToProps(store) {
	return {
		mode: store.modeState,
		interactables: store.interactableState
	}
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		addItemToArray: itemActions.addItemToArray,
		updateGameProgress: modeActions.updateGameProgress
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Abduction);