import React from 'react';

import { ResponsiveContainer } from '../../Containers';

import { Collectable, DropZone } from '../../Containers/GameContainers';

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

		var star = {
			name: 'star',
			width: 50
		}

		return (
			<ResponsiveContainer>
				<Collectable item={item} />
				<span>SUP!</span>
				<p style={{clear: 'both'}}>
					Nope...
				</p>
				<DropZone dropZone={dropZone}> 
					<img src={require('../Home/images/bunnies.jpg')} style={{width: '100%'}} />
				</DropZone>
				<Collectable item={item1} />
				<Collectable item={star} />
			</ResponsiveContainer>
		)
	}
});

export default SomefingPage;