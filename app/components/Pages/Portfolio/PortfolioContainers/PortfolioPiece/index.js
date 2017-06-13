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
					{this.props.piece.image === 'SkullAndBowl/SkullAndBowlThumbnail.jpg' ? this.eraserCollectable : ''}
					{this.props.piece.image === 'CarlaAndI/CarlaAndIThumbnail.png' ? this.glueCollectable : ''}
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