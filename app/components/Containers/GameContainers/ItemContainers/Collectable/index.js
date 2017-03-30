import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Item from '../ItemComponent';

import { itemArrayTypes, itemArrayActions } from '../../../../../state/game/itemArray';

const Collectable = React.createClass({
	propTypes: {
		item: React.PropTypes.object.isRequired
	},

	componentWillMount() {
		this.itemArrayIndex = this.getItemArrayIndex();
		this.prevIndex = this.itemArrayIndex;

		this.item = null;
		this.placeHolder = null;

		if(this.itemArrayIndex < 0) {
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
			this.item = this.getItemFromArray(this.itemArrayIndex);
		}

		if(this.placeHolder === null) {
			this.createPlaceholder();
		}
	},

	componentWillUpdate() {
		this.itemArrayIndex = this.getItemArrayIndex();

		if(this.prevIndex != this.itemArrayIndex) {
			this.item = this.getItemFromArray(this.itemArrayIndex);
			this.prevIndex = this.itemArrayIndex;
		}

		if(this.placeHolder === null) {
			this.createPlaceHolder();
		}
	},

	getItemArrayIndex() {
		var itemName = this.props.item.name;

		var index = _.findIndex(this.props.itemArray, function(obj) {
			return obj.name === itemName;
		});

		return index;
	},

	getItemFromArray(index) {
		return this.props.itemArray[index];
	},

	addItemToInventory() {
		this.itemArrayIndex = this.getItemArrayIndex();
		this.props.changeItemStatus(this.itemArrayIndex, 'inventory');
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
		itemArray: store.itemArrayState.items
	}
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		addItemToArray: itemArrayActions.addItemToArray,
		changeItemStatus: itemArrayActions.changeItemStatus
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Collectable);