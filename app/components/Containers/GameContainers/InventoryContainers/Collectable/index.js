import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Item from '../Item/Item';

import { inventoryActions, inventoryTypes } from '../../../../../state/game/inventory';

const Collectable = React.createClass({
	propTypes: {
		collectableInfo: React.PropTypes.object.isRequired
	},

	componentWillMount() {
		this.visibility = 'visible';

		var loc = this.getItemLocation();

		if(loc === 'collectables')
		{
			var name = this.props.collectableInfo.name;
			this.item = _.find(this.props.inventory.collectables, ['name', name]);
		}
		else if(loc === 'inventory' || loc === 'placedItems')
		{
			this.item = this.createPlaceholder();
		}
		else
		{
			this.createNewItem();
		}
	},

	getItemLocation() {
		var name = this.props.collectableInfo.name;

		if(this.checkIfItemIsInCollectables(name)) {
			return 'collectables';
		}
		else if(this.checkIfItemIsInInventory(name))
		{
			return 'inventory';
		}
		else if(this.checkIfItemIsInPlacedItems(name))
		{
			return 'placedItems';
		}
		else
		{
			return null;
		}
	},

	checkIfItemIsInCollectables(name) {
		var itemIndex = _.findIndex(this.props.inventory.collectables, function(obj) {
			return obj.name === name;
		});

		return itemIndex > -1;
	},

	checkIfItemIsInInventory(name) {
		var itemIndex = _.findIndex(this.props.inventory.inventory, function(obj) {
			return obj.name === name;
		});

		return itemIndex > -1;
	},

	checkIfItemIsInPlacedItems(name) {
		var itemIndex = _.findIndex(this.props.inventory.placedItems, function(obj) {
			return obj.name === name;
		});

		return itemIndex > -1;
	},

	createNewItem() {
		this.item = new Item(this.props.collectableInfo.name, this.props.collectableInfo.zone);

		var itemImage = (
		<img 
			src={require('../Item/images/' + 
				this.props.collectableInfo.name + 
				'.svg')} 
			alt={this.props.collectableInfo.name} 
			style={{width: this.props.collectableInfo.width}}
			id={this.props.collectableInfo.name + 'DragChild'} />
		);

		this.item.setImage(itemImage);

		this.props.createNewItem(this.item);
	},

	collectItem() {
		if(this.visibility != 'hidden') {
			this.item.changeLocation('inventory');
			this.props.addItemToInventory(this.item);
			this.visibility = 'hidden';
		}
	},

	createPlaceholder() {
		this.visibility = 'hidden';
		var name = this.props.collectableInfo.name;
		var item = _.find(this.props.inventory.inventory, ['name', name]) ? _.find(this.props.inventory.inventory, ['name', name]) : _.find(this.props.inventory.placedItems, ['name', name]);
		return item;
	},

	render() {
		return (
			<div 
				onClick={this.collectItem}
				style={{
					visibility: this.visibility,
					display: 'block',
					float: 'left'
				}}
			>
				{this.item.image}
			</div>
		)
	}
});

function mapStateToProps(store) {
	return {
		inventory: store.inventoryState
	}
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		createNewItem: inventoryActions.createNewItem,
		addItemToInventory: inventoryActions.addItemToInventory
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Collectable);