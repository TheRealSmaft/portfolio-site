import types from './types';

const windowEventReducer = (state = {
	scrollX: window.scrollX,
	scrollY: window.scrollY
}, action) => {
	switch(action.type) {
		case types.GET_WINDOW_POSITION: {
			state = {
				...state,
				scrollX: action.payload.scrollX,
				scrollY: action.payload.scrollY
			}
			break;
		}
	}
	return state
}

export default windowEventReducer;