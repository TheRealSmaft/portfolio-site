import types from './types';

const portfolioReducer = (state = {
	modalPiece: -1
}, action) => {
	switch(action.type) {
		case types.SELECT_MODAL_PIECE: {
			state = {
				...state,
				modalPiece: action.payload
			}
			break;
		}
	}
	return state;
}

export default portfolioReducer;