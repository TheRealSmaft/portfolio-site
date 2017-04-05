import React from 'react';
import { connect } from 'react-redux';

const Item = React.createClass({
	componentWillMount() {
		this.maxWidth = window.innerWidth * .05 + 'px';
	},

	componentWillUpdate() {
		this.maxWidth = window.innerWidth * .05 + 'px';
	},

	render() {
		return (
			<div style={{width: this.props.item.width, maxWidth: this.maxWidth}}>
				{this.props.item.node}
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