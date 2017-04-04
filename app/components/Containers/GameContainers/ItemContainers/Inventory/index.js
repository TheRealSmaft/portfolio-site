import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import lodash from 'lodash';

import Item from '../ItemComponent';

import { itemActions, itemTypes } from '../../../../../state/game/items';
import { interactableActions, interactableTypes } from '../../../../../state/game/interactables';
import { mouseTrackingActions, mouseTrackingTypes } from '../../../../../state/mouse/tracking';
import { scrollEventTypes, scrollEventActions } from '../../../../../state/events/scroll';

const Inventory = React.createClass({
	componentWillMount() {
		this.getInventoryItems();

		this.draggable = null;
		this.lastDraggable = this.draggable;

		this.dragNode = null;
	},

	componentWillUpdate() {
		this.getInventoryItems();
	},

	getInventoryItems() {
		this.inventory = _.filter(this.props.items.items, ['status', 'inventory']);
	},

	toggleItemDrag(name) {
		if(this.props.items.draggable != null) {
			this.stopTrackingMouse();
			if(this.props.interactables.currentDropZone === this.props.items.draggable) {
				this.appendDraggableToDropZone();
			}
			else
			{
				this.appendDraggableToOriginalParent();
			}
			this.props.toggleItemDrag();
			this.draggable = null;
			this.dragNode = null;
		}
		else
		{
			this.draggable = name;
			this.props.toggleItemDrag(name);
			this.appendDraggableToDocumentBody();
			this.startTrackingMouse();
		}
	},

	appendDraggableToDocumentBody() {
		this.dragNode = this.refs[this.draggable];
		this.originalParentNode = this.dragNode.parentNode;
		this.originalParentNode.removeChild(this.dragNode);
		document.body.appendChild(this.dragNode);
	},

	appendDraggableToOriginalParent() {
		this.dragNode.parentNode.removeChild(this.dragNode);
		this.originalParentNode.appendChild(this.dragNode);
		this.dragNode.style.position = 'static';
	},

	appendDraggableToDropZone() {
		var name = this.draggable;
		this.originalParentNode.appendChild(this.dragNode);

		var dropZoneIndex = _.findIndex(this.props.interactables.dropZones, function(obj) {
			return obj.name === name;
		});

		var itemIndex = _.findIndex(this.props.items.items, function(obj) {
			return obj.name === name;
		});

		this.props.changeItemStatus(itemIndex, 'allocated');

		this.props.toggleItemDrag();
		this.props.changeDropZoneStatus(dropZoneIndex, 'closed');
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

	// inspectItem(name) {
	// 	clearTimeout(this.clickTimer);
	// 	this.cancelClick = true;
	// 	if(!this.cancelDoubleClick) {
	// 		this.props.toggleItemInspect(name);
	// 	}
	// },

	render() {
		var inventory = this.inventory.map((item, index) =>
			<div
				key={item.name}
				ref={item.name}
				onClick={() => {this.toggleItemDrag(item.name)}}
				style={{
					float: 'left',
					display: 'block'
				}}
			>
				<Item 
					item={item}
				/>
			</div> 
		);

		return (
			<div 
				style={{
					position: 'fixed',
					bottom: '0px',
					left: '0px',
					width: '100%'
				}}
			>
				{inventory}
			</div>
		)
	}
});

function mapStateToProps(store) {
	return {
		items: store.itemState,
		interactables: store.interactableState,
		mouseState: store.mouseState,
		scrollState: store.scrollState
	}
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		changeItemStatus: itemActions.changeItemStatus,
		toggleItemDrag: itemActions.toggleItemDrag,
		toggleItemInspect: itemActions.toggleItemInspect,
		changeDropZoneStatus: interactableActions.changeDropZoneStatus,
		trackMousePosition: mouseTrackingActions.trackMousePosition,
		lockScrollPosition: scrollEventActions.lockScrollPosition,
		unlockScrollPosition: scrollEventActions.unlockScrollPosition

	}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);