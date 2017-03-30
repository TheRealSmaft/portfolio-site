import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators }  from 'redux';
import { connect } from 'react-redux';

import { dragAndDropActions, dragAndDropTypes } from '../../../../../state/game/dragAndDrop';

const DropZone = React.createClass({
	propTypes: {
		draggable: React.PropTypes.string.isRequired,
	},

	componentWillMount() {
		this.userIsHovering = false;
		this.lastHoverCase = false;

		this.dragChild = null;

		this.position = this.props.zonePosition ? this.props.zonePosition : 'static';

		this.pixelBuffer = this.props.pixelBuffer ? this.props.pixelBuffer : 20;

		if(this.props.inventory.placedItems.length > 0) {
			var zone = this.props.draggable;
			var childIndex = _.findIndex(this.props.inventory.placedItems, function(obj) {
				return obj.name === zone;
			});
			this.dragChild = this.props.inventory.placedItems[childIndex].image;
		}
	},

	componentDidMount() {
		this.dropZoneNode = ReactDOM.findDOMNode(this.refs.dropZone);
		this.boundingBox = this.getBoundingBox();

		console.log(document.getElementById(this.draggable + 'DragChild'));
	},

	componentWillReceiveProps() {
		this.lastHoverCase = this.userIsHovering;

		if(this.boundingBox != undefined) {
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
		}
	},

	shouldComponentUpdate(nextProps) {
		if(this.userIsHovering != this.lastHoverCase || 
			this.props.windowState != nextProps.windowState ||
			this.props.scrollState != nextProps.scrollState) {
			return true;
		}
		else
		{
			return false;
		}
	},

	componentWillUpdate() {
		this.boundingBox = this.getBoundingBox();

		if(this.userIsHovering != this.lastHoverCase) {
			if(this.userIsHovering) {
				this.enterZone();
			}
			else
			{
				this.leaveZone();
			}
		}
	},

	enterZone() {
		if(this.userIsHovering &&
			this.props.draggable === this.props.dragAndDrop.draggable) {
			this.props.getDropZoneNode(this.dropZoneNode);
		}
	},

	leaveZone() {
		this.props.selectDropZone();
	},

	getBoundingBox() {
		return this.dropZoneNode.getBoundingClientRect();
	},

	render() {
		return (
			<div
			id={this.props.draggable + 'Zone'}
			ref='dropZone'
			style=
				{{
					display: 'block',
					float: 'left',
					height: 100, 
					width: 100, 
					backgroundColor: 'pink'
				}}>
				{this.dragChild}
			</div>
		)
	}
});

function mapStateToProps(store) {
	return {
		dragAndDrop: store.dragAndDropState,
		inventory: store.inventoryState,
		mouseState: store.mouseState,
		windowState: store.windowState,
		scrollState: store.scrollState
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		selectDropZone: dragAndDropActions.selectDropZone,
		getDropZoneNode: dragAndDropActions.getDropZoneNode
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DropZone);