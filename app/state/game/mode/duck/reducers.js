import types from './types';
import PasswordRandomizer from '../../../../assets/images/items/Paper/passwordRandomizer';

const modeReducer = (state = {
	gameMode: true,
	password: PasswordRandomizer.getPassword(),
	progressLevel: 11,
	justBeatGame: false,
	justSkippedGame: false
}, action) => {
	switch(action.type) {
		case types.CHANGE_TO_SITE_MODE: {
			state = {
				...state,
				gameMode: false
			}
			break;
		}
		case types.CHANGE_TO_GAME_MODE: {
			state = {
				...state,
				gameMode: true
			}
			break;
		}
		case types.UPDATE_GAME_PROGRESS: {
			state = {
				...state,
				progressLevel: action.payload
			}
			break;
		}
		case types.JUST_BEAT_GAME: {
			state = {
				...state,
				justBeatGame: action.payload
			}
			break;
		}
		case types.JUST_SKIPPED_GAME: {
			state = {
				...state,
				justSkippedGame: action.payload
			}
			break;
		}
	}
	return state;
}

export default modeReducer;
