const initialState = {
	fetching: false,
	fetched: false,
	users: [],
	error: null
};

const testReducer = (state = initialState, action) => {
	switch(action.type) {
		case "FETCH_SHIT": {
			return {...state, fetching: true}
			break;
		}
		case "FETCH_SHIT_ERROR": {
			return {...state, fetching: false, error: action.payload}
			break;
		}
		case "RECEIVE_SHIT": {
			return {
						...state, 
						fetching: false, 
						fetched: true,
						users: action.payload
					}
			break;
		}
	}
	return state;
};

export default testReducer;