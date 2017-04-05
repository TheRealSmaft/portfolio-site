import React from 'react';

import { ResponsiveContainer } from '../../Containers';
import PhysicsContainer from '../../Containers/EventContainers/PhysicsContainer';

const AboutPage = React.createClass({
	render() {
		return (
			<ResponsiveContainer>
				<PhysicsContainer />
			</ResponsiveContainer>
		)
	}
});

export default AboutPage;