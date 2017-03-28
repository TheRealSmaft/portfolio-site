import React from 'react';

import { ResponsiveContainer } from '../../Containers';

import Collectable from '../../Containers/GameContainers/InventoryContainers/Collectable';

const SomefingPage = React.createClass({
	render() {
		var item = {
			name: 'item',
			zone: 'phoneBooth',
			width: '50px'
		}

		var turd = {
			name: 'turd',
			zone: 'towel',
			width: '50px'
		}

		return (
			<ResponsiveContainer>
				<Collectable collectableInfo={item} />
				<Collectable collectableInfo={turd} />
			</ResponsiveContainer>
		)
	}
});

export default SomefingPage;