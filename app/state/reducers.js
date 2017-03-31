import { combineReducers } from 'redux';

import initialReducer from './initial';
import scrollEventReducer from './events/scroll';
import windowEventReducer from './events/window';
import mouseTrackingReducer from './mouse/tracking';
import itemReducer from './game/items';
import interactableReducer from './game/interactables';

export default combineReducers({
	initialState: initialReducer,
	scrollState: scrollEventReducer,
	windowState: windowEventReducer,
	mouseState: mouseTrackingReducer,
	itemState: itemReducer,
	interactableState: interactableReducer
});