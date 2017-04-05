import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { testStyles } from '../../../../styles/pages';

const PhysicsContainer = React.createClass({
	componentDidMount() {
		this.physElement = ReactDOM.findDOMNode(this.refs.physObject);
		this.physRect = this.physElement.getBoundingClientRect();
		this.applyGravity();
	},

	applyGravity() {
		if(this.physRect.bottom < window.innerHeight) {
			this.physElement.style.position = 'absolute';
			this.physElement.style.bottom = window.innerHeight;
		}
	},

	render() {
		return (
			<div 
				ref='physObject'
				className={testStyles.tester}>
			</div>
		)
	}
});

function mapStateToProps(store) {
	return {
		windowState: store.windowState
	}
};

export default connect(mapStateToProps)(PhysicsContainer);