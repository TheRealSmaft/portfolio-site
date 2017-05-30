import types from './types';

function addItemToArray(item) {
	return {
		type: types.ADD_ITEM_TO_ARRAY,
		payload: item
	}
};

function changeItemStatus(itemName:string, status:string) {
	return {
		type: types.CHANGE_ITEM_STATUS,
		payload: {
			name: itemName,
			status: status
		}
	}
};

function toggleItemDrag(itemName:string = null) {
	return {
		type: types.TOGGLE_ITEM_DRAG,
		payload: itemName
	}
};

function toggleItemExamine(itemName:string = null) {
	return {
		type: types.TOGGLE_ITEM_EXAMINE,
		payload: itemName
	}
};

export default {
	addItemToArray,
	changeItemStatus,
	toggleItemDrag,
	toggleItemExamine
};