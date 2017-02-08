import types from './types';

const getWindowSize = () => ({
	type: types.GET_WINDOW_SIZE,
	payload: {
		height: window.innerHeight,
		width: window.innerWidth
	}
});

export default {
	getWindowSize
};