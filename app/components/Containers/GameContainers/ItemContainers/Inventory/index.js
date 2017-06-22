import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import lodash from 'lodash';

import Item from '../ItemComponent';
import Examinable from '../Examinable';

import { itemActions, itemTypes } from '../../../../../state/game/items';
import { interactableActions, interactableTypes } from '../../../../../state/game/interactables';
import { scrollEventTypes, scrollEventActions } from '../../../../../state/events/scroll';

import InventoryStyles from '../../../../../styles/inventory';

import itemList from '../../../../../assets/gameObjects/items';

import inventorySlot from '../../../../../assets/images/interactables/Inventory/InventorySlot.svg';
import inventorySlotSelected from '../../../../../assets/images/interactables/Inventory/InventorySlotSelected.svg';

const Inventory = React.createClass({
	getInitialState() {
		return {
			updated: false
		}
	},

	componentWillMount() {
		this.getInventoryItems();
		if("ontouchstart" in document.documentElement) {
			this.touchDevice = true;
		}
		else
		{
			this.touchDevice = false;
		}

		this.draggable = null;
		this.dragNode = null;
	},

	componentDidMount() {
		this.getItemsBasedOnProgressLevel();
	},

	componentWillUpdate() {
		this.getInventoryItems();
	},

	getItemsBasedOnProgressLevel() {
		switch(this.props.mode.progressLevel) {
			case 0: {
				break;
			}
			case 1: 
			case 2: {
				this.props.addItemToArray(itemList.crumpledPaper);
				this.props.changeItemStatus('Crumpled Paper', 'inventory');
				break;
			}
			case 2.5: {
				this.props.addItemToArray(itemList.paper);
				this.props.changeItemStatus('Paper', 'inventory');
				break;
			}
			case 3: {
				this.props.addItemToArray(itemList.crumpledPaper);
				this.props.changeItemStatus('Crumpled Paper', 'inventory');
				this.props.addItemToArray(itemList.pencil);
				this.props.changeItemStatus('Pencil', 'inventory');
				break;
			}
			case 3.5: {
				this.props.addItemToArray(itemList.paper);
				this.props.changeItemStatus('Paper', 'inventory');
				this.props.addItemToArray(itemList.pencil);
				this.props.changeItemStatus('Pencil', 'inventory');
				break;
			}
			case 4: {
				break;
			}
			case 5: {
				this.props.changeItemStatus('Knife', 'inventory');
				break;
			}
			case 6: {
				break;
			}
			case 6.5: {
				this.props.changeItemStatus('Glue', 'inventory');
				break;
			}
			case 7: {
				this.props.changeItemStatus('Eraser', 'inventory');
				break;
			}
			case 7.5: {
				this.props.changeItemStatus('Glue', 'inventory');

				this.props.changeItemStatus('Eraser', 'inventory');
				break;
			}
			case 8: {
				break;
			}
			case 8.5: {
				this.props.addItemToArray(itemList.glue);
				this.props.changeItemStatus('Glue', 'inventory');
				break;
			}
			case 9: {
				this.props.addItemToArray(itemList.brokenLink);
				this.props.changeItemStatus('Broken Link', 'inventory');
				break;
			}
			case 9.5: {
				this.props.addItemToArray(itemList.brokenLink);
				this.props.changeItemStatus('Broken Link', 'inventory');

				this.props.addItemToArray(itemList.glue);
				this.props.changeItemStatus('Glue', 'inventory');
				break;
			}
			case 10: {
				this.props.addItemToArray(itemList.aboutLink);
				this.props.changeItemStatus('About Link', 'inventory');
				break;
			}
			case 11: {
				this.props.addItemToArray(itemList.aboutLink);
				this.props.changeItemStatus('About Link', 'inventory');

				this.props.addItemToArray(itemList.gavel);
				this.props.changeItemStatus('Gavel', 'inventory');

				break;
			}
			case 12: {
				this.props.addItemToArray(itemList.aboutLink);
				this.props.changeItemStatus('About Link', 'inventory');
				break;
			}
			case 13: {
				console.log('Acquire Nav')
				break;
			}
			default: { 
				break;
			}
		}

		this.setState({
			updated: true
		})
	},

	hoverOverItem(event) {
		this.mousePosition = [event.clientX, event.clientY];
	},

	startDraggingItem(name) {
		if(this.props.items.draggable === null) {
			this.draggable = name;
			this.props.toggleItemDrag(name);
			this.appendDraggableToDocumentBody();
			if(!this.touchDevice) {	
				this.startTrackingMouse();
			}
			this.originalParentNode.parentNode.style.background = `url(${inventorySlotSelected})`;
		}
	},

	stopDraggingItem() {
		if(!this.touchDevice) {	
			this.stopTrackingMouse();
		}
		this.appendDraggableToOriginalParent();
		this.props.toggleItemDrag();
		this.originalParentNode.parentNode.style.background = `url(${inventorySlot})`;
	},

	appendDraggableToDocumentBody() {
		this.dragNode = this.refs[this.draggable];

		this.originalWidth = this.dragNode.style.width;
		let dragWidth = this.dragNode.firstChild.getBoundingClientRect().width;

		this.dragNode.style.zIndex = 100;
		this.dragNode.firstChild.style.width = dragWidth + 'px';
		this.dragNode.style.pointerEvents = 'none';

		this.originalParentNode = this.dragNode.parentNode;
		
		if(!this.touchDevice) {	
			this.originalParentNode.removeChild(this.dragNode);
			document.body.appendChild(this.dragNode);

			this.dragNode.style.position = 'absolute';
			this.dragNode.style.top = ((this.mousePosition[1] + this.props.scrollState.scrollY) - this.dragNode.getBoundingClientRect().height/2)/window.innerHeight * 100 + '%';
			this.dragNode.style.left = ((this.mousePosition[0] + this.props.scrollState.scrollX) - this.dragNode.getBoundingClientRect().width/2)/window.innerWidth * 100 + '%';
		}

		document.body.style.cursor = 'none';

		document.addEventListener('click', this.stopDraggingItem);
	},

	appendDraggableToOriginalParent() {
		if(!this.touchDevice) {
			this.dragNode.parentNode.removeChild(this.dragNode);
			this.originalParentNode.appendChild(this.dragNode);
			this.dragNode.style.position = 'static';
		}

		this.dragNode.style.pointerEvents = 'auto';
		this.dragNode.style.width = this.originalWidth;

		document.removeEventListener('click', this.stopDraggingItem);
		document.body.style.cursor = 'auto';
		if(this.props.interactables.firedEvents.includes(this.draggable + 'Used')) {
			var name = this.draggable;
			this.props.changeItemStatus(name, 'used');
		}
		this.draggable = null;
		this.dragNode = null;
	},

	getInventoryItems() {
		this.inventory = _.filter(this.props.items.items, ['status', 'inventory']);
		this.slotCount = this.inventory.length;
	},

	startTrackingMouse() {
		this.lastScrollPos = [this.props.scrollState.scrollX, this.props.scrollState.scrollY];
		window.addEventListener('mousemove', this.trackMouse);
		window.addEventListener('scroll', this.trackScroll);
	},

	stopTrackingMouse() {
		window.removeEventListener('mousemove', this.trackMouse);
		window.removeEventListener('scroll', this.trackScroll);
	},

	trackMouse(event) {
		this.dragNode.style.top = ((event.clientY + this.props.scrollState.scrollY) - (this.dragNode.getBoundingClientRect().height * .9))/window.innerHeight * 100 + '%';
		this.dragNode.style.left = (event.clientX + this.props.scrollState.scrollX)/window.innerWidth * 100 + '%';
	},

	trackScroll(event) {
		var buffer = [this.lastScrollPos[0] - this.props.scrollState.scrollX, this.lastScrollPos[1] - this.props.scrollState.scrollY];
		
		this.dragNode.style.top = parseFloat(this.dragNode.style.top) - (buffer[1] / window.innerHeight * 100) + '%';
		this.dragNode.style.left = parseFloat(this.dragNode.style.left) - (buffer[0] / window.innerWidth * 100) + '%';

		this.lastScrollPos = [this.props.scrollState.scrollX, this.props.scrollState.scrollY];
	},

	examineItem(item) {
		this.props.toggleItemExamine(item.name);
		this.examinable = item;
	},

	combineItems(item) {
		if(this.props.items.draggable === 'Pencil' && item.name === 'Paper') 
		{
			this.props.toggleItemExamine('Paper');
			setTimeout(() => {
				this.props.addEventToFiredArray('PencilUsed');
				this.props.changeItemStatus('Pencil', 'used');
			}, 50);
		}
		else if(this.props.items.draggable === 'Glue' && item.name === 'Broken Link') 
		{
			this.props.toggleItemExamine('Broken Link');
			setTimeout(() => {
				this.props.addEventToFiredArray('GlueUsed');
				this.props.changeItemStatus('Glue', 'used');
			}, 50);
		}
		else if(this.props.items.examinable === null)
		{
			this.examineItem(item);
		}
		else
		{
			this.props.toggleItemExamine();
		}
	},

	render() {
		var inventory = this.inventory.map((item, index) =>
			<div
				key={item.name}
				className={InventoryStyles.item}
			>
				{!item.examinable ? (		
					<div
						ref={item.name}
						className={InventoryStyles.hover}
						onClick={() => {this.startDraggingItem(item.name)}}
						onMouseOver={(e) => {this.hoverOverItem(e)}}
					>
						<img
							alt={item.name}
							src={item.inventoryImage}
							className={item.name === 'Heart' ? InventoryStyles.heart : ''}
						/>
					</div>
					) :
					(
					<div
						ref={item.name}
						onClick={() => {this.combineItems(item)}}
					>
						<img
							className={InventoryStyles.hover}
							alt={item.name}
							src={item.inventoryImage}
						/>
						<img
							className={item.name === 'Broken Link' || item.name === 'About Link' ? InventoryStyles.aboutLink : InventoryStyles.examineButton}
							src={require('../../../../../assets/images/interactables/Inventory/ExaminableButton.svg')}
						/>
					</div>
					)
				}
			</div>
		);

		var slots = [];

		for(var i = 0; i < this.slotCount; i++) {
			slots.push(
				<div
					key={'slot' + i}
					ref={'slot' + i}
					className={InventoryStyles.slot}
					style={{
						background: `url(${inventorySlot})`
					}}
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
						left: this.props.sceneState.playing || inventory.length < 1 ? '-20%' : '0px'
					}}
				>
					{slots}
				</div>
				<div
					style={{
						width: '100%',
						height: this.inventory.length > 0 ? '100px' : '0px'
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
		scrollState: store.scrollState,
		sceneState: store.sceneState
	}
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		addItemToArray: itemActions.addItemToArray,
		changeItemStatus: itemActions.changeItemStatus,
		toggleItemDrag: itemActions.toggleItemDrag,
		toggleItemExamine: itemActions.toggleItemExamine,
		addEventToFiredArray:  interactableActions.addEventToFiredArray,
		lockScrollPosition: scrollEventActions.lockScrollPosition,
		unlockScrollPosition: scrollEventActions.unlockScrollPosition

	}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);