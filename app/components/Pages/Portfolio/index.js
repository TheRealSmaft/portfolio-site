import React from 'react';
import { ResponsiveContainer, Draggable, DropZone } from '../../Containers';

export default class PortfolioPage extends React.Component {
	render() {
		return (
			<ResponsiveContainer>
				<Draggable dragId={'greenGuy'} zoneId={'yellowBox'}>
					<div style={{
						backgroundColor: 'green', 
						height: 100,
						width: 100,
						borderRadius: '50%',
						float: 'left'
					}}>
					</div>
				</Draggable>

				<Draggable dragId={'blueGuy'} zoneId={'yellowBox'}>
					<div style={{
						backgroundColor: 'blue', 
						height: 100,
						width: 100,
						borderRadius: '50%',
						float: 'left'
					}}>
					</div>
				</Draggable>

				<DropZone zoneId={'yellowBox'} zonePosition={'static'} zIndex={-1} zoneLocation={['30%', '50%']}>
					<div style={{
							backgroundColor: 'yellow', 
							height: 200,
							width: 200,
							borderRadius: '10%',
							zIndex: -1,
							float: 'left'
						}}>
					</div>
				</DropZone>

				<Draggable dragId={'poopBall'} zoneId={'toilet'}>
					<div style={{
						backgroundColor: 'brown', 
						height: 75,
						width: 100,
						borderRadius: '30%',
						float: 'left'
					}}>
					</div>
				</Draggable>

				<DropZone zoneId={'toilet'} zonePosition={'absolute'} zIndex={-1} zoneLocation={['50%', '60%']}>
					<div style={{
							backgroundColor: 'pink', 
							height: 200,
							width: 300,
							zIndex: -1,
							float: 'left'
						}}>
					</div>
				</DropZone>
			</ResponsiveContainer>
		)
	}
};