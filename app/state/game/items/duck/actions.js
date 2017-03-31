import types from './types';

function addItemToArray(item) {
	return {
		type: types.ADD_ITEM_TO_ARRAY,
		payload: item
	}
};

function changeItemStatus(itemIndex:number, status:string) {
	return {
		type: types.CHANGE_ITEM_STATUS,
		payload: {
			itemIndex: itemIndex,
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

function toggleItemInspect(itemName:string = null) {
	return {
		type: types.TOGGLE_ITEM_INSPECT,
		payload: itemName
	}
};

export default {
	addItemToArray,
	changeItemStatus,
	toggleItemDrag,
	toggleItemInspect
};