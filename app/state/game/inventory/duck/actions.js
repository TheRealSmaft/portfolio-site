import types from './types';

function addItemToInventory(item) {
	return {
		type: types.ADD_ITEM_TO_INVENTORY,
		payload: item
	}
};

function updateItemInInventory(itemId:string, updates) {
	return {
		type: types.UPDATE_ITEM_IN_INVENTORY,
		payload: {
			itemId: itemId,
			updates: updates
		}
	}
};

function removeItemFromInventory(itemId:string) {
	return {
		type: types.REMOVE_ITEM_FROM_INVENTORY,
		payload: itemId
	}
};

function clearInventory() {
	return {
		type: types.CLEAR_INVENTORY
	}
};

export default {
	addItemToInventory,
	updateItemInInventory,
	removeItemFromInventory,
	clearInventory
};