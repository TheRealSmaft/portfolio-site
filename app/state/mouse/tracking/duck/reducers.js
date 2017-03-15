import types from './types';

const mouseTrackingReducer = (state = {
	position: {
		x: null,
		y: null
	}
}, action) => {
	switch(action.type) {
		case types.TRACK_MOUSE_POSITION: {
			state = {
				...state,
				position: {
					x: action.payload.x,
					y: action.payload.y
				}
			}
			break;
		}
		case types.CLEAR_MOUSE_POSITION: {
			state = {
				state,
				position: {
					x: null,
					y: null
				}
			}
			break;
		}
	}
	return state;
}

export default mouseTrackingReducer;