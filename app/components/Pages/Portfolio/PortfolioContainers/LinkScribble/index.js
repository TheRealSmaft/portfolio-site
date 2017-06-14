import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { modeActions, modeTypes } from '../../../../../state/game/mode';
import { interactableActions, interactableTypes } from '../../../../../state/game/interactables';

import BodyMovin from '../../../../../plugins/bodymovin.min';

const LinkScribble = React.createClass({
	componentWillMount() {
		this.linkClickable = false;
	},

	componentDidMount() {
		if(this.props.mode.progressLevel < 8) {
			var animationData = {
				animationData: require('../../../../../assets/images/interactables/LinkScribble/LinkScribble.json'),
				path: '../../../../../assets/images/interactables/LinkScribble',
				loop: false,
				autoplay: false,
				name: 'linkScribble',
				renderer: 'svg' ,
				container: ReactDOM.findDOMNode(this.refs.scribble)
			};

			this.scribble = BodyMovin.loadAnimation(animationData);
			this.scribble.addEventListener('complete', this.makeLinkClickable);
		}
		else
		{
			this.linkClickable = true;
			this.refs.scribble.style.display = 'none';
			this.refs.scribble.parentNode.childNodes[0].style.pointerEvents = 'auto';
		}
	},

	eraseScribble() {
		if(this.props.items.draggable === "Eraser") {
			this.props.addEventToFiredArray('EraserUsed');
			this.scribble.play();
			if(this.props.mode.progressLevel === 7) {
				this.props.updateGameProgress(8);
			}
			else if(this.props.mode.progressLevel === 7.5) {
				this.props.updateGameProgress(8.5);
			}
		}
	},

	makeLinkClickable() {
		this.scribble.removeEventListener('complete', this.makeLinkClickable);
		this.scribble.destroy();
		this.linkClickable = true;
		this.refs.scribble.parentNode.childNodes[0].style.pointerEvents = 'auto';
	},

	render() {
		return (
			<span
				className={this.props.className}
			>
				<Link 
					to="/contact"
					style={{
						pointerEvents: 'none'
					}}
				>
					contact&nbsp;me!
				</Link>
				<div
					ref="scribble"
					onClick={this.eraseScribble}
				>
				</div>
			</span>
		);
	}
})

function mapStateToProps(store) {
	return {
		mode: store.modeState,
		items: store.itemState
	}
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		updateGameProgress: modeActions.updateGameProgress,
		addEventToFiredArray:  interactableActions.addEventToFiredArray
	}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(LinkScribble);