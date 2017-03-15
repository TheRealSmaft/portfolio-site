import types from './types';

function createDraggable(dragId:string, zone:string, inZone:bool = false) {
	return {
		type: types.CREATE_DRAGGABLE,
		payload: {
			id: dragId,
			zone: zone,
			inZone: inZone
		}
	}
};

function createDropZone(zoneId:string) {
	return {
		type: types.CREATE_DROP_ZONE,
		payload: {
			id: zoneId,
			mouseOverZone: false
		}
	}
};

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

function draggableDropped() {
	return {
		type: types.DRAGGABLE_DROPPED
	}
};

export default {
	createDraggable,
	createDropZone,
	selectDraggable,
	selectDropZone,
	draggableDropped
};