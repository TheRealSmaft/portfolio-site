import types from './types';

function getScrollPosition() {
	return {
		type: types.GET_SCROLL_POSITION,
		payload: {
			scrollX: window.scrollX,
			scrollY: window.scrollY
		}
	}
};

export default {
	getScrollPosition
};