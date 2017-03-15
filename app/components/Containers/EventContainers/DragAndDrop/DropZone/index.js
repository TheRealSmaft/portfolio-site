import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators }  from 'redux';
import { connect } from 'react-redux';

import { dragAndDropActions, dragAndDropTypes } from '../../../../../state/mouse/dragAndDrop';

const DropZone = React.createClass({
	propTypes: {
		zoneId: React.PropTypes.string.isRequired
	},

	componentWillMount() {
		this.props.createDropZone(this.props.zoneId);

		this.userIsHovering = false;
		this.lastHoverCase = false;
	},

	componentDidMount() {
		this.domElement = ReactDOM.findDOMNode(this);
		this.boundingBox = this.domElement.getBoundingClientRect();
	},

	componentWillReceiveProps() {
		this.lastHoverCase = this.userIsHovering;

		if(this.props.mouseState.position.x > this.boundingBox.left &&
			this.props.mouseState.position.x < this.boundingBox.right &&
			this.props.mouseState.position.y > this.boundingBox.top &&
			this.props.mouseState.position.y < this.boundingBox.bottom) {

			if(!this.userIsHovering){
				this.userIsHovering = true;
			}
		}
		else
		{
			if(this.userIsHovering) {
				this.userIsHovering = false;
			}
		}
	},

	shouldComponentUpdate(nextProps) {
		if(this.userIsHovering != this.lastHoverCase) {
			return true;
		}
		else
		{
			return false;
		}
	},

	componentWillUpdate() {
		if(this.userIsHovering) {
			this.enterZone();
		}
		else
		{
			this.leaveZone();
		}
	},

	enterZone() {
		this.props.selectDropZone(this.props.zoneId);
	},

	leaveZone() {
		this.props.selectDropZone();
	},

	render() {
		return (
			<div>
				{this.props.children}
			</div>
		)
	}
});

function mapStateToProps(store) {
	return {
		dragAndDropState: store.dragAndDropState,
		mouseState: store.mouseState
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		createDropZone: dragAndDropActions.createDropZone,
		selectDropZone: dragAndDropActions.selectDropZone
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DropZone);