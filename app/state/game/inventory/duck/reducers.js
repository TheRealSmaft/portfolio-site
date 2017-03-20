import types from './types';
import lodash from 'lodash';

const inventoryReducer = (state = {
	items: []
}, action) => {
	switch(action.type) {
		case types.ADD_ITEM_TO_INVENTORY: {
			state = {
				...state,
				items: [
					...state.items,
					action.payload
				]
			}
			break;
		}
		case types.UPDATE_ITEM_IN_INVENTORY: {
			// var itemId = action.payload.itemId;

			// for(var i = 0; i > action.payload.updates.length; i++) {
			// 	var prop = action.payload.updates[i].prop;
			// 	state = {
			// 	...state,
			// 		items: {
			// 			...state.items,
			// 			[itemId]: {
			// 				...state.items[itemId],
			// 				[prop]: action.payload.updates[i].newValue
			// 			}
			// 		}
			// 	}
			// }
			break;
		}
		case types.REMOVE_ITEM_FROM_INVENTORY: {
			var itemId = _.findIndex(state.items, function(obj) {
				return obj.name === action.payload;
			});
			
			state = {
				...state,
				items: [
					...state.items.slice(0, itemId),
					...state.items.slice(itemId + 1)
				]
			};

			break;
		}
		case types.CLEAR_INVENTORY: {
			// for(let item of Object.keys(state.items)) {
			// 	state = {
			// 		...state,
			// 		items: {
			// 			...state.items,
			// 			[item]: {
			// 				...state.items[item],
			// 				removed: true
			// 			}
			// 		}
			// 	}
			// }
			break;
		}
	}
	return state;
};

export default inventoryReducer;