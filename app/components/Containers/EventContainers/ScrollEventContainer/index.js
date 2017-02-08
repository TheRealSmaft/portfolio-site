import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { scrollEventActions, scrollEventTypes } from '../../../../state/events/scroll';

const ScrollEventContainer = React.createClass({
	componentWillMount() {
		this.props.getScrollPosition();
	},

	componentDidMount() {
		window.addEventListener('scroll', this.props.getScrollPosition);
	},

	componentWillUnmount() {
		window.removeEventListener('scroll', this.props.getScrollPosition);
	},

	render() {
		return (
			<div>
				{React.cloneElement(this.props.children,
					{ 
						scrollState: this.props.scrollState,
						getScrollPosition: this.props.getScrollPosition
					}
				)}
			</div>
		)
	}
});

function mapStateToProps(store) {
	return {
		scrollState: store.scrollState
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getScrollPosition: scrollEventActions.getScrollPosition
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ScrollEventContainer);