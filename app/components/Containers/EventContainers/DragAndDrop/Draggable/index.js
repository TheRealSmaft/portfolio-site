import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { mouseTrackingActions, mouseTrackingTypes } from '../../../../../state/mouse/tracking';
import { dragAndDropActions, dragAndDropTypes } from '../../../../../state/mouse/dragAndDrop';

const Draggable = React.createClass({
	propTypes: {
		mouseState: React.PropTypes.object.isRequired,
		dragId: React.PropTypes.string.isRequired,
		zoneId: React.PropTypes.string.isRequired
	},

	componentWillMount() {
		this.props.createDraggable(this.props.dragId, this.props.zoneId, true);

		this.placeholder = null;
	},

	componentDidMount() {
		this.isDragging = false;

		this.dragElement = ReactDOM.findDOMNode(this.refs.draggableElement);
		this.originalPosition = {
			position: this.dragElement.style.position ? this.dragElement.style.position : 'static',
			top: this.dragElement.style.top,
			left: this.dragElement.style.left
		}	
	},

	toggleDrag() {
		this.isDragging = !this.isDragging;

		if(this.isDragging) {
			this.dragElement.style.position = 'absolute';
			this.placeholder = (
				<div style={{width: 100, height: 100}}>
				</div>
			);

			window.addEventListener('mousemove', this.trackMouse);
			this.props.selectDraggable(this.props.dragId);
		}
		else
		{	
			if(!this.props.dragAndDropState.canDrop) {
				this.placeholder = null;
			}

			window.removeEventListener('mousemove', this.trackMouse);
			this.props.clearMousePosition();
			this.props.selectDraggable();

			if(!this.props.dragAndDropState.canDrop) {
				this.isDragging = false;			
				this.returnDraggableToOriginalPosition();
			}
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
		this.dragElement.style.top = this.props.mouseState.position.y - (this.dragElement.getBoundingClientRect().height / 2) + 'px';
		this.dragElement.style.left = this.props.mouseState.position.x - (this.dragElement.getBoundingClientRect().width / 2) + 'px';
	},

	returnDraggableToOriginalPosition() {
		this.dragElement.style.top = this.originalPosition.top + 'px';
		this.dragElement.style.left = this.originalPosition.left + 'px';
		this.dragElement.style.position = this.originalPosition.position;
	},

	render() {
		return (
			<div>
				<div 
					onMouseUp={this.toggleDrag} 
					ref='draggableElement'
				>
					{this.props.children}
				</div>
				{this.placeholder}
			</div>
		)
	}
});

function mapStateToProps(store) {
	return {
		mouseState: store.mouseState,
		dragAndDropState: store.dragAndDropState
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		trackMousePosition: mouseTrackingActions.trackMousePosition,
		clearMousePosition: mouseTrackingActions.clearMousePosition,
		createDraggable: dragAndDropActions.createDraggable,
		selectDraggable: dragAndDropActions.selectDraggable,
		dropSuccessful: dragAndDropActions.dropSuccessful
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Draggable);