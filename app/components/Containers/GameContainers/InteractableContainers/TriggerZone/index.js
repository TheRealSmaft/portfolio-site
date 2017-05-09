import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { interactableActions, interactableTypes } from '../../../../../state/game/interactables';

import BodyMovin from '../../../../../plugins/bodymovin.min';

const TriggerZone = React.createClass({
	propTypes: {
		triggerItem: React.PropTypes.string,
		eventToTrigger: React.PropTypes.string
	},

	componentWillMount() {
		this.pixelBuffer = this.props.pixelBuffer ? this.props.pixelBuffer : 20;
		this.userIsHovering = false;
	},

	componentDidMount() {
		var nodes = ReactDOM.findDOMNode(this.refs.triggerZone).getElementsByTagName('img');
		if(nodes.length > 0) {
			this.zoneNode = nodes[0];
		} 
		else
		{
			this.zoneNode = null;
		}
		if(this.zoneNode != null) {
			this.zoneBounds = this.getBoundingBox();
		}
	},

	componentWillUpdate() {
		var nodes = ReactDOM.findDOMNode(this.refs.triggerZone).getElementsByTagName('img');
		if(nodes.length > 0) {
			this.zoneNode = nodes[0];
		} 
		else
		{
			this.zoneNode = null;
		}
		if(this.zoneNode != null) {
			this.zoneBounds = this.getBoundingBox();
		}
	},

	componentDidUpdate() {
		if(this.lastDragCase != this.props.items.draggable) {
			if(this.props.items.draggable === this.props.triggerItem) {
				this.draggableMatch = true;
			}
			else
			{
				this.props.selectTriggerZone();
				this.draggableMatch = false;
			}
		}

		var isHovering = this.checkForHover();

		if(this.lastHoverCase != isHovering) {
			if(this.draggableMatch && isHovering) {
				this.props.selectTriggerZone(this.props.triggerItem);
			}
			else
			{	
				this.props.selectTriggerZone();
			}
		}
		
		this.lastDragCase = this.props.items.draggable;
		this.lastHoverCase = isHovering;
	},

	getBoundingBox() {
		return this.zoneNode.getBoundingClientRect();
	},

	checkForHover() {
		if(this.zoneNode != null) {
			if(this.props.mouseState.position.x > (this.zoneBounds.left - this.pixelBuffer) &&
				this.props.mouseState.position.x < (this.zoneBounds.right + this.pixelBuffer) &&
				this.props.mouseState.position.y > (this.zoneBounds.top - this.pixelBuffer) &&
				this.props.mouseState.position.y < (this.zoneBounds.bottom + this.pixelBuffer)) {
				return true;
			}
			else
			{
				return false;
			}
		}
		else
		{
			return false;
		}
	},

	triggerEvent() {
		console.log('YOOEPO')
	},

	render() {
		return (
			<div
				ref="triggerZone"
			>
				{this.props.children}
			</div>
		);
	}
});

function mapStateToProps(store) {
	return {
		items: store.itemState,
		interactables: store.interactableState,
		mouseState: store.mouseState,
		windowState: store.windowState,
		scrollState: store.scrollState
	}
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		addEventToFiredArray: interactableActions.addEventToFiredArray,
		selectTriggerZone: interactableActions.selectTriggerZone
	}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(TriggerZone);