import types from './types';

const windowEventReducer = (state = {
	height: window.innerHeight,
	width: window.innerWidth
}, action) => {
	switch(action.type) {
		case types.GET_WINDOW_SIZE: {
			state = {
				...state,
				height: action.payload.height,
				width: action.payload.width
			}
			break;
		}
	}
	return state
}

export default windowEventReducer;