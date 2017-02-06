import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { windowEventActions, windowEventTypes } from '../../../../state/events/window';

const ScrollEventContainer = React.createClass({
	componentWillMount() {
		this.props.getWindowPosition();
	},

	componentDidMount() {
		window.addEventListener('scroll', this.props.getWindowPosition);
	},

	componentWillUnmount() {
		window.removeEventListener('scroll', this.props.getWindowPosition);
	},

	render() {
		return (
			<div>
				{React.cloneElement(this.props.children,
					{ 
						windowState: this.props.windowState,
						getWindowPosition: this.props.getWindowPosition
					}
				)}
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
		getWindowPosition: windowEventActions.getWindowPosition
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ScrollEventContainer);