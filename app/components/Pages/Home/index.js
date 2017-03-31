import React from 'react';

import { ResponsiveContainer, ScrollLoader, Grid, Row, Col, TimedContainer } from '../../Containers';
import DropZone from '../../Containers/GameContainers/InteractableContainers/DropZone';

export default class Home extends React.Component {
	render() {
		var dropZone2 = {
			name: 'item2',
			width: 100,
			height: 100
		}

		return (
			<ResponsiveContainer>
				<h1>SUP HOMEBOY!</h1>

				<TimedContainer tcDelay={5} tcIncrement={2000} tcDuration={4}>

				</TimedContainer>

				<Grid gutter={5} breakPoints={[1100, 800, 600]}>
					<Row blocks={5}>
						<Col blocks={2} breaks={[100]}>
							<p>
								Aliquam fermentum, diam nec tincidunt condimentum, justo purus aliquam risus, et vestibulum orci turpis a justo. Quisque augue ante, lacinia vitae sapien non, tristique finibus lorem. Nam tortor turpis, auctor non risus vel, maximus placerat enim. In nisl nibh, condimentum quis ante sit amet, vehicula placerat enim. Aliquam finibus pretium lacus, ut mollis nisl ornare ac. Donec elementum arcu massa, at consequat eros luctus a. Suspendisse tincidunt finibus tincidunt. Aenean finibus rhoncus scelerisque. Aliquam erat volutpat. In fringilla sodales augue quis aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam viverra ultrices arcu, at sollicitudin mauris luctus sit amet.
							</p>
						</Col>
						<Col breaks={[33.3, 33.3, 100]}>
							<p>
								Aliquam fermentum, diam nec tincidunt condimentum, justo purentum arcu massa, at consequat eros luctus a. Suspendisse tincidunt finibus tincidunt.
							</p>
							<p>
								Aenean finibus rhoncus scelerisque. Aliquam erat volutpat. In fringilla sodales augue quis aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam viverra ultrices arcu, at sollicitudin mauris luctus sit amet.
							</p>						
						</Col>
						<Col breaks={[33.3, 33.3, 100]}>
							<p>
								Aliquam fermentum, diam nec tincidunt condimentum, justo purus aliquam risus, et vestibulum orci turpis a justo. Quisque augue ante, lacinia vitae sapien non, tristique finibus lorem. Nam tortor turpis, auctor non risus vel, maximus placerat enim. In nisl nibh, condimentum quis ante sit amet, vehicula placerat enim. Aliquam finibus pretium lacus, ut mollis nisl ornare ac. Donec elementum arcu massa, at consequat eros luctus a. Suspendisse tincidunt finibus tincidunt. Aenean finibus rhoncus scelerisque. Aliquam erat volutpat. In fringilla sodales augue quis aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam viverra ultrices arcu, at sollicitudin mauris luctus sit amet.
							</p>
						</Col>
						<Col breaks={[33.3, 33.3, 100]}>
							<DropZone dropZone={dropZone2} />
						</Col>
					</Row>
				</Grid>
			</ResponsiveContainer>
		)
	}
};