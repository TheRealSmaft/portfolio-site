import types from './types';

const fetchUser = () => ({
	type: types.FETCH_USER,
	payload: {
		id: 1,
		name: "Someone",
		age: 1378
	}
});

const setUserName = (name) => ({
	type: types.SET_USER_NAME,
	payload: name
});

const setUserAge = (age) => ({
	type: types.SET_USER_AGE,
	payload: age
});

export default {
	fetchUser,
	setUserName,
	setUserAge
};

// export function fetchUser() {
// 	return {
// 		type: "FETCH_USER_FULFILLED",
// 		payload: {
// 			name: "Buttman",
// 			age: 1378
// 		}
// 	}
// }

// export function setUserName(name) {
// 	return {
// 		type: "SET_USER_NAME",
// 		payload: name
// 	}
// }

// export function setUserAge(age) {
// 	return {
// 		type: "SET_USER_AGE",
// 		payload: age
// 	}
// }