import React from 'react';

import { ResponsiveContainer, Grid, Row, Col} from '../../Containers';

import { AboutPageStyles } from '../../../styles/pages';

const AboutPage = React.createClass({
	render() {
		return (
			<ResponsiveContainer>
				<h1>
					ABOUT ME
				</h1>
				<Grid
					breakPoints={[992, 768]}
					gutter={4}
				>
					<Row blocks={5}>
						<Col
							blocks={2}
							breaks={[35, 100]}
						>
							<p>
								Responsive circle with a pic of me (or Sinister Silhouette)
							</p>
						</Col>
						<Col
							blocks={3}
							breaks={[65, 100]}
						>
							<p>
								About me paragraph
							</p>
						</Col>
					</Row>
					<Row>
						<Col
							breaks={[40, 100]}
						>
							<p>
								Responsive circle with a brain graphic
							</p>
						</Col>
						<Col
							breaks={[32, 52]}
						>
							<ul>
								<li>
									List
								</li>
								<li>
									of
								</li>
								<li>
									brain
								</li>
								<li>
									skills
								</li>
							</ul>
						</Col>
						<Col
							breaks={[28, 48]}
						>
							<ul>
								<li>
									List
								</li>
								<li>
									of
								</li>
								<li>
									brain
								</li>
								<li>
									skills
								</li>
							</ul>
						</Col>
					</Row>
					<Row>
						<Col
							breaks={[40, 100]}
						>
							<p>
								Responsive circle with a heart graphic
							</p>
						</Col>
						<Col
							breaks={[32, 52]}
						>
							<ul>
								<li>
									List
								</li>
								<li>
									of
								</li>
								<li>
									heart
								</li>
								<li>
									skills
								</li>
							</ul>
						</Col>
						<Col
							breaks={[28, 48]}
						>
							<ul>
								<li>
									List
								</li>
								<li>
									of
								</li>
								<li>
									heart
								</li>
								<li>
									skills
								</li>
							</ul>
						</Col>
					</Row>
					<Row>
						<Col
							breaks={[40, 100]}
						>
							<p>
								Responsive circle with a hand graphic
							</p>
						</Col>
						<Col
							breaks={[32, 52]}
						>
							<ul>
								<li>
									List
								</li>
								<li>
									of
								</li>
								<li>
									hand
								</li>
								<li>
									skills
								</li>
							</ul>
						</Col>
						<Col
							breaks={[28, 48]}
						>
							<ul>
								<li>
									List
								</li>
								<li>
									of
								</li>
								<li>
									hand
								</li>
								<li>
									skills
								</li>
							</ul>
						</Col>
					</Row>
				</Grid>
			</ResponsiveContainer>
		)
	}
});

export default AboutPage;