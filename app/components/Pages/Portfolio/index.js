import React from 'react';
import { ResponsiveContainer, Draggable, DropZone } from '../../Containers';

export default class PortfolioPage extends React.Component {
	render() {
		return (
			<ResponsiveContainer>
				<Draggable dragId={'greenGuy'} zoneId={'yellowBox'}>
					<p>
						POOP
					</p>
				</Draggable>

				<DropZone zoneId={'yellowBox'}>
					<p>
						FARTS
					</p>
				</DropZone>
			</ResponsiveContainer>
		)
	}
};