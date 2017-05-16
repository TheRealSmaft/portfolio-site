import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import lodash from 'lodash';

import Item from '../ItemComponent';
import Examinable from '../Examinable';

import { itemActions, itemTypes } from '../../../../../state/game/items';
import { interactableActions, interactableTypes } from '../../../../../state/game/interactables';
import { mouseTrackingActions, mouseTrackingTypes } from '../../../../../state/mouse/tracking';
import { scrollEventTypes, scrollEventActions } from '../../../../../state/events/scroll';

import InventoryStyles from '../../../../../styles/inventory';

const Inventory = React.createClass({
	componentWillMount() {
		this.getInventoryItems();

		this.draggable = null;
		this.dragNode = null;

		this.slotCount = 6;
	},

	componentWillUpdate() {
		this.getInventoryItems();
	},

	startDraggingItem(name) {
		this.draggable = name;
		this.props.toggleItemDrag(name);
		this.appendDraggableToDocumentBody();
		this.startTrackingMouse();
	},

	stopDraggingItem() {
		this.stopTrackingMouse();
		this.appendDraggableToOriginalParent();
		this.props.toggleItemDrag();
	},

	appendDraggableToDocumentBody() {
		this.dragNode = this.refs[this.draggable];
		this.dragNode.style.zIndex = 100;
		this.dragNode.style.width = '150px';
		this.dragNode.style.pointerEvents = 'none';
		this.originalParentNode = this.dragNode.parentNode;
		this.originalParentNode.removeChild(this.dragNode);
		document.body.appendChild(this.dragNode);
		document.addEventListener('click', this.stopDraggingItem);
	},

	appendDraggableToOriginalParent() {
		this.dragNode.parentNode.removeChild(this.dragNode);
		this.originalParentNode.appendChild(this.dragNode);
		this.dragNode.style.position = 'static';
		this.dragNode.style.pointerEvents = 'auto';
		document.removeEventListener('click', this.stopDraggingItem);
		if(this.props.interactables.firedEvents.includes(this.draggable + 'Used')) {
			var name = this.draggable;
			var index = _.findIndex(this.props.items.items, function(obj) {
				return obj.name === name;
			});
			this.props.changeItemStatus(index, 'used');
		}
		this.draggable = null;
		this.dragNode = null;
	},

	getInventoryItems() {
		this.inventory = _.filter(this.props.items.items, ['status', 'inventory']);
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
		this.props.toggleItemExamine(item.name);
		this.examinable = item;
	},

	render() {
		var inventory = this.inventory.map((item, index) =>
			<div
				key={item.name}
			>
				<div
					ref={item.name}
					className={InventoryStyles.item}
					onClick={() => {this.startDraggingItem(item.name)}}
				>
					<Item 
						item={item}
					/>
				</div>
				{item.examinable === true ? (
					<img
						className={InventoryStyles.examineButton}
						src={require('../../../../../assets/images/interactables/Inventory/ExaminableButton.svg')}
						onClick={() => {this.examineItem(item)}}
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

		var examinable = this.props.items.examinable ? (
			<Examinable 
				style={{
					width: '100%',
					height: '100%'
				}}
			/>
		) : null;

		return (
			<div>
				{examinable}
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
		mode: store.modeState,
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
		addEventToFiredArray:  interactableActions.addEventToFiredArray,
		trackMousePosition: mouseTrackingActions.trackMousePosition,
		lockScrollPosition: scrollEventActions.lockScrollPosition,
		unlockScrollPosition: scrollEventActions.unlockScrollPosition

	}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);