import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import { ResponsiveContainer, Grid, Row, Col } from '../../Containers';
import { Collectable } from '../../Containers/GameContainers';

import SilhouetteIntro from '../../Scenes/SilhouetteIntro';

import Logo from './Logo';

import { HomePageStyles } from '../../../styles/pages';

import { modeActions, modeTypes } from '../../../state/game/mode';
import { portfolioActions, portfolioTypes } from '../../../state/portfolio';
import { scrollEventActions, scrollEventTypes } from '../../../state/events/scroll';

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

		this.getWelcome();
	},

	componentWillUpdate() {
		if(this.props.mode.justBeatGame ||
			this.props.mode.justSkippedGame) {
			this.refs.victoryDiv.style.opacity = 0;

			this.getWelcome();

			setTimeout(() => {
				this.props.justBeatGame(false);
				this.props.justSkippedGame(false);
			}, 3100);
		}
	},

	componentWillUnmount() {
		if(this.props.mode.justBeatGame ||
			this.props.mode.justSkippedGame) {
			this.props.justBeatGame(false);
			this.props.justSkippedGame(false);
		}
	},

	switchToGameMode() {
		this.props.updateGameProgress(0);
		this.props.changeToGameMode();
		browserHistory.replace('/');
	},

	getWelcome() {
		if(this.props.mode.justBeatGame) {
			this.welcome = (
				<div>
					<h1>
						Congratulations!
					</h1>
					<p>
						You just beat my website! You are now free to peruse my newly non-vandalized portfolio 
						at your leisure!
					</p>
					<p>
						Thank you for visiting and feel free to contact me if you are an awesome employer or 
						just otherwise enjoyed yourself!
					</p>
				</div>
			);
		}
		else if(this.props.mode.gameMode) {
			this.welcome = (
				<div>
					<h1>
						Help Me!
					</h1>
					<p>
						Someone has vandalized my site and is still running amok! 
						This place is all falling apart and I don't know where I lorem. 
						Oh no! He's ipsum turning dolor my text sit am , consectetur 
						adipiscing elit. Fusce dui lorem, faucibus eget elit a, 
						consectetur efficitur ipsum...
					</p>
				</div>
			);
		}
		else
		{
			this.welcome = (
				<div>
					<h1>
						Welcome!
					</h1>
					<p>
						I appreciate you taking time to check out my website and portfolio. 
					</p>
					<p>
						As you may already know, this site is also a game. I consider the game to be the 
						centerpiece of my portfolio. If you wish to play it, click the play game button below.
					</p>
					<button
						className={HomePageStyles.playButton}
						onClick={this.switchToGameMode}
					>
						Play Game
					</button>
				</div>
			);
		}
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
				<div
					className={HomePageStyles.welcome}
				>
					<Logo/>
					{this.welcome}
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
						display: this.props.mode.justBeatGame || this.props.mode.justSkippedGame ? 'block' : 'none',
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
		justSkippedGame: modeActions.justSkippedGame,
		changeToGameMode: modeActions.changeToGameMode,
		updateGameProgress: modeActions.updateGameProgress,
		selectModalPiece: portfolioActions.selectModalPiece,
		lockScrollPosition: scrollEventActions.lockScrollPosition
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);