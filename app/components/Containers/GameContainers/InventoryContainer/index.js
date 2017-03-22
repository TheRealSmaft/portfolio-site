import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { inventoryTypes, inventoryActions } from '../../../../state/game/inventory';

import Item from './ItemContainer/Item';

import { Draggable } from '../../../Containers';

const InventoryContainer = React.createClass({
	removeItem(itemName) {
		this.props.removeItem(itemName);
	},

// USE THIS FOR REMOVAL ---> onClick={() => this.removeItem(item.name)}

	render() {
		var items = this.props.inventory.items.map((item) =>
			<li 
				key={item.name} 
				style={{listStyleType: 'none'}}
			>
				<Draggable ref={item.name} dragId={item.name} zoneId={'zone'}>
					<img 
						src={require('./ItemContainer/images/' + item.name + '.svg')}
						style={{width: '50px'}} />
				</Draggable>
			</li>
		);

		return (
			<div 
				style={{
					position: 'fixed', 
					bottom: 0, 
					left: 0, 
					zIndex: 1,
					backgroundColor: 'pink',
					height: 100,
					width: '100%'
				}}>
				<ul>
					{items}
				</ul>
			</div>
		)
	}
});

function mapStateToProps(store) {
	return {
		inventory: store.inventoryState,
		dragAndDrop: store.dragAndDropState
	}
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
			removeItem: inventoryActions.removeItemFromInventory
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(InventoryContainer);