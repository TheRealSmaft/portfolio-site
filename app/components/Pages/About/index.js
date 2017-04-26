import React from 'react';

import { ResponsiveContainer, Grid, Row, Col, DeferredEventExecutor} from '../../Containers';

import { SVG, Circle } from '../../Containers/ShapeContainers';

import { AboutPageStyles } from '../../../styles/pages';

import thumbsUpEvents from '../../../assets/images/interactables/Hand/thumbsUpEvents';

const AboutPage = React.createClass({
	componentWillMount() {
		this.thumbsUpMoments = [];

		for(var i = 1; i < 12; i++) {
			this.thumbsUpMoments.push(i);
		}
	},

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
							<SVG
								title="Me Pic Background"
							>
								<Circle
									fill={'orange'}
								/>
							</SVG>
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
							style={{
								position: 'relative'
							}}
						>
							<SVG
								title="Brain Background"
							>
								<Circle
									fill={'yellow'}
								/>
							</SVG>
							<img 
								style={{
									position: 'absolute',
									width: '70%',
									left: '15%',
									top: '22.5%'
								}}
								src={require('../../../assets/images/interactables/Brain/Brain.svg')}
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
							style={{
								position: 'relative'
							}}
						>
							<SVG
								title="Heart Background"
							>
								<Circle
									fill={'lightblue'}
								/>
							</SVG>
							<img 
								style={{
									position: 'absolute',
									width: '60%',
									left: '20%',
									top: '8%'
								}}
								src={require('../../../assets/images/interactables/Heart/Heart.svg')}
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
							style={{
								position: 'relative'
							}}
						>
							<SVG
								title="Hand Background"
							>
								<Circle
									fill={'lightgreen'}
								/>
							</SVG>
							<DeferredEventExecutor
								moments={this.thumbsUpMoments}
								events={thumbsUpEvents}
								increment={42}
							>
								<img 
									style={{
										position: 'absolute',
										width: '60%',
										left: '20%',
										top: '0px'
									}}
									src={require('../../../assets/images/interactables/Hand/ThumbsUp/Hand-01.svg')}
								/>
							</DeferredEventExecutor>
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