import { combineReducers } from 'redux';
import types from './types';

const userReducer = (state = {
	id: null,
	name: null,
	age: null
}, action) => {
	switch(action.type) {
		case types.FETCH_USER: {
			state = {
				...state,
				id: action.payload.id,
				name: action.payload.name,
				age: action.payload.age
			}
			break;
		}
		case types.SET_USER_NAME: {
			state = {...state, name: action.payload};
			break;
		}
		case types.SET_USER_AGE: {
			state = {...state, age: action.payload};
			break;
		}
	}
	return state
}

const reducers = combineReducers({
	user: userReducer
});

export default reducers;
