import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Item from '../../ItemContainers/ItemComponent';

import { interactableActions, interactableTypes } from '../../../../../state/game/interactables';

const DropZone = React.createClass({
	propTypes: {
		dropZone: React.PropTypes.object.isRequired
	},

	getDefaultProps() {
		return {
			eventTrigger: false
		}
	},

	getInitialState() {
		return {
			status: 'open'
		}
	},

	componentWillMount() {
		this.draggableMatch = false;
		this.pixelBuffer = this.props.pixelBuffer ? this.props.pixelBuffer : 20;
		this.userIsHovering = false;

		this.dropZoneIndex = this.getDropZoneIndex();
		this.prevIndex = this.dropZoneIndex;

		this.item = null;
		this.itemCentered = false;

		this.background = null;

		if(this.dropZoneIndex < 0) {
			this.dropZone = {
				name: this.props.dropZone.name,
				status: 'open'
			}

			this.props.addDropZoneToArray(this.dropZone);
		}
		else
		{
			this.dropZone = this.getDropZoneFromArray(this.dropZoneIndex);
		}

		if(this.dropZone.status === 'closed') {
			this.item = this.getItem();
		}

		if(this.props.children != undefined) {
			this.createBackground();
		}
		else
		{
			this.showDropZoneBorder = true;
		}
	},

	componentDidMount() {
		this.dropZoneNode = ReactDOM.findDOMNode(this.refs['dropZone']);
		this.boundingBox = this.getBoundingBox();

		if(this.dropZoneNode.firstChild != null) {
			this.centerItemNodeInDropZone();
		}
	},

	componentWillUpdate() {
		this.dropZoneNode = ReactDOM.findDOMNode(this.refs['dropZone']);
		this.boundingBox = this.getBoundingBox();
		this.dropZoneIndex = this.getDropZoneIndex();

		if(this.prevIndex != this.dropZoneIndex) {
			this.dropZone = this.getDropZoneFromArray(this.dropZoneIndex);
			this.prevIndex = this.dropZoneIndex;
		}

		if(this.dropZoneIndex > -1 &&
			this.props.interactables.dropZones[this.dropZoneIndex].status != this.dropZone.status) {
			this.dropZone = this.getDropZoneFromArray(this.dropZoneIndex);
		}

		if(this.dropZone.status === 'closed' &&
			this.item === null) {
			this.item = this.getItem();
		}
	},

	componentDidUpdate() {
		if(this.lastDragCase != this.props.items.draggable) {
			if(this.props.items.draggable === this.dropZone.name) {
				this.draggableMatch = true;
			}
			else
			{
				this.props.selectDropZone();
				this.draggableMatch = false;
			}
		}

		var isHovering = this.checkForHover();

		if(this.lastHoverCase != isHovering) {
			if(this.draggableMatch && isHovering) {
				this.props.selectDropZone(this.dropZone.name);
			}
			else
			{
				this.props.selectDropZone();
			}
		}

		if(this.dropZoneNode.firstChild != null &&
			!this.itemCentered) {
			this.centerItemNodeInDropZone();
		}

		if(this.state.status === 'open' &&
			this.dropZone.status === 'closed') {
			this.setState({
				...this.state,
				status: 'closed'
			})

			if(this.props.eventTrigger &&
				!this.props.interactables.firedEvents.includes(this.dropZone.name)) {
				this.props.addEventToFiredArray(this.dropZone.name + 'Event');
			}
		}

		this.lastDragCase = this.props.items.draggable;
		this.lastHoverCase = isHovering;
	},

	getDropZoneIndex() {
		var zone = this.props.dropZone.name;

		var index = _.findIndex(this.props.interactables.dropZones, function(obj) {
			return obj.name === zone;
		});

		return index;
	},

	getDropZoneFromArray(index) {
		return this.props.interactables.dropZones[index];
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

	getItem() {
		var item = _.filter(this.props.items.items, ['name', this.dropZone.name]);
		return (
			<Item 
				item={item[0]}
			/>
		)
	},

	centerItemNodeInDropZone() {
		var itemNode = this.dropZoneNode.firstChild.firstChild;
		var itemBounds = itemNode.getBoundingClientRect();

		itemNode.style.position = 'relative';
		itemNode.style.left = (this.boundingBox.width - itemBounds.width) / 2 + 'px';
		itemNode.style.top = (this.boundingBox.height - itemBounds.height) / 2 + 'px';

		this.itemCentered = true;
	},

	createBackground() {
		this.background = (
			<div
				style={{
					position: 'absolute',
					zIndex: -1,
					top: 0,
					left: 0
				}}
			>
				{this.props.children}
			</div>
		);
	},

	render() {
		return (
			<div
				id={this.props.dropZone.name}
				style={{
					position: 'relative',
					float: 'left',
					display: 'block'
				}}
			>
				<div
					ref={'dropZone'}
					style={{
						float: 'left',
						width: this.props.dropZone.width,
						height: this.props.dropZone.height,
						border: this.showDropZoneBorder ? '1px dotted black' : ''
					}}
				>
					{this.item}
				</div>
				{this.background}
			</div>
		)
	}
});

function mapStateToProps(store) {
	return {
		items: store.itemState,
		interactables: store.interactableState,
		mouseState: store.mouseState,
		windowState: store.windowState,
		scrollState: store.scrollState
	}
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		addDropZoneToArray: interactableActions.addDropZoneToArray,
		selectDropZone: interactableActions.selectDropZone,
		addEventToFiredArray: interactableActions.addEventToFiredArray
	}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(DropZone);