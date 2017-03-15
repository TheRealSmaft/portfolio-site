import types from './types';

function trackMousePosition(posX, posY) {
	return {
		type: types.TRACK_MOUSE_POSITION,
		payload: {
			x: posX,
			y: posY
		}
	}
};

function clearMousePosition() {
	return {
		type: types.CLEAR_MOUSE_POSITION
	}
}

export default {
	trackMousePosition,
	clearMousePosition
};