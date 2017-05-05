import React from 'react';
import ReactDOM from 'react-dom';

import { ResponsiveContainer, Grid, Row, Col, DeferredEventExecutor } from '../../Containers';
import { SVG, Rect } from '../../Containers/ShapeContainers';

import uncrumpleEvents from '../../../assets/images/items/Paper/uncrumpleEvents';

const ContactPage = React.createClass({
	componentWillMount() {
		this.uncrumpleMoments = [];

		for(var i = 1; i < 81; i++) {
			this.uncrumpleMoments.push(i);
		}
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
							<p>
								This will be a pic of a flying saucer (from Zanahoria) abducting the Sinister Silhouette.
							</p>
						</Col>
						<Col
							breaks={[100]}
							style={{
								position: 'relative'
							}}
						>
							<SVG
								title="Form Background"
							>
								<Rect
									fill="pink"
									dimensions={[90, 90]}
									position={[5,5]}
								>
								<animateTransform 
									attributeName="transform"
									id="forth"
									attributeType="XML"
									type="rotate"
									from="-2 45 45"
									to="2 45 45"
									dur="20s"
									begin="0s; back.end"
								/>
								<animateTransform 
									attributeName="transform"
									id="back"
									attributeType="XML"
									type="rotate"
									from="2 45 45"
									to="-2 45 45"
									dur="20s"
									begin="forth.end"
								/>
								</Rect>
							</SVG>
							<p
								style={{
									position: 'absolute',
									top: '5%',
									left: '8%'
								}}
							>
								This will be a contact form
							</p>
						</Col>
					</Row>
				</Grid>
				<DeferredEventExecutor
					moments={this.uncrumpleMoments}
					events={uncrumpleEvents}
					increment={34}
				>
					<img 
						style={{width: '100%'}}
						src={require('../../../assets/images/items/Paper/Crumple/Crumple(1).png')}
					/>
				</DeferredEventExecutor>
			</ResponsiveContainer>
		)
	}
});

export default ContactPage;