import React from 'react';
import { browserHistory } from 'react-router';

import { ResponsiveContainer } from '../../Containers';

const HomePage = React.createClass({
	componentWillMount() {
		browserHistory.push('/bestPRotfoiloPage');
	},

	render() {
		return (
			<ResponsiveContainer>
		
			</ResponsiveContainer>
		)
	}
});

export default HomePage;