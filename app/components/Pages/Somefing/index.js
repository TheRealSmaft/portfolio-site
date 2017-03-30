import React from 'react';

import { ResponsiveContainer } from '../../Containers';

import Collectable from '../../Containers/GameContainers/ItemContainers/Collectable';
import DropZone from '../../Containers/GameContainers/InteractableContainers/DropZone';

const SomefingPage = React.createClass({
	render() {
		var item = {
			name: 'item',
			width: '50px'
		}

		return (
			<ResponsiveContainer>
				<Collectable item={item} />
				<span>SUP!</span>
				<p style={{clear: 'both'}}>
					Nope...
				</p>
				<DropZone drop={'item'} />
			</ResponsiveContainer>
		)
	}
});

export default SomefingPage;