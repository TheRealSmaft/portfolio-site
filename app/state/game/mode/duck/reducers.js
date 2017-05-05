import types from './types';

const modeReducer = (state = {
	gameMode: true
}, action) => {
	switch(action.type) {
		case types.CHANGE_TO_SITE_MODE: {
			state = {
				...state,
				gameMode: false
			}
			break;
		}
	}
	return state;
}

export default modeReducer;