import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

const Item = React.createClass({
	render() {
		return (
			<div 
				style={{
					...this.props.style,
					width: this.props.item.width
				}}
			>
				<img 
					src={this.props.item.image} 
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