import types from './types';

function selectDraggable(dragId:string = null) {
	return {
		type: types.SELECT_DRAGGABLE,
		payload: dragId
	}
};

function selectDropZone(zoneId:string = null) {
	return {
		type: types.SELECT_DROP_ZONE,
		payload: zoneId
	}
};

function getDropZoneNode(node) {
	return {
		type: types.GET_DROP_ZONE_NODE,
		payload: node
	}
};

function clearDropZoneNode(node) {
	return {
		type: types.CLEAR_DROP_ZONE_NODE,
		payload: node
	}
};

export default {
	selectDraggable,
	selectDropZone,
	getDropZoneNode,
	clearDropZoneNode
};