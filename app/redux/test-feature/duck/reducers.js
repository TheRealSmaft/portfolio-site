import { combineReducers } from 'redux';
import types from './types';

const userReducer = (state = {
	user: {
		id: null,
		name: null,
		age: null
	}
}, action) => {
	switch(action.type) {
		case types.FETCH_USER: {
			return {...state, user: action.payload}
			break;
		}
		case types.SET_USER_NAME: {
			return {...state, 
				user: {
					name: action.payload
				}
			}
			break;
		}
		case types.SET_USER_AGE: {
			return {...state, 
				user: {
					age: action.payload
				}
			}
			break;
		}
		default: return state
	}
}

const reducers = combineReducers({
	user: userReducer
});

export default reducers;
