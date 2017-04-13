import React from 'react';

import { ResponsiveContainer, Grid, Row, Col } from '../../Containers';

const ContactPage = React.createClass({
	render() {
		return (
			<ResponsiveContainer>
				<h1>
					CONTACT ME
				</h1>
				<Grid
					breakPoints={[768]}
					gutter={4}
				>
					<Row>
						<Col
							breaks={[100]}
						>
							<div
								style={{
									width: '100%',
									height: '300px',
									backgroundColor: 'yellow'
								}}
							>
								<p>
									This will be a pic of a flying saucer (from Zanahoria) abducting the Sinister Silhouette.
								</p>
							</div>
						</Col>
						<Col
							breaks={[100]}
						>
							<div
								style={{
									width: '100%',
									height: '300px',
									backgroundColor: 'lightgreen'
								}}
							>
								<p>
									This will be a contact form
								</p>
							</div>
						</Col>
					</Row>
				</Grid>
			</ResponsiveContainer>
		)
	}
});

export default ContactPage;