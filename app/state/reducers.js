import { combineReducers } from 'redux';

import scrollEventReducer from './events/scroll';
import windowEventReducer from './events/window';
import itemReducer from './game/items';
import interactableReducer from './game/interactables';
import modeReducer from './game/mode';
import sceneReducer from './game/scenes';
import portfolioReducer from './portfolio';

export default combineReducers({
	scrollState: scrollEventReducer,
	windowState: windowEventReducer,
	itemState: itemReducer,
	interactableState: interactableReducer,
	modeState: modeReducer,
	sceneState: sceneReducer,
	portfolioState: portfolioReducer
});