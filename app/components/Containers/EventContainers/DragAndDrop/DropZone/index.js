import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators }  from 'redux';
import { connect } from 'react-redux';

import { dragAndDropActions, dragAndDropTypes } from '../../../../../state/mouse/dragAndDrop';

const DropZone = React.createClass({
	propTypes: {
		zoneId: React.PropTypes.string.isRequired,
	},

	componentWillMount() {
		this.props.createDropZone(this.props.zoneId);
		this.domElement = null;

		this.userIsHovering = false;
		this.lastHoverCase = false;

		this.position = this.props.zonePosition ? this.props.zonePosition : 'static';

		this.pixelBuffer = this.props.pixelBuffer ? this.props.pixelBuffer : 20;
	},

	componentDidMount() {
		this.domElement = ReactDOM.findDOMNode(this);
		this.boundingBox = this.getBoundingBox();
	},

	componentWillReceiveProps() {
		this.lastHoverCase = this.userIsHovering;

		if(this.props.mouseState.position.x > (this.boundingBox.left - this.pixelBuffer) &&
			this.props.mouseState.position.x < (this.boundingBox.right + this.pixelBuffer) &&
			this.props.mouseState.position.y > (this.boundingBox.top - this.pixelBuffer) &&
			this.props.mouseState.position.y < (this.boundingBox.bottom + this.pixelBuffer)) {

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
		if(this.userIsHovering != this.lastHoverCase || this.props.windowState != nextProps.windowState) {
			return true;
		}
		else
		{
			return false;
		}
	},

	componentWillUpdate() {

		this.boundingBox = this.getBoundingBox();

		this.props.setDropZoneBounds(this.props.zoneId, {
			top: this.boundingBox.top,
			left: this.boundingBox.left,
			width: this.boundingBox.width,
			height: this.boundingBox.height,
			centerX: (this.boundingBox.left + this.boundingBox.width/2)/window.innerWidth * 100,
			centerY: (this.boundingBox.top + this.boundingBox.height/2)/window.innerHeight * 100
		});

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
		
		this.props.setDropZoneBounds(this.props.zoneId, {
			top: this.boundingBox.top,
			left: this.boundingBox.left,
			width: this.boundingBox.width,
			height: this.boundingBox.height,
			centerX: (this.boundingBox.left + this.boundingBox.width/2)/window.innerWidth * 100,
			centerY: (this.boundingBox.top + this.boundingBox.height/2)/window.innerHeight * 100
		});
	},

	leaveZone() {
		this.props.selectDropZone();
	},

	getBoundingBox() {
		return this.domElement.getBoundingClientRect();
	},

	render() {
		return (
			<div style={{
				display: this.position != 'absolute' && this.position != 'fixed' ? 'inline-block' : 'block',
				position: this.position,
				top: this.props.zoneLocation ? this.props.zoneLocation[1] : 0,
				left: this.props.zoneLocation ? this.props.zoneLocation[0] : 0,
				zIndex: this.props.zIndex
			}}>
				{this.props.children}
			</div>
		)
	}
});

function mapStateToProps(store) {
	return {
		dragAndDropState: store.dragAndDropState,
		mouseState: store.mouseState,
		windowState: store.windowState
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		createDropZone: dragAndDropActions.createDropZone,
		selectDropZone: dragAndDropActions.selectDropZone,
		setDropZoneBounds: dragAndDropActions.setDropZoneBounds
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DropZone);