import React from 'react';

import { ResponsiveContainer, ItemContainer, Draggable, DropZone, Grid, Row, Col } from '../../Containers';

const SomefingPage = React.createClass({
	render() {
		return (
			<ResponsiveContainer>
				<ItemContainer itemName={'item'} float={'left'} itemWidth={'50px'}/>

				<ItemContainer itemName={'item1'} float={'left'} itemWidth={'50px'}/>
				<span style={{float: ''}}>Stay still</span>
				<h1>Hi</h1>
				<ItemContainer itemName={'item3'} float={'left'} itemWidth={'50px'}/>
			</ResponsiveContainer>
		)
	}
});

export default SomefingPage;