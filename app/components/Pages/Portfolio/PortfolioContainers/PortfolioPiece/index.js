import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
		this.props.selectModalPiece(this.props.index);
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
					<div>
						<div>
						</div>
					</div>
					<div>
					</div>
					<div>
					</div>
					<img 
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
				</div>
			</div>
		);
	}
});

function mapStateToProps(store) {
	return {
		portfolio: store.portfolioState
	}
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		selectModalPiece: portfolioActions.selectModalPiece
	}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioPiece);