import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { dragAndDropTypes, dragAndDropActions } from '../../../../../state/game/dragAndDrop';
import { mouseTrackingTypes, mouseTrackingActions } from '../../../../../state/mouse/tracking';

const Draggable = React.createClass({
	propTypes: {
		mouseState: React.PropTypes.object.isRequired,
		dragId: React.PropTypes.string.isRequired,
		zoneId: React.PropTypes.string.isRequired,
	},

	componentWillMount() {
		this.dragging = false;
	},

	componentDidMount() {
		this.dragElement = ReactDOM.findDOMNode(this.refs.draggable);
		this.originalParent = this.dragElement.parentNode;
		this.originalPosition = {
			position: this.dragElement.style.position ? this.dragElement.style.position : 'static',
			top: this.dragElement.style.top,
			left: this.dragElement.style.left
		};
	},

	toggleDrag() {
		this.dragging = !this.dragging;
		if(this.dragging) {
			this.props.selectDraggable(this.props.dragId);
			this.startTrackingMouse();
			this.appendDraggableToDocumentBody()
		}
		else
		{
			this.props.selectDraggable();
			this.stopTrackingMouse();
			this.appendDraggableToOriginalParent();
		}
	},

	startTrackingMouse() {
		window.addEventListener('mousemove', this.trackMouse);
	},

	stopTrackingMouse() {
		window.removeEventListener('mousemove', this.trackMouse);
	},

	trackMouse(event) {
		this.props.trackMousePosition(event.clientX, event.clientY);
		this.dragElement.style.position = 'absolute';
		this.dragElement.style.top = ((this.props.mouseState.position.y + this.props.scrollState.scrollY) - this.dragElement.getBoundingClientRect().height/2)/window.innerHeight * 100 + '%';
		this.dragElement.style.left = ((this.props.mouseState.position.x + this.props.scrollState.scrollX) - this.dragElement.getBoundingClientRect().width/2)/window.innerWidth * 100 + '%';
	},

	appendDraggableToDocumentBody() {
		this.dragElement.parentNode.removeChild(this.dragElement);
		document.body.appendChild(this.dragElement);
	},

	appendDraggableToOriginalParent() {
		this.dragElement.parentNode.removeChild(this.dragElement);
		this.originalParent.appendChild(this.dragElement);
		this.returnDraggableToOriginalPosition();
	},

	returnDraggableToOriginalPosition() {
		this.dragElement.style.top = this.originalPosition.top + 'px';
		this.dragElement.style.left = this.originalPosition.left + 'px';
		this.dragElement.style.position = this.originalPosition.position;
	},

	render() {
		return (
			<div 
				onClick={this.toggleDrag}
				ref='draggable'
			>
				{this.props.children}
			</div>
		);
	}
});

function mapStateToProps(store) {
	return {
		mouseState: store.mouseState,
		scrollState: store.scrollState,
		dragAndDrop: store.dragAndDropState
	};
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		selectDraggable: dragAndDropActions.selectDraggable,
		trackMousePosition: mouseTrackingActions.trackMousePosition,
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Draggable);