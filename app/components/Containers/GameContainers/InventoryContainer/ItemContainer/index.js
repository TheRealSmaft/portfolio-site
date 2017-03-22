import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Item from './Item';

import { inventoryActions, inventoryTypes } from '../../../../../state/game/inventory';

const ItemContainer = React.createClass({
	propTypes: {
		inventory: React.PropTypes.object.isRequired,
		itemName: React.PropTypes.string.isRequired
	},

	componentWillMount() {
		this.item = null;

		for(let item of this.props.inventory.items) {
			if(item.name === this.props.itemName) {
				this.item = item;
				break;
			}
		};

		if(this.item === null) {
			this.item = new Item(this.props.itemName);
			this.placeholder = null;
		};

		this.float = 'left';

		// if(this.props.children.props &&
		// 	this.props.children.props.style &&
		// 	this.props.children.props.style.height) {
			
		// 	this.height = this.props.children.props.style.height;
		// 	this.float = this.props.children.props.style.float ? this.props.children.props.style.float : 'none';
		// }
	},

	componentDidMount(){
		
	},

	addItemToInventory() {
		this.item.acquireItem();
		this.props.addItemToInventory(this.item);
		this.createPlaceholder();
	},

	getImageDimensions({target:img}) {
		var itemElement = ReactDOM.findDOMNode(this.refs.item);

		if(!this.item.hasDimensions) {
			
			// var itemClientRect = itemElement.getBoundingClientRect();

			var dimensions = {
				width: img.offsetWidth,
				height: img.offsetHeight
			};

			this.item.setPosition(itemElement.style.position);
			this.item.setDisplay(itemElement.style.display);
			this.item.setDimensions(dimensions);
		}

		if(this.item.acquired) {
			this.createPlaceholder();
		};
	},

	createPlaceholder() {
		this.placeholder = (
			<div style={{
				display: this.item.display,
				position: this.item.position,
				width: this.item.dimensions.width,
				height: this.item.dimensions.height
			}}>
			</div>
		);
		this.forceUpdate();
	},

	render() {
		return (
			<div style={{
				height: '100%',
				float: this.props.float ? this.props.float : 'none'
			}}>
				<div 
					onMouseUp={this.addItemToInventory} 
					style={{display: this.item.acquired ? 'none' : 'inline-block'}}
					ref={'item'}>
					<img 
						onLoad={this.getImageDimensions} 
						src={require('./images/' + this.item.name + '.svg')} 
						style={{width: this.props.itemWidth ? this.props.itemWidth : '100%'}} />
				</div>
				{this.placeholder}
			</div>
		)
	}
});

function mapStateToProps(store) {
	return {
		inventory: store.inventoryState
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		addItemToInventory: inventoryActions.addItemToInventory,
		updateItemInInventory: inventoryActions.updateItemInInventory
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ItemContainer);