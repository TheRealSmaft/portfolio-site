import { combineReducers } from 'redux';

import scrollEventReducer from './events/scroll';
import windowEventReducer from './events/window';
import mouseTrackingReducer from './mouse/tracking';
import itemReducer from './game/items';
import interactableReducer from './game/interactables';
import modeReducer from './game/mode';
import sceneReducer from './game/scenes';

export default combineReducers({
	scrollState: scrollEventReducer,
	windowState: windowEventReducer,
	mouseState: mouseTrackingReducer,
	itemState: itemReducer,
	interactableState: interactableReducer,
	modeState: modeReducer,
	sceneState: sceneReducer
});