import types from './types';

function createDraggable(dragId:string, zone:string) {
	return {
		type: types.CREATE_DRAGGABLE,
		payload: {
			id: dragId,
			zone: zone,
			droppedInZone: false
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

function dropSuccessful(dragId:string) {
	return {
		type: types.DROP_SUCCESSFUL,
		payload: dragId
	}
};

function setDropZoneBounds(zoneId:string, bounds) {
	return {
		type: types.SET_DROP_ZONE_BOUNDS,
		payload: {
			zoneId: zoneId,
			bounds: bounds
		}
	}
};

export default {
	createDraggable,
	createDropZone,
	selectDraggable,
	selectDropZone,
	dropSuccessful,
	setDropZoneBounds
};