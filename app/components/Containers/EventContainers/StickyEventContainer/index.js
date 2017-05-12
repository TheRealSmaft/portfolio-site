import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { scrollEventActions, scrollEventTypes } from '../../../../state/events/scroll';

const StickyEventContainer = React.createClass({
	propTypes: {
		scrollState: React.PropTypes.object.isRequired,
		childStyles: React.PropTypes.string
	},

	componentWillMount() {
		this.start = {
			y: 0,
			x: 0
		};

		this.stickyStyles = {
			position: "fixed",
			top: 0,
			left: 0
		}

		this.placeHolderStyles = {
			position: "static",
			height: 0,
			width: 0
		}
	},

	componentDidMount() {
		var thisDiv = ReactDOM.findDOMNode(this);
		
		this.start = {
			y: thisDiv.getBoundingClientRect().top,
			x: thisDiv.getBoundingClientRect().left
		};
		
		this.placeholderStyles = {
			position: "static",
			height: thisDiv.clientHeight,
			width: thisDiv.clientWidth				
		};

		this.stickyStyles = {
			position: "fixed",
			top: 0,
			left: thisDiv.getBoundingClientRect().left
		};
	},

	render() {
		if(this.props.scrollState.scrollY > this.start.y ||
			this.props.scrollState.scrollX > this.start.x) {
			return (
				<div 
					style={{
						...this.placeholderStyles,
						...this.props.style
					}}
				>
					<div 
						className={this.props.childStyles} 
						style={this.stickyStyles}>
						{this.props.children}
					</div>
				</div>
			)
		}
		else 
		{
			return (
				<div
					style={{
						...this.props.style
					}}
				>
					{this.props.children}
				</div>
			)
		}
	}
});

function mapStateToProps(store) {
	return {
		scrollState: store.scrollState
	}
}

export default connect(mapStateToProps)(StickyEventContainer);