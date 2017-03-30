import types from './types';

const dragAndDropReducer = (state = {
	draggable: null,
	dropZone: null,
	dropZoneNode: null
}, action) => {
	switch(action.type) {
		case types.SELECT_DRAGGABLE: {
			
			state = {
				...state,
				draggable: action.payload
			}

			if(action.payload === null) {
				state = {
					...state,
					dropZone: null,
					dropZoneNode: null
				}
			}

			break;
		}
		case types.SELECT_DROP_ZONE: {
			
			state = {
				...state,
				dropZone: action.payload
			}

			if(action.payload === null) {
				state = {
					...state,
					dropZoneNode: null
				}
			}

			break;
		}
		case types.GET_DROP_ZONE_NODE: {

			state = {
				...state,
				dropZoneNode: action.payload
			}

			break;
		}
		case types.CLEAR_DROP_ZONE_NODE: {

			state = {
				...state,
				dropZoneNode: null
			}

			break;
		}
	}
	return state;
}

export default dragAndDropReducer;