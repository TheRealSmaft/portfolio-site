import types from './types';

const interactableReducer = (state = {
	dropZones: [],
	triggerZones: [],
	firedEvents: [],
	currentDropZone: null,
	currentTriggerZone: null
}, action) => {
	switch(action.type) {
		case types.ADD_DROP_ZONE_TO_ARRAY: {
			state = {
				...state,
				dropZones: [
					...state.dropZones,
					action.payload
				]
			}
			break;
		}
		case types.CHANGE_DROP_ZONE_STATUS: {
			state = {
				...state,
				dropZones: state.dropZones.map((dropZone, i) => 
					i === action.payload.dropZoneIndex ? {
						...dropZone,
						status: action.payload.status
					} : dropZone
				)
			}
			break;
		}
		case types.SELECT_DROP_ZONE: {
			state = {
				...state,
				currentDropZone: action.payload,
				currentTriggerZone: null
			}
			break;
		}
		case types.ADD_EVENT_TO_FIRED_ARRAY: {
			state = {
				...state,
				firedEvents: [
					...state.firedEvents,
					action.payload
				]
			}
			break;
		}
		case types.ADD_TRIGGER_ZONE_TO_ARRAY: {
			state = {
				...state,
				triggerZones: [
					...state.triggerZones,
					action.payload
				]
			}
			break;
		}
		case types.CHANGE_TRIGGER_ZONE_STATUS: {
			state = {
				...state,
				triggerZones: state.triggerZones.map((triggerZone, i) => 
					i === action.payload.triggerZoneIndex ? {
						...triggerZone,
						status: action.payload.status
					} : triggerZone
				)
			}
			break;
		}
		case types.SELECT_TRIGGER_ZONE: {
			state = {
				...state,
				currentTriggerZone: action.payload,
				currentDropZone: null
			}
			break;
		}
	}
	return state;
}

export default interactableReducer;