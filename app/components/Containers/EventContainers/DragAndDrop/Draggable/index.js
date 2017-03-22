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

		this.height = '100%';
		this.float = 'none';

		if(this.props.children.props &&
			this.props.children.props.style &&
			this.props.children.props.style.height) {
			
			this.height = this.props.children.props.style.height;
			this.float = this.props.children.props.style.float ? this.props.children.props.style.float : 'none';
		}
	},

	componentDidMount() {
		this.isDragging = false;

		this.dragElement = ReactDOM.findDOMNode(this.refs.draggableElement);
		this.originalParent = this.dragElement.parentNode;

		this.dragElement.style.display = 'inline-block';
	
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
			this.dragElement.style.zIndex = 99;

			this.appendDraggableToDocumentBody();

			this.placeholder = (
				<div style={{
					width: this.dragElement.getBoundingClientRect().width, 
					height: this.dragElement.getBoundingClientRect().height
				}}>
				</div>
			);

			window.addEventListener('mousemove', this.trackMouse);
			this.props.selectDraggable(this.props.dragId);
		}
		else
		{	
			this.appendDraggableToOriginalParent();
			this.dragElement.style.zIndex = 0;

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
			else
			{
				this.appendDraggableToDropZone();
				this.props.dropSuccessful(this.props.dragId);
			}
		}
	},

	appendDraggableToDocumentBody() {
		this.dragElement.parentNode.removeChild(this.dragElement);
		document.body.appendChild(this.dragElement);
	},

	appendDraggableToOriginalParent() {
		this.dragElement.parentNode.removeChild(this.dragElement);
		this.originalParent.appendChild(this.dragElement);
	},

	appendDraggableToDropZone() {
		var zoneNode = document.getElementById(this.props.zoneId).childNodes[0];
		this.dragElement.parentNode.removeChild(this.dragElement);
		zoneNode.appendChild(this.dragElement);

		this.dragElement.style.position = 'relative';
		this.dragElement.style.left = (this.dragElement.getBoundingClientRect().width / zoneNode.getBoundingClientRect().width * 100) / 2 + '%';
		this.dragElement.style.top = (this.dragElement.getBoundingClientRect().height / zoneNode.getBoundingClientRect().height * 100) / 2 + '%';
	},

	startTrackingMouse() {
		window.addEventListener('mousemove', this.trackMouse);
	},

	stopTrackingMouse() {
		window.removeEventListener('mousemove', this.trackMouse);
	},

	trackMouse(event) {
		this.props.trackMousePosition(event.clientX, event.clientY);
		this.dragElement.style.top = ((this.props.mouseState.position.y + this.props.scrollState.scrollY) - this.dragElement.getBoundingClientRect().height/2)/window.innerHeight * 100 + '%';
		this.dragElement.style.left = ((this.props.mouseState.position.x + this.props.scrollState.scrollX) - this.dragElement.getBoundingClientRect().width/2)/window.innerWidth * 100 + '%';

	},

	returnDraggableToOriginalPosition() {
		this.dragElement.style.top = this.originalPosition.top + 'px';
		this.dragElement.style.left = this.originalPosition.left + 'px';
		this.dragElement.style.position = this.originalPosition.position;
	},

	render() {
		return (
			<div
			style={{
				height: this.height,
				float: this.float
			}}>
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
		dragAndDropState: store.dragAndDropState,
		scrollState: store.scrollState
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