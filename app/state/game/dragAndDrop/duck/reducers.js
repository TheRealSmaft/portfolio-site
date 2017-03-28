import types from './types';

const dragAndDropReducer = (state = {
	draggable: null
}, action) => {
	switch(action.type) {
		case types.SELECT_DRAGGABLE: {
			
			state = {
				...state,
				draggable: action.payload
			}

			break;
		}
	}
	return state;
}

export default dragAndDropReducer;