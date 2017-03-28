import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Draggable from '../../../../Containers/GameContainers/DragAndDropContainers/Draggable';

import { inventoryActions, inventoryTypes } from '../../../../../state/game/inventory';

const Inventory = React.createClass({
	render() {
		var inventory = this.props.inventory.inventory.map((item, index) =>
			<div 
				key={index}
				style={{
					display: 'inline-block',
					marginLeft: '10px'
				}}
			> 
				<Draggable dragId={item.name} zoneId={item.zone}>
					{item.image}
				</Draggable>
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
		inventory: store.inventoryState
	}
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		removeItemFromInventory: inventoryActions.removeItemFromInventory
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);