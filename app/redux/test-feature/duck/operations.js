import actions from './actions';

// Example code, not connected to anything
const simpleFetch = actions.fetchUser;

const complexFetch = (newName) => (dispatch) => {
	dispatch(actions.fetchUser())
		.then(() => {
			dispatch(actions.setUserName(newName));
			dispatch(actions.fetchUser())
		});
}