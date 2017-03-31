import React from 'react';

import { ResponsiveContainer, Grid, Row, Col } from '../../Containers';
import { Collectable } from '../../Containers/GameContainers';

export default class About extends React.Component {
	render() {
		var item2 = {
			name: 'item2',
			width: 50
		}
		return (
			<ResponsiveContainer>
				<h1>Aboot</h1>
				<Grid gutter={5} breakPoints={[1100, 800, 600]}>
					<Row blocks={4}>
						<Col blocks={2} breaks={[100]}>
							<p>
								Aliquam fermentum, diam nec tincidunt condimentum, justo purus aliquam risus, et vestibulum orci turpis a justo. Quisque augue ante, lacinia vitae sapien non, tristique finibus lorem. Nam tortor turpis, auctor non risus vel, maximus placerat enim. In nisl nibh, condimentum quis ante sit amet, vehicula placerat enim. Aliquam finibus pretium lacus, ut mollis nisl ornare ac. Donec elementum arcu massa, at consequat eros luctus a. Suspendisse tincidunt finibus tincidunt. Aenean finibus rhoncus scelerisque. Aliquam erat volutpat. In fringilla sodales augue quis aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam viverra ultrices arcu, at sollicitudin mauris luctus sit amet.
							</p>
						</Col>
						<Col breaks={[50, 50, 100]}>
							<p>
								Aliquam fermentum, diam nec tincidunt condimentum, justo purentum arcu massa, at consequat eros luctus a. Suspendisse tincidunt finibus tincidunt.
							</p>
						</Col>
						<Col breaks={[50, 50, 100]}>
							<Collectable item={item2} />
						</Col>
					</Row>
				</Grid>
			</ResponsiveContainer>
		)
	}
};