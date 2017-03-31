import React from 'react';
import { ResponsiveContainer } from '../../Containers';

import { DropZone } from '../../Containers/GameContainers';

export default class PortfolioPage extends React.Component {
	render() {

		var dropZone1 = {
			name: 'item1',
			width: 100,
			height: 100
		}
		
		return (
			<ResponsiveContainer>
				<DropZone dropZone={dropZone1} />
			</ResponsiveContainer>
		)
	}
};