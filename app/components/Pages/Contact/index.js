import React from 'react';
import ReactDOM from 'react-dom';

import { ResponsiveContainer, Grid, Row, Col, DeferredEventExecutor } from '../../Containers';
import { SVG, Rect } from '../../Containers/ShapeContainers';

import BodyMovin from '../../../plugins/bodymovin.min';

const ContactPage = React.createClass({
	componentDidMount() {
		var animationData = {
			animationData: require('../../../assets/images/interactables/UFO/UFOArrival.json'),
			path: '../../../assets/images/interactables/UFO',
			loop: false,
			autoplay: false,
			name: 'ufoArrival',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.alienContact)
		};

		this.ufoArrival = BodyMovin.loadAnimation(animationData);
		this.ufoArrival.addEventListener('complete', this.ufoHover);
		setTimeout(() => {
			this.ufoArrival.play();
		}, 500);
	},

	componentWillUpdate() {
		this.svgHeight = this.refs.alienContact.getBoundingClientRect().height;
	},

	ufoHover() {
		this.ufoArrival.removeEventListener('complete', this.ufoHover);
		this.ufoArrival.destroy();

		var animationData = {
			animationData: require('../../../assets/images/interactables/UFO/UFOHovering.json'),
			path: '../../../assets/images/interactables/UFO',
			loop: true,
			autoplay: true,
			name: 'ufoHover',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.alienContact)
		};

		this.ufoHover = BodyMovin.loadAnimation(animationData);
		this.ufoHover.setSpeed(.25);

		var carrotAnimationData = {
			animationData: require('../../../assets/images/interactables/UFO/Carrot.json'),
			path: '../../../assets/images/interactables/UFO',
			loop: true,
			autoplay: true,
			name: 'ufoHover',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.carrot)
		};

		this.carrot = BodyMovin.loadAnimation(carrotAnimationData);

		setTimeout(() => {
			this.useTractorBeam();
		}, 1000)
	},

	useTractorBeam() {
		var animationData = {
			animationData: require('../../../assets/images/interactables/UFO/TractorBeam.json'),
			path: '../../../assets/images/interactables/UFO',
			loop: false,
			autoplay: true,
			name: 'tractorBeam',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.tractorBeam)
		};

		this.tractorBeam = BodyMovin.loadAnimation(animationData);
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
									height: this.svgHeight + 'px'
								}}
							>
								<div
									style={{
										position: 'relative'
									}}
								>
									<div
										ref="carrot"
										style={{
											position: 'absolute',
											top: '0px',
											left: '0px'
										}}
									>
									</div>
									<div
										ref="alienContact"
										style={{
											position: 'absolute',
											top: '0px',
											left: '0px'
										}}
									>
									</div>
									<div
										ref="tractorBeam"
										style={{
											position: 'absolute',
											top: '0px',
											left: '0px'
										}}
									>
									</div>
								</div>
							</div>
						</Col>
						<Col
							breaks={[100]}
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
						</Col>
					</Row>
				</Grid>
			</ResponsiveContainer>
		)
	}
});

export default ContactPage;