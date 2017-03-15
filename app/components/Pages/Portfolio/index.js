import React from 'react';
import { ResponsiveContainer, DragContainer, DropZone } from '../../Containers';

export default class PortfolioPage extends React.Component {
	render() {
		return (
			<ResponsiveContainer>
				<DragContainer dragId={'greenGuy'} zoneId={'yellowBox'}>
					<p>
						POOP
					</p>
				</DragContainer>

				<DropZone zoneId={'yellowBox'}>
					<p>
						FARTS
					</p>
				</DropZone>
			</ResponsiveContainer>
		)
	}
};