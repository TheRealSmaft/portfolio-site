import types from './types';

const getScrollPosition = () => ({
	type: types.GET_SCROLL_POSITION,
	payload: {
		scrollX: window.scrollX,
		scrollY: window.scrollY
	}
});

export default {
	getScrollPosition
};