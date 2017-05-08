import types from './types';

const itemArrayReducer = (state = {
	items: [],
	draggable: null,
	examinable: null
}, action) => {
	switch(action.type) {
		case types.ADD_ITEM_TO_ARRAY: {
			state = {
				...state,
				items: [
					...state.items,
					action.payload
				]
			}
			break;
		}
		case types.CHANGE_ITEM_STATUS: {
			state = {
				...state,
				items: state.items.map((item, i) => 
					i === action.payload.itemIndex ? {
						...item,
						status: action.payload.status
					} : item
				)
			}
			break;
		}
		case types.TOGGLE_ITEM_DRAG: {
			var draggable = action.payload;

			if(state.draggable === action.payload) {
				draggable = null;
			}

			state = {
				...state,
				draggable: draggable,
				examinable: null
			}
			break;
		}
		case types.TOGGLE_ITEM_EXAMINE: {
			state = {
				...state,
				draggable: null,
				examinable: action.payload
			}
			break;
		}
	}
	return state;
}

export default itemArrayReducer;