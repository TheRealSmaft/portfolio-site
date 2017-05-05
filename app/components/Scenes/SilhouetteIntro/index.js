import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ResponsiveContainer, DeferredEventExecutor } from '../../Containers';

import { interactableActions, interactableTypes } from '../../../state/game/interactables';

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
				target.style.transform = "rotate(11deg) translate(-24%, 300%)";
				target.style.clipPath = "url(#clipping)";
				target.childNodes[4].style.transition = "200ms ease-in";
				target.childNodes[4].style.opacity = 1;
			},
			function(target) {
				target.style.transition = "600ms ease-in";
				target.style.transform = "rotate(13deg) translate(78%, 300%)";
				target.childNodes[4].style.transition = "600ms ease-in";
				target.childNodes[4].style.right = "85%";
				target.childNodes[5].firstChild.firstChild.firstChild.style.transition = "600ms ease-in";
				target.childNodes[5].firstChild.firstChild.firstChild.style.transform = "translateX(-100%)";
			},
			function(target) {
				target.style.display = "none";
			}
		];
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
		this.props.addEventToFiredArray('navStolen');
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
		this.introPart3.addEventListener('complete', this.runIntroPart4);
	},

	runIntroPart4() {
		this.introPart3.removeEventListener('complete', this.runIntroPart4);
		var silhouette = ReactDOM.findDOMNode(this.refs.silhouette);
		silhouette.style.transition = "300ms";
		silhouette.style.transform = "scale(5,5)";
		silhouette.style.opacity = "0";

		setTimeout(() => {
			this.runIntroPart5();
		}, 600)
	},

	runIntroPart5() {
		console.log("YEP")
	},

	render() {
		if(this.props.mode.gameMode) {
			return (
				<div>
					<div
						className={SilhouetteStyles.placeholderNav}
					>
					</div>
					<div
						className={SilhouetteStyles.scene}
					>
						<ResponsiveContainer>
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
									<svg width='100%' height='100%'>
									  <defs>
									    <clipPath id="clipping" clipPathUnits="objectBoundingBox">
									      <polygon points="0 0, 1 0, 1 1, 0 1" />
									    </clipPath>
									  </defs>
									</svg>
								</div>
							</DeferredEventExecutor>
						</ResponsiveContainer>
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
		mode: store.modeState
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		addEventToFiredArray: interactableActions.addEventToFiredArray
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SilhouetteIntroScene);