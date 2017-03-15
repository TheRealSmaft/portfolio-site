import React from 'react';
import { bindActionCreators }  from 'redux';
import { connect } from 'react-redux';

import Draggable from '../../Draggable';

import { dragAndDropActions, dragAndDropTypes } from '../../../../../state/mouse/dragAndDrop';

const DragContainer = React.createClass({
	propTypes: {
		dragId: React.PropTypes.string.isRequired,
		zoneId: React.PropTypes.string.isRequired
	},

	componentWillMount() {
		this.props.createDraggable(this.props.dragId, this.props.zoneId);
	},

	toggleSelect() {
		this.isDragging = !this.isDragging;
		
		if(this.isDragging) {
			this.props.selectDraggable(this.props.dragId);
		}
		else
		{
			this.props.selectDraggable();
		}
	},

	render() {
		return (
			<div onMouseUp={this.toggleSelect}>
				<Draggable initialX={50} initialY={50}>
					{this.props.children}
				</Draggable>
			</div>
		)
	}
});

function mapStateToProps(store) {
	return {
		dragAndDropState: store.dragAndDropState
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		createDraggable: dragAndDropActions.createDraggable,
		selectDraggable: dragAndDropActions.selectDraggable
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DragContainer);