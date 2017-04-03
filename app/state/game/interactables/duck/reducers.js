import types from './types';

const interactableReducer = (state = {
	dropZones: [],
	eventZones: [],
	currentDropZone: null,
	currentEventZone: null
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
				currentEventZone: null
			}
			break;
		}
		case types.DROP_ITEM_IN_DROP_ZONE: {
			// var dropZoneName = action.payload.dropZoneName
			// var index = _.findIndex(state.dropZones, function(obj) {
			// 	return obj.name === dropZoneName;
			// });

			// var itemNode = action.payload.item;

			// state = {
			// 	...state,
			// 	dropZones: state.dropZones.map((dropZone, i) => 
			// 		i === index ? {
			// 			...dropZone,
			// 			childNode: itemNode
			// 		} : dropZone
			// 	)
			// }
			break;
		}
		case types.ADD_EVENT_ZONE_TO_ARRAY: {
			state = {
				...state,
				eventZones: [
					...state.eventZones,
					action.payload
				]
			}
			break;
		}
		case types.CHANGE_EVENT_ZONE_STATUS: {
			state = {
				...state,
				dropZones: state.eventZones.map((eventZone, i) => 
					i === action.payload.eventZoneIndex ? {
						...eventZone,
						status: action.payload.status
					} : eventZone
				)
			}
			break;
		}
	}
	return state;
}

export default interactableReducer;