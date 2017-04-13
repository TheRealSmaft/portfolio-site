import React from 'react';

import { ResponsiveContainer, Grid, Row, Col} from '../../Containers';

import Circle from '../../Containers/ShapeContainers/Circle';

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
					<Row blocks={3}>
						<Col
							blocks={1}
							breaks={[40, 100]}
						>
							<Circle
								diameter={300}
								fill={'lightblue'}
							/>
						</Col>
						<Col
							blocks={2}
							breaks={[60, 100]}
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
							<Circle
								diameter={300}
								fill={'pink'}
							/>
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
							<Circle
								diameter={300}
								fill={'red'}
							/>
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
							<Circle
								diameter={300}
								fill={'lightgreen'}
							/>
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