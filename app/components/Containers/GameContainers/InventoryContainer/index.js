import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { inventoryTypes, inventoryActions } from '../../../../state/game/inventory';

import Item from './ItemContainer/Item';

import { Draggable, ResponsiveContainer } from '../../../Containers';

const InventoryContainer = React.createClass({
	propTypes: {
		invHeight: React.PropTypes.string.isRequired,
		invWidth: React.PropTypes.string.isRequired
	},

	componentWillMount() {
		this.itemWidth = 50;
		this.invGutter = 10;
	},

	removeItem(itemName) {
		this.props.removeItem(itemName);
	},

// USE THIS FOR REMOVAL ---> onClick={() => this.removeItem(item.name)}

	render() {
		var items = this.props.inventory.items.map((item, index) =>
			<div 
				key={item.name} 
				style={{
					marginLeft: this.invGutter,
					marginTop: 10,
					width: this.itemWidth,
					float: 'left'
				}}
			>
				<Draggable 
					ref={item.name} 
					dragId={item.name} 
					zoneId={item.name}
					isInvItem={true}
				>
					<img 
						src={require('./ItemContainer/images/' + item.name + '.svg')}
						style={{
							width: this.itemWidth, 
						}}
					/>
				</Draggable>
			</div>
		);

		return (
			<div>
				<div 
					style={{
						position: 'fixed', 
						bottom: 0, 
						left: 0, 
						zIndex: 1,
						backgroundColor: 'rgb(245,245,245)',
						height: this.props.invHeight,
						width: this.props.invWidth
					}}>
					<ResponsiveContainer>
						{items}
					</ResponsiveContainer>
				</div>
				<div style={{width: this.props.invWidth, height: this.props.invHeight}}>
				</div>
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