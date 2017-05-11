import types from './types';

const sceneReducer = (state = {
	playing: true,
	scenesElapsed: 0
}, action) => {
	switch(action.type) {
		case types.TOGGLE_SCENE_START: {
			state = {
				...state,
				playing: true
			}
			break;
		}
		case types.TOGGLE_SCENE_STOP: {
			state = {
				...state,
				playing: false
			}
			break;
		}
		case types.SCENE_ELAPSED: {
			state = {
				...state,
				scenesElapsed: action.payload
			}
			break;
		}
	}
	return state;
};

export default sceneReducer;