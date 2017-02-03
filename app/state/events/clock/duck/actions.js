import types from './types';

getCurrentTime() {
	var d = new Date();
	return d.getTime()
}

const timeUpdate = () => ({
	type: types.TIME_UPDATE,
	payload: {
		time: getCurrentTime(),
		date: new Date()
	}
});

export default {
	timeUpdate
};