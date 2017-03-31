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

function lockScrollPosition() {
	return {
		type: types.LOCK_SCROLL_POSITION
	}
};

function unlockScrollPosition() {
	return {
		type: types.UNLOCK_SCROLL_POSITION
	}
};

export default {
	getScrollPosition,
	lockScrollPosition,
	unlockScrollPosition
};