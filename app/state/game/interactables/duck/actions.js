import types from './types';

function addEventToFiredArray(event) {
	return {
		type: types.ADD_EVENT_TO_FIRED_ARRAY,
		payload: event
	}
};

function clearEventsArray() {
	return {
		type: types.CLEAR_EVENTS_ARRAY
	}
};

export default {
	addEventToFiredArray,
	clearEventsArray
};