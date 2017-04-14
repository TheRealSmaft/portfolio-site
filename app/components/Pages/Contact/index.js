import React from 'react';
import ReactDOM from 'react-dom';
import SvgToJsx from 'svg-to-jsx';

import blueBall from '../../../assets/images/items/blueBall/BlueBall.svg'

import { ResponsiveContainer, Grid, Row, Col, DeferredEventExecutor } from '../../Containers';
import { SVG, Circle, MotionPath } from '../../Containers/ShapeContainers';

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
	     					draw="M 0,0 C 40,40 60,20 95,30"
	     				/>
					),
					(
						<MotionPath
							key={2}
							duration={3000}
							begin="buttsAnimation.end"
							repeatCount="2"
	     					pathId="shits"
	     					draw="M 95,30 C 80,20 10,60 5,90 z"
	     				/>
					),
					(
						<MotionPath
							key={3}
							duration={2000}
							begin="shitsAnimation.end"
	     					pathId="barfs"
	     					draw="M 95,30 C 60,20 40,40 0,0"
	     				/>
					)
				];
				reactTarget.refs.shape0.addMotionPaths(this.motionPaths);
			}
		];

		this.jsx = SvgToJsx(blueBall).then(result => result.data);

		console.log(this.jsx.inspect())
	},

	componentWillUpdate() {
		console.log(this.jsx.inspect())
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
				<SVG id="svg">
				</SVG>
			</ResponsiveContainer>
		)
	}
});

export default ContactPage;