import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ResponsiveContainer, DeferredEventExecutor } from '../../Containers';
import { itemTypes, itemActions } from '../../../state/game/items';
import { sceneTypes, sceneActions } from '../../../state/game/scenes';

import { LoadingPageStyles } from '../../../styles/pages';

import BodyMovin from '../../../plugins/bodymovin.min';

import uncrumpleEvents from '../../../assets/images/items/Paper/uncrumpleEvents';

const LoadingPage = React.createClass({
	getInitialState() {
		return {
			ellipsisGlyph: '.'
		}
	},

	componentWillMount() {
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

		var uncrumpleMoments = [];

		for(var i = 1; i < 81; i++) {
			uncrumpleMoments.push(i);
		}

		this.paperItem = {
			name: 'Crumpled Paper',
			collectableImage: require('../../../assets/images/items/Paper/CrumpledPaper.png'),
			inventoryImage: require('../../../assets/images/items/Paper/CrumpledPaper.png'),
			width: '100px',
			status: 'inventory',
			examinable: true,
			examineImage: require('../../../assets/images/items/Paper/Crumple/Crumple(1).png'),
			examineWidth: '40%',
			deferredEvents: {
				events: uncrumpleEvents,
				moments: uncrumpleMoments,
				increment: 34,
				loop: false,
				fireCondition: 'uncrumplePaper'
			},
			eventToFire: 'uncrumplePaper',
			changeAfterEvent: true,
			nextItemState: {
				name: 'Paper',
				collectableImage: require('../../../assets/images/items/Paper/Paper.png'),
				inventoryImage: require('../../../assets/images/items/Paper/Paper.png'),
				width: '100px',
				status: 'inventory',
				examinable: true,
				examineImage: require('../../../assets/images/items/Paper/Paper.png'),
				examineWidth: '40%',
				deferredEvents: {
					events: [],
					moments: []
				},
			}
		};
	},

	componentDidMount() {
		ReactDOM.findDOMNode(this.refs.loadingGears).style.pointerEvents = 'none';

		var animationData = {
			animationData: require('../../../assets/images/interactables/LoadingGears/LoadingGears.json'),
			path: '../../../../../assets/images/interactables/LoadingGears',
			loop: 1,
			autoplay: true,
			name: 'loadingGears',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.loadingGears)
		};

		this.loadingGears = BodyMovin.loadAnimation(animationData);
		this.loadingGears.addEventListener('complete', this.breakGears);
	},

	componentWillUnmount() {
		BodyMovin.destroy();
	},

	breakGears() {
		var animationData = {
			animationData: require('../../../assets/images/interactables/LoadingGears/LoadingGearsBreaking.json'),
			path: '../../../../../assets/images/interactables/LoadingGears',
			loop: false,
			autoplay: true,
			name: 'loadingGears',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.loadingGears)
		};
		this.loadingGears.removeEventListener('complete');
		this.loadingGears.destroy();

		this.breakingGears = BodyMovin.loadAnimation(animationData);
		this.breakingGears.addEventListener('complete', this.makePaperClickable);
		this.changeEllipsisGlyph('?');
	},

	fixGears() {
		this.props.addItemToArray(this.paperItem);
		var animationData = {
			animationData: require('../../../assets/images/interactables/LoadingGears/LoadingGearsFixed.json'),
			path: '../../../../../assets/images/interactables/LoadingGears',
			loop: false,
			autoplay: true,
			name: 'loadingGears',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.loadingGears)
		};
		this.breakingGears.removeEventListener('complete');
		this.breakingGears.destroy();

		this.fixedGears = BodyMovin.loadAnimation(animationData);
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
			path: '../../../../../assets/images/interactables/LoadingGears',
			loop: true,
			autoplay: true,
			name: 'loadingGears',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.loadingGears)
		};
		this.fixedGears.removeEventListener('complete');
		this.fixedGears.destroy();

		this.turboChargedGears = BodyMovin.loadAnimation(animationData);
		this.turboChargedGears.setSpeed(4);
		this.changeEllipsisGlyph('!');

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
						height: window.innerHeight + 'px'
					}}
				>
					<div>
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
									<span data-glyph={this.state.ellipsisGlyph}></span>
								</DeferredEventExecutor>
							</span>
						</h1>
					</div>
					<div
						ref="loadingGears"
						className={LoadingPageStyles.gears}
					>
					</div>
				</div>
			</div>
		)
	}
});

function mapStateToProps(store) {
	return {
		items: store.itemState.items
	}
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		addItemToArray: itemActions.addItemToArray,
		toggleSceneStart: sceneActions.toggleSceneStart,
		toggleSceneStop: sceneActions.toggleSceneStop
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadingPage);