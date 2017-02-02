import { combineReducers } from 'redux';
import types from './types';

const siteInfoReducer = (state = {
	title: null,
	author: null,
	description: null
}, action) => {
	switch(action.type) {
		case types.GET_SITE_INFO: {
			state = {
				...state,
				title: action.payload.title,
				author: action.payload.author,
				description: action.payload.description
			}
			break;
		}
	}
	return state
}

const reducers = combineReducers({
	site: siteInfoReducer
});

export default reducers;