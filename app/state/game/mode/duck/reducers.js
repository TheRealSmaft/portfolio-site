import types from './types';
import PasswordRandomizer from '../../../../assets/images/items/Paper/passwordRandomizer';

const modeReducer = (state = {
	gameMode: true,
	password: PasswordRandomizer.getPassword(),
	progressLevel: 6,
	justBeatGame: false
}, action) => {
	switch(action.type) {
		case types.CHANGE_TO_SITE_MODE: {
			state = {
				...state,
				gameMode: false
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
	}
	return state;
}

export default modeReducer;