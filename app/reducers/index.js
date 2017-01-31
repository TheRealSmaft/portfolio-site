import { combineReducers } from 'redux';

import test from './testReducer';
import user from './userReducer';

export default combineReducers({
	test,
	user
});