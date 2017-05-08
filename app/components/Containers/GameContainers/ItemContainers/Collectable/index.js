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
			this.item = this.props.item;
			this.item.status = 'collectable';
		}
		else {
			this.item = this.getItemFromArray(this.itemIndex);
			this.createPlaceholder();
		}
	},

	componentDidMount() {
		if(this.itemIndex < 0) {
			var item = ReactDOM.findDOMNode(this.refs.item);
			this.item.rect = item.getBoundingClientRect();
			this.item.position = item.style.position;
			this.props.addItemToArray(this.item);
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
			<div
				style={{
					position: this.item.position,
					float: 'left',
					width: this.item.rect.width,
					height: this.item.rect.height
				}}
			>
			</div>
		);
	},

	render() {
		if(this.item.status === 'collectable') {
			return (
				<div 
					onMouseDown={this.addItemToInventory}
					style={{
						...this.props.style,
						float: 'left'
					}}
				>
					<Item 
						style={{
							width: this.props.item.width
						}}
						ref="item"
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
		changeItemStatus: itemActions.changeItemStatus
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Collectable);