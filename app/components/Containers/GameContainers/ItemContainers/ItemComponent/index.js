import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

const Item = React.createClass({
	componentWillMount() {
		this.divWidth = this.props.item.name === "Heart" ? '100px' : '140px';
	},

	render() {
		return (
			<div 
				style={{
					...this.props.style,
					width: this.props.item.status === 'inventory' ? this.divWidth : this.props.item.width
				}}
			>
				<img 
					src={this.props.item.status === 'collectable' ?
						  this.props.item.collectableImage :
						  this.props.item.status === 'inventory' ?
						  this.props.item.inventoryImage : ''} 
					alt={this.props.item.name}
					style={{
						width: '100%'
					}}
				/>
			</div>
		)
	}
});

function mapStateToProps(store) {
	return {
		windowState: store.windowState
	}
};

export default connect(mapStateToProps)(Item);