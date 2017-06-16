import types from './types';
import PasswordRandomizer from '../../../../assets/images/items/Paper/passwordRandomizer';

function getPassword() {
	var pw = PasswordRandomizer.getPassword();
	localStorage.setItem('password', pw);
	return pw;
};

function getGameMode() {
	localStorage.setItem('gameMode', true);
	return true;
};

const modeReducer = (state = {
	gameMode: localStorage.gameMode ? localStorage.gameMode === 'true' : getGameMode(),
	password: localStorage.password ? localStorage.password : getPassword(),
	progressLevel: localStorage.progressLevel ? parseFloat(localStorage.progressLevel) : 0,
	justBeatGame: false,
	justSkippedGame: false
}, action) => {
	switch(action.type) {
		case types.CHANGE_TO_SITE_MODE: {
			state = {
				...state,
				gameMode: false,
				progressLevel: 0
			}
			localStorage.setItem('gameMode', false);
			localStorage.setItem('progressLevel', 0);
			break;
		}
		case types.CHANGE_TO_GAME_MODE: {
			state = {
				...state,
				gameMode: true
			}
			localStorage.setItem('gameMode', true);
			break;
		}
		case types.UPDATE_GAME_PROGRESS: {
			state = {
				...state,
				progressLevel: action.payload
			}
			localStorage.setItem('progressLevel', action.payload);
			break;
		}
		case types.JUST_BEAT_GAME: {
			state = {
				...state,
				justBeatGame: action.payload
			}
			localStorage.removeItem('password');
			break;
		}
		case types.JUST_SKIPPED_GAME: {
			state = {
				...state,
				justSkippedGame: action.payload
			}
			localStorage.removeItem('password');
			break;
		}
		case types.CLEAR_LOCAL_STORAGE: {
			localStorage.clear();
			break;
		}
		case types.LOG_LOCAL_STORAGE: {
			console.log(localStorage);
			break;
		}
	}
	return state;
}

export default modeReducer;
