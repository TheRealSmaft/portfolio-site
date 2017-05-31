import types from './types';

const itemArrayReducer = (state = {
	items: [],
	draggable: null,
	examinable: null
}, action) => {
	switch(action.type) {
		case types.ADD_ITEM_TO_ARRAY: {
			var exists = false;

			for(let item of state.items) {
				if(item.name === action.payload.name) {
					exists = true;
				}
			}

			if(!exists) {
				state = {
					...state,
					items: [
						...state.items,
						action.payload
					]
				}
			}
			break;
		}
		case types.CHANGE_ITEM_STATUS: {
			var name = action.payload.name;

			state = {
				...state,
				items: state.items.map((item) => 
					item.name === name ? {
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
				draggable: draggable
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