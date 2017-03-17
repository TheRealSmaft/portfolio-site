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
		this.item = new Item(this.props.itemName);

		this.placeholder = null;

		this.height = '100%';
		this.float = 'none';

		if(this.props.children.props &&
			this.props.children.props.style &&
			this.props.children.props.style.height) {
			
			this.height = this.props.children.props.style.height;
			this.float = this.props.children.props.style.float ? this.props.children.props.style.float : 'none';
		}
	},

	componentDidMount(){
		this.itemElement = ReactDOM.findDOMNode(this.refs.item);
	},

	addItemToInventory() {
		this.props.addItemToInventory(this.item);

		var dimensions = this.itemElement.getBoundingClientRect();

		this.itemElement.style.display = 'none';

		this.placeholder = (
			<div style={{
				position: this.itemElement.style.position,
				width: dimensions.width,
				height: dimensions.height
			}}>
			</div>
		);
	},

	render() {
		return (
			<div style={{
				height: this.height,
				float: this.float
			}}>
				<div 
					onMouseUp={this.addItemToInventory} 
					style={{display: 'inline-block'}}
					ref='item'>
					{this.props.children}
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