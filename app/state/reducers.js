import { combineReducers } from 'redux';

import initialReducer from './initial';
import windowEventReducer from './events/window';

export default combineReducers({
	initialReducer,
	windowEventReducer
});