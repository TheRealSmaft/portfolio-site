import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { scrollEventActions, scrollEventTypes } from '../../../../state/events/scroll';

class StickyEventContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			start: {
				y: 0,
				x: 0
			},
			stickyStyles: {
				position: "fixed",
				top: 0,
				left: 0
			},

			placeholderStyles: {
				position: "static",
				height: 0,
				width: 0
			}
		}
	}

	componentDidMount() {
		var thisDiv = ReactDOM.findDOMNode(this);

		this.setState((prevState, props) => ({
			start: {
				y: thisDiv.getBoundingClientRect().top,
				x: thisDiv.getBoundingClientRect().left
			},
			placeholderStyles: {
				position: "static",
				height: thisDiv.clientHeight,
				width: thisDiv.clientWidth				
			},
			stickyStyles: {
				position: "fixed",
				top: 0,
				left: thisDiv.getBoundingClientRect().left
			}
		}));
	}

	render() {
		if(this.props.scrollState.scrollY > this.state.start.y ||
			this.props.scrollState.scrollX > this.state.start.x) {
			return (
				<div style={this.state.placeholderStyles}>
					<div 
						className={this.props.childStyles} 
						style={this.state.stickyStyles}>
						{this.props.children}
					</div>
				</div>
			)
		}
		else 
		{
			return (
				<div>
					{this.props.children}
				</div>
			)
		}
	}
};

function mapStateToProps(store) {
	return {
		scrollState: store.scrollState
	}
}

export default connect(mapStateToProps)(StickyEventContainer);