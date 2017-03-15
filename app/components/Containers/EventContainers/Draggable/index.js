import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { mouseTrackingActions, mouseTrackingTypes } from '../../../../state/mouse/tracking';

const Draggable = React.createClass({
	propTypes: {
		mouseState: React.PropTypes.object.isRequired
	},

	componentDidMount() {
		this.dragging = false;
		this.domElement = ReactDOM.findDOMNode(this);
		this.originalPosition = {
			position: this.domElement.style.position,
			top: this.domElement.style.top,
			left: this.domElement.style.left
		}
	},

	toggleDrag() {
		this.dragging = !this.dragging;

		if(this.dragging) {
			this.domElement.style.position = 'absolute';
			window.addEventListener('mousemove', this.trackMouse);
		}
		else
		{	
			window.removeEventListener('mousemove', this.trackMouse);
			this.props.clearMousePosition();

			if(!this.props.dragAndDropState.canDrop) {
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
		this.domElement.style.top = this.props.mouseState.position.y - (this.domElement.getBoundingClientRect().height / 2) + 'px';
		this.domElement.style.left = this.props.mouseState.position.x - (this.domElement.getBoundingClientRect().width / 2) + 'px';
	},

	returnDraggableToOriginalPosition() {
		this.domElement.style.position = this.originalPosition.position;
		this.domElement.style.top = this.originalPosition.top;
		this.domElement.style.left = this.originalPosition.left;		
	},

	render() {
		return (
			<div>
				<div onMouseUp={this.toggleDrag}>
					{this.props.children}
				</div>
			
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
		clearMousePosition: mouseTrackingActions.clearMousePosition
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Draggable);