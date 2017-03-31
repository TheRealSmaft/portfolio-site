import React from 'react';

import { ResponsiveContainer } from '../../Containers';

import Collectable from '../../Containers/GameContainers/ItemContainers/Collectable';
import DropZone from '../../Containers/GameContainers/InteractableContainers/DropZone';

const SomefingPage = React.createClass({
	render() {
		var item = {
			name: 'item',
			width: 50
		}

		var dropZone = {
			name: 'item',
			width: 100,
			height: 100
		}

		var item1 = {
			name: 'item1',
			width: 50
		}

		return (
			<ResponsiveContainer>
				<Collectable item={item} />
				<span>SUP!</span>
				<p style={{clear: 'both'}}>
					Nope...
				</p>
				<DropZone dropZone={dropZone} />
				<Collectable item={item1} />
			</ResponsiveContainer>
		)
	}
});

export default SomefingPage;