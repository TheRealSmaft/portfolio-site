import { combineReducers } from 'redux';

import initialReducer from './initial';
import scrollEventReducer from './events/scroll';
import windowEventReducer from './events/window';

export default combineReducers({
	initialState: initialReducer,
	scrollState: scrollEventReducer,
	windowState: windowEventReducer,
});