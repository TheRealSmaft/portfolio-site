import types from './types';

function createNewItem(item) {
	return {
		type: types.CREATE_NEW_ITEM,
		payload: item
	}
};

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

function placeItemInDOM(itemIndex) {
	return {
		type: types.PLACE_ITEM_IN_DOM,
		payload: itemIndex
	}
};

export default {
	createNewItem,
	addItemToInventory,
	updateItemInInventory,
	removeItemFromInventory,
	clearInventory,
	placeItemInDOM
};