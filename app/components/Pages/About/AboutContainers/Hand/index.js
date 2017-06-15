import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { itemTypes, itemActions } from '../../../../../state/game/items';
import { modeTypes, modeActions } from '../../../../../state/game/mode';

import BodyMovin from '../../../../../plugins/bodymovin.min';

import { AboutPageStyles } from '../../../../../styles/pages';

const Hand = React.createClass({
	componentDidMount() {
		if(this.props.mode.gameMode &&
			this.props.mode.progressLevel < 11) {
			this.createHandAnimation();
		}
		else
		{
			this.thumbsUp();
		}

		if(!this.props.mode.gameMode) {
			this.createHandHoverEffect();
		}
	},

	createHandAnimation() {
		var json = require('../../../../../assets/images/interactables/Hand/HandWithGavel.json');
		var animation = {
			animationData: json,
			path: '../../../../../assets/images/interactables/Hand',
			loop: false,
			autoplay: false,
			name: 'logo',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.hand)
		};

		this.handWithGavel = BodyMovin.loadAnimation(animation);
		this.handWithGavel.goToAndStop(0, true);

		this.makeGavelClickable();
	},

	makeGavelClickable() {
		var gavel = this.refs.hand.firstChild.childNodes[1].childNodes[1];
		gavel.classList.add(AboutPageStyles.hover);
		gavel.addEventListener('click', this.collectGavel);
	},

	collectGavel() {
		var gavelItem = {
			name: 'Gavel',
			status: 'inventory',
			inventoryImage: require('../../../../../assets/images/items/Gavel/GavelInventory.svg'),
			width: '100px'
		}

		this.props.addItemToArray(gavelItem);
		this.props.updateGameProgress(11);

		this.handWithGavel.destroy();
		this.thumbsUp();

		setTimeout(() => {
			this.thumbsUpAnimation.play();
		}, 250);
	},

	thumbsUp() {
		var json = require('../../../../../assets/images/interactables/Hand/ThumbsUp.json');
		var animation = {
			animationData: json,
			path: '../../../../../assets/images/interactables/Hand',
			loop: false,
			autoplay: false,
			name: 'handAnimation',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.hand)
		};

		this.thumbsUpAnimation = BodyMovin.loadAnimation(animation);
		this.thumbsUpAnimation.goToAndStop(0, true);
		this.thumbsUpAnimation.setSpeed(1.5);
	},

	createHandHoverEffect() {
		var hand = this.refs.hand.firstChild.childNodes[1];
		hand.addEventListener('mouseover', this.playThumbsUp);
		hand.addEventListener('mouseleave', this.playThumbsDown);
	},

	playThumbsUp() {
		this.thumbsUpAnimation.setDirection(1);
		this.thumbsUpAnimation.play();
	},

	playThumbsDown() {
		this.thumbsUpAnimation.setDirection(-1);
		this.thumbsUpAnimation.play();
	},

	render() {
		return (
			<div
				className={this.props.className}
				style={{
					...this.props.style
				}}
				ref="hand"
			>
			</div>
		);
	}
});

function mapStateToProps(store) {
	return {
		mode: store.modeState
	}
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		updateGameProgress: modeActions.updateGameProgress,
		addItemToArray: itemActions.addItemToArray
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Hand);