export default function reducer (state = {}, action) {
	switch(action.type) {
		case "FETCH_USER_FULFILLED": {
			return {...state, user: action.payload}
			break;
		}
		case "SET_USER_NAME": {
			return {...state, name: action.payload}
			break;
		}
		case "SET_USER_AGE": {
			return {...state, age: action.payload}
			break;
		}
	}
	return state;
}