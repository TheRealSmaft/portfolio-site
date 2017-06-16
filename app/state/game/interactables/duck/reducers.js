import types from './types';
var initialState = {
	firedEvents: [],
};

const interactableReducer = (state = initialState, action) => {
	switch(action.type) {
		case types.ADD_EVENT_TO_FIRED_ARRAY: {
			if(!state.firedEvents.includes(action.payload)) {
				state = {
					...state,
					firedEvents: [
						...state.firedEvents,
						action.payload
					]
				}
			}
			break;
		}
		case types.CLEAR_EVENTS_ARRAY: {
			return initialState;
			break;
		}
	}
	return state;
}

export default interactableReducer;