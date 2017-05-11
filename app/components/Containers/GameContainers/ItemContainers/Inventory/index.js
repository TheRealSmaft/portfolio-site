import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import lodash from 'lodash';

import Item from '../ItemComponent';

import { itemActions, itemTypes } from '../../../../../state/game/items';
import { interactableActions, interactableTypes } from '../../../../../state/game/interactables';
import { mouseTrackingActions, mouseTrackingTypes } from '../../../../../state/mouse/tracking';
import { scrollEventTypes, scrollEventActions } from '../../../../../state/events/scroll';

import InventoryStyles from '../../../../../styles/inventory';

const Inventory = React.createClass({
	componentWillMount() {
		this.getInventoryItems();

		this.draggable = null;
		this.lastDraggable = this.draggable;

		this.dragNode = null;

		this.slotCount = 6;
		this.examinable = null;
	},

	componentWillUpdate() {
		this.getInventoryItems();
	},

	componentDidUpdate() {
		if(this.props.interactables.firedEvents.includes('knifeUsed') &&
			this.draggable === "Artist's Knife" ||
			this.props.interactables.firedEvents.includes('eraserUsed') &&
			this.draggable === "Eraser") {
			this.stopTrackingMouse();
			this.triggerZoneUsed(this.draggable);
			this.props.toggleItemDrag();
			this.draggable = null;
			this.dragNode = null;
		}

		if(this.draggable === "Artist's Knife" ||
			this.draggable === "Eraser") {
			document.addEventListener('click', this.returnItem);
		}
	},

	returnItem(e) {
		e.target.removeEventListener('click', this.returnItem);
		this.stopTrackingMouse();
		this.appendDraggableToOriginalParent();
		this.props.toggleItemDrag();
		if(this.dragNode != null) {
			this.dragNode.style.pointerEvents = 'auto';
		}
		this.draggable = null;
		this.dragNode = null;
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
			else if(this.props.interactables.currentTriggerZone === this.props.items.draggable) {
				this.triggerZoneUsed(this.draggable);
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

	triggerZoneUsed(draggable) {
		var itemIndex = _.findIndex(this.props.items.items, function(obj) {
			return obj.name === draggable;
		});

		this.appendDraggableToOriginalParent();
		this.props.changeItemStatus(itemIndex, 'allocated');
		this.props.addEventToFiredArray(draggable + 'Allocated');
	},

	appendDraggableToDocumentBody() {
		this.dragNode = this.refs[this.draggable];
		this.dragNode.style.zIndex = 100;
		this.dragNode.style.width = '150px';
		this.originalParentNode = this.dragNode.parentNode;
		this.originalParentNode.removeChild(this.dragNode);
		document.body.appendChild(this.dragNode);
		if(this.draggable === "Artist's Knife" ||
			this.draggable === "Eraser") {
			this.dragNode.style.pointerEvents = 'none';
		}
	},

	appendDraggableToOriginalParent() {
		if(this.dragNode != null) {
			this.dragNode.parentNode.removeChild(this.dragNode);
			this.originalParentNode.appendChild(this.dragNode);
			this.dragNode.style.position = 'static';
		}
		else
		{
			document.removeEventListener('click', this.returnItem);
		}
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

	examineItem(item) {
		this.props.toggleItemExamine(item);
	},

	render() {
		var inventory = this.inventory.map((item, index) =>
			<div
				key={item.name}
			>
				<div
					ref={item.name}
					className={InventoryStyles.item}
					onMouseDown={() => {this.toggleItemDrag(item.name)}}
				>
					<Item 
						item={item}
					/>
				</div>
				{item.examinable === true ? (
					<img
						className={InventoryStyles.examineButton}
						src={require('../../../../../assets/images/interactables/Inventory/ExaminableButton.svg')}
						onMouseDown={() => {this.examineItem(item.name)}}
					/>
				) : ''}
			</div>
		);

		var slots = [];

		for(var i = 0; i < this.slotCount; i++) {
			slots.push(
				<div
					key={'slot' + i}
					ref={'slot' + i}
					className={InventoryStyles.slot}
				>
					{inventory[i] ? inventory[i] : ''}
				</div>
			);
		};

		return (
			<div>
				<div 
					ref="inventory"
					className={InventoryStyles.inventory}
					style={{
						bottom: this.props.sceneState.playing || inventory.length < 1 ? '-150px' : '0px'
					}}
				>
					{slots}
				</div>
				<div
					style={{
						width: '100%',
						height: this.inventory.length > 0 ? '200px' : '0px'
					}}
				>
				</div>
			</div>
		)
	}
});

function mapStateToProps(store) {
	return {
		items: store.itemState,
		interactables: store.interactableState,
		mouseState: store.mouseState,
		scrollState: store.scrollState,
		sceneState: store.sceneState
	}
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		changeItemStatus: itemActions.changeItemStatus,
		toggleItemDrag: itemActions.toggleItemDrag,
		toggleItemExamine: itemActions.toggleItemExamine,
		changeDropZoneStatus: interactableActions.changeDropZoneStatus,
		addEventToFiredArray:  interactableActions.addEventToFiredArray,
		trackMousePosition: mouseTrackingActions.trackMousePosition,
		lockScrollPosition: scrollEventActions.lockScrollPosition,
		unlockScrollPosition: scrollEventActions.unlockScrollPosition

	}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);