import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ResponsiveContainer, DeferredEventExecutor } from '../../Containers';

import { modeActions, modeTypes } from '../../../state/game/mode';
import { itemTypes, itemActions } from '../../../state/game/items';
import { sceneTypes, sceneActions } from '../../../state/game/scenes';

import { LoadingPageStyles } from '../../../styles/pages';

import BodyMovin from '../../../plugins/bodymovin.min';

import itemList from '../../../assets/gameObjects/items';

const LoadingPage = React.createClass({
	getInitialState() {
		return {
			ellipsisGlyph: '.'
		}
	},

	componentWillMount() {
		if(this.props.mode.progressLevel > 0) {
			browserHistory.replace('/home');
		}
		this.ellipsisEvents = [
			function (target) {
				target.innerHTML = '';
			},

			function (target) {
				target.innerHTML = target.dataset.glyph;
			},

			function (target) {
				target.innerHTML = target.dataset.glyph + target.dataset.glyph;
			},

			function (target) {
				target.innerHTML = target.dataset.glyph + target.dataset.glyph + target.dataset.glyph;
			}
		];

		this.paperItem = itemList.crumpledPaper;
	},

	componentDidMount() {
		ReactDOM.findDOMNode(this.refs.loadingGears).style.pointerEvents = 'none';

		var animationData = {
			animationData: require('../../../assets/images/interactables/LoadingGears/LoadingGears.json'),
			path: '../../../assets/images/interactables/LoadingGears',
			loop: 2,
			autoplay: false,
			name: 'loadingGears',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.loadingGears)
		};

		this.loadingGears = BodyMovin.loadAnimation(animationData);

		if(window.innerWidth < 992) {
			BodyMovin.setQuality('low');
		}
		this.refs.loadingGears.style.width = '100%';
		this.loadingGears.play();
		this.loadingGears.addEventListener('complete', this.breakGears);
	},

	componentWillUnmount() {
		BodyMovin.destroy();
	},

	breakGears() {
		var animationData = {
			animationData: require('../../../assets/images/interactables/LoadingGears/LoadingGearsBreaking.json'),
			path: '../../../assets/images/interactables/LoadingGears',
			loop: false,
			autoplay: false,
			name: 'loadingGears',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.loadingGears)
		};
		this.loadingGears.removeEventListener('complete');
		this.loadingGears.destroy();

		this.breakingGears = BodyMovin.loadAnimation(animationData);

		if(window.innerWidth < 992) {
			BodyMovin.setQuality('low');
		}
		this.refs.loadingGears.style.width = '100%';

		this.breakingGears.play();
		this.breakingGears.addEventListener('complete', this.makePaperClickable);
		this.changeEllipsisGlyph('?');
	},

	fixGears() {
		this.props.addItemToArray(this.paperItem);
		var animationData = {
			animationData: require('../../../assets/images/interactables/LoadingGears/LoadingGearsFixed.json'),
			path: '../../../assets/images/interactables/LoadingGears',
			loop: false,
			autoplay: false,
			name: 'loadingGears',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.loadingGears)
		};
		this.breakingGears.removeEventListener('complete');
		this.breakingGears.destroy();

		this.fixedGears = BodyMovin.loadAnimation(animationData);
		
		if(window.innerWidth < 992) {
			BodyMovin.setQuality('low');
		}
		this.refs.loadingGears.style.width = '100%';
		this.fixedGears.play();
		this.fixedGears.addEventListener('complete', this.turboChargeGears);
	},

	makePaperClickable() {
		this.props.toggleSceneStop();
		var paper = this.refs.loadingGears.firstChild.childNodes[1].childNodes[2].childNodes[0];
		paper.classList.add(LoadingPageStyles.paperItem);
		paper.addEventListener('mousedown', this.fixGears);
	},

	turboChargeGears() {
		var animationData = {
			animationData: require('../../../assets/images/interactables/LoadingGears/LoadingGears.json'),
			path: '../../../assets/images/interactables/LoadingGears',
			loop: true,
			autoplay: false,
			name: 'loadingGears',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.loadingGears)
		};
		this.fixedGears.removeEventListener('complete');
		this.fixedGears.destroy();

		this.turboChargedGears = BodyMovin.loadAnimation(animationData);

		if(window.innerWidth < 992) {
			BodyMovin.setQuality('low');
		}

		this.refs.loadingGears.style.width = '100%';

		this.turboChargedGears.setSpeed(4);
		this.turboChargedGears.play();

		this.changeEllipsisGlyph('!');

		this.props.updateGameProgress(1);

		setTimeout(() => {
			browserHistory.push('/home');
		}, 3000);
	},

	changeEllipsisGlyph(glyph) {
		this.setState({
			...this.state,
			ellipsisGlyph: glyph
		})
	},

	render() {
		return (
			<div
				style={{
					width: '100%'
				}}
			>
				<div 
					className={LoadingPageStyles.loaderContainer}
					style={{
						height: window.innerHeight * .9 + 'px'
					}}
				>
					<h1 
						className={LoadingPageStyles.loaderText}
					>
						Loading

						<span>
							<DeferredEventExecutor
								style={{display: 'inline'}}
								moments={[0, 1, 2, 3]}
								events={this.ellipsisEvents}
								increment={500}
								loop={true}
							>
								<span 
									data-glyph={this.state.ellipsisGlyph}
								>
								</span>
							</DeferredEventExecutor>
						</span>
					</h1>
					<div
						className={LoadingPageStyles.gears}
					>
						<div
							ref="loadingGears"
						>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

function mapStateToProps(store) {
	return {
		items: store.itemState.items,
		mode: store.modeState,
		windowState: store.windowState
	}
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		updateGameProgress: modeActions.updateGameProgress,
		addItemToArray: itemActions.addItemToArray,
		toggleSceneStart: sceneActions.toggleSceneStart,
		toggleSceneStop: sceneActions.toggleSceneStop
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadingPage);