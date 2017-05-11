import types from './types';

function addDropZoneToArray(dropZone) {
	return {
		type: types.ADD_DROP_ZONE_TO_ARRAY,
		payload: dropZone
	}
};

function changeDropZoneStatus(dropZoneIndex:number, status:string) {
	return {
		type: types.CHANGE_DROP_ZONE_STATUS,
		payload: {
			dropZoneIndex: dropZoneIndex,
			status: status
		}
	}
};

function selectDropZone(dropZoneName:string = null) {
	return {
		type: types.SELECT_DROP_ZONE,
		payload: dropZoneName
	}
};

function addEventToFiredArray(event) {
	return {
		type: types.ADD_EVENT_TO_FIRED_ARRAY,
		payload: event
	}
};

function addTriggerZoneToArray(triggerZone) {
	return {
		type: types.ADD_TRIGGER_ZONE_TO_ARRAY,
		payload: triggerZone
	}
};

function changeTriggerZoneStatus(triggerZoneIndex:number, status:string) {
	return {
		type: types.CHANGE_TRIGGER_ZONE_STATUS,
		payload: {
			triggerZoneIndex: triggerZoneIndex,
			status: status
		}
	}
};

function selectTriggerZone(triggerZoneName:string = null) {
	return {
		type: types.SELECT_TRIGGER_ZONE,
		payload: triggerZoneName
	}
};


export default {
	addDropZoneToArray,
	changeDropZoneStatus,
	selectDropZone,
	addEventToFiredArray,
	addTriggerZoneToArray,
	changeTriggerZoneStatus,
	selectTriggerZone
};