import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import BodyMovin from '../../../../../plugins/bodymovin.min';

const Item = React.createClass({
	componentDidMount() {
		var json = require('../../../../../animations/' + this.props.item.name + '/' + this.props.item.name + '-' + this.props.item.status +'.json');
		this.loadAnimation(json);
	},

	loadAnimation(jsonData) {		
		var itemAnimation = {
			animationData: jsonData,
			path: '../../../../../animations/' + this.props.item.name,
			loop: this.props.item.loop,
			autoplay: this.props.item.autoplay,
			name: this.props.item.name,
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.item)
		};

		BodyMovin.loadAnimation(itemAnimation);
	},

	render() {
		return (
			<div 
				ref="item"
				style={{
					width: this.props.item.width
				}}
			>
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