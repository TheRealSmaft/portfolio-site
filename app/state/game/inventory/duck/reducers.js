import types from './types';
import lodash from 'lodash';

const inventoryReducer = (state = {
	collectables: [],
	inventory: [],
	placedItems: []
}, action) => {
	switch(action.type) {
		case types.CREATE_NEW_ITEM: {
			state = {
				...state,
				collectables: [
					...state.collectables,
					action.payload
				]
			}
			break;
		}
		case types.ADD_ITEM_TO_INVENTORY: {
			var itemId = _.findIndex(state.collectables, function(obj) {
				return obj.name === action.payload.name;
			});

			if(itemId > -1) {
				state = {
					...state,
					inventory: [
						...state.inventory,
						action.payload
					],
					collectables: [
						...state.collectables.slice(0, itemId),
						...state.collectables.slice(itemId + 1)
					]
				};
			}

			break;
		}
		case types.UPDATE_ITEM_IN_INVENTORY: {
			// var itemId = action.payload.itemId;

			// for(var i = 0; i > action.payload.updates.length; i++) {
			// 	var prop = action.payload.updates[i].prop;
			// 	state = {
			// 	...state,
			// 		inventory: {
			// 			...state.inventory,
			// 			[itemId]: {
			// 				...state.inventory[itemId],
			// 				[prop]: action.payload.updates[i].newValue
			// 			}
			// 		}
			// 	}
			// }
			break;
		}
		case types.REMOVE_ITEM_FROM_INVENTORY: {
			var itemId = _.findIndex(state.inventory, function(obj) {
				return obj.name === action.payload;
			});
			
			state = {
				...state,
				inventory: [
					...state.inventory.slice(0, itemId),
					...state.inventory.slice(itemId + 1)
				]
			};

			break;
		}
		case types.CLEAR_INVENTORY: {
			// for(let item of Object.keys(state.inventory)) {
			// 	state = {
			// 		...state,
			// 		inventory: {
			// 			...state.inventory,
			// 			[item]: {
			// 				...state.inventory[item],
			// 				removed: true
			// 			}
			// 		}
			// 	}
			// }
			break;
		}
		case types.PLACE_ITEM_IN_DOM: {
			var index = action.payload;
			var item = state.inventory[index];

			if(index > -1) {
				state = {
					...state,
					placedItems: [
						...state.placedItems,
						item
					],
					inventory: [
						...state.inventory.slice(0, index),
						...state.inventory.slice(index + 1)
					]
				};
			}
			break;
		}
	}
	return state;
};

export default inventoryReducer;