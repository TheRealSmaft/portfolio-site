import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { windowEventActions, windowEventTypes } from '../../../../state/events/window';

import { pageStyles } from '../../../../styles';

const PageContainer = React.createClass({
	componentWillMount() {
		this.props.getWindowSize();
	},

	componentDidMount() {
		window.addEventListener('resize', this.handleWindowResize);

		this.domElement = ReactDOM.findDOMNode(this);
		this.positionElementInDOM();
	},

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleWindowResize);
	},

	handleWindowResize() {
		this.props.getWindowSize();
		this.positionElementInDOM();
	},

	positionElementInDOM() {
		this.elementWidth = this.domElement.getBoundingClientRect().width;
		this.elementMargin = (this.props.windowState.width - this.elementWidth) / 2;
	},

	render() {
		return (
			<div 
				className={pageStyles.page}
				style={{
					marginLeft: this.elementMargin
				}}>
				{this.props.children}
			</div>
		)
	}
});

function mapStateToProps(store) {
	return {
		windowState: store.windowState
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getWindowSize: windowEventActions.getWindowSize
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);