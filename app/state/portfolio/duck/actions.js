import types from './types';

function selectModalPiece(index) {
	return {
		type: types.SELECT_MODAL_PIECE,
		payload: index
	}
};

export default {
	selectModalPiece
};