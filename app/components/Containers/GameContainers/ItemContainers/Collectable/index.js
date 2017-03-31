import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import lodash from 'lodash';

import Item from '../ItemComponent';

import { itemTypes, itemActions } from '../../../../../state/game/items';

const Collectable = React.createClass({
	propTypes: {
		item: React.PropTypes.object.isRequired
	},

	componentWillMount() {
		this.itemIndex = this.getItemIndex();
		this.prevIndex = this.itemIndex;

		this.item = null;
		this.placeHolder = null;

		if(this.itemIndex < 0) {
			var newItem = this.props.item;

			newItem.status = 'collectable';
			
			newItem.node = (
				<img 
					src={require('../images/' + 
						this.props.item.name + 
						'.svg')} 
					alt={this.props.item.name}
					style={{
						width: this.props.item.width,
						display: 'block'
					}}
				/>
			);

			this.props.addItemToArray(newItem);

			this.item = newItem;
		}
		else {
			this.item = this.getItemFromArray(this.itemIndex);
		}

		if(this.placeHolder === null) {
			this.createPlaceholder();
		}
	},

	componentWillUpdate() {
		this.itemIndex = this.getItemIndex();

		if(this.prevIndex != this.itemIndex) {
			this.item = this.getItemFromArray(this.itemIndex);
			this.prevIndex = this.itemIndex;
		}

		if(this.placeHolder === null) {
			this.createPlaceHolder();
		}
	},

	getItemIndex() {
		var itemName = this.props.item.name;

		var index = _.findIndex(this.props.items, function(obj) {
			return obj.name === itemName;
		});

		return index;
	},

	getItemFromArray(index) {
		return this.props.items[index];
	},

	addItemToInventory() {
		this.itemIndex = this.getItemIndex();
		this.props.changeItemStatus(this.itemIndex, 'inventory');
		this.item.status = 'inventory';
	},

	createPlaceholder() {
		this.placeHolder = (
			<img 
				src={this.item.node.props.src} 
				style={{
					visibility: 'hidden',
					float: 'left',
					width: this.props.item.width
				}}
			/>
		);
	},

	render() {
		if(this.item.status === 'collectable') {
			return (
				<div 
					onClick={this.addItemToInventory}
					style={{
						float: 'left'
					}}
				>
					<Item 
						ref={'item'}
						item={this.item}
					/>
				</div>
			);
		}
		else
		{
			return (
				<div>
					{this.placeHolder}
				</div>
			)
		}
	}
});

function mapStateToProps(store) {
	return {
		items: store.itemState.items
	}
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		addItemToArray: itemActions.addItemToArray,
		setItemHeight: itemActions.setItemHeight,
		changeItemStatus: itemActions.changeItemStatus
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Collectable);