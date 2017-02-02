import types from './types';

const getSiteInfo = () => ({
	type: types.GET_SITE_INFO,
	payload: {
		title: "Portfolio Site",
		author: "Matthew Brubaker Smith",
		description: "MBS' Portfolio, DUH!"
	}
});

export default {
	getSiteInfo
};
