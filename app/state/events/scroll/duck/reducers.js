import types from './types';

const scrollEventReducer = (state = {
	scrollX: window.scrollX,
	scrollY: window.scrollY,
	scrollLocked: false
}, action) => {
	switch(action.type) {
		case types.GET_SCROLL_POSITION: {
			state = {
				...state,
				scrollX: action.payload.scrollX,
				scrollY: action.payload.scrollY
			}
			break;
		}
		case types.LOCK_SCROLL_POSITION: {
			state = {
				...state,
				scrollLocked: true
			}
			break;
		}
		case types.UNLOCK_SCROLL_POSITION: {
			state = {
				...state,
				scrollLocked: false
			}
			break;
		}
	}
	return state
}

export default scrollEventReducer;