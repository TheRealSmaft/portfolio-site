import React from 'react';
import ReactDOM from 'react-dom';

import { ResponsiveContainer, Grid, Row, Col, DeferredEventExecutor } from '../../Containers';
import { SVG, ShapeGroup, Rect, Circle, MotionPath } from '../../Containers/ShapeContainers';

const ContactPage = React.createClass({
	componentWillMount() {
		this.circleEvents =[
			function (target, animation, reactTarget) {
				this.motionPaths = [
					(
						<MotionPath
							key={1}
							duration={2000}
							begin="2s"
	     					pathId="butts"
	     					draw="M 0,0 C 40,40 60,20 90,30"
	     				/>
					),
					(
						<MotionPath
							key={2}
							duration={3000}
							begin="buttsAnimation.end"
							repeatCount="2"
	     					pathId="shits"
	     					draw="M 90,30 C 80,20 10,60 5,90 z"
	     				/>
					),
					(
						<MotionPath
							key={3}
							duration={2000}
							begin="shitsAnimation.end"
	     					pathId="barfs"
	     					draw="M 90,30 C 60,20 40,40 0,0"
	     				/>
					)
				];
				reactTarget.refs.shape1.addMotionPaths(this.motionPaths);
			}
		];
	},

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
				<DeferredEventExecutor
					moments={[2]}
					events={this.circleEvents}
				>
					<SVG>
						<Rect 
							dimensions={[50, 10]}
							fill={'lightBlue'}
						/>
						<ShapeGroup>
							<circle 
								style={{
									fill: '#0071bc'
								}}
								cx="4.5" cy="4.5" r="4.38"/>
							<path 
								style={{
									fill: 'blue'
								}}
								d="M4.5.24A4.26,4.26,0,1,1,.24,4.5,4.27,4.27,0,0,1,4.5.24M4.5,0A4.5,4.5,0,1,0,9,4.5,4.5,4.5,0,0,0,4.5,0Z"/>
							<path 
								style={{
									fill: '#fff'
								}}
								d="M3.24,1.79A4.56,4.56,0,0,0,1.63,4.07a.05.05,0,0,1-.1,0A2.16,2.16,0,0,1,3.19,1.7.05.05,0,0,1,3.24,1.79Z"/>
						</ShapeGroup>
					</SVG>
				</DeferredEventExecutor>
			</ResponsiveContainer>
		)
	}
});

export default ContactPage;