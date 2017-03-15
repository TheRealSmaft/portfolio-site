import { combineReducers } from 'redux';

import initialReducer from './initial';
import scrollEventReducer from './events/scroll';
import windowEventReducer from './events/window';
import mouseTrackingReducer from './mouse/tracking';
import dragAndDropReducer from './mouse/dragAndDrop';

export default combineReducers({
	initialState: initialReducer,
	scrollState: scrollEventReducer,
	windowState: windowEventReducer,
	mouseState: mouseTrackingReducer,
	dragAndDropState: dragAndDropReducer
});