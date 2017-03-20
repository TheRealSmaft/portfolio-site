import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { inventoryTypes, inventoryActions } from '../../../../state/game/inventory';

import Item from './ItemContainer/Item';

const InventoryContainer = React.createClass({
	removeItem(itemName) {
		this.props.removeItem(itemName);
	},

	render() {
		var items = this.props.inventory.items.map((item) =>
			<li key={item.name} onClick={() => this.removeItem(item.name)}>
				{item.name}
			</li>
		);

		return (
			<div>
				<ul style={{clear: 'both'}}>
					{items}
				</ul>
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
			removeItem: inventoryActions.removeItemFromInventory
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(InventoryContainer);