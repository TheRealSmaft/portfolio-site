import types from './types';

function createRandomPassword() {
	var beg = [
		'evil',
		'yummy',
		'fuzzy',
		'jumbo'
	];

	var mid = [
		'Baby',
		'Cows',
		'Farts',
		'Toes'
	];

	var end = [
		'69',
		'187',
		'420',
		'911'
	];

	return beg[getRandomNumber()] + mid[getRandomNumber()] + end[getRandomNumber()];
};

function getRandomNumber() {
	return Math.floor(Math.random() * 4);
};

const modeReducer = (state = {
	gameMode: true,
	password: createRandomPassword()
}, action) => {
	switch(action.type) {
		case types.CHANGE_TO_SITE_MODE: {
			state = {
				...state,
				gameMode: false
			}
			break;
		}
	}
	return state;
}

export default modeReducer;