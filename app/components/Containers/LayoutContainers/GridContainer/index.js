import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { windowEventActions, windowEventTypes } from '../../../../state/events/window';

const GridContainer = React.createClass({
	componentWillMount() {
		this.props.getWindowSize();

		this.gutter = this.props.gutter != undefined ? this.props.gutter : 2;
	},

	componentDidMount() {
		window.addEventListener('resize', this.handleWindowResize);

		this.domElement = ReactDOM.findDOMNode(this);
	},

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleWindowResize);
	},

	handleWindowResize() {
		this.props.getWindowSize();
	},

	render() {
		let rows = React.Children.map(this.props.children, (row, i) => {

			return (
				<div>
					{React.cloneElement(row,
						{ 
							gutter: this.gutter,
							windowState: this.props.windowState,
							getWindowSize: this.props.getWindowSize
						}
					)}
				</div>
			)
		});

		return <div>{rows}</div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(GridContainer);