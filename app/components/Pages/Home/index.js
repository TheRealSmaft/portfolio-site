import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { ResponsiveContainer, Grid, Row, Col } from '../../Containers';
import { Collectable } from '../../Containers/GameContainers';

import SilhouetteIntro from '../../Scenes/SilhouetteIntro';

import { SVG, Circle } from '../../Containers/ShapeContainers';

import { HomePageStyles } from '../../../styles/pages';

import BodyMovin from '../../../plugins/bodymovin.min';

const HomePage = React.createClass({
	componentWillMount() {
		if(this.props.mode.gameMode) {
			if(this.props.mode.progressLevel < 1) {
				browserHistory.replace('/');
			}
		}
		this.pencil = {
			name: 'Pencil',
			usePoint: 2,
			collectableImage: require('../../../assets/images/items/Pencil/PencilCollectable.svg'),
			inventoryImage: require('../../../assets/images/items/Pencil/PencilInventory.svg'),
			width: '100px'
		};
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
				<SilhouetteIntro/>
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
							className={HomePageStyles.homeP}
							breaks={[100]}
							blocks={11}
						>
							<p>
								Farm-to-table twee plaid stumptown chia authentic. 
								Drinking vinegar hell of master cleanse banjo, gentrify
								enamel pin meditation dreamcatcher bespoke shabby chic
								ethical bitters blue bottle typewriter portland. Coloring
								book man braid messenger bag chicharrones, sartorial
								succulents flannel pug XOXO street art cronut.
							</p>
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
				<Collectable
					item={this.pencil}
				/>
			</ResponsiveContainer>
		)
	}
});

function mapStateToProps(store) {
	return {
		mode: store.modeState
	}
};

export default connect(mapStateToProps)(HomePage);