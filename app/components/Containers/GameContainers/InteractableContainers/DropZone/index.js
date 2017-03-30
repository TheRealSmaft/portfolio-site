import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const DropZone = React.createClass({
	propTypes: {
		drop: React.PropTypes.string.isRequired
	},

	componentWillMount() {
		this.draggableMatch = false;
		this.pixelBuffer = this.props.pixelBuffer ? this.props.pixelBuffer : 20;
		this.userIsHovering = false;
		this.userAbleToDropDraggable = false;
	},

	componentDidMount() {
		this.dropZoneNode = ReactDOM.findDOMNode(this);
	},

	componentWillUpdate() {
		this.boundingBox = this.getBoundingBox();
	},

	componentDidUpdate() {
		if(this.lastDragCase != this.props.itemArray.draggable) {
			if(this.props.itemArray.draggable === this.props.drop) {
				this.draggableMatch = true;
			}
			else
			{
				this.draggableMatch = false;
			}
		}

		var isHovering = this.checkForHover();

		if(this.lastHoverCase != isHovering) {
			if(this.draggableMatch && isHovering) {
				this.userAbleToDropDraggable = true;
			}
			else
			{
				this.userAbleToDropDraggable = false;
			}
		}

		this.lastDragCase = this.props.itemArray.draggable;
		this.lastHoverCase = isHovering;
	},

	getBoundingBox() {
		return this.dropZoneNode.getBoundingClientRect();
	},

	checkForHover() {
			if(this.props.mouseState.position.x > (this.boundingBox.left - this.pixelBuffer) &&
				this.props.mouseState.position.x < (this.boundingBox.right + this.pixelBuffer) &&
				this.props.mouseState.position.y > (this.boundingBox.top - this.pixelBuffer) &&
				this.props.mouseState.position.y < (this.boundingBox.bottom + this.pixelBuffer)) {
				return true;
			}
			else
			{
				return false;
			}
	},

	render() {
		return (
			<div
				style={{
					width: 100,
					height: 100,
					backgroundColor: 'pink',
					borderRadius: 10
				}}
			>
			</div>
		)
	}
});

function mapStateToProps(store) {
	return {
		itemArray: store.itemArrayState,
		mouseState: store.mouseState,
		windowState: store.windowState,
		scrollState: store.scrollState
	}
};

export default connect(mapStateToProps)(DropZone);