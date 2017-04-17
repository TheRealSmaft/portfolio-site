import React from 'react';
import ReactDOM from 'react-dom';

import { ResponsiveContainer, Grid, Row, Col, DeferredEventExecutor } from '../../Containers';
import { SVG, ShapeGroup, Rect, Circle, MotionPath, LightingFilter } from '../../Containers/ShapeContainers';

const ContactPage = React.createClass({
	componentWillMount() {
		this.svgEvents =[
			function (target, animation, reactTarget) {
				this.lightFilter = reactTarget.refs.LightingFilter1;
			},
			function (target, animation, reactTarget) {
				var animations = [
					(
						<animate 
							key={1}
							attributeName="x"
							values="20;50;20"
							dur="2s"
							repeatCount="indefinite"
						/>
					)
				];

				this.lightFilter.addAnimations(animations);
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
					moments={[0, 2]}
					events={this.svgEvents}
				>
					<SVG title="test">
			  			<Circle 
			  				diameter={50} 
			  				fill="darkgray" 
			  				filter="url(#testFilter)" 
			  			/>
		  				
		  				<LightingFilter
		  					id="testFilter"
		  					lightingType="specular"
		  					sourceType="point"
		  					position={[20, 20, 5]}
		  				/>
					</SVG>
				</DeferredEventExecutor>
			</ResponsiveContainer>
		)
	}
});

export default ContactPage;