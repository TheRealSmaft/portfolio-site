import React from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { ResponsiveContainer } from '../../Containers';
import { Collectable } from '../../Containers/GameContainers';
import LinkScribble from './PortfolioContainers/LinkScribble';

import PortfolioPiece from './PortfolioContainers/PortfolioPiece';

import { PortfolioPageStyles } from '../../../styles/pages';

const PortfolioPage = React.createClass({
	componentWillMount() {
		if(this.props.mode.gameMode) {
			if(this.props.mode.progressLevel < 1) {
				browserHistory.replace('/');
			}
		}
		this.bunnyPiece = {
			name: 'BUNNIEZ',
			description: 'A bunch o\' bunnies!',
			image: 'download.jpg'
		};

		this.carrotPiece = {
			name: 'Carrots?',
			description: 'A bunch o\' carrots for d\'bunnies!',
			image: 'carrots.jpg'
		};

		this.linkScribble = (
			<Link 
				to="/contact"
			>
				contact&nbsp;me!
			</Link>
		);

		this.eraserCollectable = null;
		this.glueCollectable = null;

		if(this.props.mode.gameMode) {
			this.eraser = {
				name: 'Eraser',
				collectPoint: 7,
				usePoint: 8,
				collectableImage: require('../../../assets/images/items/Eraser/Eraser.svg'),
				inventoryImage: require('../../../assets/images/items/Eraser/Eraser.svg'),
				width: '100px'
			};

			this.glue = {
				name: 'Glue',
				usePoint: 10,
				collectableImage: require('../../../assets/images/items/Glue/Glue.svg'),
				inventoryImage: require('../../../assets/images/items/Glue/GlueInventory.svg'),
				width: '100px'
			};

			this.linkScribble = (
				<LinkScribble 
					className={PortfolioPageStyles.linkScribble}
				/>
			);

			this.eraserCollectable = (
				<Collectable 
					item={this.eraser}
				/>
			);

			this.glueCollectable = (
				<Collectable 
					item={this.glue}
				/>
			);
		}
	},

	render() {
		return (
			<ResponsiveContainer>
				<h1>
					PORTFOLIO
				</h1>
				<div
					className={PortfolioPageStyles.portIntro}
				>
					If you like what you see please&nbsp;
					{this.linkScribble}
				</div>

				<PortfolioPiece
					rotation="1deg"
					piece={this.bunnyPiece}
				/>
				<PortfolioPiece
					rotation="-.75deg"
					piece={this.carrotPiece}
				/>

				{this.eraserCollectable}
				{this.glueCollectable}
			</ResponsiveContainer>
		)
	}
});

function mapStateToProps(store) {
	return {
		mode: store.modeState
	}
};

export default connect(mapStateToProps)(PortfolioPage);