import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';

import { ResponsiveContainer, Grid, Row, Col } from '../../Containers';
import SilhouetteIntro from '../../Scenes/SilhouetteIntro';
import IntroParagraph from './HomeComponents/IntroParagraph';

import { SVG, Circle } from '../../Containers/ShapeContainers';

import { HomePageStyles } from '../../../styles/pages';

import BodyMovin from '../../../plugins/bodymovin.min';

const HomePage = React.createClass({
	componentWillMount() {

	},

	componentDidMount() {
		var logoJson = require('../../../assets/images/Logo/Logo.json');
		this.logoAnimation = {
			animationData: logoJson,
			path: '../../../../../assets/images/Logo',
			loop: true,
			autoplay: true,
			name: 'logo',
			renderer: 'svg' ,
			container: ReactDOM.findDOMNode(this.refs.logo)
		};

		BodyMovin.loadAnimation(this.logoAnimation);
	},

	componentWillUnmount() {
		BodyMovin.destroy();
	},

	render() {
		return (
			<ResponsiveContainer>
				<SilhouetteIntro />
				<h1>
					WELCOME!
				</h1>
				<Grid
					className={HomePageStyles.homeGrid}
					breakPoints={[768]}
					gutter={4}
				>
					<Row blocks={20}>
						<Col
							breaks={[100]}
							blocks={9}
							style={{
								position: 'relative'
							}}
						>
							<SVG
								title="Logo Circle"
							>
								<Circle
									fill={'lightblue'}
								>
								</Circle>
							</SVG>
							<div 
								ref="logo"
								style={{
									position: 'absolute',
									width: '95%',
									left: '3%',
									top: '2%'
								}}
							>
							</div>
						</Col>
						<Col
							breaks={[100]}
							blocks={11}
						>
							<IntroParagraph 
								className={HomePageStyles.homeP}
							/>
						</Col>
					</Row>
				</Grid>
				<div
						className={HomePageStyles.portPreview}
					>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<span></span>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<span></span>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</ResponsiveContainer>
		)
	}
});

export default HomePage;