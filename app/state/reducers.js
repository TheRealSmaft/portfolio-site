import { combineReducers } from 'redux';

import initialReducer from './initial';
import scrollEventReducer from './events/scroll';
import windowEventReducer from './events/window';
import mouseTrackingReducer from './mouse/tracking';
import itemArrayReducer from './game/itemArray';
// import dragAndDropReducer from './game/dragAndDrop';
// import inventoryReducer from './game/inventory';

export default combineReducers({
	initialState: initialReducer,
	scrollState: scrollEventReducer,
	windowState: windowEventReducer,
	mouseState: mouseTrackingReducer,
	itemArrayState: itemArrayReducer
	// dragAndDropState: dragAndDropReducer,
	// inventoryState: inventoryReducer
});