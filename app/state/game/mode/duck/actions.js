import types from './types';

function changeToSiteMode() {
	return {
		type: types.CHANGE_TO_SITE_MODE
	}
};

function updateGameProgress(level:number) {
	return {
		type: types.UPDATE_GAME_PROGRESS,
		payload: level
	}
};

function justBeatGame(bool:bool) {
	return {
		type: types.JUST_BEAT_GAME,
		payload: bool
	}
};

export default {
	changeToSiteMode,
	updateGameProgress,
	justBeatGame
};