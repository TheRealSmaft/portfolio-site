import types from './types';

const getWindowPosition = () => ({
	type: types.GET_WINDOW_POSITION,
	payload: {
		scrollX: window.scrollX,
		scrollY: window.scrollY
	}
});

export default {
	getWindowPosition
};