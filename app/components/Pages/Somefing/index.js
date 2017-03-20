import React from 'react';

import { ResponsiveContainer, ItemContainer, InventoryContainer } from '../../Containers';

const SomefingPage = React.createClass({
	render() {
		return (
			<ResponsiveContainer>

				<ItemContainer itemName={'pinky'}>
					<div style={{width: 50, height: 50, backgroundColor: 'pink'}}>
					</div>
				</ItemContainer>

				<p>
					WHUT
				</p>

				<ItemContainer itemName={'buttboy'}>
					<div style={{width: 10, height: 80, backgroundColor: 'black', float: 'left'}}>
					</div>
				</ItemContainer>

				<div style={{width:200, height: 20, float: 'left', backgroundColor:'lightblue'}}>

				</div>

				<h1>N1</h1>

				<InventoryContainer />
			</ResponsiveContainer>
		)
	}
});

export default SomefingPage;