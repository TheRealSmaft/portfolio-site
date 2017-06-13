import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import { ResponsiveContainer, Grid, Row, Col } from '../../Containers';
import { Collectable } from '../../Containers/GameContainers';

import SilhouetteIntro from '../../Scenes/SilhouetteIntro';

import { SVG, Circle } from '../../Containers/ShapeContainers';

import { HomePageStyles } from '../../../styles/pages';

import { modeActions, modeTypes } from '../../../state/game/mode';
import { portfolioActions, portfolioTypes } from '../../../state/portfolio';
import { scrollEventActions, scrollEventTypes } from '../../../state/events/scroll';

import BodyMovin from '../../../plugins/bodymovin.min';

import portfolio from '../../../assets/portfolio';

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
				collectProgress: 3,
				collectableImage: require('../../../assets/images/items/Pencil/PencilCollectable.svg'),
				inventoryImage: require('../../../assets/images/items/Pencil/PencilInventory.svg'),
				width: '100px'
			};

			this.pencil = (
				<Collectable
					style={{
						position: 'absolute',
						bottom: '-20px',
						right: '-50px',
						transform: 'rotate(-350deg)',
						zIndex: 10
					}}
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

	componentWillUpdate() {
		if(this.props.mode.justBeatGame) {
			this.refs.victoryDiv.style.opacity = 0;

			setTimeout(() => {
				this.props.justBeatGame(false);
			}, 3100);
		}
	},

	componentWillUnmount() {
		BodyMovin.destroy();
	},

	viewPortfolioPiece(index) {
		if(!this.props.mode.gameMode) {
			this.props.selectModalPiece(index);
			this.props.lockScrollPosition();
			browserHistory.push('/portfolio');
		}
	},

	render() {
		let port = portfolio.map((piece, index) => 
			<div
				className={this.props.mode.gameMode ? HomePageStyles.vandalizedContainer : ''}
				key={index}
			>
				<img
					className={!this.props.mode.gameMode ? HomePageStyles.portPreviewImage : HomePageStyles.vandalizedImage}
					src={'../../../assets/portfolio/' + piece.image}
					alt={piece.name}
					onClick={() => {this.viewPortfolioPiece(index)}}
				/>

				{this.props.mode.gameMode ? (
					<img 
						className={HomePageStyles.vandalized}
						src={'../../../assets/portfolio/' + piece.vandalized}
					/>)
					: ''
				}

				{index === 9 ? this.pencil : ''}
			</div>
		);

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
					{port}
				</div>
				<div
					ref="victoryDiv"
					className={HomePageStyles.victoryDiv}
					style={{
						display: this.props.mode.justBeatGame ? 'block' : 'none',
						width: window.innerWidth + 'px',
						height: window.innerHeight + 'px'
					}}
				>
				</div>
			</ResponsiveContainer>
		)
	}
});

function mapStateToProps(store) {
	return {
		mode: store.modeState
	}
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		justBeatGame: modeActions.justBeatGame,
		selectModalPiece: portfolioActions.selectModalPiece,
		lockScrollPosition: scrollEventActions.lockScrollPosition
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);