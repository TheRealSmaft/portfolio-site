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
				target.style.transform = "rotate(11deg) translate(-65px, 250px)";
			}
		];
	},

	componentDidMount() {
		if(this.props.mode.gameMode) {
			var silhouetteJson = require('../../../assets/images/interactables/SinisterSilhouette/SilhouetteIntro.json');
			var silhouetteAnimation = {
				animationData: silhouetteJson,
				path: '../../../../../assets/images/interactables/SinisterSilhouette',
				loop: 1,
				autoplay: true,
				name: 'logo',
				renderer: 'svg' ,
				container: ReactDOM.findDOMNode(this.refs.silhouette)
			}

			this.silhouetteAnimation = BodyMovin.loadAnimation(silhouetteAnimation);
			this.silhouetteAnimation.addEventListener('complete', this.triggerNavAnimation);
		}
	},

	triggerNavAnimation() {
		this.props.addEventToFiredArray('navStolen');
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
								moments={[0, 9, 10]}
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