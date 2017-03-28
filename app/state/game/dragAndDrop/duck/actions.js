import types from './types';

function selectDraggable(dragId:string = null) {
	return {
		type: types.SELECT_DRAGGABLE,
		payload: dragId
	}
};

export default {
	selectDraggable
};