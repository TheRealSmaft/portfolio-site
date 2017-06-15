import types from './types';

function changeToSiteMode() {
	return {
		type: types.CHANGE_TO_SITE_MODE
	}
};

function changeToGameMode() {
	return {
		type: types.CHANGE_TO_GAME_MODE
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

function justSkippedGame(bool:bool) {
	return {
		type: types.JUST_SKIPPED_GAME,
		payload: bool
	}
};

function clearLocalStorage() {
	return {
		type: types.CLEAR_LOCAL_STORAGE
	}
};

function logLocalStorage() {
	return {
		type: types.LOG_LOCAL_STORAGE
	}
};

export default {
	changeToSiteMode,
	changeToGameMode,
	updateGameProgress,
	justBeatGame,
	justSkippedGame,
	clearLocalStorage,
	logLocalStorage
};