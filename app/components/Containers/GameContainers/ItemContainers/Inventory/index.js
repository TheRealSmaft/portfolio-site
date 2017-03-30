import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Item from '../ItemComponent';

import { itemArrayActions, itemArrayTypes } from '../../../../../state/game/itemArray';
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
		this.inventory = _.filter(this.props.itemArray.items, ['status', 'inventory']);
	},

	toggleItemDrag(name) {
		if(this.props.itemArray.draggable != null) {
			this.props.toggleItemDrag();
			this.stopTrackingMouse();
			this.appendDraggableToOriginalParent();
			this.draggable = null;
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
		document.body.removeChild(this.dragNode);
		this.originalParentNode.appendChild(this.dragNode);
		this.dragNode.style.position = 'static';
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
		itemArray: store.itemArrayState,
		mouseState: store.mouseState,
		scrollState: store.scrollState
	}
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		changeItemStatus: itemArrayActions.changeItemStatus,
		toggleItemDrag: itemArrayActions.toggleItemDrag,
		toggleItemInspect: itemArrayActions.toggleItemInspect,
		trackMousePosition: mouseTrackingActions.trackMousePosition,
		lockScrollPosition: scrollEventActions.lockScrollPosition,
		unlockScrollPosition: scrollEventActions.unlockScrollPosition

	}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);