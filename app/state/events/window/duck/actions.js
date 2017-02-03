import types from './types';

const windowPositionUpdate = () => ({
	type: types.WINDOW_POSITION_UPDATE,
	payload: {
		scrollX: window.scrollX,
		scrollY: window.scrollY
	}
});

export default {
	windowPositionUpdate
};