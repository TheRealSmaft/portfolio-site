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
		this.pencil = null;

		if(this.props.mode.gameMode) {
			if(this.props.mode.progressLevel < 1) {
				browserHistory.replace('/');
			}

			this.pencilItem = {
				name: 'Pencil',
				usePoint: 4,
				collectableImage: require('../../../assets/images/items/Pencil/PencilCollectable.svg'),
				inventoryImage: require('../../../assets/images/items/Pencil/PencilInventory.svg'),
				width: '100px'
			};

			this.pencil = (
				<Collectable
					item={this.pencilItem}
				/>
			);
		}
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
				<div
					className={HomePageStyles.welcome}
				>
					<div>
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
					</div>
					<p>
						Farm-to-table twee plaid stumptown chia authentic. 
						Drinking vinegar hell of master cleanse banjo, gentrify
						enamel pin meditation dreamcatcher bespoke shabby chic
						ethical bitters blue bottle typewriter portland. Coloring
						succulents flannel pug XOXO street art cronut.
					</p>
				</div>
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
				{this.pencil}
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