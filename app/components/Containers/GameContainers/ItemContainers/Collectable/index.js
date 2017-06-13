import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import lodash from 'lodash';

import Item from '../ItemComponent';

import { modeTypes, modeActions } from '../../../../../state/game/mode';
import { itemTypes, itemActions } from '../../../../../state/game/items';

import CollectableStyles from '../../../../../styles/collectables';

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
		}
	},

	componentDidMount() {
		if(this.itemIndex < 0) {
			var item = ReactDOM.findDOMNode(this.refs.item);
			this.item.rect = item.getBoundingClientRect();
			this.item.position = item.style.position;

			if(this.item.collectPoint <= this.props.mode.progressLevel) {
				this.item.status = 'inventory';
			}

			if(this.item.usePoint <= this.props.mode.progressLevel) {
				this.item.status = 'used';
			}

			if(this.item.name === 'Glue') {
				if(this.props.mode.progressLevel > 6 &&
					!Number.isInteger(this.props.mode.progressLevel)) {
					this.item.status = 'inventory';
				}
			}

			if(this.item.name === 'Pencil') {
				if(this.props.mode.progressLevel > 2 &&
					!Number.isInteger(this.props.mode.progressLevel)) {
					this.item.status = 'inventory';
				}
			}

			this.props.addItemToArray(this.item);
		}
	},

	componentWillUpdate() {
		this.itemIndex = this.getItemIndex();

		if(this.prevIndex != this.itemIndex) {
			this.item = this.getItemFromArray(this.itemIndex);
			this.prevIndex = this.itemIndex;
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
		this.props.changeItemStatus(this.item.name, 'inventory');
		this.item.status = 'inventory';

		if(this.item.collectProgress) {
			if(this.props.mode.progressLevel < this.item.collectProgress) {
				this.props.updateGameProgress(Number.isInteger(this.props.mode.progressLevel) ? this.item.collectProgress : this.item.collectProgress + .5);
			}
		}

		if(this.item.name === 'Glue') {
			if(this.props.mode.progressLevel >= 6 &&
				this.props.mode.progressLevel < 10) {
				this.props.updateGameProgress(this.props.mode.progressLevel + .5);
			}
		}

		if(this.item.name === 'Eraser') {
			if(this.props.mode.progressLevel === 6) {
				this.props.updateGameProgress(7);
			}
			else if(this.props.mode.progressLevel === 6.5) {
				this.props.updateGameProgress(7.5);
			}
		}
	},

	render() {
		if(this.item.status === 'collectable') {
			return (
				<div 
					className={this.props.className, CollectableStyles.collectable}
					onClick={this.addItemToInventory}
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
		else {
			return (
				<div 
					className={CollectableStyles.collectable}
					style={{
						...this.props.style,
						float: 'left',
						visibility: 'hidden',
						width: this.props.item.width,
						pointerEvents: 'none'
					}}
				>
					<Item 
						style={{
							width: this.props.item.width,
							height: this.item.name === 'Artist\'s Knife' ? '32px' : 'auto'
						}}
						ref="item"
						item={this.item}
					/>
				</div>
			);
		}
	}
});

function mapStateToProps(store) {
	return {
		mode: store.modeState,
		items: store.itemState.items
	}
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		updateGameProgress: modeActions.updateGameProgress,
		addItemToArray: itemActions.addItemToArray,
		changeItemStatus: itemActions.changeItemStatus
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Collectable);