import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { dragAndDropTypes, dragAndDropActions } from '../../../../../state/game/dragAndDrop';
import { inventoryTypes, inventoryActions } from '../../../../../state/game/inventory';
import { mouseTrackingTypes, mouseTrackingActions } from '../../../../../state/mouse/tracking';
import { scrollEventTypes, scrollEventActions } from '../../../../../state/events/scroll';

const Draggable = React.createClass({
	propTypes: {
		mouseState: React.PropTypes.object.isRequired,
		scrollState: React.PropTypes.object.isRequired,
		dragId: React.PropTypes.string.isRequired
	},

	componentWillMount() {
		this.dragging = false;
		this.dropZoneNode = null;
	},

	componentDidMount() {
		this.dragNode = ReactDOM.findDOMNode(this.refs.draggable);
		this.originalParent = this.dragNode.parentNode;
		this.originalPosition = {
			position: this.dragNode.style.position ? this.dragNode.style.position : 'static',
			top: this.dragNode.style.top,
			left: this.dragNode.style.left
		};
	},

	componentWillUpdate() {
		if(this.props.dragAndDrop.dropZoneNode != null &&
			this.props.dragAndDrop.dropZoneNode != this.dropZoneNode) {
			this.dropZoneNode = this.props.dragAndDrop.dropZoneNode;
		}
		else if(this.props.dragAndDrop.dropZoneNode === null &&
			this.props.dragAndDrop.dropZoneNode != this.dropZoneNode)
		{
			this.dropZoneNode = null;
		}
	},

	toggleDrag() {
		this.dragging = !this.dragging;
		if(this.dragging) {
			this.props.selectDraggable(this.props.dragId);
			this.startTrackingMouse();
			this.appendDraggableToDocumentBody()
		}
		else
		{
			if(this.dropZoneNode === null) {
				this.appendDraggableToOriginalParent();
			}
			else
			{
				this.appendDraggableToDropZone();
			}

			this.props.selectDraggable();
			this.stopTrackingMouse();
		}
	},

	startTrackingMouse() {
		window.addEventListener('mousemove', this.trackMouse);
		this.lockScrollPosition();
	},

	stopTrackingMouse() {
		window.removeEventListener('mousemove', this.trackMouse);
		this.unlockScrollPosition();
	},

	trackMouse(event) {
		this.props.trackMousePosition(event.clientX, event.clientY);
		this.dragNode.style.position = 'absolute';
		this.dragNode.style.top = ((this.props.mouseState.position.y + this.props.scrollState.scrollY) - this.dragNode.getBoundingClientRect().height/2)/window.innerHeight * 100 + '%';
		this.dragNode.style.left = ((this.props.mouseState.position.x + this.props.scrollState.scrollX) - this.dragNode.getBoundingClientRect().width/2)/window.innerWidth * 100 + '%';
	},

	lockScrollPosition() {
		this.props.lockScrollPosition();
	},

	unlockScrollPosition() {
		this.props.unlockScrollPosition();
	},

	appendDraggableToDocumentBody() {
		this.dragNode.parentNode.removeChild(this.dragNode);
		document.body.appendChild(this.dragNode);
	},

	appendDraggableToOriginalParent() {
		this.dragNode.parentNode.removeChild(this.dragNode);
		this.originalParent.appendChild(this.dragNode);
		this.returnDraggableToOriginalPosition();
	},

	appendDraggableToDropZone() {
		this.dragNode.parentNode.removeChild(this.dragNode);
		this.dropZoneNode.appendChild(this.dragNode);

		var id = this.props.dragId;
		var itemId = _.findIndex(this.props.inventory.inventory, function(obj) {
			return obj.name === id;
		});
		this.props.placeItemInDOM(itemId);

		this.centerDraggableInDropZone();
	},

	returnDraggableToOriginalPosition() {
		this.dragNode.style.top = this.originalPosition.top + 'px';
		this.dragNode.style.left = this.originalPosition.left + 'px';
		this.dragNode.style.position = this.originalPosition.position;
	},

	centerDraggableInDropZone() {
		var dragBounds = this.dragNode.getBoundingClientRect();
		var zoneBounds = this.dragNode.parentNode.getBoundingClientRect();

		this.dragNode.style.left = ((zoneBounds.width - dragBounds.width) / 2) / zoneBounds.width * 100 + '%';
		this.dragNode.style.top = ((zoneBounds.height - dragBounds.height) / 2) / zoneBounds.height * 100 + '%';
		this.dragNode.style.position = 'relative';
	},

	render() {
		return (
			<div 
				onClick={this.toggleDrag}
				ref='draggable'
			>
				{this.props.children}
			</div>
		);
	}
});

function mapStateToProps(store) {
	return {
		dragAndDrop: store.dragAndDropState,
		inventory: store.inventoryState,
		mouseState: store.mouseState,
		scrollState: store.scrollState
	};
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		selectDraggable: dragAndDropActions.selectDraggable,
		placeItemInDOM: inventoryActions.placeItemInDOM,
		trackMousePosition: mouseTrackingActions.trackMousePosition,
		lockScrollPosition: scrollEventActions.lockScrollPosition,
		unlockScrollPosition: scrollEventActions.unlockScrollPosition
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Draggable);