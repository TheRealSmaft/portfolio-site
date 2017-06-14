import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Collectable } from '../../../../Containers/GameContainers';

import { portfolioActions, portfolioTypes } from '../../../../../state/portfolio';

import { PortfolioPageStyles } from '../../../../../styles/pages';

const PortfolioPiece = React.createClass({
	propTypes: {
		piece: React.PropTypes.object.isRequired
	},

	getInitialState() {
		return {
			infoIndex: null,
			infoButtonText: 'More Info'
		}
	},

	getDefaultProps() {
		return {
			rotation: '0deg'
		}
	},

	componentWillMount() {
		this.eraser = {
			name: 'Eraser',
			collectPoint: 7,
			usePoint: 8,
			collectableImage: require('../../../../../assets/images/items/Eraser/Eraser.svg'),
			inventoryImage: require('../../../../../assets/images/items/Eraser/Eraser.svg'),
			width: '100px'
		};

		this.glue = {
			name: 'Glue',
			usePoint: 10,
			collectableImage: require('../../../../../assets/images/items/Glue/Glue.svg'),
			inventoryImage: require('../../../../../assets/images/items/Glue/GlueInventory.svg'),
			width: '150px'
		};

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
	},

	straightenFrame() {
		if(!this.pieceStraight) {
			this.refs.pieceImage.style.transform = 'rotate(0deg)';
			this.pieceStraight = true;
			setTimeout(() => {
				this.openModal();
			}, 600);
		}
		else
		{
			this.openModal();
		}
	},

	openModal() {
		if(!this.props.mode.gameMode) {
			this.props.selectModalPiece(this.props.index);
		}
	},

	moreInfo() {
		if(this.state.infoIndex === null) {
			this.setState({
				infoIndex: 0
			});
			this.refs.infoP.style.opacity = 1;
		}
		else
		{
			this.refs.infoP.style.opacity = 0;
			setTimeout(() => {
				if(this.state.infoIndex >= this.props.piece.moreInfo.length - 1) {
					this.setState({
						infoIndex: 0,
						infoButtonText: 'More Info'
					});
				}
				else
				{
					this.setState({
						infoIndex: this.state.infoIndex + 1,
						infoButtonText: this.getInfoButtonText()
					});
				}
				this.refs.infoP.style.opacity = 1;
			}, 300);
		}
	},

	getInfoButtonText() {
		const text = [
			'Even More Info',
			'Still More Info',
			'MORE Info?!',
			'Learn More',
			'Tell Me More',
			'Go On',
			'I Can Keep Going'
		];
		var r = Math.floor(Math.random() * text.length);

		return text[r];
	},

	render() {
		return (
			<div
				className={PortfolioPageStyles.pieceGrid}
			>
				<div
					ref="pieceImage"
					className={PortfolioPageStyles.pieceImage}
					style={{
						transform: 'rotate(' + this.props.rotation + ')'
					}}
					onClick={this.straightenFrame}
				>
					<img 
						src={require('../../../../../assets/images/interactables/PortfolioFrames/FrameNail.svg')}
					/>
					<div
						className={PortfolioPageStyles.frame}
					>
						<div>
						</div>
					</div>
					<div
						className={PortfolioPageStyles.frame}
					>
					</div>
					<div
						className={PortfolioPageStyles.frame}
					>
					</div>
					{this.props.mode.gameMode ? (
							<img
								className={PortfolioPageStyles.vandalized}
								src={require('../../../../../assets/portfolio/' + this.props.piece.vandalized)}
							/>
						) : ''
					}
					<img 
						className={this.props.mode.gameMode ? PortfolioPageStyles.vandalizedImage : ''}
						alt={this.props.piece.name}
						src={require('../../../../../assets/portfolio/' + this.props.piece.image)}
					/>
				</div>

				<div
					className={PortfolioPageStyles.description}
				>
					<h2
						className={PortfolioPageStyles.title}
						onClick={this.openModal}
					>
						{this.props.piece.name}
					</h2>
					<p>
						{this.props.piece.description}
					</p>
					<div
						className={PortfolioPageStyles.moreInfo}
					>
						<p
							ref="infoP"
						>
							{this.state.infoIndex != null ? this.props.piece.moreInfo[this.state.infoIndex] : ''}
						</p>
						<button
							className={PortfolioPageStyles.moreButton}
							onClick={this.moreInfo}
						>
							{this.state.infoButtonText}
						</button>
					</div>

					{this.props.piece.image === 'SkullAndBowl/SkullAndBowlThumbnail.jpg' && this.props.mode.gameMode ? this.eraserCollectable : ''}
					{this.props.piece.image === 'CarlaAndI/CarlaAndIThumbnail.png' && this.props.mode.gameMode ? this.glueCollectable : ''}
				</div>
			</div>
		);
	}
});

function mapStateToProps(store) {
	return {
		mode: store.modeState,
		portfolio: store.portfolioState
	}
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		selectModalPiece: portfolioActions.selectModalPiece
	}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioPiece);