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

function dropItemInDropZone(item, dropZoneName:string) {
	return {
		type: types.DROP_ITEM_IN_DROP_ZONE,
		payload: {
			item: item,
			dropZoneName: dropZoneName
		}
	}
};

function addEventZoneToArray(eventZone) {
	return {
		type: types.ADD_EVENT_ZONE_TO_ARRAY,
		payload: eventZone
	}
};

function changeEventZoneStatus(eventZoneIndex:number, status:string) {
	return {
		type: types.CHANGE_EVENT_ZONE_STATUS,
		payload: {
			eventZoneIndex: eventZoneIndex,
			status: status
		}
	}
};

export default {
	addDropZoneToArray,
	changeDropZoneStatus,
	selectDropZone,
	dropItemInDropZone,
	addEventZoneToArray,
	changeEventZoneStatus
};