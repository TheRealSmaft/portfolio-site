import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { interactableActions, interactableTypes } from '../../../../../state/game/interactables';

import BodyMovin from '../../../../../plugins/bodymovin.min';

const LinkScribble = React.createClass({
	componentWillMount() {
		this.linkClickable = false;
	},

	componentDidMount() {
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
	},

	eraseScribble() {
		if(this.props.items.draggable === "Eraser") {
			this.props.addEventToFiredArray('eraserUsed');
			this.scribble.play();	
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
			<div
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
					onMouseUp={this.eraseScribble}
				>
				</div>
			</div>
		);
	}
})

function mapStateToProps(store) {
	return {
		items: store.itemState,
		mode: store.modeState
	}
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		addEventToFiredArray:  interactableActions.addEventToFiredArray
	}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(LinkScribble);