import types from './types';

function toggleSceneStart() {
	return {
		type: types.TOGGLE_SCENE_START
	}
};

function toggleSceneStop() {
	return {
		type: types.TOGGLE_SCENE_STOP
	}
};

function sceneElapsed(sceneNumber:number) {
	return {
		type: types.SCENE_ELAPSED,
		payload: sceneNumber
	}
};

export default {
	toggleSceneStart,
	toggleSceneStop,
	sceneElapsed
};