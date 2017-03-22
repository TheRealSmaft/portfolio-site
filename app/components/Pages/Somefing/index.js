import React from 'react';

import { ResponsiveContainer, ItemContainer } from '../../Containers';

const SomefingPage = React.createClass({
	render() {
		return (
			<ResponsiveContainer>
				<ItemContainer itemName={'item'} float={'left'} itemWidth={'50px'}/>
				<span style={{float: ''}}>Stay still</span>
				<h1>Hi</h1>
			</ResponsiveContainer>
		)
	}
});

export default SomefingPage;