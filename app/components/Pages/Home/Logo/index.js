import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { interactableActions, interactableTypes } from '../../../../state/game/interactables';

import { HomePageStyles } from '../../../../styles/pages';

import BodyMovin from '../../../../plugins/bodymovin.min';

const Logo = React.createClass({
	componentDidMount() {
		var logoJson = require('../../../../assets/images/Logo/LogoFloatUp.json');
		var logoAnimation = {
			animationData: logoJson,
			path: '../../../../assets/images/Logo',
			loop: false,
			autoplay: true,
			name: 'logoFloatUp',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.logo)
		};

		this.logoFloatUp = BodyMovin.loadAnimation(logoAnimation);
		this.logoFloatUp.addEventListener('complete', this.setLoopingLogo);
	},

	componentWillUnmount() {
		BodyMovin.destroy();
	},

	setLoopingLogo() {
		this.logoFloatUp.removeEventListener('complete', this.setLoopingLogo);
		this.logoFloatUp.destroy();

		var logoJson = require('../../../../assets/images/Logo/Logo.json');
		var logoAnimation = {
			animationData: logoJson,
			path: '../../../../assets/images/Logo',
			loop: true,
			autoplay: true,
			name: 'logo',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.logo)
		};

		this.logoLoop = BodyMovin.loadAnimation(logoAnimation);

		if(this.props.mode.gameMode) {
			this.makeBalloonPoppable();
		}
	},

	makeBalloonPoppable() {
		this.refs.logo.firstChild.childNodes[1].childNodes[2].addEventListener('click', this.popBalloon);
	},

	popBalloon() {
		if(this.props.items.draggable === 'Artist\'s Knife') {
			this.popWithKnife();
		} 
		else if(this.props.items.draggable === 'Pencil') {
			this.popWithPencil();
		}
		else 
		{
			return;
		}

		this.refs.logo.firstChild.childNodes[1].childNodes[2].removeEventListener('click', this.popBalloon);
		this.refs.logo.firstChild.childNodes[1].childNodes[2].style.opacity = 0;

		setTimeout(() => {
			this.anvilFall();
		}, 500)
	},

	anvilFall() {
		var anvil = this.refs.logo.firstChild.childNodes[1].childNodes[1].firstChild;

		anvil.style.transition = '500ms';
		anvil.style.transform = 'translateX(200px) translateY(500px)';
	},

	popWithKnife() {
		var knifePopJson = require('../../../../assets/images/Logo/BalloonPopKnife.json');
		var knifePop = {
			animationData: knifePopJson,
			path: '../../../../assets/images/Logo',
			loop: false,
			autoplay: true,
			name: 'knifePop',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.pop)
		};

		this.knifePop = BodyMovin.loadAnimation(knifePop);
	},

	popWithPencil() {
		var pencilPopJson = require('../../../../assets/images/Logo/BalloonPopPencil.json');
		var pencilPop = {
			animationData: pencilPopJson,
			path: '../../../../assets/images/Logo',
			loop: false,
			autoplay: true,
			name: 'pencilPop',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.pop)
		};

		this.pencilPop = BodyMovin.loadAnimation(pencilPop);
	},

	render() {
		return (
			<div
				style={{
					position: 'relative'
				}}
			>
				<div
					ref="logo"
				>
				</div>
				<div
					ref="pop"
					style={{
						position: 'absolute',
						top: '0px',
						left: '0px'
					}}
				>
				</div>
			</div>
		);
	}
});

function mapStateToProps(store) {
	return {
		mode: store.modeState,
		interactables: store.interactableState,
		items: store.itemState
	}
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		addEventToFiredArray: interactableActions.addEventToFiredArray
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Logo);